import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-test-donation',
  templateUrl: './test-donation.component.html',
  styleUrls: ['./test-donation.component.scss']
})
export class TestDonationComponent {
amount: any;


  constructor(private donationService : DonationService){

  }

  makeDonation(){

    
    this.donationService.makeDonation(this.amount, 3).subscribe({
      next: async (response) => {
        // Load the Stripe.js library
        const stripe = await loadStripe('pk_test_51OD2cRKDCE1r65sMLGSO5UGeP2Y5OhTkurjvW66sxtcveUGG1Tr1qezaUqdTCz2glgb12zOg6LOibxNQvH9oYLIL00V57s61xh');
        const sessionId = response.sessionId;
        if (stripe) {
          // Redirect to Stripe Checkout
          stripe.redirectToCheckout({ sessionId });
        } else {
          console.error('Stripe.js failed to load');
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      }

    });
  }
}