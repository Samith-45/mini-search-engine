package com.searchforge.config;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class DatabaseConfig {

    @Value("${spring.datasource.url:jdbc:h2:mem:searchforgedb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE;MODE=PostgreSQL}")
    private String dbUrl;

    @Value("${spring.datasource.username:sa}")
    private String username;

    @Value("${spring.datasource.password:}")
    private String password;

    @Bean
    @Primary
    public DataSource dataSource() {
        String finalUrl = dbUrl;
        if (finalUrl.startsWith("postgresql://")) {
            finalUrl = "jdbc:" + finalUrl;
        }

        DataSourceBuilder<?> builder = DataSourceBuilder.create();
        builder.url(finalUrl);

        if (finalUrl.startsWith("jdbc:h2:")) {
            builder.driverClassName("org.h2.Driver");
            builder.username(username);
            builder.password(password);
        } else if (finalUrl.startsWith("jdbc:postgresql:")) {
            builder.driverClassName("org.postgresql.Driver");
            if (!username.equals("sa")) {
                builder.username(username);
                builder.password(password);
            }
        }

        return builder.build();
    }
}
