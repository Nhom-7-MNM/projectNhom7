package com.example.healthfitness.service;

import com.example.healthfitness.entity.BlogPost;
import com.example.healthfitness.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BlogPostService {

    @Autowired
    private BlogPostRepository blogPostRepository;

    public BlogPost createPost(BlogPost blogPost) {
        // Lấy thông tin email của Admin từ SecurityContextHolder
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String adminEmail = auth.getName();  // Giả sử username chứa email

        blogPost.setAuthorEmail(adminEmail);
        blogPost.setCreatedAt(new Date());
        blogPost.setUpdatedAt(new Date());
        return blogPostRepository.save(blogPost);
    }

    public List<BlogPost> getAllPosts() {
        return blogPostRepository.findAll();
    }

    public Optional<BlogPost> getPostById(String id) {
        return blogPostRepository.findById(id);
    }

    public BlogPost updatePost(String id, BlogPost updatedPost) {
        return blogPostRepository.findById(id).map(post -> {
            // Chỉ cập nhật các trường cho phép chỉnh sửa
            post.setTitle(updatedPost.getTitle());
            post.setContent(updatedPost.getContent());
            post.setImageUrls(updatedPost.getImageUrls());
            post.setTopics(updatedPost.getTopics());
            post.setUpdatedAt(new Date());
            return blogPostRepository.save(post);
        }).orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public void deletePost(String id) {
        blogPostRepository.deleteById(id);
    }

    public BlogPost likePost(String id, String userEmail) {
        return blogPostRepository.findById(id).map(post -> {
            // Nếu người dùng chưa like bài viết này, thêm email vào set
            if (!post.getLikedUserEmails().contains(userEmail)) {
                post.getLikedUserEmails().add(userEmail);
            }
            return blogPostRepository.save(post);
        }).orElseThrow(() -> new RuntimeException("Post not found"));
    }
}
