CREATE TABLE IF NOT EXISTS documents (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    url VARCHAR(1000),
    category VARCHAR(100),
    tags VARCHAR(500),
    author VARCHAR(200),
    doc_length INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS search_query_logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    query_text VARCHAR(500) NOT NULL,
    algorithm VARCHAR(50) NOT NULL,
    execution_time_ms BIGINT NOT NULL,
    total_results INT NOT NULL,
    cache_hit BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON search_query_logs(created_at);
