package com.example.healthfitness.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "workout_templates")
public class WorkoutTemplate {
    @Id
    private String id;

    private String name;

    // Mục tiêu: "tăng cơ", "giảm mỡ", "duy trì"
    private String goal;

    // Danh sách các bài tập
    private List<WorkoutSet> workoutSets;

    private String description;

    // Thông tin Admin tạo mẫu
    private String createdBy;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}