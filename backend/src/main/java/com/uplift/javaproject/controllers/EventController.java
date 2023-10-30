package com.uplift.javaproject.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uplift.javaproject.models.Address;
import com.uplift.javaproject.models.Category;
import com.uplift.javaproject.models.Event;
import com.uplift.javaproject.models.EventAndAddressAndCategoriesRequest;
import com.uplift.javaproject.models.User;
import com.uplift.javaproject.services.AddressService;
import com.uplift.javaproject.services.CategoryService;
import com.uplift.javaproject.services.EventService;
import com.uplift.javaproject.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class EventController {

	@Autowired
	private AddressService addressServ;

	@Autowired
	private CategoryService categoryServ;

	@Autowired
	private EventService eventServ;

	@Autowired
	private UserService userServ;

	@GetMapping("/events")
	public ResponseEntity<?> allEvents() {
		return ResponseEntity.ok().body(eventServ.allEvents());
	}

	@PostMapping("/events")
	public ResponseEntity<Object> createEvent(@Valid @RequestBody EventAndAddressAndCategoriesRequest request,
			BindingResult result, HttpSession session) {
		// Check for validation errors
		if (result.hasErrors()) {
			System.out.println(result.getAllErrors());
			return ResponseEntity.status(400).body(result.getAllErrors());
		}
		// Extract event, address, and category information from the request
		Event event = request.getEvent();
		Address address = request.getAddress();
		List<Category> categories = request.getCategories();

		// Save the address
		Address savedAddress = addressServ.createAddress(address);

		// Save the categories
		List<Category> savedCategories = new ArrayList<>();
		for (Category category : categories) {
			savedCategories.add(categoryServ.findByCategoryName(category.getCategoryName()));
		}

		event.setEventCategories(savedCategories);

		// Set the Address for event
		event.setEventAddress(savedAddress);

		// Getting Event Creator
		User eventCreator = userServ.findUserById((Long) session.getAttribute("user_id"));

		event.setEventCreator(eventCreator.getCharity());

		// Saving the Event
		Event savedEvent = eventServ.createEvent(event);

		return new ResponseEntity<>(savedEvent, HttpStatus.OK);
	}

	@PostMapping("/events/participate/{eventId}")
	public ResponseEntity<Object> participateInEvent(@PathVariable("eventId") Long eventId, HttpSession session) {

		User participant = userServ.findUserById((Long) session.getAttribute("user_id"));
		Event event = eventServ.findEventById(eventId);

		event.getParticipants().add(participant);
		eventServ.updateEvent(event);
		return ResponseEntity.ok("User successfully participated in Event!");
	}
	
	@PostMapping("/events/quit/{eventId}")
	public ResponseEntity<Object> quitEvent(@PathVariable("eventId") Long eventId, HttpSession session) {

		User participant = userServ.findUserById((Long) session.getAttribute("user_id"));
		Event event = eventServ.findEventById(eventId);

		event.getParticipants().remove(participant);
		eventServ.updateEvent(event);
		return ResponseEntity.ok("User successfully Quit Event!");
	}

}
