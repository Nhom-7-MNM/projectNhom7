package com.example.healthfitness.entity;

import lombok.Data;

@Data
public class WorkoutSet {
    private String muscleGroup;
    private String exerciseName;
    private int sets;
    private int reps;
}