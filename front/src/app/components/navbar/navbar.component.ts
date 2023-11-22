import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  user!: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.checkSession();
    // this.userService.getLoggedUser().subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.user = response;   
    //   },
    //   (error) => {
    //     console.log(error);
        
    //   },
    //   () => console.log('Success getting logged user')
    // )
// *********
    this.userService.getLoggedUser().pipe(
      catchError(error => {
        console.log('Error getting logged user:', error);
        // Return a default value or an empty object if there's an error
        return of({});
      })
    ).subscribe(
      (response) => {
        console.log(response);
        this.user = response;   
      },
      () => console.log('Success getting logged user')
    );
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