import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent {
  router: any;

  constructor(private userService: UserService,) {}

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
