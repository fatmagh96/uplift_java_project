package com.uplift.javaproject.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.uplift.javaproject.models.Charity;
import com.uplift.javaproject.models.Donation;
import com.uplift.javaproject.models.User;
import com.uplift.javaproject.services.CharityService;
import com.uplift.javaproject.services.DonationService;
import com.uplift.javaproject.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class DonationController {


	@Value("${stripe.apikey}")
	String stripekey;
	
	@Autowired
	private UserService userServ;
	@Autowired
	private DonationService donationServe;
	@Autowired
	private CharityService charityServe;
	
	@GetMapping("/donations")
	public ResponseEntity<Object> allDonations() {
		return ResponseEntity.ok().body(donationServe.getAllDonations());
	}
	
	@GetMapping("/donations/{donationId}")
	public ResponseEntity<Object> getDonationById(@PathVariable Long donationId) {
		return ResponseEntity.ok().body(donationServe.findDonationById(donationId));
	}
	
	
	@PostMapping("/donation/{charityId}")
	public ResponseEntity<?> makeDonation(@Valid @RequestBody Double value,
			@PathVariable Long charityId, 
			HttpSession session) throws StripeException {
	    try {
	        Stripe.apiKey = stripekey;
	        
	        // Retrieve user ID from the session
	        Long userId = (Long) session.getAttribute("user_id");
	        if (userId == null) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
	        }
	        User user = userServ.findUserById(userId);
	        if (user == null) {
	        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	        }
	        Charity charity = charityServe.findCharityById(charityId);

	        SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
	        		.setPriceData(
	        				SessionCreateParams.LineItem.PriceData.builder()
	        				.setCurrency("usd")
	        				.setUnitAmount((long) (value * 100))
	        				.setProductData(
	        						SessionCreateParams.LineItem.PriceData.ProductData.builder()
	        						.setName(user.getFirstName())
	        						.build()
	        						)
	        				.build()
	        				)
	        		.setQuantity(1L)
	        		.build();
	        
	        SessionCreateParams params = SessionCreateParams.builder()
	        		.addLineItem(lineItem)
	        		.setMode(SessionCreateParams.Mode.PAYMENT)
	        		.setSuccessUrl("http://localhost:4200/success")
	        		.setCancelUrl("https://example.com/cancel")
	        		.setConsentCollection(
	        			      SessionCreateParams.ConsentCollection.builder()
	        			        .setTermsOfService(SessionCreateParams.ConsentCollection.TermsOfService.REQUIRED)
	        			        .build()
	        			    )
	        			    .setCustomText(
	        			      SessionCreateParams.CustomText.builder()
	        			        .setTermsOfServiceAcceptance(
	        			          SessionCreateParams.CustomText.TermsOfServiceAcceptance.builder()
	        			            .setMessage("I agree to the Terms of Service")
	        			            .build()
	        			        )
	        			        .build()
	        			        )
	        		.build();
	        
	        Session stripeSession = Session.create(params);

	        // Find the user by ID
	       

	        // Find existing donation or create a new one
//	        Donation newDonation = donationServe.findOne(user);
//	        if (newDonation == null) {
//	            newDonation = new Donation();
//	        }
	        
	        Donation newDonation = new Donation();

	        // Create a Stripe Session

	        // Set the donation amount and save
	        newDonation.setAmount(value);
	        newDonation.setDonor(user);
	        newDonation.setRecipient(charity);
	        donationServe.makeDonation(newDonation); // Assuming a new method in DonationService for saving or updating a donation
	        Map<String, String> response = new HashMap<>();
	        response.put("sessionId", stripeSession.getId());
	        return ResponseEntity.ok(response);

	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing donation");
	    }
	}

	
}