package com.example.healthfitness.repository;

import com.example.healthfitness.entity.CalorieInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CalorieInfoRepository extends MongoRepository<CalorieInfo, String> {
    Optional<CalorieInfo> findByEmail(String email);
}
