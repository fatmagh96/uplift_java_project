import { Component, OnInit } from '@angular/core';
import { Charity } from 'src/app/models/charity.model';
import { CharityService } from 'src/app/services/charity.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{

  allCharities!: Charity[];
  listOfThreeCharities!: Charity[];

  ngOnInit(): void {
     this.getCharities();
      
      
  }

  constructor(private charityService: CharityService){}

  getCharities(){
    this.charityService.getAllCharities().subscribe(
      (response) => {
        console.log(response);
        this.allCharities = response;
        this.listOfThreeCharities = this.allCharities?.splice(-3);
        console.log(this.listOfThreeCharities);
        
      },
      (error) => console.log(error),
      () => console.log("Done getting charities")
    );
  }
  
}
