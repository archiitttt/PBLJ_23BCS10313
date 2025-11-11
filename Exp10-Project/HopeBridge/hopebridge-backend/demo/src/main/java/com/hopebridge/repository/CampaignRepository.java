package com.hopebridge.repository;

import com.hopebridge.model.Campaign;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CampaignRepository extends MongoRepository<Campaign, String> {

    List<Campaign> findByTitleContainingIgnoreCase(String title);
}