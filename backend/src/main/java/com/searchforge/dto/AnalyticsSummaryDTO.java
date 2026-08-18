package com.searchforge.dto;

public class AnalyticsSummaryDTO {

    private long totalSearches;
    private double avgLatencyMs;
    private long zeroResultQueries;
    private double cacheHitRatio;
    private int indexedDocumentsCount;

    public AnalyticsSummaryDTO() {}

    public AnalyticsSummaryDTO(long totalSearches, double avgLatencyMs, long zeroResultQueries, double cacheHitRatio, int indexedDocumentsCount) {
        this.totalSearches = totalSearches;
        this.avgLatencyMs = avgLatencyMs;
        this.zeroResultQueries = zeroResultQueries;
        this.cacheHitRatio = cacheHitRatio;
        this.indexedDocumentsCount = indexedDocumentsCount;
    }

    public long getTotalSearches() { return totalSearches; }
    public double getAvgLatencyMs() { return avgLatencyMs; }
    public long getZeroResultQueries() { return zeroResultQueries; }
    public double getCacheHitRatio() { return cacheHitRatio; }
    public int getIndexedDocumentsCount() { return indexedDocumentsCount; }
}
