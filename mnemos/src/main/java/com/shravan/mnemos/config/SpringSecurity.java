package com.shravan.mnemos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.Customizer;
   import org.springframework.security.config.annotation.web.builders.HttpSecurity;
   import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
   import org.springframework.security.web.SecurityFilterChain;
@Configuration
public class SpringSecurity {
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();

    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/user/**").permitAll()   // 🔓 Allow public sign-up
                        .anyRequest().authenticated()               // 🔒 Lock everything else
                )
                .csrf(AbstractHttpConfigurer::disable)          // 🛠️ Disable CSRF for Postman/API
                .httpBasic(Customizer.withDefaults())           // 🔑 Basic auth for other URLs
                .build();
    }
}
