package com.uplift.javaproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uplift.javaproject.models.Address;
import com.uplift.javaproject.repositories.AddressRepository;

@Service
public class AddressService {

	@Autowired
	private AddressRepository addressRepo;

	// CREATE
	public Address createAddress(Address a) {
		return addressRepo.save(a);
	}
	
	// UPDATE
		public Address updateAddress(Address a) {
			return addressRepo.save(a);
		}
}
