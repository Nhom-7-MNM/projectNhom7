package com.example.healthfitness.repository;

import com.example.healthfitness.entity.DailyCalorieLog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyCalorieLogRepository extends MongoRepository<DailyCalorieLog, String> {
    Optional<DailyCalorieLog> findByEmailAndDate(String email, LocalDate date);
    List<DailyCalorieLog> findByEmailOrderByDateDesc(String email);
}
