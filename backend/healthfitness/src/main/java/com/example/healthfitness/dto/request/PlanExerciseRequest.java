package com.example.healthfitness.dto.request;

import lombok.Data;

@Data
public class PlanExerciseRequest {
    private String exerciseId;
    private int sets;
    private int reps;
    private String notes;
}