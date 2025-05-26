package com.example.healthfitness.entity;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "foods")
@Data
@NoArgsConstructor
public class Food {
    @Id
    private String id;
    private String name;
    private Double caloriesPerUnit; // calo trên mỗi đơn vị
    private String unit;             // ví dụ: gram, miếng, chén
    private String description;      // mô tả (tùy chọn)
    private LocalDateTime createdAt;
    private String createdBy;        // email của Admin tạo ra
    private LocalDateTime updatedAt;

    // Lombok sẽ tự động tạo constructor không tham số (@NoArgsConstructor)
    // và getters, setters, equals, hashCode, toString (@Data)
}