import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Donation } from 'src/app/models/donation.model';
import { User } from 'src/app/models/user.model';
import { DonationService } from 'src/app/services/donation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-charity-donations',
  templateUrl: './charity-donations.component.html',
  styleUrls: ['./charity-donations.component.scss']
})
export class CharityDonationsComponent implements OnInit {

  donationsReceived!: any[] | undefined;
  donationsList!: Donation[] | undefined;


  constructor(
    private userService: UserService,
    private donationService: DonationService
  ) {}


  // ngOnInit() {
  //   this.userService.getLoggedUser().subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.donationsReceived = response.charity?.donationsReceived;
  //       console.log("Donations", this.donationsReceived);
  //       this.function();
  //       console.log("dzbehfbzjefbzbe",this.donationsList);
        
        
  //     },
  //     (error) => console.log(error),
  //     () => console.log("Done getting Charity")
  //   )


  // }

  // function(){
  //   const id = this.donationsReceived?.at(0);
  //   if(this.donationsReceived !== undefined){
  //     for(let i =0;i<this.donationsReceived?.length;i++){
        
  //       this.donationService.getDonationtById( this.donationsReceived?.at(i)).subscribe(
  //         (response) => {
  //           console.log("response",response);
  //           this.donationsList?.push(response);
  //           // this.donationsReceived = response.charity?.donationsReceived;
  //           // console.log("Donations", this.donationsReceived);
            
  //         },
  //         (error) => console.log(error),
  //         () => console.log("Done getting Charity")
  //       )
  //     }

  //   }


  // }

  async ngOnInit() {
    try {
      const response = await this.userService.getLoggedUser().toPromise();
      console.log(response);
      this.donationsReceived = response?.charity?.donationsReceived;
      console.log("Donations", this.donationsReceived);
      await this.function();
      console.log("dzbehfbzjefbzbe", this.donationsList);
      console.log("Done getting Charity");
    } catch (error) {
      console.log(error);
    }
  }
  
  async function() {
    if (this.donationsReceived !== undefined) {
      const promises = this.donationsReceived.map(async (id) => {
        const response = await this.donationService.getDonationtById(id).toPromise();
        console.log("response", response);
        this.donationsList = this.donationsList || [];  // Initialize if undefined
        this.donationsList.push(response);
      });
  
      await Promise.all(promises);
    }
  }
  
  

}