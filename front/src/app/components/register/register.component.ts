import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{


  user: User = new User();
  
  constructor(
    private userService: UserService, 
    private http: HttpClient,
    private router: Router
    ){}

  ngOnInit(): void {
  
  }

  submit(){
    this.userService.registerUser(this.user).subscribe(
      (response) =>{
        console.log(response);
        this.router.navigateByUrl("/dashboard");
        // this.router.navigate();
      } ,
      (error) => console.log(error),
      () => console.log("Done getting users")
    );
    console.log("form submitted", this.user);
  }

}
