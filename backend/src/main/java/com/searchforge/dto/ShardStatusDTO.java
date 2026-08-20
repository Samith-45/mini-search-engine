package com.searchforge.dto;

public class ShardStatusDTO {
    private String shardId;
    private int partitionIndex;
    private String host;
    private int port;
    private boolean isPrimary;
    private boolean isHealthy;
    private int artificialLatencyMs;
    private long documentCount;

    public ShardStatusDTO() {}

    public ShardStatusDTO(String shardId, int partitionIndex, String host, int port, boolean isPrimary, boolean isHealthy, int artificialLatencyMs, long documentCount) {
        this.shardId = shardId;
        this.partitionIndex = partitionIndex;
        this.host = host;
        this.port = port;
        this.isPrimary = isPrimary;
        this.isHealthy = isHealthy;
        this.artificialLatencyMs = artificialLatencyMs;
        this.documentCount = documentCount;
    }

    public String getShardId() { return shardId; }
    public void setShardId(String shardId) { this.shardId = shardId; }

    public int getPartitionIndex() { return partitionIndex; }
    public void setPartitionIndex(int partitionIndex) { this.partitionIndex = partitionIndex; }

    public String getHost() { return host; }
    public void setHost(String host) { this.host = host; }

    public int getPort() { return port; }
    public void setPort(int port) { this.port = port; }

    public boolean isPrimary() { return isPrimary; }
    public void setPrimary(boolean primary) { isPrimary = primary; }

    public boolean isHealthy() { return isHealthy; }
    public void setHealthy(boolean healthy) { isHealthy = healthy; }

    public int getArtificialLatencyMs() { return artificialLatencyMs; }
    public void setArtificialLatencyMs(int artificialLatencyMs) { this.artificialLatencyMs = artificialLatencyMs; }

    public long getDocumentCount() { return documentCount; }
    public void setDocumentCount(long documentCount) { this.documentCount = documentCount; }
}
