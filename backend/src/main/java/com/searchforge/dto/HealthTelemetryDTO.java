package com.searchforge.dto;

import com.searchforge.model.ExperimentRecord;
import java.time.LocalDateTime;

public class HealthTelemetryDTO {
    private String status;
    private double jvmHeapUsedMb;
    private double jvmHeapMaxMb;
    private double jvmHeapTotalMb;
    private int totalDocuments;
    private long totalTokens;
    private int vocabularySize;
    private int primaryShards;
    private int replicaShards;
    private double cacheHitRatio;
    private long totalQueriesLogged;
    private String threadModel;
    private long experimentCount;
    private ExperimentRecord latestExperiment;
    private LocalDateTime serverTimestamp;
    private String gitCommit;

    public HealthTelemetryDTO() {}

    public HealthTelemetryDTO(String status, double jvmHeapUsedMb, double jvmHeapMaxMb, double jvmHeapTotalMb,
                              int totalDocuments, long totalTokens, int vocabularySize, int primaryShards,
                              int replicaShards, double cacheHitRatio, long totalQueriesLogged,
                              String threadModel, long experimentCount, ExperimentRecord latestExperiment,
                              LocalDateTime serverTimestamp, String gitCommit) {
        this.status = status;
        this.jvmHeapUsedMb = jvmHeapUsedMb;
        this.jvmHeapMaxMb = jvmHeapMaxMb;
        this.jvmHeapTotalMb = jvmHeapTotalMb;
        this.totalDocuments = totalDocuments;
        this.totalTokens = totalTokens;
        this.vocabularySize = vocabularySize;
        this.primaryShards = primaryShards;
        this.replicaShards = replicaShards;
        this.cacheHitRatio = cacheHitRatio;
        this.totalQueriesLogged = totalQueriesLogged;
        this.threadModel = threadModel;
        this.experimentCount = experimentCount;
        this.latestExperiment = latestExperiment;
        this.serverTimestamp = serverTimestamp;
        this.gitCommit = gitCommit;
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public double getJvmHeapUsedMb() { return jvmHeapUsedMb; }
    public void setJvmHeapUsedMb(double jvmHeapUsedMb) { this.jvmHeapUsedMb = jvmHeapUsedMb; }
    public double getJvmHeapMaxMb() { return jvmHeapMaxMb; }
    public void setJvmHeapMaxMb(double jvmHeapMaxMb) { this.jvmHeapMaxMb = jvmHeapMaxMb; }
    public double getJvmHeapTotalMb() { return jvmHeapTotalMb; }
    public void setJvmHeapTotalMb(double jvmHeapTotalMb) { this.jvmHeapTotalMb = jvmHeapTotalMb; }
    public int getTotalDocuments() { return totalDocuments; }
    public void setTotalDocuments(int totalDocuments) { this.totalDocuments = totalDocuments; }
    public long getTotalTokens() { return totalTokens; }
    public void setTotalTokens(long totalTokens) { this.totalTokens = totalTokens; }
    public int getVocabularySize() { return vocabularySize; }
    public void setVocabularySize(int vocabularySize) { this.vocabularySize = vocabularySize; }
    public int getPrimaryShards() { return primaryShards; }
    public void setPrimaryShards(int primaryShards) { this.primaryShards = primaryShards; }
    public int getReplicaShards() { return replicaShards; }
    public void setReplicaShards(int replicaShards) { this.replicaShards = replicaShards; }
    public double getCacheHitRatio() { return cacheHitRatio; }
    public void setCacheHitRatio(double cacheHitRatio) { this.cacheHitRatio = cacheHitRatio; }
    public long getTotalQueriesLogged() { return totalQueriesLogged; }
    public void setTotalQueriesLogged(long totalQueriesLogged) { this.totalQueriesLogged = totalQueriesLogged; }
    public String getThreadModel() { return threadModel; }
    public void setThreadModel(String threadModel) { this.threadModel = threadModel; }
    public long getExperimentCount() { return experimentCount; }
    public void setExperimentCount(long experimentCount) { this.experimentCount = experimentCount; }
    public ExperimentRecord getLatestExperiment() { return latestExperiment; }
    public void setLatestExperiment(ExperimentRecord latestExperiment) { this.latestExperiment = latestExperiment; }
    public LocalDateTime getServerTimestamp() { return serverTimestamp; }
    public void setServerTimestamp(LocalDateTime serverTimestamp) { this.serverTimestamp = serverTimestamp; }
    public String getGitCommit() { return gitCommit; }
    public void setGitCommit(String gitCommit) { this.gitCommit = gitCommit; }
}
