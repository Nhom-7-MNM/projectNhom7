package com.example.healthfitness.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;

import java.util.Set;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@EntityScan
public class UseResponse {

        @Id
        String id;
        String fullName;
        String email;
        String phone;
        Set<String> roles;
}
