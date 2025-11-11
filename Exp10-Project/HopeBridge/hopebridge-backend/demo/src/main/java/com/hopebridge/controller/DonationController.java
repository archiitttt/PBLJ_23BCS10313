package com.hopebridge.controller;

import com.hopebridge.model.Campaign;
import com.hopebridge.model.Donation;
import com.hopebridge.model.ErrorResponse;
import com.hopebridge.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "http://localhost:5173") 
public class DonationController {

    @Autowired
    private DonationService donationService;

    /**
     * POST: Processes a new donation and updates the target campaign's funding.
     * Maps to: POST http://localhost:8080/api/donations/{campaignId}
     */
    @PostMapping("/{campaignId}")
    public ResponseEntity<?> receiveDonation(@PathVariable String campaignId, @RequestBody Donation donation) {
        
        // Validation
        if (donation.getAmount() == null || donation.getAmount() <= 0) {
            return new ResponseEntity<>(
                new ErrorResponse("Donation amount must be greater than zero.", HttpStatus.BAD_REQUEST.value()),
                HttpStatus.BAD_REQUEST
            );
        }
        
        Optional<Campaign> updatedCampaign = donationService.processDonation(campaignId, donation);

        if (updatedCampaign.isPresent()) {
            // Return the updated campaign object
            return new ResponseEntity<>(updatedCampaign.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(
                new ErrorResponse("Campaign not found for donation.", HttpStatus.NOT_FOUND.value()),
                HttpStatus.NOT_FOUND
            );
        }
    }
}