import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Charity } from 'src/app/models/charity.model';
import { CharityService } from 'src/app/services/charity.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/Event.model';

@Component({
  selector: 'app-charity-page',
  templateUrl: './charity-page.component.html',
  styleUrls: ['./charity-page.component.scss']
})
export class CharityPageComponent implements OnInit {

  email= "test@gmail.com";
  charity!: Charity;
  user!: User;
  followedCharities!: Charity[];
  charityId!: string | null;

  eventsList?: Event[] ;
  eventss?: any[];

  test!: any;
  checked: boolean = false;

  session!: string | null;

  firstElement!: any ;

  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private charityService: CharityService,
    private userService: UserService,
    private eventService: EventService,
    private modalService: MdbModalService
  ){}

  async ngOnInit(): Promise<void> {
    try {
        await this.getCharityById();
        await this.getLoggedUser();
        // this.getLoggedUser();
        
        console.log(this.followedCharities);
        console.log("eventssss 11", this.eventss);
        this.test = this.eventss?.at(0)

        this.session = sessionStorage.getItem("user_id");
        console.log("session storage",sessionStorage.getItem("user_id"));

        if (this.followedCharities.some(charity=>charity.name === this.charity.name)){
            console.log("It's here!!!");
            this.checked = true
        } else {
            console.log("It's not!!");
            this.checked = false;
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {charityId: this.charityId}
    }, )
  }

  async getCharityById(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        this.charityId = this.route.snapshot.paramMap.get("charityId");
        console.log("charity id from param", this.charityId);
        this.charityService.getCharityById(this.charityId).subscribe(
            (response) => {
                console.log(response);
                this.charity = response;
                this.eventsList = response.charityEvents;
                console.log("event lsit: ", this.eventsList);
                this.function();
                console.log("eventssss", this.eventss);
                
                resolve();
            },
            (error) => {
                console.log(error);
                reject();
            },
            () => console.log("Success creating Event!")
        );
    });
}

async getLoggedUser(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        this.userService.getLoggedUser().subscribe(
            (response: any) => {
                console.log(response);
                this.user = response;
                this.followedCharities = response.followedCharities;
                
                // this.charity = response;
                resolve();
            },
            (error: any) => {
                console.log(error);
                // reject();
            },
            () => console.log("Success getting logged user!")
        );
    });
}

  onSubmit(){
    if(!this.checked){
      this.charityService.followCharity(this.charityId).subscribe(
        (response: any) =>{
          console.log("response:",response);
          // this.charity = response;
          // this.checked = true;
        } ,
        (error: any) => {
          console.log("error: ",error)
        },
        () => {
          console.log("User successfully Followed a charity!");
          this.checked = true;
      }
      );
    }
    else{
      this.charityService.unfollowCharity(this.charityId).subscribe(
        (response: any) =>{
          console.log(response);
          // this.charity = response;
        } ,
        (error: any) => {
          console.log(error)
        },
        () => {
          console.log("User Unfollowed a charity!");
          this.checked = false;
      }
      );
    }
  }

  function() {
    console.log("testetstets11", this.eventsList?.length);
    console.log('00', this.eventsList?.at(0));
    this.firstElement = this.eventsList?.at(0);
    if (this.eventsList !== undefined) {
      // Initialize eventss as an empty array if it's not already initialized
      this.eventss = this.eventss || [];


        if (this.eventsList?.length > 1) {
            // this.eventss.push(this.eventsList[0]);
            console.log(this.eventss, "broo");

            for (let i = 0; i < this.eventsList.length; i++) {
                console.log("testettsets");

                this.eventService.getEventById(this.eventsList[i]).subscribe(
                    (response) => {
                        console.log("response", response);
                        this.eventss?.push(response);
                        // console.log("event List::",this.eventsList);

                    },
                    (error) => console.log(error),
                    () => console.log("Done getting Event")
                );
            }
        }
        else{
          this.eventss.push(this.eventsList[0]);
          console.log(this.eventss, "broo");

          for (let i = 1; i < this.eventsList.length; i++) {
              console.log("testettsets");

              this.eventService.getEventById(this.eventsList[i]).subscribe(
                  (response) => {
                      console.log("response", response);
                      this.eventss?.push(response);
                      // console.log("event List::",this.eventsList);

                  },
                  (error) => console.log(error),
                  () => console.log("Done getting Event")
              );
          }
      }
    }
}

}
