import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.checkSession();
  }

  checkSession() {
    if (sessionStorage.getItem('user_id')) {
      this.isLoggedIn = true;
    } 
    console.log('isLoggedIn:', this.isLoggedIn);
    this.cdr.markForCheck();
  }

  logout() {
    this.userService.logoutUser().subscribe(
      (response: any) => {
        console.log(response);
        // Clear the 'user_id' session item
        sessionStorage.removeItem('user_id');
        // sessionStorage.clear();
        this.isLoggedIn = false;
        this.router.navigateByUrl('/login'); 
      },
      (error: any) => {
        console.log('Error logging out:', error);
      }
    );
  }
}