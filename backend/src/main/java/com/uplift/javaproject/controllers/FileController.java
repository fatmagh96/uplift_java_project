package com.uplift.javaproject.controllers;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FileController {
	private static final String UPLOAD_DIRECTORY = "uploads/";

    @GetMapping("/uploads/{filename}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            // Logic to retrieve the file by filename and return it as a Resource
            // This could involve reading the file from the file system or a database
            // ...

            // Example using FileSystemResource:
            Path filePath = Paths.get(UPLOAD_DIRECTORY).resolve(filename);
            System.out.println("filePath: "+ filename);
            Resource resource = new FileSystemResource(filePath);
            System.out.println("resource: "+resource);

            // Check if the file exists
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle exceptions (e.g., file not found, access denied)
            return ResponseEntity.status(500).body(null);
        }
    }
}
