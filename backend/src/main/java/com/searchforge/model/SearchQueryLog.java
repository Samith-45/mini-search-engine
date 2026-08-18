package com.searchforge.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "search_query_logs")
public class SearchQueryLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "query_text", nullable = false, length = 500)
    private String queryText;

    @Column(nullable = false, length = 50)
    private String algorithm;

    @Column(name = "execution_time_ms", nullable = false)
    private Long executionTimeMs;

    @Column(name = "total_results", nullable = false)
    private Integer totalResults;

    @Column(name = "cache_hit")
    private Boolean cacheHit = false;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public SearchQueryLog() {}

    public SearchQueryLog(String queryText, String algorithm, Long executionTimeMs, Integer totalResults, Boolean cacheHit) {
        this.queryText = queryText;
        this.algorithm = algorithm;
        this.executionTimeMs = executionTimeMs;
        this.totalResults = totalResults;
        this.cacheHit = cacheHit;
    }

    public Long getId() { return id; }
    public String getQueryText() { return queryText; }
    public String getAlgorithm() { return algorithm; }
    public Long getExecutionTimeMs() { return executionTimeMs; }
    public Integer getTotalResults() { return totalResults; }
    public Boolean getCacheHit() { return cacheHit; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
