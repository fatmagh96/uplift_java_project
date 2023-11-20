import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.eventData.address);
    
  }

  @Input() eventData!: Event;

}
