package com.uplift.javaproject.models;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

// test test
@Transactional
@Entity
@Table(name = "events")
public class Event {

	// Member variables
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotEmpty(message = "Title is required!")
	private String title;

	@FutureOrPresent
	private Date startDate;

	@FutureOrPresent
	private Date endDate;
	
	@Column(length = 2000)
	@NotBlank
	private String description;

	// M:1 Events to charity -----------------------------------------

//	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "charity_id")
//	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
	private Charity eventCreator;

	// M:M Users to Event = Participants
//	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "event_participants", joinColumns = @JoinColumn(name = "event_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
	private List<User> participants;

	

	// 1:1 Address Relation Event ------------------------
//	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "eventAddress_id")
	private Address eventAddress;

	// M:M Event to Category
//	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "events_categories", joinColumns = @JoinColumn(name = "event_id"), inverseJoinColumns = @JoinColumn(name = "eventCategory_id"))
	private List<Category> eventCategories;

	// Empty constructor
	public Event() {
	}

	
	
	public Charity getEventCreator() {
		return eventCreator;
	}

	public void setEventCreator(Charity eventCreator) {
		this.eventCreator = eventCreator;
	}
	
	public Address getEventAddress() {
		return eventAddress;
	}

	public void setEventAddress(Address eventAddress) {
		this.eventAddress = eventAddress;
	}

	public List<Category> getEventCategories() {
		return eventCategories;
	}

	public void setEventCategories(List<Category> eventCategories) {
		this.eventCategories = eventCategories;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	public List<User> getParticipants() {
		return participants;
	}


	public void setParticipants(List<User> participants) {
		this.participants = participants;
	}
}
