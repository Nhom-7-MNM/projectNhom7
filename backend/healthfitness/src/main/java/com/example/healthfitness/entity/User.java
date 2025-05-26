package com.example.healthfitness.entity;


import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@EntityScan
public class User  {
    @Id
     String id;
     String fullName;
     String email;
     String phone;
     String password;
     Set<String> roles;




}