package com.example.healthfitness.repository;


import com.example.healthfitness.entity.Food;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FoodRepository extends MongoRepository<Food, String> {
}
