package com.searchforge.core.benchmark;

/**
 * Result payload containing performance benchmarking metrics.
 */
public class BenchmarkResult {

    private final int documentCount;
    private final long indexingTimeMs;
    private final double indexingThroughputDocsPerSec;
    private final double avgQueryLatencyMs;
    private final double p95QueryLatencyMs;
    private final double p99QueryLatencyMs;
    private final double memoryUsedMb;

    public BenchmarkResult(int documentCount, long indexingTimeMs, double indexingThroughputDocsPerSec,
                           double avgQueryLatencyMs, double p95QueryLatencyMs, double p99QueryLatencyMs, double memoryUsedMb) {
        this.documentCount = documentCount;
        this.indexingTimeMs = indexingTimeMs;
        this.indexingThroughputDocsPerSec = indexingThroughputDocsPerSec;
        this.avgQueryLatencyMs = avgQueryLatencyMs;
        this.p95QueryLatencyMs = p95QueryLatencyMs;
        this.p99QueryLatencyMs = p99QueryLatencyMs;
        this.memoryUsedMb = memoryUsedMb;
    }

    public int getDocumentCount() { return documentCount; }
    public long getIndexingTimeMs() { return indexingTimeMs; }
    public double getIndexingThroughputDocsPerSec() { return indexingThroughputDocsPerSec; }
    public double getAvgQueryLatencyMs() { return avgQueryLatencyMs; }
    public double getP95QueryLatencyMs() { return p95QueryLatencyMs; }
    public double getP99QueryLatencyMs() { return p99QueryLatencyMs; }
    public double getMemoryUsedMb() { return memoryUsedMb; }
}
