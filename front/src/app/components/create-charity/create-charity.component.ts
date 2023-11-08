import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address.model';
import { Category } from 'src/app/models/category.model';
import { Charity } from 'src/app/models/charity.model';
import { Categories } from 'src/app/models/enums/categories.enum';
import { CharityService } from 'src/app/services/charity.service';

@Component({
  selector: 'app-create-charity',
  templateUrl: './create-charity.component.html',
  styleUrls: ['./create-charity.component.scss']
})
export class CreateCharityComponent  {
  // charityForm!: FormGroup;
  // categoriesEnum =  Categories;
  charityForm: Charity = new Charity();
  address: Address = new Address();
  category: Category = new Category();

  jsonData!: string;


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

  constructor(private charityService: CharityService ) { 
    this.jsonData= JSON.stringify({"charity":this.charityForm,"address":this.address,"categories":[this.category]});
  }
  

  // ngOnInit(): void {
  //   this.charityForm = this.fb.group({
  //     name: ['', Validators.required],
  //     rib: ['', Validators.required],
  //     phone: ['', Validators.required],
  //     description: ['', Validators.required],
  //     logo: [''],
  //     foundationYear: ['', Validators.required],
  //     numJort: ['', Validators.required],
  //     // status: ['', Validators.required],
  //     // founder: ['', Validators.required],
  //     address: this.fb.group({
  //       // Define address fields here
  //       street: [''],
  //       city: [''],
  //       // Add more fields as needed
  //     }),
  //     categories: this.fb.array([]), // Assuming categories is an array
  //   });
  // }

  // onSubmit() {
  //   if (this.charityForm.valid) {
  //     const newCharity: Charity = this.charityForm.value as Charity;
  //     // Perform logic to save the charity data, e.g., send to a backend service
  //     console.log(newCharity);
  //   }
  // }


  //   // Helper method to get enum keys
  //   getEnumKeys(enumObj: any): string[] {
  //     return Object.keys(enumObj).filter(key => isNaN(Number(enumObj[key])));
  //   }

  // onCreate(){
  //   console.log(this.charityForm);
  //   console.log(this.address);
  //   console.log(this.category);

  //   console.log("big json:", {"charity":this.charityForm,"address":this.address,"categories":[this.category]});
    
  //   const data = {"charity":this.charityForm,"address":this.address,"categories":[this.category]};
    
  //   this.charityService.createCharity(data).subscribe(

  //     (response) =>{
  //       console.log(response);
  //       // sessionStorage.setItem('user_id', String(response.id))
        
  //       // this.router.navigate();
  //     } ,
  //     (error) => console.log(error),
  //     () => console.log("Done creating charity")

  //   );

  // }

  onCreate(charityData: any){

    console.log(charityData);

    console.log(charityData.city);
    
    const json = {
      "charity": {
        "name": charityData.name,
        "rib": charityData.rib,
        "phone": charityData.phone,
        "description": charityData.description,
        "logo": charityData.logo,
        "foundationYear": charityData.foundationYear,
        "numJort": charityData.numJort,
      },
      "address": {
        "street": charityData.street,
        "city": charityData.city,  // Replace with the actual city name
        "zipCode": charityData.zipCode
      },
      // "categories": [
      //   {
      //     "categoryName": charityData.categoryName
      //   }
      // ]
      "categories": charityData.categoryName?.map((category: any)=>({"categoryName":category}))
      // "categories": charityData.categories.map((categoryName: any) => ({ "categoryName":categoryName }))
      // "categories": charityData.categories ? charityData.categories.map((categoryName: any) => ({ "categoryName": categoryName})) : []
  }
  console.log(json);
  
  const postman = {
    "charity": {
      "name": "new 16 Charity",
      "rib": "123456789",
      "phone": "555-1234",
      "description": "A test charity",
      "logo": "charity_logo.png",
      "foundationYear": 2020,
      "numJort": "ABC123",
      "status": "PENDING"
    },
    "address": {
      "street": "123 Main St",
      "city": "Sousse",  // Replace with the actual city name
      "zipCode": "12345"
    },
    "categories": [
      {
        "categoryName": "POVERTY_ALLEVIATION"
      },
      {
        "categoryName": "DISASTER_RELIEF"
      }
      // Add more categories as needed
    ]
  }

    
    this.charityService.createCharity(json).subscribe(

      (response) =>{
        console.log(response);
        // sessionStorage.setItem('user_id', String(response.id))
        
        // this.router.navigate();
      } ,
      (error) => console.log(error),
      () => console.log("Done creating charity")

    );

  }
}