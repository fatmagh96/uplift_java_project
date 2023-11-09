import { Component, OnInit } from '@angular/core';
import { Charity } from 'src/app/models/charity.model';
import { CharityService } from 'src/app/services/charity.service';

@Component({
  selector: 'app-charities',
  templateUrl: './charities.component.html',
  styleUrls: ['./charities.component.scss']
})
export class CharitiesComponent implements OnInit{

  charities!: Charity[];

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
}
