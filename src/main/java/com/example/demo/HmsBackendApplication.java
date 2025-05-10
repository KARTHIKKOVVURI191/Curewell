package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.demo", "com.hms"})
@EntityScan("com.example.demo.entity")
@EnableJpaRepositories("com.example.demo.repository")
public class HmsBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(HmsBackendApplication.class, args);
    }
} 