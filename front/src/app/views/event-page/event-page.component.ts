import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/Event.model';
import { Charity } from 'src/app/models/charity.model';
import { User } from 'src/app/models/user.model';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

  eventId!: string | null;
  event!: Event;
  user!: User;
  charity!: Charity;

  participatedEvents!: Event[];
  checked: boolean = true;

  test!: string | null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private userService: UserService,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.getEventById();
      await this.getLoggedUser();
      console.log("list of participatedEvents", this.participatedEvents);

      this.test = sessionStorage.getItem("user_id"); // getting session 

      if (this.participatedEvents.some(event => event.title === this.event.title)) {
        console.log("It's here!!!");
        this.checked = true
      } else {
        console.log("It's not!!");
        this.checked = false;
      }

    }
    catch (error) {
      console.error("An error occurred:", error);
    }
  }


  async getEventById(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.eventId = this.route.snapshot.paramMap.get("eventId");
      console.log("test id", this.eventId);
      this.eventService.getEventById(this.eventId).subscribe(
        (response) => {
          console.log(response);
          this.event = response;
          this.charity = response.eventCreator;
          resolve();
        },
        (error) => {
          console.log(error);
          reject();
        },
        () => console.log("Success getting Event!")
      )
    })
  }

  async getLoggedUser(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.userService.getLoggedUser().subscribe(
        (response: any) => {
          console.log(response);
          this.user = response;
          this.participatedEvents = response.participatedEvents;
          
          resolve();
        },
        (error: any) => {
          console.log(error);
          reject();
        },
        () => console.log("Success getting logged user!")
      );
    });
  }

  onSubmit() {
    if (!this.checked) {
      this.eventService.participateInEvent(this.eventId).subscribe(
        (response: any) => {
          console.log(response);
          // this.charity = response;
        },
        (error: any) => {
          console.log(error)
        },
        () => {
          console.log("User successfully joined event");
          this.checked = true;
        }
      )
    } else {
      this.eventService.quitEvent(this.eventId).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.log(error)
        },
        () => {
          console.log("User quit event");
          this.checked = false;
        }
      );
    }
  }

}
