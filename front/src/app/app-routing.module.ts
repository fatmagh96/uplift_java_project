import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HomeEventsComponent } from './components/home-events/home-events.component';

const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'register', component: RegisterComponent},
  {path:'dashboard', component: UserDashboardComponent},
  {path:'test', component: HomeEventsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
