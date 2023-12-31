package com.uplift.javaproject.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
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
	
    @GetMapping("/events/{eventId}")
    public ResponseEntity<?> showOne(@PathVariable Long eventId) {
        try {
            Event maybeEvent = eventServ.findEventById(eventId);

            if (maybeEvent != null) {
                return ResponseEntity.ok(maybeEvent);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
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

	// Update Event
	@PutMapping("/events/{eventId}")
	public ResponseEntity<Object> updateEvent(@PathVariable Long eventId,
			@Valid @RequestBody EventAndAddressAndCategoriesRequest request, BindingResult result) {

		Event existingEvent = eventServ.findEventById(eventId);

		if (existingEvent == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found.");
		}

		Event updatedEvent = request.getEvent();
		existingEvent.setTitle(updatedEvent.getTitle());
		existingEvent.setStartDate(updatedEvent.getStartDate());
		existingEvent.setEndDate(updatedEvent.getEndDate());
		existingEvent.setDescription(updatedEvent.getDescription());

		// Update Address
		Address updatedAddress = request.getAddress();
		existingEvent.getEventAddress().setStreet(updatedAddress.getStreet());
		existingEvent.getEventAddress().setCity(updatedAddress.getCity());

		// Update Categories
		List<Category> updatedCategories = request.getCategories();
		List<Category> savedCategories = new ArrayList<>();
		for (Category category : updatedCategories) {
			Category savedCategory = categoryServ.findByCategoryName(category.getCategoryName());
			if (savedCategory != null) {
				savedCategories.add(savedCategory);
			}
		}
		
		existingEvent.setEventCategories(savedCategories);
		
		// Save the updated Event 
		Event updated = eventServ.updateEvent(existingEvent);

		return ResponseEntity.ok(updated);
	}
	
	// Participate or Quit an Event

    @PostMapping("/events/participate/{eventId}")
    public ResponseEntity<Object> participateInEvent(@PathVariable("eventId") Long eventId, HttpSession session) {

        User participant = userServ.findUserById((Long) session.getAttribute("user_id"));
        Event event = eventServ.findEventById(eventId);

        event.getParticipants().add(participant);
        eventServ.updateEvent(event);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User successfully Participate!");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/events/quit/{eventId}")
    public ResponseEntity<Object> quitEvent(@PathVariable("eventId") Long eventId, HttpSession session) {

        User participant = userServ.findUserById((Long) session.getAttribute("user_id"));
        Event event = eventServ.findEventById(eventId);

        event.getParticipants().remove(participant);
        eventServ.updateEvent(event);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User Quit event!");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
	
	// delete an Event
	@DeleteMapping("/events/{eventId}")
	public ResponseEntity<Object> deleteEvent(@PathVariable Long eventId) {
		eventServ.deleteEvent(eventId);
		return ResponseEntity.ok("Event successfully deleted!");
	}
	
}
