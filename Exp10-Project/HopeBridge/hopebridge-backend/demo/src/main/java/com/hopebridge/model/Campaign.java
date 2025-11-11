package com.hopebridge.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Builder // <-- ADD THIS ANNOTATION
@NoArgsConstructor // <-- ADD THIS
@AllArgsConstructor // <-- AND THIS
@Document(collection = "campaigns")
public class Campaign {

    @Id
    private String id;
    
    private String title;
    private String description;
    private String imageUrl;
    
    private Double currentAmount;
    private Double goalAmount;
    
    private String category;
}