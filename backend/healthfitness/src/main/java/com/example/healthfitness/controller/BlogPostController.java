package com.example.healthfitness.controller;

import com.example.healthfitness.entity.BlogPost;
import com.example.healthfitness.service.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class BlogPostController {

    @Autowired
    private BlogPostService blogPostService;

    // Tạo bài viết mới (Chỉ Admin)
    @PostMapping
    public BlogPost createPost(@RequestBody BlogPost blogPost) {
        // Phân quyền sẽ được kiểm tra qua Spring Security (ví dụ, ROLE_ADMIN)
        return blogPostService.createPost(blogPost);
    }

    // Lấy danh sách bài viết (cho tất cả người dùng)
    @GetMapping
    public List<BlogPost> getAllPosts() {
        return blogPostService.getAllPosts();
    }

    // Lấy chi tiết bài viết cụ thể
    @GetMapping("/{id}")
    public BlogPost getPostById(@PathVariable String id) {
        return blogPostService.getPostById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    // Cập nhật bài viết (Chỉ Admin)
    @PutMapping("/{id}")
    public BlogPost updatePost(@PathVariable String id, @RequestBody BlogPost blogPost) {
        // Kiểm tra phân quyền ở Security layer (ROLE_ADMIN)
        return blogPostService.updatePost(id, blogPost);
    }

    // Xóa bài viết (Chỉ Admin)
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable String id) {
        // Kiểm tra phân quyền ở Security layer (ROLE_ADMIN)
        blogPostService.deletePost(id);
    }

    // Thả tim bài viết
    @PostMapping("/{id}/like")
    public BlogPost likePost(@PathVariable String id, @RequestParam String userEmail) {
        // Nếu muốn, bạn có thể lấy userEmail từ token tương tự như createPost,
        // tuy nhiên ở đây ta để dưới dạng tham số để dễ kiểm tra.
        return blogPostService.likePost(id, userEmail);
    }
}
