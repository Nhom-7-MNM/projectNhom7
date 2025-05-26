package com.example.healthfitness.dto.request;



import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {



     String fullName;
     String email;
     String phone;

    @Size(min = 8, message = "USERNAME_INVALID")
     String password;


     String role;



}
