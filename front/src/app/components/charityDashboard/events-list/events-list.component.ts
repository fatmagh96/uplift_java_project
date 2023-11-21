import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/Event.model';
import { Charity } from 'src/app/models/charity.model';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class MyEventsListComponent implements OnInit {

  charity: Charity | undefined;
  eventsList?: Event[] ;

  eventss?: any[];


  constructor(
    private userService: UserService,
    private eventService: EventService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.getLoggedUser().subscribe(
      (response) => {
        console.log(response);
        this.eventsList = response.charity?.charityEvents;
        console.log("event List::",this.eventsList);
        this.function();
    
      },
      (error) => console.log(error),
      () => {
        console.log("Done getting Charity");
        console.log("eventsss",this.eventss);
      }
    );

    
    



  }

  // function(){
  //   console.log("testetstets11",this.eventsList?.length);
  //   console.log('00', this.eventsList?.at(0));
    
  //   if(this.eventsList != undefined){
  //     this.eventss?.push(this.eventsList?.at(0));
  //     console.log(this.eventss,"broo");
      
  //     for(let i= 1;i<this.eventsList.length;i++){
  //       console.log("testettsets");
        
  //       this.eventService.getEventById(this.eventsList.at(i)).subscribe(
  //         (response) => {
  //           console.log("response",response);
  //           this.eventss?.push(response);
  //           // console.log("event List::",this.eventsList);
            
  //         },
  //         (error) => console.log(error),
  //         () => console.log("Done getting Event")
  //       )
  //     }

  //   }
  // }
  function() {
    console.log("testetstets11", this.eventsList?.length);
    console.log('00', this.eventsList?.at(0));

    if (this.eventsList !== undefined) {
        // Initialize eventss as an empty array if it's not already initialized
        this.eventss = this.eventss || [];

        if (this.eventsList?.length > 0) {
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
