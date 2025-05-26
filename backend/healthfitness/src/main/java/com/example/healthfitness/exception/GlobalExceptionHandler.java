package com.example.healthfitness.exception;

import com.example.healthfitness.dto.request.ApiResponse;
import com.nimbusds.jose.JOSEException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.text.ParseException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Xử lý lỗi ứng dụng
    @ExceptionHandler(value = AppException.class)
    public ResponseEntity<ApiResponse> handleAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    // Xử lý lỗi JWT Token không hợp lệ
    @ExceptionHandler(value = {JOSEException.class, ParseException.class})
    public ResponseEntity<ApiResponse> handleTokenException(Exception exception) {
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(ErrorCode.UNAUTHENTICATED.getCode()); // 1006
        apiResponse.setMessage("Invalid or expired token: " + exception.getMessage());

        return ResponseEntity.status(ErrorCode.UNAUTHENTICATED.getStatusCode()).body(apiResponse);
    }

    // Xử lý lỗi đầu vào không hợp lệ (Validation)
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        String errorKey = exception.getFieldError().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.valueOf(errorKey); // Kiểm tra lỗi từ Enum

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    // Xử lý lỗi chung (Chỉ nên dùng cho RuntimeException, tránh bắt tất cả)
    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<ApiResponse> handleRuntimeException(RuntimeException exception) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode()); // 9999
        apiResponse.setMessage(exception.getMessage()); // Trả về lỗi cụ thể

        return ResponseEntity.status(ErrorCode.UNCATEGORIZED_EXCEPTION.getStatusCode()).body(apiResponse);
    }
}
