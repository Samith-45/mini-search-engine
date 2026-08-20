package com.searchforge.dto;

public class ReliabilityExperimentResult {
    private String faultAction;
    private String targetShardId;
    private String description;
    private double preFailureLatencyMs;
    private double degradedLatencyMs;
    private double postRecoveryLatencyMs;
    private long recoveryDurationMs;
    private double dataAvailabilityPercent;
    private double requestFailureRatePercent;
    private String analysis;

    public ReliabilityExperimentResult() {}

    public ReliabilityExperimentResult(String faultAction, String targetShardId, String description, double preFailureLatencyMs, double degradedLatencyMs, double postRecoveryLatencyMs, long recoveryDurationMs, double dataAvailabilityPercent, double requestFailureRatePercent, String analysis) {
        this.faultAction = faultAction;
        this.targetShardId = targetShardId;
        this.description = description;
        this.preFailureLatencyMs = preFailureLatencyMs;
        this.degradedLatencyMs = degradedLatencyMs;
        this.postRecoveryLatencyMs = postRecoveryLatencyMs;
        this.recoveryDurationMs = recoveryDurationMs;
        this.dataAvailabilityPercent = dataAvailabilityPercent;
        this.requestFailureRatePercent = requestFailureRatePercent;
        this.analysis = analysis;
    }

    public String getFaultAction() { return faultAction; }
    public void setFaultAction(String faultAction) { this.faultAction = faultAction; }

    public String getTargetShardId() { return targetShardId; }
    public void setTargetShardId(String targetShardId) { this.targetShardId = targetShardId; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPreFailureLatencyMs() { return preFailureLatencyMs; }
    public void setPreFailureLatencyMs(double preFailureLatencyMs) { this.preFailureLatencyMs = preFailureLatencyMs; }

    public double getDegradedLatencyMs() { return degradedLatencyMs; }
    public void setDegradedLatencyMs(double degradedLatencyMs) { this.degradedLatencyMs = degradedLatencyMs; }

    public double getPostRecoveryLatencyMs() { return postRecoveryLatencyMs; }
    public void setPostRecoveryLatencyMs(double postRecoveryLatencyMs) { this.postRecoveryLatencyMs = postRecoveryLatencyMs; }

    public long getRecoveryDurationMs() { return recoveryDurationMs; }
    public void setRecoveryDurationMs(long recoveryDurationMs) { this.recoveryDurationMs = recoveryDurationMs; }

    public double getDataAvailabilityPercent() { return dataAvailabilityPercent; }
    public void setDataAvailabilityPercent(double dataAvailabilityPercent) { this.dataAvailabilityPercent = dataAvailabilityPercent; }

    public double getRequestFailureRatePercent() { return requestFailureRatePercent; }
    public void setRequestFailureRatePercent(double requestFailureRatePercent) { this.requestFailureRatePercent = requestFailureRatePercent; }

    public String getAnalysis() { return analysis; }
    public void setAnalysis(String analysis) { this.analysis = analysis; }
}
