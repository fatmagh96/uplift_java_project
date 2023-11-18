import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateCharityComponent } from './components/create-charity/create-charity.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './components/user-dashboard-2/user-dashboard.component';
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
import { DashboardUserComponent } from './views/dashboard-user/dashboard-user.component';
import { ProfileInfoComponent } from './components/userDashboard/profile-info/profile-info.component';
import { SavedCharitiesComponent } from './components/userDashboard/saved-charities/saved-charities.component';
import { EventsComponent } from './components/userDashboard/events/events.component';
import { DonationHistoryComponent } from './components/userDashboard/donation-history/donation-history.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DashboardCharityComponent } from './views/dashboard-charity/dashboard-charity.component';
import { CharityProfileComponent } from './components/charityDashboard/charity-profile/charity-profile.component';
import { CharityEventsComponent } from './components/charityDashboard/charity-events/charity-events.component';
import { CharityDonationsComponent } from './components/charityDashboard/charity-donations/charity-donations.component';
import { CreateEventComponent } from './components/charityDashboard/create-event/create-event.component';
import { TestDonationComponent } from './components/test-donation/test-donation.component';
import { ModalComponent } from './components/modal/modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { EventPageComponent } from './views/event-page/event-page.component';
import { EventsListComponent } from './views/events-list/events-list.component';
import { EventCardComponent } from './components/eventsList/event-card/event-card.component';

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
    DashboardUserComponent,
    ProfileInfoComponent,
    SavedCharitiesComponent,
    EventsComponent,
    DonationHistoryComponent,
    MultiSelectComponent,
    DashboardCharityComponent,
    CharityProfileComponent,
    CharityEventsComponent,
    CharityDonationsComponent,
    CreateEventComponent,
    TestDonationComponent,
    ModalComponent,
    EventPageComponent,
    EventsListComponent,
    EventCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    MdbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
