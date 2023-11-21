import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit{
  
  currentDate!: Date;
  
  ngOnInit(): void {
    console.log(this.eventData.address);
    console.log("date now: ", this.currentDate);
    this.currentDate = new Date();
  }

  @Input() eventData!: Event;

  isEventExpired(startDate: Date | undefined): boolean {
    if (!startDate) {
      return false; // or true, depending on how you want to handle undefined start dates
    }
  
    const eventStartDate = new Date(startDate);
    return eventStartDate < this.currentDate;
  }
  

}
