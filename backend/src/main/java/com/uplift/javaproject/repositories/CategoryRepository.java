package com.uplift.javaproject.repositories;

import org.springframework.data.repository.CrudRepository;

import com.uplift.javaproject.models.Category;
import com.uplift.javaproject.models.enums.Categories;

public interface CategoryRepository extends CrudRepository<Category, Long> {

	Category findByCategoryName(Categories categoryName);
}
