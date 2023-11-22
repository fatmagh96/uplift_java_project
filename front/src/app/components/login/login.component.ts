import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  // user!: User;
  loginUser: User = new User();
  // loginUser!: User;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  submit(){
    this.userService.registerUser(this.user).subscribe(
      (response) =>{
        console.log(response);
        sessionStorage.setItem('user_id', String(response.id))
        this.router.navigateByUrl("/");
        // this.router.navigate();
      } ,
      (error) => console.log(error),
      () => console.log("Done getting users")
    );
    console.log("form submitted", this.user);
  }

  onLogin(){
    this.userService.loginUser(this.loginUser).subscribe(
      (response) =>{
        console.log(response);
        // this.router.navigateByUrl("/test");
        sessionStorage.setItem('user_id', String(response.id));
        this.router.navigateByUrl("/");
        // this.router.navigate();
      } ,
      (error) => console.log(error),
      () => console.log("Done getting users")
      );
    console.log("form submitted", this.user);
  }
}
