package com.example.healthfitness.entity;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "diet_logs")
@Data
@NoArgsConstructor
public class DietLog {
    @Id
    private String id;
    private String userEmail;        // Liên kết với tài khoản người dùng
    private LocalDate date;          // Ngày của nhật ký ăn uống
    private List<DietLogEntry> entries; // Danh sách các món ăn trong ngày
    private Double totalCalories;    // Tổng lượng calo nạp vào
    private String remark;          // Nhận xét: dư thừa, thiếu hụt hoặc phù hợp

    // Lombok sẽ tự động tạo constructor không tham số (@NoArgsConstructor)
    // và getters, setters, equals, hashCode, toString (@Data)

    // Constructor có tham số (nếu cần)
    public DietLog(String userEmail, LocalDate date, List<DietLogEntry> entries) {
        this.userEmail = userEmail;
        this.date = date;
        this.entries = entries;
        this.totalCalories = calculateTotalCalories();
    }

    // Phương thức để tính toán totalCalories dựa trên entries
    public Double calculateTotalCalories() {
        if (entries != null) {
            return entries.stream()
                    .mapToDouble(DietLogEntry::getTotalCalories)
                    .sum();
        }
        return 0.0;
    }
}