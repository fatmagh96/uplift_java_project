import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Charity } from 'src/app/models/charity.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-charity-profile',
  templateUrl: './charity-profile.component.html',
  styleUrls: ['./charity-profile.component.scss']
})
export class CharityProfileComponent implements OnInit {
  charity: Charity | undefined;

  

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}


  ngOnInit() {
    this.userService.getLoggedUser().subscribe(
      (response) => {
        console.log(response);
        this.charity = response.charity;
      },
      (error) => console.log(error),
      () => console.log("Done getting Charity")
    )
  }




}
