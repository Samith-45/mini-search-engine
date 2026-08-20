package com.searchforge.model;

import java.time.LocalDateTime;

public class IndexingJob {
    private String jobId;
    private String corpusVersion;
    private long totalDocuments;
    private long processedDocuments;
    private String status; // "PENDING", "RUNNING", "COMPLETED", "FAILED"
    private double documentsPerSecond;
    private long elapsedTimeMs;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public IndexingJob() {}

    public IndexingJob(String jobId, String corpusVersion, long totalDocuments) {
        this.jobId = jobId;
        this.corpusVersion = corpusVersion;
        this.totalDocuments = totalDocuments;
        this.processedDocuments = 0;
        this.status = "PENDING";
        this.startTime = LocalDateTime.now();
    }

    public String getJobId() { return jobId; }
    public void setJobId(String jobId) { this.jobId = jobId; }

    public String getCorpusVersion() { return corpusVersion; }
    public void setCorpusVersion(String corpusVersion) { this.corpusVersion = corpusVersion; }

    public long getTotalDocuments() { return totalDocuments; }
    public void setTotalDocuments(long totalDocuments) { this.totalDocuments = totalDocuments; }

    public long getProcessedDocuments() { return processedDocuments; }
    public void setProcessedDocuments(long processedDocuments) { this.processedDocuments = processedDocuments; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public double getDocumentsPerSecond() { return documentsPerSecond; }
    public void setDocumentsPerSecond(double documentsPerSecond) { this.documentsPerSecond = documentsPerSecond; }

    public long getElapsedTimeMs() { return elapsedTimeMs; }
    public void setElapsedTimeMs(long elapsedTimeMs) { this.elapsedTimeMs = elapsedTimeMs; }

    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
}
