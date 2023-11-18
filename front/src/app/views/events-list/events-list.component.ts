import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event.model';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  events!: Event[];

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  category: string = "all";
  city: string = "all";
  // tableSizes: any = [3, 6, 9, 12];

  filteredEvents: any[] = [];
  filterText: string = '';

  causeTypes: string[] = [
    'HEALTHCARE',
    'EDUCATION',
    'POVERTY_ALLEVIATION',
    'ENVIRONMENT',
    'ANIMAL_WELFARE',
    'CHILD_WELFARE',
    'DISASTER_RELIEF',
    'ARTS_AND_CULTURE',
    'HUMAN_RIGHTS',
    'COMMUNITY_DEVELOPMENT',
    'ELDERLY_SUPPORT',
    'FOOD_SECURITY',
    'WOMEN_EMPOWERMENT',
    'YOUTH_PROGRAMS',
    'HOUSING',
    'RELIGIOUS',
    'LGBTQ_RIGHTS'
  ];

  cities: string[] = [
    "Tunis",
    "Ariana",
    "Ben_Arous",
    "Manouba",
    "Nabeul",
    "Zaghouan",
    "Bizerte",
    "Béja",
    "Jendouba",
    "Le_Kef",
    "Siliana",
    "Sousse",
    "Monastir",
    "Mahdia",
    "Sfax",
    "Kairouan",
    "Kasserine",
    "Sidi_Bouzid",
    "Gabès",
    "Medenine",
    "Tataouine",
    "Tozeur",
    "Gafsa",
    "Kebili",
  ];


  constructor(private eventService: EventService) { }


  ngOnInit(): void {
    this.onGetEvents();
  }
  
  filterEventsByCategory(events: Event[], categoryName: string): Event[] {
    return events.filter(event =>
      event.categories?.some(category => category.categoryName?.toString() === categoryName)
    );
  }

  filterEventsByCity(events: Event[], city: string): Event[] {
    return events.filter(event =>
      event.address?.city?.toString() === city
    );
  }

  onGetEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (response) => {
        console.log(response);
        this.events = response;
        this.filteredEvents = response;
      },
      (error) => console.log(error),
      () => console.log("Done getting events")
    )
  }


  filterByCategoryAndCity(category: string, city: string) {
    if (category === 'all' && city === 'all') {
      this.filteredEvents = this.events; // Show all events when both filters are 'all'
    } else {
      let filteredEvents = this.events;
  
      if (category !== 'all') {
        filteredEvents = this.filterEventsByCategory(filteredEvents, category);
      }
  
      if (city !== 'all') {
        filteredEvents = this.filterEventsByCity(filteredEvents, city);
      }
  
      this.filteredEvents = filteredEvents;
    }
  }
  
  filterByCategory(event: any) {
    console.log(event.target.value);
    this.category = event.target.value;
    this.filterByCategoryAndCity(this.category, this.city);
  }
  
  filterByCity(event: any) {
    console.log(event.target.value);
    this.city = event.target.value;
    this.filterByCategoryAndCity(this.category, this.city);
  }

  //filter by event name 

  filterData() {
    // console.log("testetstetste");
    console.log(this.filterText);

    if (this.filterText) {
      this.filteredEvents = this.events.filter((event) => {
        // Customize the condition based on your filtering criteria
        const title = `${event.title}`;
        // console.log("here:", this.events.filter(event=>title.toLowerCase().includes(this.filterText.toLowerCase())));

        return title.toLowerCase().includes(this.filterText.toLowerCase());
      });
    }
    else {
      this.filteredEvents = this.events; // If the input is empty, display all data
    }

    console.log(this.filteredEvents);

  }


  onTableDataChange(event: any) {
    this.page = event;
    this.onGetEvents();
  }
}

