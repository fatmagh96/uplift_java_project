import { Component, Input, OnInit } from '@angular/core';
import { Charity } from 'src/app/models/charity.model';

@Component({
  selector: 'app-home-charities',
  templateUrl: './home-charities.component.html',
  styleUrls: ['./home-charities.component.scss']
})
export class HomeCharitiesComponent implements OnInit{

  @Input() charities!: Charity[];

  yourText: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed veniam repudiandae ipsam aliquam, molestias asperiores dicta velit. \n Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis laborum, mollitia, eius rerum nemo consequuntur non tempora, distinctio temporibus quae facilis ratione aspernatur quisquam pariatur itaque velit maiores dolore iusto? \nLorem ipsum dolor sit amet consectetur adipisicing elit. Quae similique sint architecto pariatur distinctio inventore voluptate iusto quidem! Illum, cupiditate! Tempora ut, perferendis totam voluptatibus magnam consectetur mollitia quas id.";

  constructor(){
    console.log("from homepage: ", this.charities)
    
    
  }
  ngOnInit(): void {
    console.log("from homepage: ", this.charities);
  }

}
