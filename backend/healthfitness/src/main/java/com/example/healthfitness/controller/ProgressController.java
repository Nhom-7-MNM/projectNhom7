package com.example.healthfitness.controller;

import com.example.healthfitness.dto.request.ProgressRequest;
import com.example.healthfitness.dto.response.ProgressResponse;
import com.example.healthfitness.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    // Endpoint để tạo hoặc cập nhật tiến độ của người dùng
    @PostMapping
    public ResponseEntity<ProgressResponse> createOrUpdateProgress(@RequestBody ProgressRequest progressRequest) {
        ProgressResponse response = progressService.createOrUpdateProgress(progressRequest);
        return ResponseEntity.ok(response);
    }

    // Endpoint để lấy thông tin tiến độ theo email
    @GetMapping("/{email}")
    public ResponseEntity<ProgressResponse> getProgressByEmail(@PathVariable String email) {
        ProgressResponse response = progressService.getProgressByEmail(email);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
