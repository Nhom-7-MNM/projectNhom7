package com.example.healthfitness.repository;

import com.example.healthfitness.entity.BlogPost;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BlogPostRepository extends MongoRepository<BlogPost, String> {
    // Bạn có thể thêm các phương thức tìm kiếm bổ sung nếu cần,
    // ví dụ: tìm kiếm theo chủ đề hay phân trang...
}
