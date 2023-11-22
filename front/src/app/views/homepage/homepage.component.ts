import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/Event.model';
import { Charity } from 'src/app/models/charity.model';
import { User } from 'src/app/models/user.model';
import { CharityService } from 'src/app/services/charity.service';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{

  allCharities!: Charity[];
  listOfThreeCharities!: Charity[];

  allEvents!: Event[];
  // listOfThreeEvents: Observable<Event[]>;
  listOfThreeEvents!: Event[];


  // ** added
  // isLoggedIn: boolean = false;
  // user!: User;

  ngOnInit(): void {
     this.getCharities();
     this.getEvents();
    //  ** added
    //  this.checkSession();
      
  }

  constructor(private charityService: CharityService,
     private eventService: EventService,private userService: UserService,
     private router: Router,
     private cdr: ChangeDetectorRef){}
     
    //  *** added
    //  checkSession() {
    //   if (sessionStorage.getItem('user_id')) {
    //     this.isLoggedIn = true;
    //   } 
    //   console.log('isLoggedIn:', this.isLoggedIn);
    //   this.cdr.markForCheck();
    // }
    // logout() {
    //   this.userService.logoutUser().subscribe(
    //     (response: any) => {
    //       console.log(response);
    //       // Clear the 'user_id' session item
    //       sessionStorage.removeItem('user_id');
    //       // sessionStorage.clear();
    //       this.isLoggedIn = false;
    //       this.router.navigateByUrl('/login'); 
    //     },
    //     (error: any) => {
    //       console.log('Error logging out:', error);
    //     }
    //   );
    // }

    // ****
  getCharities(){
    this.charityService.getAllCharities().subscribe(
      (response) => {
        console.log(response);
        this.allCharities = response;
        this.listOfThreeCharities = this.allCharities?.splice(-3);
        console.log(this.listOfThreeCharities);
        // *** added
        // this.userService.getLoggedUser().subscribe(
        //   (response) => {
        //     console.log(response);
        //     this.user = response;   
        //   },
        //   (error) => {
        //     console.log(error);
        //   },
        //   () => console.log('Success getting logged user')
        // )
        // ****
        
      },
      (error) => console.log(error),
      () => console.log("Done getting charities")
    );
  }

  getEvents(){
    this.eventService.getAllEvents().subscribe(
      (response) => {
        console.log(response);
        this.allEvents = response;
        this.allEvents = this.allEvents.sort((a, b) => {
          const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
          const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
          return dateB - dateA;
      });



        this.listOfThreeEvents = this.allEvents?.splice(0,3);
        console.log(this.listOfThreeEvents);
        
      },
      (error) => console.log(error),
      () => console.log("Done getting charities")
    );
  }
  
}
