package com.example.healthfitness.repository;

import com.example.healthfitness.entity.Progress;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressRepository extends MongoRepository<Progress, String> {
    // Tìm tiến độ theo email (mỗi người dùng chỉ có 1 bản ghi tiến độ)
    Progress findByEmail(String email);
}
