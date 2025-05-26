package com.example.healthfitness.repository;

import com.example.healthfitness.entity.WorkoutTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WorkoutTemplateRepository extends MongoRepository<WorkoutTemplate, String> {
    List<WorkoutTemplate> findByGoal(String goal);
}
