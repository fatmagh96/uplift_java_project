import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateCharityComponent } from './components/create-charity/create-charity.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HomeEventsComponent } from './components/home-events/home-events.component';
import { CardComponent } from './components/card/card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeCharitiesComponent } from './components/home-charities/home-charities.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GoalsComponent } from './components/goals/goals.component';
import { CharitiesComponent } from './views/charities/charities.component';
import { CharitiesHeaderComponent } from './components/charities/charities-header/charities-header.component';
import { LoginComponent } from './components/login/login.component';
import { CharityCardComponent } from './components/charities/charity-card/charity-card.component';
import { CharityPageComponent } from './views/charity-page/charity-page.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    RegisterComponent,
    CreateCharityComponent,
    UserDashboardComponent,
    HomeEventsComponent,
    CardComponent,
    NavbarComponent,
    HomeCharitiesComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    GoalsComponent,
    CharitiesComponent,
    CharitiesHeaderComponent,
    LoginComponent,
    CharityCardComponent,
    CharityPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
