# SearchForge REST API Specification

OpenAPI / Swagger documentation available interactively at `/swagger-ui.html`.

## Endpoints Summary

### 1. Search Query Execution
`GET /api/v1/search`

**Query Parameters:**
- `q` (string, required): Search query
- `algorithm` (string, default "BM25"): Ranking algorithm (`BM25` or `TF-IDF`)
- `page` (int, default 1): Page number
- `size` (int, default 10): Results per page
- `category` (string, optional): Filter by document category

**Response (200 OK):**
```json
{
  "query": "java spring",
  "algorithm": "BM25",
  "executionTimeMs": 8,
  "totalResults": 142,
  "page": 1,
  "size": 10,
  "cacheHit": false,
  "results": [
    {
      "id": 1,
      "title": "Java 21 Virtual Threads and Spring Boot 3",
      "contentSnippet": "...simplifying concurrent programming...",
      "url": "https://docs.oracle.com/...",
      "category": "Documentation",
      "tags": "Java, Spring Boot",
      "score": 4.82,
      "matchedTerms": ["java", "spring"]
    }
  ]
}
```

### 2. Trie Autocomplete Suggestions
`GET /api/v1/autocomplete?q=jav&limit=5`

**Response (200 OK):**
```json
[
  "java spring boot",
  "java 21 virtual threads",
  "javascript"
]
```

### 3. Document Ingestion
`POST /api/v1/documents`

**Request Body:**
```json
{
  "title": "Distributed Systems & Consistency",
  "content": "Full body text...",
  "url": "https://...",
  "category": "Articles",
  "tags": "Distributed Systems, Consistency",
  "author": "Architect"
}
```

### 4. Engineering Benchmark Runner
`POST /api/v1/engineering/benchmark?docCount=1000&queryCount=100`

### 5. Analytics Summary
`GET /api/v1/analytics/summary`
