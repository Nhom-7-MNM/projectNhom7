package com.example.healthfitness.service;

import com.example.healthfitness.entity.DailyCalorieLog;
import com.example.healthfitness.repository.DailyCalorieLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DailyCalorieLogService {

    @Autowired
    private DailyCalorieLogRepository dailyCalorieLogRepository;

    public DailyCalorieLog createOrUpdateDailyLog(String email, LocalDate date, double caloriesConsumed, double caloriesBurned) {
        DailyCalorieLog log = dailyCalorieLogRepository.findByEmailAndDate(email, date).orElse(new DailyCalorieLog());
        log.setEmail(email);
        log.setDate(date);
        log.setCaloriesConsumed(caloriesConsumed);
        log.setCaloriesBurned(caloriesBurned);
        return dailyCalorieLogRepository.save(log);
    }

    public DailyCalorieLog getDailyLog(String email, LocalDate date) {
        return dailyCalorieLogRepository.findByEmailAndDate(email, date).orElse(null);
    }

    public List<DailyCalorieLog> getDailyLogHistory(String email) {
        return dailyCalorieLogRepository.findByEmailOrderByDateDesc(email);
    }
}
