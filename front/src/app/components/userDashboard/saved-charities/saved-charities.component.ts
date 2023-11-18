import { Component, OnInit } from '@angular/core';
import { Charity } from 'src/app/models/charity.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-saved-charities',
  templateUrl: './saved-charities.component.html',
  styleUrls: ['./saved-charities.component.scss']
})
export class SavedCharitiesComponent implements OnInit {
  
  user!: User;
  followedCharities!:Charity[]| undefined;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(
      (response) => {
        console.log(response);
        this.user = response;
        console.log(response.followedCharities);
        this.followedCharities = response.followedCharities;
        
      },
      (error) => {
        console.log(error);
      },
      () => console.log('Success getting logged user')
    )
  }

}
