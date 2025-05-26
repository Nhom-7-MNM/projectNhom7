package com.example.healthfitness.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user_workout_plans")
@Data
public class UserWorkoutPlan {
    @Id
    private String id;

    // Sử dụng email để liên kết với người dùng
    private String userEmail;

    // Tham chiếu đến WorkoutTemplate được chọn
    private String workoutTemplateId;

    // Ngày giáo án được gán
    private String assignedDate;

    // Có thể bổ sung thêm trạng thái tiến độ nếu cần
    private String status;
}