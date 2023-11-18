import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {
  router: any;
  user!: any;

  constructor(private userService: UserService,) {}

  ngOnInit() {
    // Assume you fetch user data from a service or API
    this.user = {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      // ... other user properties
    };
  }

  logout() {
    this.userService.logoutUser().subscribe(
      (response: any) => {
        console.log(response);
        // Clear the 'user_id' session item
        sessionStorage.removeItem('user_id');
        // sessionStorage.clear();
        // this.isLoggedIn = false;
        this.router.navigateByUrl('/login'); 
      },
      (error: any) => {
        console.log('Error logging out:', error);
      }
    );
  }
}
