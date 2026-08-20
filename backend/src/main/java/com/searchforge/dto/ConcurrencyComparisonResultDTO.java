package com.searchforge.dto;

public class ConcurrencyComparisonResultDTO {
    private String threadModel; // "Platform OS Threads", "Fixed Thread Pool (50)", "Java 21 Virtual Threads (Loom)"
    private int concurrencyLevel;
    private int totalOperations;
    private double operationsPerSecond;
    private double p50LatencyMs;
    private double p95LatencyMs;
    private double p99LatencyMs;
    private double memoryUsedMb;
    private int activeThreadCount;
    private int errorCount;
    private String notes;

    public ConcurrencyComparisonResultDTO() {}

    public ConcurrencyComparisonResultDTO(String threadModel, int concurrencyLevel, int totalOperations, double operationsPerSecond, double p50LatencyMs, double p95LatencyMs, double p99LatencyMs, double memoryUsedMb, int activeThreadCount, int errorCount, String notes) {
        this.threadModel = threadModel;
        this.concurrencyLevel = concurrencyLevel;
        this.totalOperations = totalOperations;
        this.operationsPerSecond = operationsPerSecond;
        this.p50LatencyMs = p50LatencyMs;
        this.p95LatencyMs = p95LatencyMs;
        this.p99LatencyMs = p99LatencyMs;
        this.memoryUsedMb = memoryUsedMb;
        this.activeThreadCount = activeThreadCount;
        this.errorCount = errorCount;
        this.notes = notes;
    }

    public String getThreadModel() { return threadModel; }
    public void setThreadModel(String threadModel) { this.threadModel = threadModel; }

    public int getConcurrencyLevel() { return concurrencyLevel; }
    public void setConcurrencyLevel(int concurrencyLevel) { this.concurrencyLevel = concurrencyLevel; }

    public int getTotalOperations() { return totalOperations; }
    public void setTotalOperations(int totalOperations) { this.totalOperations = totalOperations; }

    public double getOperationsPerSecond() { return operationsPerSecond; }
    public void setOperationsPerSecond(double operationsPerSecond) { this.operationsPerSecond = operationsPerSecond; }

    public double getP50LatencyMs() { return p50LatencyMs; }
    public void setP50LatencyMs(double p50LatencyMs) { this.p50LatencyMs = p50LatencyMs; }

    public double getP95LatencyMs() { return p95LatencyMs; }
    public void setP95LatencyMs(double p95LatencyMs) { this.p95LatencyMs = p95LatencyMs; }

    public double getP99LatencyMs() { return p99LatencyMs; }
    public void setP99LatencyMs(double p99LatencyMs) { this.p99LatencyMs = p99LatencyMs; }

    public double getMemoryUsedMb() { return memoryUsedMb; }
    public void setMemoryUsedMb(double memoryUsedMb) { this.memoryUsedMb = memoryUsedMb; }

    public int getActiveThreadCount() { return activeThreadCount; }
    public void setActiveThreadCount(int activeThreadCount) { this.activeThreadCount = activeThreadCount; }

    public int getErrorCount() { return errorCount; }
    public void setErrorCount(int errorCount) { this.errorCount = errorCount; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
