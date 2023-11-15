import { Component, OnInit } from '@angular/core';
import { Charity } from 'src/app/models/charity.model';
import { Cities } from 'src/app/models/enums/cities.enum';
import { CharityService } from 'src/app/services/charity.service';

@Component({
  selector: 'app-charities',
  templateUrl: './charities.component.html',
  styleUrls: ['./charities.component.scss']
})
export class CharitiesComponent implements OnInit {

  charities!: Charity[];

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  category: string = "all";
  // tableSizes: any = [3, 6, 9, 12];

  filteredCharities: any[] = [];
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
  ngOnInit(): void {
    // this.onGetCharities();
    this.charityService.getAllCharities().subscribe(
      (response) => {
        console.log(response);
        this.charities = response;
        this.filteredCharities = response;
      },
      (error) => console.log(error),
      () => console.log("Done getting charities")
    )
  }


  constructor(private charityService: CharityService) { }

  filterCharitiesByCategory(charities: Charity[], categoryName: string): Charity[] {
    return charities.filter(charity =>
      charity.categories?.some(category => category.categoryName?.toString() === categoryName)
    );
  }

  filterCharitiesByCity(charities: Charity[], city: string): Charity[] {
    return charities.filter(charity =>
      charity.address?.city?.toString() === city
    );
  }

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

  // filterByCategory(event: any) {
  //   console.log(event.target.value);
  //   this.category = event.target.value;
  //   // this.charityService.getAllCharitiesByCategory(category).subscribe(
  //   this.charityService.getAllCharities().subscribe(
  //     (response) => {
  //       console.log(response);
  //       console.log("files:", this.charities);

  //       if (this.category == "all") {
  //         this.charities = response;
  //         this.filteredCharities = response;
  //       }
  //       else {
  //         const filteredCharities = this.filterCharitiesByCategory(response, this.category);
  //         this.charities = filteredCharities;
  //         this.filteredCharities = filteredCharities;
  //       }
  //     },
  //     (error) => console.log(error),
  //     () => console.log("Done getting charities")
  //   );
  // }

  filterByCategory(event: any) {
    console.log(event.target.value);
    this.category = event.target.value;
    if (this.category == "all") {
      // this.charities = response;
      this.filteredCharities = this.charities;
    }
    else {
      const filteredCharities = this.filterCharitiesByCategory(this.filteredCharities, this.category);
      // this.charities = filteredCharities;
      this.filteredCharities = filteredCharities;
    }
  }

  // filterByCity(event: any) {
  //   console.log(event.target.value);
  //   const city = event.target.value;
  //   // this.charityService.getAllCharitiesByCategory(category).subscribe(
  //   this.charityService.getAllCharities().subscribe(
  //     (response) => {
  //       console.log(response);
  //       if (city == "all") {
  //         this.charities = response;
  //         this.filteredCharities = response;
  //       }
  //       else {
  //         const filteredCharities = this.filterCharitiesByCity(response, city);
  //         this.charities = filteredCharities;
  //         this.filteredCharities = filteredCharities;
  //       }
  //     },
  //     (error) => console.log(error),
  //     () => console.log("Done getting charities")
  //   );
  // }

  filterByCity(event: any) {
    console.log(event.target.value);
    const city = event.target.value;

        if (city == "all") {
          // this.charities = response;
          this.filteredCharities = this.charities;
        }
        else {
          const filteredCharities = this.filterCharitiesByCity(this.filteredCharities, city);
          // this.charities = filteredCharities;
          this.filteredCharities = filteredCharities;
        }
    
  }

  //filter by charity name 

  filterData() {
    // console.log("testetstetste");
    console.log(this.filterText);

    if (this.filterText) {
      this.filteredCharities = this.charities.filter((charity) => {
        // Customize the condition based on your filtering criteria
        const charityName = `${charity.name}`;
        // console.log("here:", this.charities.filter(charity=>charityName.toLowerCase().includes(this.filterText.toLowerCase())));

        return charityName.toLowerCase().includes(this.filterText.toLowerCase());
      });
    }
    else {
      this.filteredCharities = this.charities; // If the input is empty, display all data
    }

    console.log(this.filteredCharities);

  }


  onTableDataChange(event: any) {
    this.page = event;
    this.onGetCharities();
  }
}
