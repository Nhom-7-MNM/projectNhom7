package com.example.healthfitness.service;

import com.example.healthfitness.entity.UserWorkoutPlan;
import com.example.healthfitness.repository.UserWorkoutPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class UserWorkoutPlanService {

    @Autowired
    private UserWorkoutPlanRepository userWorkoutPlanRepository;

    // Liên kết một workout template với email của người dùng
    public UserWorkoutPlan assignWorkoutPlan(String workoutTemplateId) {
        // Lấy thông tin email từ SecurityContextHolder
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName(); // Giả sử tên người dùng chính là email
        
        // Kiểm tra xem đã có plan nào chưa (tùy theo nghiệp vụ, có thể ghi đè hay không)
        UserWorkoutPlan plan = userWorkoutPlanRepository.findByUserEmail(userEmail);
        if (plan == null) {
            plan = new UserWorkoutPlan();
            plan.setUserEmail(userEmail);
        }
        plan.setWorkoutTemplateId(workoutTemplateId);
        plan.setAssignedDate(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        plan.setStatus("assigned"); // hoặc trạng thái phù hợp
        
        return userWorkoutPlanRepository.save(plan);
    }

    // Lấy workout plan hiện tại dựa trên email của người dùng
    public UserWorkoutPlan getCurrentWorkoutPlan() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        UserWorkoutPlan plan = userWorkoutPlanRepository.findByUserEmail(userEmail);
        if (plan == null) {
            throw new RuntimeException("No workout plan assigned for this user");
        }
        return plan;
    }
}
