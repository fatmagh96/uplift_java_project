package com.uplift.javaproject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uplift.javaproject.models.Charity;
import com.uplift.javaproject.repositories.CharityRepository;

@Service
public class CharityService {

	@Autowired
	private CharityRepository charityRepo;

	// READ ALL
	public List<Charity> allCharities() {
		return charityRepo.findAll();
	}

	// CREATE
	public Charity createCharity(Charity c) {
		return charityRepo.save(c);
	}

}
