package com.example.healthfitness.controller;

import com.example.healthfitness.entity.WorkoutTemplate;
import com.example.healthfitness.service.WorkoutTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/workout-templates")
public class AdminWorkoutTemplateController {

    @Autowired
    private WorkoutTemplateService workoutTemplateService;

    // Chỉ admin mới có quyền tạo (PreAuthorize dùng role phù hợp, ví dụ: ROLE_ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<WorkoutTemplate> createWorkoutTemplate(@RequestBody WorkoutTemplate template) {
        // Giả sử admin email lấy từ context hoặc request (ở đây minh họa tạm)
        String adminEmail = "admin@gmail.com";
        WorkoutTemplate created = workoutTemplateService.createWorkoutTemplate(template, adminEmail);
        return ResponseEntity.ok(created);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<WorkoutTemplate>> getAllWorkoutTemplates() {
        List<WorkoutTemplate> templates = workoutTemplateService.getAllWorkoutTemplates();
        return ResponseEntity.ok(templates);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<WorkoutTemplate> getWorkoutTemplateById(@PathVariable String id) {
        WorkoutTemplate template = workoutTemplateService.getWorkoutTemplateById(id)
                .orElseThrow(() -> new RuntimeException("Workout template not found"));
        return ResponseEntity.ok(template);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<WorkoutTemplate> updateWorkoutTemplate(@PathVariable String id, @RequestBody WorkoutTemplate updatedTemplate) {
        WorkoutTemplate template = workoutTemplateService.updateWorkoutTemplate(id, updatedTemplate);
        return ResponseEntity.ok(template);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWorkoutTemplate(@PathVariable String id) {
        workoutTemplateService.deleteWorkoutTemplate(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
