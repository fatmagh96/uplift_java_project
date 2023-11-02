package com.uplift.javaproject.models;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name="donations")
public class Donation {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;

    @ManyToOne
    @JoinColumn(name = "donor_id")
    private User donor;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private Charity recipient;
    
 // This will not allow the createdAt column to be updated after creation
 	@Column(updatable = false)
 	@DateTimeFormat(pattern = "yyyy-MM-dd")
 	private Date createdAt;
 	@DateTimeFormat(pattern = "yyyy-MM-dd")
 	private Date updatedAt;
    
 // Empty constructor
    public Donation() {}

    // Getters & Setters
    
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}

	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public User getDonor() {
		return donor;
	}

	public void setDonor(User donor) {
		this.donor = donor;
	}

	public Charity getRecipient() {
		return recipient;
	}

	public void setRecipient(Charity recipient) {
		this.recipient = recipient;
	}
	
	
	
}
