import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/Event.model';
import { EventDto } from 'src/app/models/EventDto.model';
import { Address } from 'src/app/models/address.model';
import { Category } from 'src/app/models/category.model';
import { Cities } from 'src/app/models/enums/cities.enum';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  dto: EventDto = new EventDto();
  event: Event = new Event();
  address: Address = new Address();
  category: Category = new Category();  

  selectedCategories: string[] = [];

  citiesList: string[] = Object.keys(Cities).filter(k => typeof Cities[k as any] === 'number')


  dropdownSettings = {};

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

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection: 2
    };
  }

  constructor(private eventService: EventService,
    private router: Router){
  }


  createEvent(){
    this.dto.event = this.event;
    this.dto.address = this.address;
    for (let index = 0; index < this.selectedCategories.length; index++) {
      const element = this.selectedCategories[index];
      let newCategory :Category = new Category();
      newCategory.categoryName = element;
      this.dto.categories?.push(newCategory);
    }

    this.eventService.createEvent(this.dto).subscribe(
      (response) =>{
        console.log(response);
        this.router.navigateByUrl("/charityDash/events")
      } ,
      (error) => {console.log(error)
      this.dto.categories = []
      },
      () => console.log("Success creating Event!")
    )

  }
}
