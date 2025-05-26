package com.example.healthfitness.service;

import com.example.healthfitness.entity.WorkoutTemplate;
import com.example.healthfitness.repository.WorkoutTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutTemplateService {

    @Autowired
    private WorkoutTemplateRepository workoutTemplateRepository;

    public WorkoutTemplate createWorkoutTemplate(WorkoutTemplate template, String adminEmail) {
        template.setCreatedBy(adminEmail);
        template.setCreatedAt(LocalDateTime.now());
        template.setUpdatedAt(LocalDateTime.now());
        return workoutTemplateRepository.save(template);
    }

    public List<WorkoutTemplate> getAllWorkoutTemplates() {
        return workoutTemplateRepository.findAll();
    }

    public Optional<WorkoutTemplate> getWorkoutTemplateById(String id) {
        return workoutTemplateRepository.findById(id);
    }

    public WorkoutTemplate updateWorkoutTemplate(String id, WorkoutTemplate updatedTemplate) {
        return workoutTemplateRepository.findById(id).map(template -> {
            template.setName(updatedTemplate.getName());
            template.setGoal(updatedTemplate.getGoal());
            template.setWorkoutSets(updatedTemplate.getWorkoutSets());
            template.setDescription(updatedTemplate.getDescription());
            template.setUpdatedAt(LocalDateTime.now());
            return workoutTemplateRepository.save(template);
        }).orElseThrow(() -> new RuntimeException("Workout template not found"));
    }

    public void deleteWorkoutTemplate(String id) {
        workoutTemplateRepository.deleteById(id);
    }

    public List<WorkoutTemplate> getWorkoutTemplatesByGoal(String goal) {
        return workoutTemplateRepository.findByGoal(goal);
    }
}
