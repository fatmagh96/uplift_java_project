import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interface/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {

  constructor(
    private userService: UserService, 
    private http: HttpClient
    ){}

  ngOnInit(): void {
    this.onGetUsers();
  }
  
  onGetUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log("Done getting users")
      )
    }
    
  submit(login: any){
    this.http.post(`http://localhost:8080/api/register`, login)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log("Done creating user")
      )
    console.log("form submitted", login);
    
  }
}
