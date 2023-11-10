package com.uplift.javaproject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.uplift.javaproject.models.Category;
import com.uplift.javaproject.models.Charity;


@Repository
public interface CharityRepository extends CrudRepository<Charity, Long> {

	List<Charity> findAll();
	
	List<Charity> findByCategories(Category category);
}
