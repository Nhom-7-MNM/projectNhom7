package com.example.healthfitness.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Document(collection = "blogposts")
public class BlogPost {
    @Id
     String id;

     String title;
     String content;
     List<String> imageUrls;
     List<String> topics;
    
    // Lưu email của Admin tạo bài viết
     String authorEmail;

     Date createdAt;
     Date updatedAt;

    // Lưu danh sách email của người dùng đã "thả tim" nếu cần theo dõi chi tiết
     Set<String> likedUserEmails = new HashSet<>();
}
