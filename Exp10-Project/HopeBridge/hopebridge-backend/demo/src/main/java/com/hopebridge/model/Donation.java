package com.hopebridge.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Document(collection = "donations")
public class Donation {

    @Id
    private String id;
    
    private String campaignId;      // ID of the campaign being donated to
    private Double amount;          // Donation amount
    private String donorName;       // Name of the donor (e.g., "Anonymous")
    private String donorEmail;      // Donor contact (optional)
    private LocalDateTime donationDate = LocalDateTime.now(); // Timestamp
    
    // In a real app, this would also include payment status/gateway transaction ID
}