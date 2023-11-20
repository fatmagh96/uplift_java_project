import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/Event.model';
import { Charity } from 'src/app/models/charity.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class MyEventsListComponent implements OnInit {

  charity: Charity | undefined;
  eventsList!: Event[] | undefined;
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.getLoggedUser().subscribe(
      (response) => {
        console.log(response);
        this.eventsList = response.charity?.followers;
      },
      (error) => console.log(error),
      () => console.log("Done getting Charity")
    )


  }

}
