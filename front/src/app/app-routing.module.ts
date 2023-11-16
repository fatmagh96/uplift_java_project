import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UserDashboardComponent } from './components/user-dashboard-2/user-dashboard.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { CreateCharityComponent } from './components/create-charity/create-charity.component';
import { CharitiesComponent } from './views/charities/charities.component';
import { LoginComponent } from './components/login/login.component';
import { CharityPageComponent } from './views/charity-page/charity-page.component';
import { DashboardUserComponent } from './views/dashboard-user/dashboard-user.component';
import { ProfileInfoComponent } from './components/userDashboard/profile-info/profile-info.component';
import { SavedCharitiesComponent } from './components/userDashboard/saved-charities/saved-charities.component';
import { EventsComponent } from './components/userDashboard/events/events.component';
import { DonationHistoryComponent } from './components/userDashboard/donation-history/donation-history.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { DashboardCharityComponent } from './views/dashboard-charity/dashboard-charity.component';
import { CharityProfileComponent } from './components/charityDashboard/charity-profile/charity-profile.component';
import { CreateEventComponent } from './components/charityDashboard/create-event/create-event.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userdashboard', component: UserDashboardComponent },
  // {path:'test', component: HomepageComponent},
  { path: 'select', component: MultiSelectComponent },
  { path: 'charities', component: CharitiesComponent },
  { path: 'createCharity', component: CreateCharityComponent },
  { path: 'login', component: LoginComponent },
  { path: 'charity/:charityId', component: CharityPageComponent },
  {
    path: 'dashboard', component: DashboardUserComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileInfoComponent },
      { path: 'charities', component: SavedCharitiesComponent },
      { path: 'events', component: EventsComponent },
      { path: 'donations', component: DonationHistoryComponent },

    ]
  },
  {
    path: 'charityDash', component: DashboardCharityComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: CharityProfileComponent },
      { path: 'createEvent', component: CreateEventComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
