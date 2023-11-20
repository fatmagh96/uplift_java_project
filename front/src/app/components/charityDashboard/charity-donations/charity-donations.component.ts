import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-charity-donations',
  templateUrl: './charity-donations.component.html',
  styleUrls: ['./charity-donations.component.scss']
})
export class CharityDonationsComponent implements OnInit {

  followersList!: User[] | undefined;


  constructor(
    private userService: UserService,
    private router: Router,
  ) {}


  ngOnInit() {
    this.userService.getLoggedUser().subscribe(
      (response) => {
        console.log(response);
        this.followersList = response.charity?.followers;
      },
      (error) => console.log(error),
      () => console.log("Done getting Charity")
    )


  }

}
