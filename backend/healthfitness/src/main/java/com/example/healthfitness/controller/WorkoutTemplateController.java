package com.example.healthfitness.controller;

import com.example.healthfitness.entity.WorkoutTemplate;
import com.example.healthfitness.service.WorkoutTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workout-templates")
public class WorkoutTemplateController {

    @Autowired
    private WorkoutTemplateService workoutTemplateService;

    // Lấy danh sách template theo mục tiêu: ví dụ: /workout-templates/tăng cơ
    @GetMapping("/{goal}")
    public ResponseEntity<List<WorkoutTemplate>> getWorkoutTemplatesByGoal(@PathVariable String goal) {
        List<WorkoutTemplate> templates = workoutTemplateService.getWorkoutTemplatesByGoal(goal);
        return ResponseEntity.ok(templates);
    }
}
