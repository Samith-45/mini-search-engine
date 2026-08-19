package com.searchforge.config;

import java.net.URI;
import javax.sql.DataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class DatabaseConfig {

    private static final Logger log = LoggerFactory.getLogger(DatabaseConfig.class);

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
        String finalUsername = username;
        String finalPassword = password;

        if (finalUrl.startsWith("postgresql://") || finalUrl.startsWith("postgres://")) {
            try {
                // Convert URI format postgresql://user:pass@host:port/db into clean JDBC format
                URI uri = URI.create(finalUrl);
                String host = uri.getHost();
                int port = uri.getPort() > 0 ? uri.getPort() : 5432;
                String path = uri.getPath();

                if (uri.getUserInfo() != null) {
                    String[] userParts = uri.getUserInfo().split(":", 2);
                    finalUsername = userParts[0];
                    if (userParts.length > 1) {
                        finalPassword = userParts[1];
                    }
                }

                finalUrl = String.format("jdbc:postgresql://%s:%d%s", host, port, path);
                log.info("Parsed PostgreSQL connection URI successfully. JDBC URL: jdbc:postgresql://{}:{}{}", host, port, path);
            } catch (Exception e) {
                log.warn("Could not parse database URI into JDBC components, falling back to raw URL prepend", e);
                finalUrl = "jdbc:" + finalUrl;
            }
        }

        DataSourceBuilder<?> builder = DataSourceBuilder.create();
        builder.url(finalUrl);

        if (finalUrl.startsWith("jdbc:h2:")) {
            builder.driverClassName("org.h2.Driver");
            builder.username(finalUsername);
            builder.password(finalPassword);
        } else if (finalUrl.startsWith("jdbc:postgresql:")) {
            builder.driverClassName("org.postgresql.Driver");
            builder.username(finalUsername);
            builder.password(finalPassword);
        }

        return builder.build();
    }
}
