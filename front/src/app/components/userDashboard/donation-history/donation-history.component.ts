// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Donation } from 'src/app/models/donation.model';
// import { User } from 'src/app/models/user.model';
// import { CharityService } from 'src/app/services/charity.service';
// import { DonationService } from 'src/app/services/donation.service';
// import { UserService } from 'src/app/services/user.service';

// @Component({
//   selector: 'app-donation-history',
//   templateUrl: './donation-history.component.html',
//   styleUrls: ['./donation-history.component.scss']
// })
// export class DonationHistoryComponent implements OnInit {

//   user!: User;
//   donations!: Donation[] | undefined;
//   newArray!: any;

//   charity: any = {id:0,name:""};


//   constructor(private userService: UserService, private donationService: DonationService, private charittyService: CharityService){}

//   ngOnInit() {
//     this.userService.getLoggedUser().subscribe(
//       (response) => {
//         console.log(response);
//         this.user = response;
//         console.log(response.donations);
//         this.donations = response.donations;
       
        
//       },
//       (error) => {
//         console.log(error);
//       },
//       () => {console.log('Success getting logged user');
//       this.changeArray();}
//     )
//   }

// //   generateNewRecipient(donation: any) {
// //     // You can customize the logic here to generate the object based on the donation
    
// //     console.log("recipient", donation.recipient);
    
// //     this.charittyService.getCharityById(donation.recipient).subscribe(
// //       (response: any) => {
// //         console.log("response: ",response);
// //         this.charity.id = response.id;
// //         this.charity.name = response.name
// //         console.log("charityyy", this.charity);
        
// //       },
// //       (error) => {
// //         console.log(error);
// //       },
// //       () => console.log('Success getting donation')
// //     )
// //     return {
// //         id: this.charity.id,
// //         name: this.charity.name
// //     };
// // };

// async generateNewRecipient(donation: any) {
//   // You can customize the logic here to generate the object based on the donation
  
//   console.log("recipient", donation.recipient);

//   try {
//       const response: any = await this.charittyService.getCharityById(donation.recipient).toPromise();

//       console.log("response: ", response);
      
//       this.charity.id = response.id;
//       this.charity.name = response.name;

//       console.log("charityyy", this.charity);

//       return {
//           id: this.charity.id,
//           name: this.charity.name
//       };
//   } catch (error) {
//       console.log(error);
//       return "";
//       // Handle the error if needed
//   } finally {
//       console.log('Done getting donation');
//       return "";
//   }
// }


// changeArray(){
//   this.newArray = this.donations?.map(donation => ({
//     ...donation,
//     recipient: this.generateNewRecipient(donation)
//   }));
//   console.log("new Array ",this.newArray);
  
// }

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Donation } from 'src/app/models/donation.model';
import { User } from 'src/app/models/user.model';
import { CharityService } from 'src/app/services/charity.service';
import { DonationService } from 'src/app/services/donation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-donation-history',
  templateUrl: './donation-history.component.html',
  styleUrls: ['./donation-history.component.scss']
})
export class DonationHistoryComponent implements OnInit {

  user!: User;
  donations!: Donation[] | undefined;
  newArray!: any;

  charity: any = { id: 0, name: "" };

  constructor(private userService: UserService, private donationService: DonationService, private charittyService: CharityService) {}

  ngOnInit() {
    this.userService.getLoggedUser().subscribe(
      (response) => {
        console.log(response);
        this.user = response;
        console.log(response.donations);
        this.donations = response.donations;

      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Success getting logged user');
        this.changeArray();
      }
    );
  }

  async generateNewRecipient(donation: any) {
    console.log("recipient", donation.recipient);

    try {
      const response: any = await this.charittyService.getCharityById(donation.recipient).toPromise();
      console.log("response: ", response);

      this.charity.id = response.id;
      this.charity.name = response.name;

      console.log("charityyy", this.charity);

      return {
        id: this.charity.id,
        name: this.charity.name
      };
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async changeArray() {
    // Use Promise.all to wait for all asynchronous operations to complete
    const promises = this.donations?.map(async (donation) => ({
      ...donation,
      recipient: await this.generateNewRecipient(donation)
    }));

    this.newArray = await Promise.all(promises || []);

    console.log("new Array ", this.newArray);
  }
}
