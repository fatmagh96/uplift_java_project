package com.uplift.javaproject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.uplift.javaproject.models.Role;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {

	List<Role> findAll();

	Role findByRoleName(String name);
}
