package com.searchforge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.searchforge.repository")
@EntityScan(basePackages = "com.searchforge.model")
public class SearchForgeApplication {

    public static void main(String[] args) {
        SpringApplication.run(SearchForgeApplication.class, args);
    }
}
