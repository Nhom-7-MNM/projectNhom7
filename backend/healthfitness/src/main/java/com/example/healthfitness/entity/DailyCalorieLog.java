package com.example.healthfitness.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "dailyCalorieLog")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyCalorieLog {
    @Id
    private String id;

    @Indexed
    private String email; // Lấy từ token JWT

    private LocalDate date; // Ngày ghi nhận
    private double caloriesConsumed;
    private double caloriesBurned;
}