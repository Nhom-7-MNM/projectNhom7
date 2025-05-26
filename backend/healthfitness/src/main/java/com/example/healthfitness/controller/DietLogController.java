package com.example.healthfitness.controller;

// File: src/main/java/com/example/healthfitness/controllers/DietLogController.java


import com.example.healthfitness.entity.DietLog;
import com.example.healthfitness.service.DietLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;

@RestController
@RequestMapping("/diet-logs")
public class DietLogController {

    @Autowired
    private DietLogService dietLogService;

    // Tạo hoặc cập nhật nhật ký ăn uống cho một ngày
    @PostMapping
    public DietLog createOrUpdateDietLog(@RequestBody DietLog dietLog, Principal principal) {
        // Nếu có thông tin đăng nhập, set lại userEmail cho đúng
        if (principal != null) {
            dietLog.setUserEmail(principal.getName());
        }
        return dietLogService.createOrUpdateDietLog(dietLog);
    }

    // Lấy nhật ký ăn uống của ngày hiện tại của người dùng
    @GetMapping("/current")
    public DietLog getCurrentDietLog(Principal principal) {
        String userEmail = principal.getName();
        LocalDate today = LocalDate.now();
        return dietLogService.getDietLogByUserAndDate(userEmail, today)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhật ký ăn uống cho hôm nay"));
    }

    // Lấy nhật ký ăn uống theo ngày (định dạng ngày: yyyy-MM-dd)
    @GetMapping("/{date}")
    public DietLog getDietLogByDate(@PathVariable String date, Principal principal) {
        String userEmail = principal.getName();
        LocalDate localDate = LocalDate.parse(date);
        return dietLogService.getDietLogByUserAndDate(userEmail, localDate)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhật ký ăn uống cho ngày: " + date));
    }
}
