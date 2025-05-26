package com.example.healthfitness.util;

public class CalculationUtil {

    // Tính BMI: weight (kg) / (height(m))^2
    public static double calculateBMI(double weight, double heightCm) {
        double heightM = heightCm / 100.0;
        return weight / (heightM * heightM);
    }

    // Tính BMR theo công thức Mifflin-St Jeor
    public static double calculateBMR(double weight, double heightCm, int age, String gender) {
        if ("male".equalsIgnoreCase(gender)) {
            return 10 * weight + 6.25 * heightCm - 5 * age + 5;
        } else {
            return 10 * weight + 6.25 * heightCm - 5 * age - 161;
        }
    }

    // Tính TDEE dựa trên BMR và mức độ hoạt động
    public static double calculateTDEE(double bmr, String activityLevel) {
        double multiplier;
        switch (activityLevel.toLowerCase()) {
            case "ít vận động":
                multiplier = 1.2;
                break;
            case "vận động nhẹ":
                multiplier = 1.375;
                break;
            case "vừa phải":
                multiplier = 1.55;
                break;
            case "nhiều":
                multiplier = 1.725;
                break;
            case "rất nhiều":
                multiplier = 1.9;
                break;
            default:
                multiplier = 1.2; // Mặc định nếu không xác định
        }
        return bmr * multiplier;
    }
}
