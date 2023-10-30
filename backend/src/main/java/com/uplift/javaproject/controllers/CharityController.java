package com.uplift.javaproject.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uplift.javaproject.models.Address;
import com.uplift.javaproject.models.Category;
import com.uplift.javaproject.models.Charity;
import com.uplift.javaproject.models.CharityAndAddressAndCategoriesRequest;
import com.uplift.javaproject.models.User;
import com.uplift.javaproject.services.AddressService;
import com.uplift.javaproject.services.CategoryService;
import com.uplift.javaproject.services.CharityService;
import com.uplift.javaproject.services.UserService;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class CharityController {
	
	// this is a testtt

	@Autowired
	private CharityService charityServ;
	
	@Autowired
	private AddressService addressServ;
	
	@Autowired
	private CategoryService categoryServ;
	
	@Autowired
	private UserService userServ;
	
//	@Autowired
//	private RoleRepository roleRep;
	
	
	@GetMapping("/charities")
	public ResponseEntity<Object> allCharities(){
		return ResponseEntity.ok().body(charityServ.allCharities());
	} 
	
	
	@GetMapping("/charities/test")
	public List<Charity> getAll(){
		return charityServ.allCharities();
	}
	
//	@PostMapping("/charities/new")
//	public ResponseEntity<Object> createCharity(@Valid @RequestBody CharityAndAddressAndCategoriesRequest request, BindingResult result) {
//	    // Check for validation errors
//	    if (result.hasErrors()) {
//	        System.out.println(result.getAllErrors());
//	        return ResponseEntity.status(400).body(result.getAllErrors());
//	    }
//
//	    // Extract charity, address, and category information from the request
//	    Charity charity = request.getCharity();
//	    Address address = request.getAddress();
//	    List<Category> categories = request.getCategories();
//
//	    //meeee
//	    Address savedAddress = addressServ.createAddress(address);
//	    
//	    
//	    // Set the Address and Categories to the Charity instance
//	    charity.setAddress(savedAddress);
//	    charity.setCategories(categories);
//
//	    // Save the Charity instance using your service
//	    Charity savedCharity = charityServ.createCharity(charity);
//
//	    return new ResponseEntity<>(savedCharity, HttpStatus.OK);
//	}
	
	@PostMapping("/charities/new")
	public ResponseEntity<Object> createCharity(@Valid @RequestBody CharityAndAddressAndCategoriesRequest request, BindingResult result) {
	    // Check for validation errors
	    if (result.hasErrors()) {
	        System.out.println(result.getAllErrors());
	        return ResponseEntity.status(400).body(result.getAllErrors());
	    }

	    // Extract charity, address, and category information from the request
	    Charity charity = request.getCharity();
	    Address address = request.getAddress();
	    List<Category> categories = request.getCategories();

	    // Save the address
	    Address savedAddress = addressServ.createAddress(address);

	    // Save the categories
	    List<Category> savedCategories = new ArrayList<>();
	    for (Category category : categories) {
	        savedCategories.add(categoryServ.createCategory(category));
	    }
	    User founder = userServ.findUserById((long) 3);
	    
//	    founder.setRole(roleRep.findByRoleName("ROLE_FOUNDER"));
//	    userServ.updateUser(founder);
	    
	    charity.setFounder(founder);
	    // Set the Address and Categories to the Charity instance
	    charity.setAddress(savedAddress);
	    charity.setCategories(savedCategories);

	    // Save the Charity instance using your service
	    Charity savedCharity = charityServ.createCharity(charity);

	    return new ResponseEntity<>(savedCharity, HttpStatus.OK);
	}

	
	
}
