package com.example.healthfitness.service;



import com.example.healthfitness.entity.Food;
import com.example.healthfitness.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    public Food createFood(Food food) {
        food.setCreatedAt(LocalDateTime.now());
        // Nếu có thông tin Admin từ security context, bạn có thể set createdBy
        return foodRepository.save(food);
    }

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public Optional<Food> getFoodById(String id) {
        return foodRepository.findById(id);
    }

    public Food updateFood(String id, Food updatedFood) {
        Optional<Food> optionalFood = foodRepository.findById(id);
        if(optionalFood.isPresent()){
            Food food = optionalFood.get();
            food.setName(updatedFood.getName());
            food.setCaloriesPerUnit(updatedFood.getCaloriesPerUnit());
            food.setUnit(updatedFood.getUnit());
            food.setDescription(updatedFood.getDescription());
            food.setUpdatedAt(LocalDateTime.now());
            return foodRepository.save(food);
        }
        throw new RuntimeException("Food not found with id: " + id);
    }

    public void deleteFood(String id) {
        foodRepository.deleteById(id);
    }
}
