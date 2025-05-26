package com.example.healthfitness.controller;

import com.example.healthfitness.entity.CalorieInfo;
import com.example.healthfitness.entity.DailyCalorieLog;
import com.example.healthfitness.service.CalorieInfoService;
import com.example.healthfitness.service.DailyCalorieLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CalorieController {

    @Autowired
    private CalorieInfoService calorieInfoService;

    @Autowired
    private DailyCalorieLogService dailyCalorieLogService;

    // Giả sử bạn sử dụng Spring Security và lấy email từ Principal
    private String getCurrentUserEmail(Principal principal) {
        // Trong thực tế, principal.getName() sẽ trả về email
        return principal.getName();
    }

    // Endpoint cập nhật thông tin calo cơ bản
    @PostMapping("/calorie-info")
    public CalorieInfo updateCalorieInfo(@RequestBody CalorieInfoRequest request, Principal principal) {
        String email = getCurrentUserEmail(principal);
        return calorieInfoService.updateCalorieInfo(
                email,
                request.getWeight(),
                request.getHeight(),
                request.getAge(),
                request.getGender(),
                request.getActivityLevel()
        );
    }

    // Lấy thông tin calo và chỉ số đã tính
    @GetMapping("/calorie-info")
    public CalorieInfo getCalorieInfo(Principal principal) {
        String email = getCurrentUserEmail(principal);
        return calorieInfoService.getCalorieInfo(email);
    }

    // Ghi nhận hoặc cập nhật nhật ký calo hàng ngày
    @PostMapping("/daily-calorie-log")
    public DailyCalorieLog createOrUpdateDailyLog(@RequestBody DailyCalorieLogRequest request, Principal principal) {
        String email = getCurrentUserEmail(principal);
        return dailyCalorieLogService.createOrUpdateDailyLog(
                email,
                request.getDate(),
                request.getCaloriesConsumed(),
                request.getCaloriesBurned()
        );
    }

    // Lấy nhật ký calo của một ngày cụ thể
    @GetMapping("/daily-calorie-log/{date}")
    public DailyCalorieLog getDailyLog(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            Principal principal) {
        String email = getCurrentUserEmail(principal);
        return dailyCalorieLogService.getDailyLog(email, date);
    }

    // Lấy lịch sử nhật ký calo
    @GetMapping("/daily-calorie-log/history")
    public List<DailyCalorieLog> getDailyLogHistory(Principal principal) {
        String email = getCurrentUserEmail(principal);
        return dailyCalorieLogService.getDailyLogHistory(email);
    }
}

// Các lớp request DTO
class CalorieInfoRequest {
    private double weight;
    private double height;
    private int age;
    private String gender;
    private String activityLevel;

    // Getters & Setters
    public double getWeight() { return weight; }
    public void setWeight(double weight) { this.weight = weight; }

    public double getHeight() { return height; }
    public void setHeight(double height) { this.height = height; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getActivityLevel() { return activityLevel; }
    public void setActivityLevel(String activityLevel) { this.activityLevel = activityLevel; }
}

class DailyCalorieLogRequest {
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate date;
    private double caloriesConsumed;
    private double caloriesBurned;

    // Getters & Setters
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public double getCaloriesConsumed() { return caloriesConsumed; }
    public void setCaloriesConsumed(double caloriesConsumed) { this.caloriesConsumed = caloriesConsumed; }

    public double getCaloriesBurned() { return caloriesBurned; }
    public void setCaloriesBurned(double caloriesBurned) { this.caloriesBurned = caloriesBurned; }
}
