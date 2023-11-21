import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event.model';
import { Charity } from 'src/app/models/charity.model';
import { CharityService } from 'src/app/services/charity.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{

  allCharities!: Charity[];
  listOfThreeCharities!: Charity[];

  allEvents!: Event[];
  listOfThreeEvents!: Event[];

  ngOnInit(): void {
     this.getCharities();
     this.getEvents();
      
      
  }

  constructor(private charityService: CharityService, private eventService: EventService){}

  getCharities(){
    this.charityService.getAllCharities().subscribe(
      (response) => {
        console.log(response);
        this.allCharities = response;
        this.listOfThreeCharities = this.allCharities?.splice(-3);
        console.log(this.listOfThreeCharities);
        
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
