// File: src/main/java/com/example/healthfitness/services/DietLogService.java
package com.example.healthfitness.service;

import com.example.healthfitness.entity.DietLog;
import com.example.healthfitness.entity.DietLogEntry;
import com.example.healthfitness.repository.DietLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class DietLogService {

    @Autowired
    private DietLogRepository dietLogRepository;

    // Giả sử hàm lấy TDEE từ thông tin cá nhân người dùng
    private double getUserTDEE(String userEmail) {
        // Ở đây dùng giá trị giả định, ví dụ: 2000 calo/ngày
        return 2000;
    }

    public DietLog createOrUpdateDietLog(DietLog dietLog) {
        // Tính tổng calo từ các entry
        double totalCalories = 0;
        if (dietLog.getEntries() != null) {
            for (DietLogEntry entry : dietLog.getEntries()) {
                double entryTotal = entry.getCaloriesPerUnit() * entry.getQuantity();
                entry.setTotalCalories(entryTotal);
                totalCalories += entryTotal;
            }
        }
        dietLog.setTotalCalories(totalCalories);

        // So sánh với TDEE và đưa ra nhận xét
        double tdee = getUserTDEE(dietLog.getUserEmail());
        if (totalCalories > tdee) {
            dietLog.setRemark("Dư thừa calo, có thể gây tăng cân");
        } else if (totalCalories < tdee) {
            dietLog.setRemark("Thiếu hụt calo, cần bổ sung thêm");
        } else {
            dietLog.setRemark("Chế độ ăn phù hợp");
        }

        // Kiểm tra xem đã có nhật ký cho user và ngày này chưa
        Optional<DietLog> existing = dietLogRepository.findByUserEmailAndDate(dietLog.getUserEmail(), dietLog.getDate());
        existing.ifPresent(existingLog -> dietLog.setId(existingLog.getId()));

        return dietLogRepository.save(dietLog);
    }

    public Optional<DietLog> getDietLogByUserAndDate(String userEmail, LocalDate date) {
        return dietLogRepository.findByUserEmailAndDate(userEmail, date);
    }
}
