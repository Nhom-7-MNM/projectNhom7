package com.example.healthfitness.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class WorkoutPlanRequest {
    private String name;
    private String goal;
    private List<String> muscleGroups;
    private List<PlanExerciseRequest> exercises;
}
