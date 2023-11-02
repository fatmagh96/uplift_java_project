package com.uplift.javaproject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uplift.javaproject.models.Event;
import com.uplift.javaproject.repositories.EventRepository;

@Service
public class EventService {

	@Autowired
	private EventRepository eventRepo;

	// READ ALL
	public List<Event> allEvents() {
		return eventRepo.findAll();
	}

	// CREATE
	public Event createEvent(Event c) {
		return eventRepo.save(c);
	}
	
	public Event findEventById(Long id) {
		return eventRepo.findById(id).get();
	}
	
	public Event updateEvent(Event c) {
		return eventRepo.save(c);
	}
	
	public void deleteEvent(Long id) {
		eventRepo.deleteById(id);
	}
}
