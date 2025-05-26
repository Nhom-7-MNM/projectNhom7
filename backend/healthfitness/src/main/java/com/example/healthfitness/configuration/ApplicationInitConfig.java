package com.example.healthfitness.configuration;

// Import các lớp cần thiết
import com.example.healthfitness.entity.User;
import com.example.healthfitness.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Configuration // Đánh dấu đây là lớp cấu hình Spring
@RequiredArgsConstructor // Tự động tạo constructor có các tham số là final fields
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true) // Thiết lập mặc định cho các field: private và final
@Slf4j // Tạo logger tên là "log" để ghi log
public class ApplicationInitConfig {

    // Bean PasswordEncoder dùng để mã hóa mật khẩu người dùng bằng thuật toán BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Bean ApplicationRunner sẽ chạy sau khi ứng dụng khởi động
    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Danh sách email tài khoản admin cần được tạo mặc định
            List<String> adminEmails = Arrays.asList("admin@gmail.com", "admin1@gmail.com", "admin2@gmail.com");

            // Tạo một Set chứa quyền ROLE_ADMIN
            var roles = new HashSet<String>();
            roles.add("ROLE_ADMIN");

            // Lặp qua từng email trong danh sách
            for (String email : adminEmails) {
                // Nếu tài khoản đã tồn tại trong DB thì ghi log và bỏ qua
                if (userRepository.findByEmail(email).isPresent()) {
                    log.warn("Admin {} already exists, skipping creation.", email);
                } else {
                    // Nếu chưa tồn tại thì tạo mới user với mật khẩu "admin" đã được mã hóa
                    User user = User.builder()
                            .email(email)
                            .password(passwordEncoder.encode("admin"))  // Mật khẩu mặc định là "admin"
                            .roles(roles) // Gán quyền ROLE_ADMIN
                            .build();
                    
                    // Lưu user vào DB
                    userRepository.save(user);
                    log.info("Admin {} added successfully.", email);
                }
            }
        };
    }
}
