package com.searchforge.core.distributed;

import com.searchforge.core.index.InvertedIndex;
import com.searchforge.core.index.PostingList;
import com.searchforge.core.ranking.RankingStrategy;
import com.searchforge.core.ranking.ScoreResult;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Encapsulates an inverted index partition in the distributed cluster.
 * Manages document ranges, active state, health status, and simulated network delays.
 */
public class SearchShard {

    private final String shardId;
    private final int partitionIndex;
    private final int totalPartitions;
    private final InvertedIndex index;
    private final AtomicBoolean isHealthy;
    private final AtomicBoolean isPrimary;
    private final AtomicInteger artificialLatencyMs;
    private String nodeHost;
    private int port;
    private long totalDocuments;

    public SearchShard(String shardId, int partitionIndex, int totalPartitions, String nodeHost, int port, boolean isPrimary) {
        this.shardId = shardId;
        this.partitionIndex = partitionIndex;
        this.totalPartitions = totalPartitions;
        this.index = new InvertedIndex();
        this.isHealthy = new AtomicBoolean(true);
        this.isPrimary = new AtomicBoolean(isPrimary);
        this.artificialLatencyMs = new AtomicInteger(0);
        this.nodeHost = nodeHost;
        this.port = port;
        this.totalDocuments = 0;
    }

    public boolean ownsDocument(long docId) {
        return (Math.abs(docId) % totalPartitions) == partitionIndex;
    }

    public void addDocument(long docId, List<String> terms) {
        index.addDocument(docId, terms);
        totalDocuments = index.getTotalDocuments();
    }

    public Set<Long> searchCandidates(Collection<String> terms) {
        if (!isHealthy.get()) {
            throw new IllegalStateException("Shard " + shardId + " is down or unavailable");
        }
        int delay = artificialLatencyMs.get();
        if (delay > 0) {
            try {
                Thread.sleep(delay);
            } catch (InterruptedException ignored) {
                Thread.currentThread().interrupt();
            }
        }
        Set<Long> candidates = new HashSet<>();
        for (String term : terms) {
            PostingList pl = index.getPostingList(term);
            if (pl != null) {
                candidates.addAll(pl.getDocumentIds());
            }
        }
        return candidates;
    }

    public List<ScoreResult> rankCandidates(Set<Long> candidates, List<String> queryTerms, RankingStrategy strategy) {
        if (!isHealthy.get()) {
            throw new IllegalStateException("Shard " + shardId + " is down or unavailable");
        }
        return strategy.rank(candidates, queryTerms, index);
    }

    public String getShardId() {
        return shardId;
    }

    public int getPartitionIndex() {
        return partitionIndex;
    }

    public int getTotalPartitions() {
        return totalPartitions;
    }

    public InvertedIndex getIndex() {
        return index;
    }

    public boolean isHealthy() {
        return isHealthy.get();
    }

    public void setHealthy(boolean healthy) {
        this.isHealthy.set(healthy);
    }

    public boolean isPrimary() {
        return isPrimary.get();
    }

    public void setPrimary(boolean primary) {
        this.isPrimary.set(primary);
    }

    public int getArtificialLatencyMs() {
        return artificialLatencyMs.get();
    }

    public void setArtificialLatencyMs(int latencyMs) {
        this.artificialLatencyMs.set(latencyMs);
    }

    public String getNodeHost() {
        return nodeHost;
    }

    public int getPort() {
        return port;
    }

    public long getTotalDocuments() {
        return index.getTotalDocuments();
    }
}
