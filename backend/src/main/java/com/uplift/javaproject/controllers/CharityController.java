package com.uplift.javaproject.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.uplift.javaproject.models.Address;
import com.uplift.javaproject.models.Category;
import com.uplift.javaproject.models.Charity;
import com.uplift.javaproject.models.CharityAndAddressAndCategoriesRequest;
import com.uplift.javaproject.models.File;
import com.uplift.javaproject.models.User;
import com.uplift.javaproject.models.enums.CharityStatus;
import com.uplift.javaproject.repositories.RoleRepository;
import com.uplift.javaproject.services.AddressService;
import com.uplift.javaproject.services.CategoryService;
import com.uplift.javaproject.services.CharityService;
import com.uplift.javaproject.services.FileService;
import com.uplift.javaproject.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class CharityController {

	// this is a test

	@Autowired
	private CharityService charityServ;

	@Autowired
	private AddressService addressServ;

	@Autowired
	private CategoryService categoryServ;

	@Autowired
	private UserService userServ;

	@Autowired
	private RoleRepository roleRep;
	
	@Autowired
	private FileService fileService;
	
	public static String uploadDirectory = System.getProperty("user.dir") + "/uploads";

	@GetMapping("/charities")
	public ResponseEntity<Object> allCharities() {
		return ResponseEntity.ok().body(charityServ.allCharities());
	}
	
    @GetMapping("/charities/{charityId}")
    public ResponseEntity<?> showOne(@PathVariable Long charityId) {
        try {
            Charity maybeCharity = charityServ.findCharityById(charityId);

            if (maybeCharity != null) {
                return ResponseEntity.ok(maybeCharity);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Charity not found");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

//	@GetMapping("/charities/test")
//	public List<Charity> getAll() {
//		return charityServ.allCharities();
//	}
//	
//	@GetMapping("/charities/{categoryString}")
//	public List<Charity> getAllByCategory(@PathVariable String categoryString) {
////		System.out.println(categoryString);
//		if(categoryString.equals("all")) { 
//			return charityServ.allCharities();
//		}
//		Categories categoryName = Categories.valueOf(categoryString);
//		Category c = categoryServ.findByCategoryName(categoryName);
//		System.out.println(charityServ.allCharitiesByCategory(c));
//		return charityServ.allCharitiesByCategory(c);
//	}


	@PostMapping("/charities/new")
	public ResponseEntity<Object> createCharity(@Valid @RequestPart CharityAndAddressAndCategoriesRequest request,
			BindingResult result,@RequestPart("files") MultipartFile[] files, HttpSession session) throws IOException {
		// Check for validation errors
		
		
		
		
		if (result.hasErrors()) {
			System.out.println(result.getAllErrors());
			return ResponseEntity.status(400).body(result.getAllErrors());
		}

		// Extract charity, address, and category information from the request
		Charity charity = request.getCharity();
		Address address = request.getAddress();
		List<Category> categories = request.getCategories();

		// Save the address
		Address savedAddress = addressServ.createAddress(address);
		System.out.println("ttesetstetstes1111111");
		// Save the categories
		List<Category> savedCategories = new ArrayList<>();
		System.out.println("ttesetstetstes2222222");
		for (Category category : categories) {
			savedCategories.add(categoryServ.findByCategoryName(category.getCategoryName()));
		}
		System.out.println("ttesetstetstes2222222");
		charity.setCategories(savedCategories);
		charity.setStatus(CharityStatus.PENDING);

		// Fetch User "founder"
		User founder = userServ.findUserById((Long) session.getAttribute("user_id"));
		// Update role to ROLE_FOUNDER
		founder.setRole(roleRep.findByRoleName("ROLE_FOUNDER"));
		userServ.updateUser(founder);

		charity.setFounder(founder);
		// Set the Address and Categories to the Charity instance
		charity.setAddress(savedAddress);
//	    charity.setCategories(savedCategories);

		// Save the Charity instance using your service
		Charity savedCharity = charityServ.createCharity(charity);
		
		for (MultipartFile file : files) {
			if (!file.isEmpty()) {
				String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
				Path path = Paths.get(uploadDirectory);
				Files.copy(file.getInputStream(), path.resolve(filename));

				// Create and save file metadata
				File newFile = new File();
				newFile.setPath(filename);
				newFile.setCharity(savedCharity);
				fileService.createFile(newFile);
			}
		}


		return new ResponseEntity<>(savedCharity, HttpStatus.OK);
	}

	// Update charity

	@PutMapping("/charities/{charityId}")
	public ResponseEntity<Object> updateCharity(@PathVariable Long charityId,
			@Valid @RequestBody CharityAndAddressAndCategoriesRequest request, BindingResult result) {

		Charity existingCharity = charityServ.findCharityById(charityId);
		if (existingCharity == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Charity not found.");
		}

		// Update the properties of the existing charity with the new data
		Charity updatedCharity = request.getCharity();
		existingCharity.setName(updatedCharity.getName());
		existingCharity.setRib(updatedCharity.getRib());
		existingCharity.setPhone(updatedCharity.getPhone());
		existingCharity.setDescription(updatedCharity.getDescription());
		

		// Update Address
		Address updatedAddress = request.getAddress();
		existingCharity.getAddress().setStreet(updatedAddress.getStreet());
		existingCharity.getAddress().setCity(updatedAddress.getCity());
		

		// Update Categories
		List<Category> updatedCategories = request.getCategories();
		List<Category> savedCategories = new ArrayList<>();
		for (Category category : updatedCategories) {
		    Category savedCategory = categoryServ.findByCategoryName(category.getCategoryName());
		    if (savedCategory != null) {
		        savedCategories.add(savedCategory);
		    }
		}

		existingCharity.setCategories(savedCategories);

		// Save the updated charity
		Charity updated = charityServ.updateCharity(existingCharity);

		return ResponseEntity.ok(updated);
	}

	// Delete Charity
	@DeleteMapping("/charities/{charityId}")
	public ResponseEntity<Object> deleteCharity(@PathVariable Long charityId) {
		charityServ.deleteCharityById(charityId);
		return ResponseEntity.ok("User successfully Deleted a charity!");
	}

}
