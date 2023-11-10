import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { CreateCharityComponent } from './components/create-charity/create-charity.component';
import { CharitiesComponent } from './views/charities/charities.component';
import { LoginComponent } from './components/login/login.component';
import { CharityPageComponent } from './views/charity-page/charity-page.component';

const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'register', component: RegisterComponent},
  {path:'dashboard', component: UserDashboardComponent},
  {path:'test', component: HomepageComponent},
  {path:'charities', component: CharitiesComponent},
  {path:'createCharity', component: CreateCharityComponent},
  {path:'login', component: LoginComponent},
  {path:'charitypage', component: CharityPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
