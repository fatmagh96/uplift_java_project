import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  user!: User;
  

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(
      (response) => {
        console.log(response);
        this.user = response;
        this.user.password = "";
      },
      (error) => {
        console.log(error);
      },
      () => console.log('Success getting logged user')
    )
  }

  onSumbit(){
    this.userService.updateUser(this.user).subscribe(
      (response) => {
        console.log(response);
        alert("User Successfully Updated!!")
      },
      (error) => {
        console.log(error);
      },
      () => console.log('Success updating user')
    )
  }

  onChangePassword(){
    console.log("aaaaaaaaaaaa", this.user);
    
    this.userService.changePassword(this.user).subscribe(
      (response) => {
        console.log(response);
        alert("Password Changed!")
      },
      (error) => {
        console.log(error);
      },
      () => console.log('Success changing password')
    )
  }
}
