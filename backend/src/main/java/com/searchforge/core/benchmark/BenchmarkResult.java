package com.searchforge.core.benchmark;

/**
 * Result payload containing comprehensive empirical benchmarking and concurrency load metrics.
 */
public class BenchmarkResult {

    private final int documentCount;
    private final long indexingTimeMs;
    private final double indexingThroughputDocsPerSec;
    private final int concurrencyLevel;
    private final int totalQueriesExecuted;
    private final double queriesPerSec;
    private final double minLatencyMs;
    private final double p50QueryLatencyMs;
    private final double p75QueryLatencyMs;
    private final double p90QueryLatencyMs;
    private final double p95QueryLatencyMs;
    private final double p99QueryLatencyMs;
    private final double maxLatencyMs;
    private final int errorCount;
    private final double errorRatePercent;
    private final double memoryUsedMb;
    private final double cacheHitRatePercent;
    private final int shardCount;

    public BenchmarkResult(int documentCount, long indexingTimeMs, double indexingThroughputDocsPerSec,
                           int concurrencyLevel, int totalQueriesExecuted, double queriesPerSec,
                           double minLatencyMs, double p50QueryLatencyMs, double p75QueryLatencyMs,
                           double p90QueryLatencyMs, double p95QueryLatencyMs, double p99QueryLatencyMs,
                           double maxLatencyMs, int errorCount, double errorRatePercent,
                           double memoryUsedMb, double cacheHitRatePercent, int shardCount) {
        this.documentCount = documentCount;
        this.indexingTimeMs = indexingTimeMs;
        this.indexingThroughputDocsPerSec = indexingThroughputDocsPerSec;
        this.concurrencyLevel = concurrencyLevel;
        this.totalQueriesExecuted = totalQueriesExecuted;
        this.queriesPerSec = queriesPerSec;
        this.minLatencyMs = minLatencyMs;
        this.p50QueryLatencyMs = p50QueryLatencyMs;
        this.p75QueryLatencyMs = p75QueryLatencyMs;
        this.p90QueryLatencyMs = p90QueryLatencyMs;
        this.p95QueryLatencyMs = p95QueryLatencyMs;
        this.p99QueryLatencyMs = p99QueryLatencyMs;
        this.maxLatencyMs = maxLatencyMs;
        this.errorCount = errorCount;
        this.errorRatePercent = errorRatePercent;
        this.memoryUsedMb = memoryUsedMb;
        this.cacheHitRatePercent = cacheHitRatePercent;
        this.shardCount = shardCount;
    }

    public int getDocumentCount() { return documentCount; }
    public long getIndexingTimeMs() { return indexingTimeMs; }
    public double getIndexingThroughputDocsPerSec() { return indexingThroughputDocsPerSec; }
    public int getConcurrencyLevel() { return concurrencyLevel; }
    public int getTotalQueriesExecuted() { return totalQueriesExecuted; }
    public double getQueriesPerSec() { return queriesPerSec; }
    public double getMinLatencyMs() { return minLatencyMs; }
    public double getAvgQueryLatencyMs() { return p50QueryLatencyMs; } // Backward compatibility
    public double getP50QueryLatencyMs() { return p50QueryLatencyMs; }
    public double getP75QueryLatencyMs() { return p75QueryLatencyMs; }
    public double getP90QueryLatencyMs() { return p90QueryLatencyMs; }
    public double getP95QueryLatencyMs() { return p95QueryLatencyMs; }
    public double getP99QueryLatencyMs() { return p99QueryLatencyMs; }
    public double getMaxLatencyMs() { return maxLatencyMs; }
    public int getErrorCount() { return errorCount; }
    public double getErrorRatePercent() { return errorRatePercent; }
    public double getMemoryUsedMb() { return memoryUsedMb; }
    public double getCacheHitRatePercent() { return cacheHitRatePercent; }
    public int getShardCount() { return shardCount; }
}
