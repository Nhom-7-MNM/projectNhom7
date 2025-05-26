package com.example.healthfitness.repository;

import com.example.healthfitness.entity.UserWorkoutPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserWorkoutPlanRepository extends MongoRepository<UserWorkoutPlan, String> {
    UserWorkoutPlan findByUserEmail(String userEmail);
}
