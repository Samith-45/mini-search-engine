CREATE TABLE IF NOT EXISTS experiment_records (
    id BIGSERIAL PRIMARY KEY,
    experiment_name VARCHAR(255) NOT NULL,
    git_commit VARCHAR(64) NOT NULL,
    document_count INT NOT NULL,
    shard_count INT NOT NULL,
    concurrency_level INT NOT NULL,
    cache_enabled BOOLEAN NOT NULL,
    total_queries INT NOT NULL,
    queries_per_sec DOUBLE PRECISION NOT NULL,
    p50_latency_ms DOUBLE PRECISION NOT NULL,
    p90_latency_ms DOUBLE PRECISION NOT NULL,
    p95_latency_ms DOUBLE PRECISION NOT NULL,
    p99_latency_ms DOUBLE PRECISION NOT NULL,
    max_latency_ms DOUBLE PRECISION NOT NULL,
    indexing_throughput_docs_per_sec DOUBLE PRECISION NOT NULL,
    memory_used_mb DOUBLE PRECISION NOT NULL,
    error_rate_percent DOUBLE PRECISION NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_experiments_timestamp ON experiment_records (timestamp DESC);
