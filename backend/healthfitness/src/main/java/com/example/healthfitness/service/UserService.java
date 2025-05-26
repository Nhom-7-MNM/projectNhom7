package com.example.healthfitness.service;


import com.example.healthfitness.dto.request.UserCreationRequest;
import com.example.healthfitness.dto.request.UserUpdateRequest;
import com.example.healthfitness.entity.User;
import com.example.healthfitness.exception.AppException;
import com.example.healthfitness.exception.ErrorCode;
import com.example.healthfitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    public User createUser(UserCreationRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("ErrorCode.USER_EXISTED");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(request.getPassword()));


        HashSet<String> roles = new HashSet<>();
        roles.add("ROLE_USER");
        user.setRoles(roles);




            user.setPassword(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(user);
    }
        public List<User> getUsers() {
             return (List<User>) userRepository.findAll();

}
    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found  "));
    }

    public User updateUser(String userId ,UserUpdateRequest Request){

        User user = getUserById(userId);

        user.setPhone(Request.getPhone());
        user.setEmail(Request.getEmail());
        user.setPassword(Request.getPassword());


        return userRepository.save(user);
    }

    public void deleteUser(String userId) {

        userRepository.deleteById(userId);
    }
}
