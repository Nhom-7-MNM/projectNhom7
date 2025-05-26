package com.example.healthfitness.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "calorieInfo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalorieInfo {
    @Id
    private String id;

    @Indexed(unique = true)
    private String email; // Lấy từ token JWT

    private double weight; // kg
    private double height; // cm
    private int age;
    private String gender; // "male" hoặc "female"
    private String activityLevel; // ít vận động, vận động nhẹ, vừa phải, nhiều, rất nhiều

    private double bmi;
    private double bmr;
    private double tdee;

    private LocalDateTime updatedAt;
}