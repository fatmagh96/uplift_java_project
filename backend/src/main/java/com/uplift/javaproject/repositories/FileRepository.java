package com.uplift.javaproject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.uplift.javaproject.models.File;


@Repository
public interface FileRepository extends CrudRepository<File, Long> {

	List<File> findAll();
}
