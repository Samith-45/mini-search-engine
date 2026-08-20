package com.searchforge.core.distributed;

import com.searchforge.core.ranking.RankingStrategy;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Cluster Topology Manager for SearchForge Distributed Search.
 * Supports dynamic configuration profiles (A: Single Node, B: Single+Cache, C: Sharded, D: Sharded+Replicas).
 */
@Component
public class DistributedClusterManager {

    public enum ClusterConfigProfile {
        CONFIG_A_SINGLE_NODE("Single Node Baseline", 1, 0, false),
        CONFIG_B_SINGLE_NODE_CACHE("Single Node + Redis Cache", 1, 0, true),
        CONFIG_C_SHARDED("3 Search Shards (Hash-Partitioned)", 3, 0, true),
        CONFIG_D_SHARDED_REPLICATED("3 Shards + 3 Replicas (High Availability)", 3, 3, true);

        private final String displayName;
        private final int primaryShards;
        private final int replicaShards;
        private final boolean cacheEnabled;

        ClusterConfigProfile(String displayName, int primaryShards, int replicaShards, boolean cacheEnabled) {
            this.displayName = displayName;
            this.primaryShards = primaryShards;
            this.replicaShards = replicaShards;
            this.cacheEnabled = cacheEnabled;
        }

        public String getDisplayName() { return displayName; }
        public int getPrimaryShards() { return primaryShards; }
        public int getReplicaShards() { return replicaShards; }
        public boolean isCacheEnabled() { return cacheEnabled; }
    }

    private ClusterConfigProfile activeProfile = ClusterConfigProfile.CONFIG_D_SHARDED_REPLICATED;
    private final List<SearchShard> primaryShards = new CopyOnWriteArrayList<>();
    private final List<SearchShard> replicaShards = new CopyOnWriteArrayList<>();
    private ShardedSearchRouter router;

    public DistributedClusterManager() {
        applyProfile(ClusterConfigProfile.CONFIG_D_SHARDED_REPLICATED);
    }

    public synchronized void applyProfile(ClusterConfigProfile profile) {
        this.activeProfile = profile;
        primaryShards.clear();
        replicaShards.clear();

        int numPrimaries = profile.getPrimaryShards();
        for (int i = 0; i < numPrimaries; i++) {
            primaryShards.add(new SearchShard("shard-pri-" + (i + 1), i, numPrimaries, "10.0.1." + (10 + i), 8080 + i, true));
        }

        int numReplicas = profile.getReplicaShards();
        for (int i = 0; i < numReplicas; i++) {
            replicaShards.add(new SearchShard("shard-rep-" + (i + 1), i % numPrimaries, numPrimaries, "10.0.2." + (20 + i), 9080 + i, false));
        }

        this.router = new ShardedSearchRouter(primaryShards, replicaShards);
    }

    public void indexDocument(long docId, List<String> terms) {
        for (SearchShard primary : primaryShards) {
            if (primary.ownsDocument(docId)) {
                primary.addDocument(docId, terms);
            }
        }
        for (SearchShard replica : replicaShards) {
            if (replica.ownsDocument(docId)) {
                replica.addDocument(docId, terms);
            }
        }
    }

    public ShardedSearchRouter.ShardedSearchResult search(List<String> queryTerms, RankingStrategy strategy, int topK, long timeoutMs) {
        return router.scatterGatherSearch(queryTerms, strategy, topK, timeoutMs);
    }

    public List<SearchShard> getPrimaryShards() { return Collections.unmodifiableList(primaryShards); }
    public List<SearchShard> getReplicaShards() { return Collections.unmodifiableList(replicaShards); }
    public ClusterConfigProfile getActiveProfile() { return activeProfile; }

    public SearchShard findShardById(String shardId) {
        for (SearchShard s : primaryShards) {
            if (s.getShardId().equalsIgnoreCase(shardId)) return s;
        }
        for (SearchShard s : replicaShards) {
            if (s.getShardId().equalsIgnoreCase(shardId)) return s;
        }
        return null;
    }
}
