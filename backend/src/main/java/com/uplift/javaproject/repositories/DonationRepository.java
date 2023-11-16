package com.uplift.javaproject.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.uplift.javaproject.models.Donation;
import com.uplift.javaproject.models.User;


@Repository
public interface DonationRepository extends CrudRepository<Donation, Long> {

	List<Donation> findAll();
	Optional<Donation> findByDonor(User user);
}
