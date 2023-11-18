import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Donation } from 'src/app/models/donation.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-donation-history',
  templateUrl: './donation-history.component.html',
  styleUrls: ['./donation-history.component.scss']
})
export class DonationHistoryComponent implements OnInit {

  user!: User;
  donations!: Donation[] | undefined;
  constructor(private userService: UserService){}

  ngOnInit() {
    this.userService.getLoggedUser().subscribe(
      (response) => {
        console.log(response);
        this.user = response;
        console.log(response.donations);
        this.donations = response.donations;
        
      },
      (error) => {
        console.log(error);
      },
      () => console.log('Success getting logged user')
    )
  }

}
