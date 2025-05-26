package com.example.healthfitness.service;

import com.example.healthfitness.dto.request.ProgressRequest;
import com.example.healthfitness.dto.response.ProgressResponse;
import com.example.healthfitness.entity.Progress;
import com.example.healthfitness.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    // Tạo hoặc cập nhật tiến độ cho người dùng dựa trên email
    public ProgressResponse createOrUpdateProgress(ProgressRequest request) {
        // Tìm theo email thay vì userId
        Progress progress = progressRepository.findByEmail(request.getEmail());
        Date now = new Date();
        if (progress == null) {
            progress = Progress.builder()
                    .email(request.getEmail())
                    .weight(request.getWeight())
                    .height(request.getHeight())
                    .waist(request.getWaist())
                    .bodyFat(request.getBodyFat())
                    .recordDate(now)
                    .build();
        } else {
            progress.setWeight(request.getWeight());
            progress.setHeight(request.getHeight());
            progress.setWaist(request.getWaist());
            progress.setBodyFat(request.getBodyFat());
            progress.setRecordDate(now);
        }
        Progress savedProgress = progressRepository.save(progress);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return ProgressResponse.builder()
                .id(savedProgress.getId())
                .email(savedProgress.getEmail())
                .weight(savedProgress.getWeight())
                .height(savedProgress.getHeight())
                .waist(savedProgress.getWaist())
                .bodyFat(savedProgress.getBodyFat())
                .recordDate(sdf.format(savedProgress.getRecordDate()))
                .build();
    }

    // Lấy tiến độ của người dùng theo email
    public ProgressResponse getProgressByEmail(String email) {
        Progress progress = progressRepository.findByEmail(email);
        if (progress == null) {
            return null; // Hoặc ném exception nếu không tìm thấy
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return ProgressResponse.builder()
                .id(progress.getId())
                .email(progress.getEmail())
                .weight(progress.getWeight())
                .height(progress.getHeight())
                .waist(progress.getWaist())
                .bodyFat(progress.getBodyFat())
                .recordDate(sdf.format(progress.getRecordDate()))
                .build();
    }
}
