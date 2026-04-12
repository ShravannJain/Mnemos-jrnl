package com.shravan.mnemos.config;

import com.shravan.mnemos.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringSecurity {

    // REMOVED: @Autowired private PasswordEncoder passwordEncoder; // This caused the circular dependency

    // Injecting UserDetailsService is correct as it's a different bean.
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
/*  This bean tells Spring to use BCrypt for password hashing and comparison.
    During registration, we manually encode the password before saving.
    During login, Spring uses this encoder to compare the entered password with the stored hashed password.*/
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
/* his config tells Spring to use my UserDetailsService to fetch users and PasswordEncoder to verify passwords during login. */
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        // This correctly uses the passwordEncoder() bean defined below
        authenticationManagerBuilder
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder()); // Explicitly use the bean method
        return authenticationManagerBuilder.build();
    }
/* this bean just tell or decide which APIs need login and how login works , here we can define what end point is allowed without
* requiring to authenticate yourself */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for API testing/Postman
                .httpBasic(Customizer.withDefaults()) // Enable basic auth (prompts for username/password)
                .authorizeHttpRequests(authorize -> authorize
                        // Allow access to user registration endpoint (assuming it's /user/register)
                        .requestMatchers("/user/register").permitAll() // Make registration public
                        // Secure all other /user/** endpoints
                        .requestMatchers("/user/login").permitAll()
                        .requestMatchers("/user/**").authenticated()
                        // Lock down all other requests
                        .anyRequest().authenticated()
                )
                .build();
    }
}
