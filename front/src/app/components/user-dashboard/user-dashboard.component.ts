import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {

  user!: User;

  constructor(
    private userService: UserService, 
    private http: HttpClient
    ){}

  ngOnInit(): void {
    this.onGetLoggedUser();
  }
  
  onGetUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log("Done getting users")
      )
    }


  onGetLoggedUser(): void {
    this.userService.getLoggedUser().subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log("Done getting users")
      )
  }
}
