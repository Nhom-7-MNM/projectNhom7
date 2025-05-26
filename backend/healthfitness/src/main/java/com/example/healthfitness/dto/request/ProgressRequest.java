package com.example.healthfitness.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProgressRequest {
    private String email;  // Sử dụng email thay vì userId
    private Double weight;
    private Double height;
    private Double waist;
    private Double bodyFat;
}
