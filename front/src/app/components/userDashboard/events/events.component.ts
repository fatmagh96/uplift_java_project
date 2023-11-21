import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event.model';
import { Charity } from 'src/app/models/charity.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  user!: User;
  joinedEvents!:any[]| undefined;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(
      (response) => {
        console.log(response);
        this.user = response;
        console.log(response.participatedEvents);
        this.joinedEvents = response.participatedEvents;
        
      },
      (error) => {
        console.log(error);
      },
      () => console.log('Success getting logged user')
    )
  }
}
