package com.example.healthfitness.controller;

// File: src/main/java/com/example/healthfitness/controllers/AdminFoodController.java


import com.example.healthfitness.entity.Food;
import com.example.healthfitness.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/foods")
public class AdminFoodController {

    @Autowired
    private FoodService foodService;

    @PostMapping
    public Food createFood(@RequestBody Food food) {
        return foodService.createFood(food);
    }

    @GetMapping
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    @GetMapping("/{id}")
    public Food getFoodById(@PathVariable String id) {
        return foodService.getFoodById(id)
                .orElseThrow(() -> new RuntimeException("Food not found with id: " + id));
    }

    @PutMapping("/{id}")
    public Food updateFood(@PathVariable String id, @RequestBody Food food) {
        return foodService.updateFood(id, food);
    }

    @DeleteMapping("/{id}")
    public void deleteFood(@PathVariable String id) {
        foodService.deleteFood(id);
    }
}

