package com.uplift.javaproject.controllers;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uplift.javaproject.models.Charity;
import com.uplift.javaproject.models.LoginUser;
import com.uplift.javaproject.models.User;
import com.uplift.javaproject.services.CharityService;
import com.uplift.javaproject.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userServ;

	@Autowired
	private CharityService charityServ;

//	@GetMapping("/users")
//	public ResponseEntity<?> allUsers(){
//		System.out.println("testetstets  : "+ userServ.allUsers());
//		return ResponseEntity.ok().body(userServ.allUsers());
//	} 

	@GetMapping("/users")
	public ResponseEntity<?> allUsers() {
		try {
			List<User> users = userServ.allUsers();
			return new ResponseEntity<>(users, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace(); // Log the exception details
			return new ResponseEntity<>("Error fetching users: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/register")
	public ResponseEntity<Object> createUser(@Valid @RequestBody User user, BindingResult result, HttpSession session) {
		if (result.hasErrors()) {
			System.out.println(result.getAllErrors());
			return ResponseEntity.status(400).body(result.getAllErrors());
		}
		User savedUser = userServ.register(user, result);
//        return ResponseEntity.ok("User registered successfully!");
		session.setAttribute("user_id", savedUser.getId());
		return new ResponseEntity<>(savedUser, HttpStatus.OK);
	}

	@PostMapping("/login")
	public ResponseEntity<Object> loginUser(@Valid @RequestBody LoginUser logUser, BindingResult result,
			HttpSession session) {
		User loggedUser = userServ.login(logUser, result);
		if (result.hasErrors()) {
			System.out.println(result.getAllErrors());
			return ResponseEntity.status(400).body(result.getAllErrors());
		}

		session.setAttribute("user_id", loggedUser.getId());
		return new ResponseEntity<>(loggedUser, HttpStatus.OK);
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<?> loggedUser(@PathVariable("id") Long user_id) {
		try {
			User loggedUser = userServ.findUserById(user_id);
			System.out.println("testetstetstestes  :" + loggedUser.getRole().getRoleName());
			return new ResponseEntity<>(loggedUser, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace(); // Print the exception details to the console for debugging
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/loggedUser")
	public User getLogged(HttpSession session) {
		Long id = (Long) session.getAttribute("user_id");
		return userServ.findUserById(id);
	}

	
	// Update User
	
	@PutMapping("/users/{id}")
	public ResponseEntity<?> updateUser(@Valid @RequestBody User newUser, BindingResult result,
			@PathVariable("id") Long user_id) {
		try {
			User user = userServ.findUserById(user_id);
			System.out.println("testetstetstestes  :" + user.getRole().getRoleName());
			user.setFirstName(newUser.getFirstName());
			user.setLastName(newUser.getLastName());
//			user.setEmail(newUser.getEmail());

			User savedUser = userServ.updateUser(user);

			return new ResponseEntity<>(savedUser, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace(); // Print the exception details to the console for debugging
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// UPDATE PASSWORD
	
	@PutMapping("/users/changePassword")
	public ResponseEntity<?> updatePassword(@Valid @RequestBody User newUser, BindingResult result,
			HttpSession session) {
		try {
			Long userId = (Long) session.getAttribute("user_id");
			User user = userServ.findUserById(userId);
			if (!newUser.getPassword().equals(newUser.getConfirm())) {
				result.rejectValue("password", "regError", "Password and Confirm password must match :)");
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
//			if (result.hasErrors()) {
//			}
			else {	
				String hashedPW = BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt());
				user.setPassword(hashedPW);
				System.out.println("heloooo");
				user = userServ.updateUser(user);
			
			return new ResponseEntity<>(user, HttpStatus.OK);
			}
			

		} catch (Exception e) {
			e.printStackTrace(); // Print the exception details to the console for debugging
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	// FOLLOW -------------------------------------------------------

	@PostMapping("/charities/follow/{charityId}")
	public ResponseEntity<Object> followCharity(@PathVariable("charityId") Long charityId, HttpSession session) {

		User follower = userServ.findUserById((Long) session.getAttribute("user_id"));
		Charity charity = charityServ.findCharityById(charityId);

		charity.getFollowers().add(follower);
		charityServ.updateCharity(charity);
		return ResponseEntity.ok("User successfully Followed a charity!");
	}

	// UNFOLLOW -------------------------------------------------------

	@PostMapping("/charities/unfollow/{charityId}")
	public ResponseEntity<Object> unfollowCharity(@PathVariable("charityId") Long charityId, HttpSession session) {

		User follower = userServ.findUserById((Long) session.getAttribute("user_id"));
		Charity charity = charityServ.findCharityById(charityId);

		charity.getFollowers().remove(follower);
		charityServ.updateCharity(charity);
		return ResponseEntity.ok("User Unfollowed a charity!");
	}

	
	
	// LOGOUT
	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) {
		session.invalidate();
		return ResponseEntity.ok("User logged out successfully!");
	}
	
	
	// BAN a user
	@PutMapping("/users/ban/{userId}")
	public ResponseEntity<?> banUser(@PathVariable("userId") Long user_id){
		
		try {
			User user = userServ.findUserById(user_id);
			user.setIsBanned(true);
			userServ.updateUser(user);

			return ResponseEntity.ok("User Banned successfully!");
		} catch (Exception e) {
			e.printStackTrace(); // Print the exception details to the console for debugging
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

}
