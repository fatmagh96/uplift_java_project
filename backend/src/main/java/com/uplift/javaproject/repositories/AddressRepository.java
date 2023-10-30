package com.uplift.javaproject.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.uplift.javaproject.models.Address;

@Repository
public interface AddressRepository extends CrudRepository<Address, Long> {

}
