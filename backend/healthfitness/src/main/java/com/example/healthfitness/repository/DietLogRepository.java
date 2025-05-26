package com.example.healthfitness.repository;



import com.example.healthfitness.entity.DietLog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DietLogRepository extends MongoRepository<DietLog, String> {
    Optional<DietLog> findByUserEmailAndDate(String userEmail, LocalDate date);
}
