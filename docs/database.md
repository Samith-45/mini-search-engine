# Database Schema & Migration Strategy

SearchForge utilizes PostgreSQL for relational document persistence and search analytics tracking.

## ERD Schema Design

### `documents` Table
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique document ID |
| `title` | VARCHAR(500) | NOT NULL | Document title |
| `content` | TEXT | NOT NULL | Full body text |
| `url` | VARCHAR(1000) | NULL | External resource URL |
| `category` | VARCHAR(100) | INDEXED | Category classification |
| `tags` | VARCHAR(500) | NULL | Comma-separated tags |
| `author` | VARCHAR(200) | NULL | Author name |
| `doc_length` | INT | DEFAULT 0 | Word count after normalization |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Ingestion timestamp |

### `search_query_logs` Table
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique query log ID |
| `query_text` | VARCHAR(500) | NOT NULL | Search query executed |
| `algorithm` | VARCHAR(50) | NOT NULL | BM25 or TF-IDF |
| `execution_time_ms` | BIGINT | NOT NULL | Execution latency |
| `total_results` | INT | NOT NULL | Match count |
| `cache_hit` | BOOLEAN | DEFAULT FALSE | Redis cache hit flag |
| `created_at` | TIMESTAMP | INDEXED | Execution timestamp |

## Migration Strategy

Database migrations are managed via **Flyway** (`V1__init_schema.sql`). Schema changes are version-controlled and executed automatically on boot.
To avoid N+1 query problems, candidate document retrieval fetches documents in batch using JPA repository primary key lookups (`findAllById`).
