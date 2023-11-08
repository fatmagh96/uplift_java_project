import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HomeEventsComponent } from './components/home-events/home-events.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { CreateCharityComponent } from './components/create-charity/create-charity.component';

const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'register', component: RegisterComponent},
  {path:'dashboard', component: UserDashboardComponent},
  {path:'test', component: HomepageComponent},
  {path:'createCharity', component: CreateCharityComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
