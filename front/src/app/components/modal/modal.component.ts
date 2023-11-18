import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{

  amount:  any;

  title: string | null = null;

  constructor(public modalRef: MdbModalRef<ModalComponent>, private donationService: DonationService) {}
  ngOnInit(): void {
    
    console.log(this.title, "fdvshvhsd");
  }
  testClick(): void {
    alert('Button inside the modal clicked!');
  }

  onSubmit(){
    console.log(this.amount,"hello");
    
    
    
    this.donationService.makeDonation(this.amount).subscribe({
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
