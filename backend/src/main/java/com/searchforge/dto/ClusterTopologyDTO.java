package com.searchforge.dto;

import java.util.List;

public class ClusterTopologyDTO {
    private String activeProfile;
    private String profileDescription;
    private int primaryShardCount;
    private int replicaShardCount;
    private boolean cacheEnabled;
    private long totalClusterDocuments;
    private List<ShardStatusDTO> primaryShards;
    private List<ShardStatusDTO> replicaShards;

    public ClusterTopologyDTO() {}

    public ClusterTopologyDTO(String activeProfile, String profileDescription, int primaryShardCount, int replicaShardCount, boolean cacheEnabled, long totalClusterDocuments, List<ShardStatusDTO> primaryShards, List<ShardStatusDTO> replicaShards) {
        this.activeProfile = activeProfile;
        this.profileDescription = profileDescription;
        this.primaryShardCount = primaryShardCount;
        this.replicaShardCount = replicaShardCount;
        this.cacheEnabled = cacheEnabled;
        this.totalClusterDocuments = totalClusterDocuments;
        this.primaryShards = primaryShards;
        this.replicaShards = replicaShards;
    }

    public String getActiveProfile() { return activeProfile; }
    public void setActiveProfile(String activeProfile) { this.activeProfile = activeProfile; }

    public String getProfileDescription() { return profileDescription; }
    public void setProfileDescription(String profileDescription) { this.profileDescription = profileDescription; }

    public int getPrimaryShardCount() { return primaryShardCount; }
    public void setPrimaryShardCount(int primaryShardCount) { this.primaryShardCount = primaryShardCount; }

    public int getReplicaShardCount() { return replicaShardCount; }
    public void setReplicaShardCount(int replicaShardCount) { this.replicaShardCount = replicaShardCount; }

    public boolean isCacheEnabled() { return cacheEnabled; }
    public void setCacheEnabled(boolean cacheEnabled) { this.cacheEnabled = cacheEnabled; }

    public long getTotalClusterDocuments() { return totalClusterDocuments; }
    public void setTotalClusterDocuments(long totalClusterDocuments) { this.totalClusterDocuments = totalClusterDocuments; }

    public List<ShardStatusDTO> getPrimaryShards() { return primaryShards; }
    public void setPrimaryShards(List<ShardStatusDTO> primaryShards) { this.primaryShards = primaryShards; }

    public List<ShardStatusDTO> getReplicaShards() { return replicaShards; }
    public void setReplicaShards(List<ShardStatusDTO> replicaShards) { this.replicaShards = replicaShards; }
}
