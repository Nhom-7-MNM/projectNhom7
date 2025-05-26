package com.example.healthfitness.controller;


import com.example.healthfitness.dto.request.ChatRequest;
import com.example.healthfitness.dto.response.ChatResponse;
import com.example.healthfitness.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest chatRequest) {
        return chatService.askQuestion(chatRequest);
    }
}
