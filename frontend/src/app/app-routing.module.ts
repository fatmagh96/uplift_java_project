import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { NavComponent } from './components/nav/nav.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  {path:"",component:LandingPageComponent},
  {path:"test",component:TestComponentComponent},
  {path:"nav",component:NavComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 