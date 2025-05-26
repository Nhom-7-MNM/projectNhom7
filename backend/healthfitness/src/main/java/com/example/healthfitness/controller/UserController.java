package com.example.healthfitness.controller;


import com.example.healthfitness.dto.request.ApiResponse;
import com.example.healthfitness.dto.request.UserCreationRequest;
import com.example.healthfitness.dto.request.UserUpdateRequest;
import com.example.healthfitness.entity.User;
import com.example.healthfitness.service.UserService;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.Valid;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Validated
@CrossOrigin(origins = "http://localhost:3000") // Cho phép React gọi API
@RestController
@RequestMapping("/Users")
public class UserController {

    @Autowired
    private UserService userService;
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    @PostMapping
    ApiResponse<User> createUser(@RequestBody @Valid UserCreationRequest request) {
        ApiResponse<User> apiResponse = new ApiResponse<>();

        apiResponse.setResult(userService.createUser(request));

        return apiResponse;
    }

    @GetMapping
    public List<User> getAllUsers() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Ghi log thông tin authentication
        log.info("User '{}' is accessing GET /users", authentication.getName());
        log.info("Authorities: {}", authentication.getAuthorities());

        return userService.getUsers();
    }

    @GetMapping("/{userId}")
    public User getUser(@PathVariable("userId") String userId) {
        return userService.getUserById(userId);
    }
    @PutMapping("/{userId}")
    User updateUser(@RequestBody UserUpdateRequest Request, @PathVariable("userId") String userId) {


        return  userService.updateUser(userId, Request);
    }

    @DeleteMapping("/{userId}")


    String deleteUser(@PathVariable("userId") String userId) {


    userService.deleteUser(userId);
    return "User has been deleted";


    }



}





