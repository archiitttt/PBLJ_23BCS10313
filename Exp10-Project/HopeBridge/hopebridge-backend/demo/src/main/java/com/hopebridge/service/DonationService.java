package com.hopebridge.service;

import com.hopebridge.model.Campaign;
import com.hopebridge.model.Donation;
import com.hopebridge.repository.CampaignRepository;
import com.hopebridge.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    public Optional<Campaign> processDonation(String campaignId, Donation donation) {
        
        // 1. Find the target campaign
        Optional<Campaign> campaignOpt = campaignRepository.findById(campaignId);

        if (campaignOpt.isPresent()) {
            Campaign campaign = campaignOpt.get();
            Double donatedAmount = donation.getAmount();

            // 2. Update the campaign's current amount
            Double newCurrentAmount = campaign.getCurrentAmount() + donatedAmount;
            campaign.setCurrentAmount(newCurrentAmount);
            
            // 3. Save the updated campaign and the new donation record
            campaignRepository.save(campaign);
            
            // Set the campaign ID and save the donation record
            donation.setCampaignId(campaignId);
            donationRepository.save(donation);

            return Optional.of(campaign);
        }

        return Optional.empty(); // Campaign not found
    }
}