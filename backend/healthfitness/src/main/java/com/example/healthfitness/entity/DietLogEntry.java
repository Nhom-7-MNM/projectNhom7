package com.example.healthfitness.entity;



import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DietLogEntry {
    private String foodName;         // tên thực phẩm (hoặc nhập thủ công)
    private Double caloriesPerUnit;    // calo trên đơn vị
    private Double quantity;           // số lượng
    private Double totalCalories;      // tính = caloriesPerUnit * quantity

    // Lombok sẽ tự động tạo constructor không tham số (@NoArgsConstructor)
    // và getters, setters, equals, hashCode, toString (@Data)

    public DietLogEntry(String foodName, Double caloriesPerUnit, Double quantity) {
        this.foodName = foodName;
        this.caloriesPerUnit = caloriesPerUnit;
        this.quantity = quantity;
        this.totalCalories = calculateTotalCalories();
    }

    // Phương thức để tính toán totalCalories
    public Double calculateTotalCalories() {
        if (caloriesPerUnit != null && quantity != null) {
            return caloriesPerUnit * quantity;
        }
        return 0.0; // Hoặc giá trị mặc định khác
    }
}