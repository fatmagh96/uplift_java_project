import { Component, OnInit } from '@angular/core';
import { Charity } from 'src/app/models/charity.model';
import { Cities } from 'src/app/models/enums/cities.enum';
import { CharityService } from 'src/app/services/charity.service';

@Component({
  selector: 'app-charities',
  templateUrl: './charities.component.html',
  styleUrls: ['./charities.component.scss']
})
export class CharitiesComponent implements OnInit{

  charities!: Charity[];

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  // tableSizes: any = [3, 6, 9, 12];

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
  ngOnInit(): void {
    this.onGetCharities();
  }
  
  
  constructor(private charityService: CharityService){}

  
  onGetCharities(): void {
    this.charityService.getAllCharities().subscribe(
      (response) => {
        console.log(response);
        this.charities = response;
      },
      (error) => console.log(error),
      () => console.log("Done getting charities")
    )
  }

  filterByCategory(event: any){
    console.log(event.target.value);
    
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.onGetCharities();
  }
}
