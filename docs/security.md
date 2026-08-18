# Security Architecture & Best Practices

## Security Controls Implemented

1. **Input Validation**: `DocumentRequestDTO` enforces Bean Validation rules (`@NotBlank`, `@Size`) preventing empty or oversized payloads.
2. **SQL Injection Defense**: Spring Data JPA utilizes parameterized queries (`PreparedStatement`) across all repositories, neutralizing SQL injection vectors.
3. **XSS Protection**: Next.js automatically escapes HTML content rendered in React components.
4. **CORS Configuration**: `CorsConfig` enforces explicit HTTP method permissions (`GET`, `POST`, `DELETE`, `OPTIONS`).
5. **Global Exception Handling**: Stack traces are intercepted by `GlobalExceptionHandler` and suppressed from API client responses, returning sanitized `ApiErrorResponse` DTOs.
