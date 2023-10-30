package com.uplift.javaproject.models;

import java.util.List;

public class CharityAndAddressAndCategoriesRequest {
	private Charity charity;
    private Address address;
    private List<Category> categories;
	public Charity getCharity() {
		return charity;
	}
	public void setCharity(Charity charity) {
		this.charity = charity;
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
