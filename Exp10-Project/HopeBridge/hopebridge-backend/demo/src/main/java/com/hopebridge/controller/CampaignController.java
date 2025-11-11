package com.hopebridge.controller;

import com.hopebridge.model.Campaign;
import com.hopebridge.model.ErrorResponse;
import com.hopebridge.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin(origins = "http://localhost:5173") 
public class CampaignController {

    @Autowired
    private CampaignRepository campaignRepository;

    @GetMapping 
    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Campaign> getCampaignById(@PathVariable String id) {
        return campaignRepository.findById(id)
            .map(campaign -> new ResponseEntity<>(campaign, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCampaign(@PathVariable String id, @RequestBody Campaign campaignDetails) {
        
        return campaignRepository.findById(id)
            .map(existingCampaign -> {
                existingCampaign.setTitle(campaignDetails.getTitle());
                existingCampaign.setDescription(campaignDetails.getDescription());
                existingCampaign.setGoalAmount(campaignDetails.getGoalAmount());
                existingCampaign.setImageUrl(campaignDetails.getImageUrl());
                existingCampaign.setCategory(campaignDetails.getCategory());
                
                Campaign updatedCampaign = campaignRepository.save(existingCampaign);
                
                return new ResponseEntity<>(updatedCampaign, HttpStatus.OK);
            })
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCampaign(@PathVariable String id) {
        
        if (campaignRepository.existsById(id)) {
            campaignRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping 
    public ResponseEntity<?> createCampaign(@RequestBody Campaign newCampaign) {
        
        if (newCampaign.getTitle() == null || newCampaign.getTitle().trim().isEmpty()) {
            return new ResponseEntity<>(
                new ErrorResponse("Campaign Title cannot be empty.", HttpStatus.BAD_REQUEST.value()),
                HttpStatus.BAD_REQUEST
            );
        }
        
        if (newCampaign.getGoalAmount() == null || newCampaign.getGoalAmount() <= 0) {
            return new ResponseEntity<>(
                new ErrorResponse("Funding Goal must be greater than zero.", HttpStatus.BAD_REQUEST.value()),
                HttpStatus.BAD_REQUEST
            );
        }
        
        if (newCampaign.getCurrentAmount() == null) {
            newCampaign.setCurrentAmount(0.0);
        }
        
        Campaign savedCampaign = campaignRepository.save(newCampaign);
        
        return new ResponseEntity<>(savedCampaign, HttpStatus.CREATED);
    }
}