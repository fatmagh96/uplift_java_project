package com.uplift.javaproject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.uplift.javaproject.models.Donation;

public interface DonationRepository extends CrudRepository<Donation, Long> {

	List<Donation> findAll();
}
