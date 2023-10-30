package com.uplift.javaproject.models;

import java.util.List;

public class EventAndAddressAndCategoriesRequest {

	private Event event;
    private Address address;
    private List<Category> categories;
    
	public Event getEvent() {
		return event;
	}
	public void setEvent(Event event) {
		this.event = event;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public List<Category> getCategories() {
		return categories;
	}
	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}
    
    
}
