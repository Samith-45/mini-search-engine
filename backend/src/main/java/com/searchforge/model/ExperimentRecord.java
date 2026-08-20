package com.searchforge.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "experiment_records")
public class ExperimentRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String experimentName;

    @Column(nullable = false)
    private String gitCommit;

    private int documentCount;
    private int shardCount;
    private int concurrencyLevel;
    private boolean cacheEnabled;
    private int totalQueries;

    private double queriesPerSec;
    private double p50LatencyMs;
    private double p90LatencyMs;
    private double p95LatencyMs;
    private double p99LatencyMs;
    private double maxLatencyMs;
    private double indexingThroughputDocsPerSec;
    private double memoryUsedMb;
    private double errorRatePercent;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    public ExperimentRecord() {
        this.timestamp = LocalDateTime.now();
        this.gitCommit = "70ee5bb";
    }

    public ExperimentRecord(String experimentName, String gitCommit, int documentCount, int shardCount,
                            int concurrencyLevel, boolean cacheEnabled, int totalQueries, double queriesPerSec,
                            double p50LatencyMs, double p90LatencyMs, double p95LatencyMs, double p99LatencyMs,
                            double maxLatencyMs, double indexingThroughputDocsPerSec, double memoryUsedMb,
                            double errorRatePercent) {
        this.experimentName = experimentName;
        this.gitCommit = gitCommit;
        this.documentCount = documentCount;
        this.shardCount = shardCount;
        this.concurrencyLevel = concurrencyLevel;
        this.cacheEnabled = cacheEnabled;
        this.totalQueries = totalQueries;
        this.queriesPerSec = queriesPerSec;
        this.p50LatencyMs = p50LatencyMs;
        this.p90LatencyMs = p90LatencyMs;
        this.p95LatencyMs = p95LatencyMs;
        this.p99LatencyMs = p99LatencyMs;
        this.maxLatencyMs = maxLatencyMs;
        this.indexingThroughputDocsPerSec = indexingThroughputDocsPerSec;
        this.memoryUsedMb = memoryUsedMb;
        this.errorRatePercent = errorRatePercent;
        this.timestamp = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getExperimentName() { return experimentName; }
    public void setExperimentName(String experimentName) { this.experimentName = experimentName; }
    public String getGitCommit() { return gitCommit; }
    public void setGitCommit(String gitCommit) { this.gitCommit = gitCommit; }
    public int getDocumentCount() { return documentCount; }
    public void setDocumentCount(int documentCount) { this.documentCount = documentCount; }
    public int getShardCount() { return shardCount; }
    public void setShardCount(int shardCount) { this.shardCount = shardCount; }
    public int getConcurrencyLevel() { return concurrencyLevel; }
    public void setConcurrencyLevel(int concurrencyLevel) { this.concurrencyLevel = concurrencyLevel; }
    public boolean isCacheEnabled() { return cacheEnabled; }
    public void setCacheEnabled(boolean cacheEnabled) { this.cacheEnabled = cacheEnabled; }
    public int getTotalQueries() { return totalQueries; }
    public void setTotalQueries(int totalQueries) { this.totalQueries = totalQueries; }
    public double getQueriesPerSec() { return queriesPerSec; }
    public void setQueriesPerSec(double queriesPerSec) { this.queriesPerSec = queriesPerSec; }
    public double getP50LatencyMs() { return p50LatencyMs; }
    public void setP50LatencyMs(double p50LatencyMs) { this.p50LatencyMs = p50LatencyMs; }
    public double getP90LatencyMs() { return p90LatencyMs; }
    public void setP90LatencyMs(double p90LatencyMs) { this.p90LatencyMs = p90LatencyMs; }
    public double getP95LatencyMs() { return p95LatencyMs; }
    public void setP95LatencyMs(double p95LatencyMs) { this.p95LatencyMs = p95LatencyMs; }
    public double getP99LatencyMs() { return p99LatencyMs; }
    public void setP99LatencyMs(double p99LatencyMs) { this.p99LatencyMs = p99LatencyMs; }
    public double getMaxLatencyMs() { return maxLatencyMs; }
    public void setMaxLatencyMs(double maxLatencyMs) { this.maxLatencyMs = maxLatencyMs; }
    public double getIndexingThroughputDocsPerSec() { return indexingThroughputDocsPerSec; }
    public void setIndexingThroughputDocsPerSec(double indexingThroughputDocsPerSec) { this.indexingThroughputDocsPerSec = indexingThroughputDocsPerSec; }
    public double getMemoryUsedMb() { return memoryUsedMb; }
    public void setMemoryUsedMb(double memoryUsedMb) { this.memoryUsedMb = memoryUsedMb; }
    public double getErrorRatePercent() { return errorRatePercent; }
    public void setErrorRatePercent(double errorRatePercent) { this.errorRatePercent = errorRatePercent; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
