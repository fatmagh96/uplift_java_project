package com.uplift.javaproject.models;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.uplift.javaproject.models.enums.CharityStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Transactional
@Entity
@Table(name = "charities")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Charity {

	// Member variables
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotEmpty(message = "Name is required!")
	@Column(unique=true)
	private String name;
	@NotEmpty(message = "rib is required!")
	private String rib;
	@NotEmpty(message = "phone is required!")
	private String phone;
	@NotEmpty(message = "description is required!")
	private String description;
	
	
	private String logo;
	
	@NotNull(message = "foundationYear is required!")
	private int foundationYear;
	@NotEmpty(message = "numJort is required!")
	private String numJort;

	@Enumerated(EnumType.STRING)
	private CharityStatus status;

	// This will not allow the createdAt column to be updated after creation
	@Column(updatable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date createdAt;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date updatedAt;

	// 1:1 Owner Relation Charity ------------------------
	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "founder_id")
	private User founder;

	// 1:1 Address Relation Charity ------------------------
//	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private Address address;

	// M:M Users to Event = Participants
	@JsonIgnore
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "charities_followers", 
						joinColumns = @JoinColumn(name = "charity_id"), 
						inverseJoinColumns = @JoinColumn(name = "user_id"))
	private List<User> followers;

	// M:M Charity to Category
//	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "charities_categories", joinColumns = @JoinColumn(name = "charity_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
	private List<Category> categories;

	// 1:M Charity to Event
	@JsonIgnore
	@OneToMany(mappedBy = "eventCreator", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Event> charityEvents;
	
	// 1:M Charity to Donations
	@JsonIgnore
	@OneToMany(mappedBy = "recipient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Donation> donationsReceived;
	
	
	// upload photos(product can have many photos) unique to one product
		@JsonIgnore
		@OneToMany(mappedBy="charity", fetch = FetchType.LAZY)
		private List<File> files;

	// Empty constructor
	public Charity() {
	}

	// Getters and setters

	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}

	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}
	

	public List<User> getFollowers() {
		return followers;
	}

	public void setFollowers(List<User> followers) {
		this.followers = followers;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Event> getCharityEvents() {
		return charityEvents;
	}

	public void setCharityEvents(List<Event> charityEvents) {
		this.charityEvents = charityEvents;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRib() {
		return rib;
	}

	public void setRib(String rib) {
		this.rib = rib;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public int getFoundationYear() {
		return foundationYear;
	}

	public void setFoundationYear(int foundationYear) {
		this.foundationYear = foundationYear;
	}

	public String getNumJort() {
		return numJort;
	}

	public void setNumJort(String numJort) {
		this.numJort = numJort;
	}

	public CharityStatus getStatus() {
		return status;
	}

	public void setStatus(CharityStatus status) {
		this.status = status;
	}

	public User getFounder() {
		return founder;
	}

	public void setFounder(User founder) {
		this.founder = founder;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	public List<Donation> getDonationsReceived() {
		return donationsReceived;
	}

	public void setDonationsReceived(List<Donation> donationsReceived) {
		this.donationsReceived = donationsReceived;
	}

	public List<File> getFiles() {
		return files;
	}

	public void setFiles(List<File> files) {
		this.files = files;
	}
	
	

}
