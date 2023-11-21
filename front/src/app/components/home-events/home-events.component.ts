import { Component, Input } from '@angular/core';
import { Event } from 'src/app/models/Event.model';

@Component({
  selector: 'app-home-events',
  templateUrl: './home-events.component.html',
  styleUrls: ['./home-events.component.scss']
})
export class HomeEventsComponent {

  @Input() events!: Event[];

}
