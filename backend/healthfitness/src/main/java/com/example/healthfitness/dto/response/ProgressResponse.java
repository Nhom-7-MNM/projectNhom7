package com.example.healthfitness.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProgressResponse {
    private String id;
    private String email;  // Sử dụng email thay vì userId
    private Double weight;
    private Double height;
    private Double waist;
    private Double bodyFat;
    private String recordDate;  // Định dạng ngày dưới dạng String nếu cần
}
