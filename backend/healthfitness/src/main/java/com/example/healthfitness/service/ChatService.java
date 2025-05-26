package com.example.healthfitness.service;

import com.example.healthfitness.dto.request.ChatRequest;
import com.example.healthfitness.dto.response.ChatResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public ChatResponse askQuestion(ChatRequest chatRequest) {
        try {
            // Cấu hình URL với API Key
            String requestUrl = geminiApiUrl + "?key=" + geminiApiKey;

            // Tạo header
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Định dạng payload JSON đúng với API Gemini
            String payload = "{ \"contents\": [{ \"parts\": [{ \"text\": \"" + chatRequest.getQuestion() + "\" }] }] }";

            HttpEntity<String> requestEntity = new HttpEntity<>(payload, headers);

            // Gọi API
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(requestUrl, requestEntity, String.class);

            // Kiểm tra HTTP Status Code
            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                // Parse JSON response
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(responseEntity.getBody());

                // Trích xuất câu trả lời từ JSON response (tùy theo cấu trúc thực tế)
                String answer = rootNode.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();

                return new ChatResponse(answer);
            } else {
                return new ChatResponse("Lỗi: API trả về mã " + responseEntity.getStatusCodeValue());
            }
        } catch (Exception e) {
            return new ChatResponse("Lỗi hệ thống: " + e.getMessage());
        }
    }
}
