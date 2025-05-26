package com.example.healthfitness.configuration;

import com.example.healthfitness.enums.Role;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity



public class SecurityConfig {


    private final String[] PUBLIC_MATCHERS = {"/Users","/auth/log-in","/auth/introspect", "/progress"};


    @NonFinal

    protected static final String SINGER_KEY = "zCF7fXaCoR08sSAFy+fi1Lg+oF8oTMRlkl0qxP9Guilbrz+RXs+GJoLbn4oscHsQ";

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // ✅ Thêm CORS
                .authorizeHttpRequests(request -> request
                        // Cho phép tất cả các request POST đến /chat
                        .requestMatchers(HttpMethod.POST, "/chat").permitAll()
                        // Cho phép các endpoint khác theo PUBLIC_MATCHERS
                        .requestMatchers(HttpMethod.POST, PUBLIC_MATCHERS).permitAll()
                        // Ví dụ cho /Users chỉ Admin mới được truy cập (nếu cần)
                        .requestMatchers(HttpMethod.GET, "/Users").hasRole(Role.ADMIN.name())
                        // Cho phép tất cả mọi người xem bài viết
                        .requestMatchers(HttpMethod.GET, "/posts/**").permitAll()
                        // Chỉ Admin mới có quyền tạo, cập nhật, xóa bài viết
                        .requestMatchers(HttpMethod.POST, "/posts").hasRole(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/posts/**").hasRole(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/posts/**").hasRole(Role.ADMIN.name())
                        // Cho phép GET các endpoint /progress/**
                        .requestMatchers("/admin/**").hasRole(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.GET, "/progress/**").permitAll()
                        .anyRequest().authenticated()
                )

                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwtConfigurer -> jwtConfigurer.decoder(jwtDecoder())))
                .csrf(csrf -> csrf.disable()); // ❌ Tắt CSRF nếu không dùng session

        return httpSecurity.build();
    }
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000"); // ✅ Cho phép React truy cập
        configuration.addAllowedMethod("*"); // ✅ Cho phép tất cả phương thức HTTP
        configuration.addAllowedHeader("*"); // ✅ Cho phép tất cả headers
        configuration.setAllowCredentials(true); // ✅ Cho phép gửi cookie & token

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();


        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

        return jwtAuthenticationConverter;
    }

    @Bean
    JwtDecoder jwtDecoder() {

        SecretKeySpec secretKeySpec = new SecretKeySpec(SINGER_KEY.getBytes(), "HS512");
        return NimbusJwtDecoder
                .withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();



    };


    PasswordEncoder passwordEncoder(){

        return new BCryptPasswordEncoder(10);
    };

}