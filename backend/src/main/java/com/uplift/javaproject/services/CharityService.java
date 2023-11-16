package com.uplift.javaproject.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uplift.javaproject.models.Category;
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
	
	public List<Charity> allCharitiesByCategory(Category name) {
		return charityRepo.findByCategories(name);
	}

	// CREATE
	public Charity createCharity(Charity c) {
		return charityRepo.save(c);
	}

	public Charity findCharityById(Long id) {
        Optional<Charity> maybeCharity = charityRepo.findById(id);
        if(maybeCharity.isPresent()) {
            return maybeCharity.get();
        } else {
            return null;
        }
    }
	
	public Charity updateCharity(Charity c) {
		return charityRepo.save(c);
	}
	
	public void deleteCharityById(Long id) {
		charityRepo.deleteById(id);
	}
}
