import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharityDto } from 'src/app/models/CharityDto.model';
import { Address } from 'src/app/models/address.model';
import { Category } from 'src/app/models/category.model';
import { Charity } from 'src/app/models/charity.model';
import { Cities } from 'src/app/models/enums/cities.enum';
import { CharityService } from 'src/app/services/charity.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-charity',
  templateUrl: './edit-charity.component.html',
  styleUrls: ['./edit-charity.component.scss']
})
export class EditCharityComponent implements OnInit{

  charity: Charity | undefined;


  dto: CharityDto = new CharityDto();
  myCharity: Charity = new Charity();
  address: Address| undefined;
  // category: Category = new Category();

  citiesList: string[] = Object.keys(Cities).filter(k => typeof Cities[k as any] === 'number')

  constructor(
    private charityService: CharityService,
    private router: Router,
    private userService: UserService,
    ){}

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(
      (response) => {
        console.log(response);
        this.charity = response.charity;
        this.address = response.charity?.address;
      },
      (error) => console.log(error),
      () => console.log("Done getting Charity")
    )

  }

  editCharity(){
    this.dto.charity = this.charity;
    this.dto.address = this.address;
    // for (let index = 0; index < this.selectedCategories.length; index++) {
    //   const element = this.selectedCategories[index];
    //   let newCategory :Category = new Category();
    //   newCategory.categoryName = element;
    //   this.dto.categories?.push(newCategory);
    // }

    console.log("DTO: ",this.dto);



    // const formData: FormData = new FormData();


    // Add files
    // Add logo file
    // if (this.selectedFiles.length > 0) {
    //   formData.append('files', this.selectedFiles[0]);
    // }
    // formData.append("request",new Blob([JSON.stringify(this.dto)], {type: 'application/json'}))
    // console.log(formData);

    // Call the service with FormData
    this.charityService.updateCharity(this.charity!.id?.toString(), this.dto).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl("/charityDash");
      },
      (error) => {
        console.log(error);
        // this.dto.categories = [];
      },
      () => console.log('Success creating charity')
    );


  }
}
