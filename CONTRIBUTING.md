# Contributing to SearchForge

Thank you for your interest in contributing to **SearchForge**! We welcome contributions from developers, researchers, and students.

## Guidelines

1. **Keep Core Zero-Dependency**: The search engine core in `backend/src/main/java/com/searchforge/core` MUST remain pure Java with zero external framework dependencies.
2. **First Principles Implementation**: Do NOT introduce external search engines like Lucene, Elasticsearch, or Algolia for core indexing/ranking logic.
3. **Automated Unit Tests**: All new algorithms, query parsers, or normalizers must include comprehensive JUnit 5 unit test cases.
4. **Code Quality**: Enforce clean naming, SOLID principles, immutability where appropriate, and Java 21 features.

## Local Development Workflow

1. Fork and clone the repository.
2. Build backend: `cd backend && mvn clean test`
3. Run backend locally: `mvn spring-boot:run`
4. Build frontend: `cd frontend && npm install && npm run dev`
5. Submit a Pull Request against `main`.
