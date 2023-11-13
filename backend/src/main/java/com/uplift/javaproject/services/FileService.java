package com.uplift.javaproject.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uplift.javaproject.models.File;
import com.uplift.javaproject.repositories.FileRepository;

@Service
public class FileService {
	@Autowired
	private FileRepository fileRepository;
	
	public List<File> getAll()
	{
		return fileRepository.findAll();
	}
	
	public File createFile(File f)
	{
		return fileRepository.save(f);
	}
	
	public File findOne(Long id)
	{
		Optional<File> OptFile= fileRepository.findById(id);
		if(OptFile.isPresent())
		{
		return OptFile.get();
		}
		else return null;
	}
	
	public File updateFile(File f)
	{
		
		return fileRepository.save(f);
	}
	
	public void deleteFile(Long id)
	{
		fileRepository.deleteById(id);
	}
}
