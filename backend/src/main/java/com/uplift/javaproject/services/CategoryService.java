 package com.uplift.javaproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uplift.javaproject.models.Category;
import com.uplift.javaproject.models.enums.Categories;
import com.uplift.javaproject.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepo;

	// CREATE
	public Category createCategory(Category c) {
		return categoryRepo.save(c);
	}
	
	//find by category name
	public Category findByCategoryName(Categories c) {
		return categoryRepo.findByCategoryName(c);
	}
}
