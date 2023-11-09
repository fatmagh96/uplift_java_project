import { Component, Input } from '@angular/core';
import { Charity } from 'src/app/models/charity.model';

@Component({
  selector: 'app-charity-card',
  templateUrl: './charity-card.component.html',
  styleUrls: ['./charity-card.component.scss']
})
export class CharityCardComponent {

  @Input() charityData!: Charity[];
}
