import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  {path:"test",component:TestComponentComponent},
  {path:"nav",component:NavComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 