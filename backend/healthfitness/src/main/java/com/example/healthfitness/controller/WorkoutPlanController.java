package com.example.healthfitness.controller;

import com.example.healthfitness.entity.UserWorkoutPlan;
import com.example.healthfitness.service.UserWorkoutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/workout-plans")
public class WorkoutPlanController {

    @Autowired
    private UserWorkoutPlanService userWorkoutPlanService;

    // Liên kết workout template với user (lấy email từ SecurityContext)
    @PostMapping("/assign")
    public ResponseEntity<UserWorkoutPlan> assignWorkoutPlan(@RequestParam("workoutTemplateId") String workoutTemplateId) {
        UserWorkoutPlan plan = userWorkoutPlanService.assignWorkoutPlan(workoutTemplateId);
        return ResponseEntity.ok(plan);
    }

    // Lấy workout plan hiện tại của user
    @GetMapping("/current")
    public ResponseEntity<UserWorkoutPlan> getCurrentWorkoutPlan() {
        UserWorkoutPlan plan = userWorkoutPlanService.getCurrentWorkoutPlan();
        return ResponseEntity.ok(plan);
    }
}
