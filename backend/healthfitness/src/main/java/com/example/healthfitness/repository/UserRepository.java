package com.example.healthfitness.repository;

import com.example.healthfitness.entity.User;
import jakarta.validation.constraints.Email;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
}