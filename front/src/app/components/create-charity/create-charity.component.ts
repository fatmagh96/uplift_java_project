import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharityDto } from 'src/app/models/CharityDto.model';
import { Address } from 'src/app/models/address.model';
import { Category } from 'src/app/models/category.model';
import { Charity } from 'src/app/models/charity.model';
import { Categories } from 'src/app/models/enums/categories.enum';
import { Cities } from 'src/app/models/enums/cities.enum';
import { CharityService } from 'src/app/services/charity.service';

@Component({
  selector: 'app-create-charity',
  templateUrl: './create-charity.component.html',
  styleUrls: ['./create-charity.component.scss'],
})
export class CreateCharityComponent implements OnInit {


  currentStep: number = 1;
  dto: CharityDto = new CharityDto();
  charity: Charity = new Charity();
  address: Address = new Address();
  category: Category = new Category();
  selectedCategories: string[] = [];


  selectedFiles: File[] = [];

  dropdownSettings = {};
  yearOptions: number[] = [];

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

  citiesList: string[] = Object.keys(Cities).filter(k => typeof Cities[k as any] === 'number')

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

  constructor(private charityService: CharityService) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 50; year--) {
      this.yearOptions.push(year);
    }
  }

  createCharity() {

    this.dto.charity = this.charity;
    this.dto.address = this.address;
    for (let index = 0; index < this.selectedCategories.length; index++) {
      const element = this.selectedCategories[index];
      let newCategory :Category = new Category();
      newCategory.categoryName = element;
      this.dto.categories?.push(newCategory);
    }

    console.log("DTO: ",this.dto);


    // this.charityService.createCharity(this.dto).subscribe(

    //   (response) =>{
    //     console.log(response);
    //   } ,
    //   (error) => {console.log(error)
    //   this.dto.categories = []
    //   },
    //   () => console.log("Success creating charity")

    // );

    const formData: FormData = new FormData();

    // // Add charity and address data
    // formData.append('charity', JSON.stringify(this.charity));
    // formData.append('address', JSON.stringify(this.address));

    // // Add categories data
    // for (let index = 0; index < this.selectedCategories.length; index++) {
    //   const element = this.selectedCategories[index];
    //   let newCategory: Category = new Category();
    //   newCategory.categoryName = element;
    //   formData.append('categories[]', JSON.stringify(newCategory));
    // }

    // Add files
    // Add logo file
    if (this.selectedFiles.length > 0) {
      formData.append('files', this.selectedFiles[0]);
    }
    formData.append("request",new Blob([JSON.stringify(this.dto)], {type: 'application/json'}))
    console.log(formData);

    // Call the service with FormData
    this.charityService.createCharity(formData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        this.dto.categories = [];
      },
      () => console.log('Success creating charity')
    );
  }

  nextStep() {
    console.log('Moving to next step...');
    // Increment the current step if it's less than 3
    if (this.currentStep < 3) {
      this.currentStep++;
    }
    console.log('Current Step:', this.currentStep);
  }

  previousStep() {
    console.log('Moving to previous step...');
    // Decrement the current step if it's greater than 1
    if (this.currentStep > 1) {
      this.currentStep--;
    }
    console.log('Current Step:', this.currentStep);
  }


  onFilesSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files) {
      this.selectedFiles = Array.from(files);
      // Convert FileList to an array
    }
  }
}
