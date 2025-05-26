package com.example.healthfitness.entity;

import lombok.Data;

@Data
public class FoodEntry {
    private String foodName;
    private double quantity; // số lượng (ví dụ: gram hoặc phần)
    private double caloriesPerUnit; // calo trên mỗi đơn vị
}
