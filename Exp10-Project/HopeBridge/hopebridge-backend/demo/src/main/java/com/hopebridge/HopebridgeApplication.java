package com.hopebridge;

import com.hopebridge.model.Campaign;
import com.hopebridge.repository.CampaignRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import java.util.Arrays;

@SpringBootApplication
public class HopebridgeApplication {

    public static void main(String[] args) {
        SpringApplication.run(HopebridgeApplication.class, args);
    }

    @Bean
    CommandLineRunner initializeData(CampaignRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                
                Campaign campaign1 = Campaign.builder()
                    .title("Gaza Attack")
                    .description("Bomb shellings on gaza.")
                    .imageUrl("/images/campaigns/earthquake.png")
                    .currentAmount(500.0)
                    .goalAmount(1000.0)
                    .category("Disaster Relief")
                    .build();
                
                Campaign campaign2 = Campaign.builder()
                    .title("Famine")
                    .description("Feed the poor.")
                    .imageUrl("/images/campaigns/food.png")
                    .currentAmount(12.0)
                    .goalAmount(192.0)
                    .category("Medical")
                    .build();
                
                repository.saveAll(Arrays.asList(campaign1, campaign2));
                System.out.println("--- Database Seeded with Initial Campaigns ---");
            } else {
                System.out.println("--- Database already contains data. Skipping seed. ---");
            }
        };
    }
}