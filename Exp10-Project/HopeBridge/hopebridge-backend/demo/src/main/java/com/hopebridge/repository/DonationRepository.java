package com.hopebridge.repository;

import com.hopebridge.model.Donation;
import org.springframework.data.mongodb.repository.MongoRepository;

// Extends MongoRepository for basic CRUD operations on Donation documents
public interface DonationRepository extends MongoRepository<Donation, String> {
}