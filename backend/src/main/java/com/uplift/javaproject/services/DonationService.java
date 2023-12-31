package com.uplift.javaproject.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uplift.javaproject.models.Donation;
import com.uplift.javaproject.models.User;
import com.uplift.javaproject.repositories.DonationRepository;


@Service
public class DonationService {
	@Autowired
    private DonationRepository donationRepo;
    
    
    public Donation makeDonation(Donation donation) {
        return donationRepo.save(donation);
    }
    
    public List<Donation> getAllDonations(){
    	return donationRepo.findAll();
    }
    
    
	public Donation findDonationById(Long id) {
        Optional<Donation> maybeDonation = donationRepo.findById(id);
        if(maybeDonation.isPresent()) {
            return maybeDonation.get();
        } else {
            return null;
        }
    }
    
    public Donation findOne(User donor) {
        Optional<Donation> maybeDonation = donationRepo.findByDonor(donor);
        if(maybeDonation.isPresent()) {
            return maybeDonation.get();
        } else {
            return null;
        }
    }
}
