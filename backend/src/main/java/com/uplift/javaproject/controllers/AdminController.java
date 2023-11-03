package com.uplift.javaproject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uplift.javaproject.models.Charity;
import com.uplift.javaproject.models.enums.CharityStatus;
import com.uplift.javaproject.services.CharityService;
import com.uplift.javaproject.services.UserService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class AdminController {
	
	@Autowired
	private CharityService charityServ;
	
	@PutMapping("/acceptCharity/{charityId}")
	public ResponseEntity<?> acceptCharity(@PathVariable("charityId") Long charityId) {
		Charity c = charityServ.findCharityById(charityId);
		CharityStatus acceptedStatus = CharityStatus.ACCEPTED;
		c.setStatus(acceptedStatus);
		charityServ.updateCharity(c);
		
		return ResponseEntity.ok("charity accepted!");
	}
	
	@PutMapping("/declineCharity/{charityId}")
	public ResponseEntity<?> declineCharity(@PathVariable("charityId") Long charityId) {
		Charity c = charityServ.findCharityById(charityId);
		CharityStatus declinedStatus = CharityStatus.DECLINED;
		c.setStatus(declinedStatus);
		charityServ.updateCharity(c);
		
		return ResponseEntity.ok("charity declined!");
	}
}
