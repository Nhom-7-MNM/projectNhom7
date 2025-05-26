package com.example.healthfitness.service;

import com.example.healthfitness.entity.CalorieInfo;
import com.example.healthfitness.repository.CalorieInfoRepository;
import com.example.healthfitness.util.CalculationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CalorieInfoService {

    @Autowired
    private CalorieInfoRepository calorieInfoRepository;

    public CalorieInfo updateCalorieInfo(String email, double weight, double height, int age, String gender, String activityLevel) {
        CalorieInfo info = calorieInfoRepository.findByEmail(email).orElse(new CalorieInfo());
        info.setEmail(email);
        info.setWeight(weight);
        info.setHeight(height);
        info.setAge(age);
        info.setGender(gender);
        info.setActivityLevel(activityLevel);

        // Tính toán BMI, BMR, TDEE
        double bmi = CalculationUtil.calculateBMI(weight, height);
        double bmr = CalculationUtil.calculateBMR(weight, height, age, gender);
        double tdee = CalculationUtil.calculateTDEE(bmr, activityLevel);

        info.setBmi(bmi);
        info.setBmr(bmr);
        info.setTdee(tdee);
        info.setUpdatedAt(LocalDateTime.now());

        return calorieInfoRepository.save(info);
    }

    public CalorieInfo getCalorieInfo(String email) {
        return calorieInfoRepository.findByEmail(email).orElse(null);
    }
}
