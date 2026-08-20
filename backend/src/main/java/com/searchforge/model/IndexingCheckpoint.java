package com.searchforge.model;

import java.time.LocalDateTime;

public class IndexingCheckpoint {
    private String checkpointId;
    private String jobId;
    private long lastIndexedDocId;
    private long totalIndexedTokens;
    private double memoryFootprintMb;
    private LocalDateTime timestamp;

    public IndexingCheckpoint() {}

    public IndexingCheckpoint(String checkpointId, String jobId, long lastIndexedDocId, long totalIndexedTokens, double memoryFootprintMb) {
        this.checkpointId = checkpointId;
        this.jobId = jobId;
        this.lastIndexedDocId = lastIndexedDocId;
        this.totalIndexedTokens = totalIndexedTokens;
        this.memoryFootprintMb = memoryFootprintMb;
        this.timestamp = LocalDateTime.now();
    }

    public String getCheckpointId() { return checkpointId; }
    public void setCheckpointId(String checkpointId) { this.checkpointId = checkpointId; }

    public String getJobId() { return jobId; }
    public void setJobId(String jobId) { this.jobId = jobId; }

    public long getLastIndexedDocId() { return lastIndexedDocId; }
    public void setLastIndexedDocId(long lastIndexedDocId) { this.lastIndexedDocId = lastIndexedDocId; }

    public long getTotalIndexedTokens() { return totalIndexedTokens; }
    public void setTotalIndexedTokens(long totalIndexedTokens) { this.totalIndexedTokens = totalIndexedTokens; }

    public double getMemoryFootprintMb() { return memoryFootprintMb; }
    public void setMemoryFootprintMb(double memoryFootprintMb) { this.memoryFootprintMb = memoryFootprintMb; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
