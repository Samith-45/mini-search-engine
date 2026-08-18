package com.searchforge.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("SearchForge — Intelligent Mini Search Engine API")
                        .version("1.0.0")
                        .description("High-performance Search Engine REST API built from first principles in Java 21 & Spring Boot.")
                        .contact(new Contact()
                                .name("SearchForge Engineering")
                                .url("https://github.com/searchforge/mini-search-engine")));
    }
}
