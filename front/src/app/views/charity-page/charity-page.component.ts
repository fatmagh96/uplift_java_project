import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Charity } from 'src/app/models/charity.model';
import { CharityService } from 'src/app/services/charity.service';

@Component({
  selector: 'app-charity-page',
  templateUrl: './charity-page.component.html',
  styleUrls: ['./charity-page.component.scss']
})
export class CharityPageComponent implements OnInit {

  email= "test@gmail.com";
  charity!: Charity;
  charityId!: string | null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private charityService: CharityService){}

  ngOnInit(): void {
      this.getCharityById();
  }

  getCharityById(){
    this.charityId =  this.route.snapshot.paramMap.get("charityId");
    console.log("charity id from param",this.charityId);
    this.charityService.getCharityById(this.charityId).subscribe(
      (response) =>{
        console.log(response);
        this.charity = response;
      } ,
      (error) => {
        console.log(error)
      },
      () => console.log("Success creating Event!")
    )
    
  }

}
