package com.uplift.javaproject.repositories;

import org.springframework.data.repository.CrudRepository;

import com.uplift.javaproject.models.Categories;
import com.uplift.javaproject.models.Category;

public interface CategoryRepository extends CrudRepository<Category, Long> {

	Category findByCategoryName(Categories categoryName);
}
