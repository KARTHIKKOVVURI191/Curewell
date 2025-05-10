package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Component
public class DefaultUserConfig implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if default user exists
        if (!userRepository.findByEmail("karthikkovvuri21@gmail.com").isPresent()) {
            User defaultUser = new User();
            defaultUser.setUserName("Karthik Kovvuri");
            defaultUser.setEmail("karthikkovvuri21@gmail.com");
            defaultUser.setPassword(passwordEncoder.encode("123"));
            defaultUser.setRole("patient");
            userRepository.save(defaultUser);
        }
    }
} 