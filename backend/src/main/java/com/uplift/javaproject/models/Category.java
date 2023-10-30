package com.uplift.javaproject.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
import jakarta.persistence.Table;

@Entity
@Table(name = "Categories")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Category {

	// Member variables
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	private Categories categoryName;

	// M:M Charity to Address
	@JsonIgnore
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "charities_categories", joinColumns = @JoinColumn(name = "category_id"), inverseJoinColumns = @JoinColumn(name = "charity_id"))
	private List<Charity> charities;

	public Category() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Categories getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(Categories categoryName) {
		this.categoryName = categoryName;
	}

	public List<Charity> getCharities() {
		return charities;
	}

	public void setCharities(List<Charity> charities) {
		this.charities = charities;
	}
	
	
}
