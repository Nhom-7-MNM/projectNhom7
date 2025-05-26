package com.example.healthfitness.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "progress")
public class Progress {
    @Id
    String id;

    // Liên kết với người dùng: sử dụng email thay vì userId
    String email;

    // Các thông số tiến độ
    Double weight;    // cân nặng
    Double height;    // chiều cao
    Double waist;     // vòng eo
    Double bodyFat;   // lượng mỡ cơ thể

    // Thời điểm ghi chép tiến độ
    Date recordDate;
}
