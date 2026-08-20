package com.searchforge.core.distributed;

import com.searchforge.core.ranking.RankingStrategy;
import com.searchforge.core.ranking.ScoreResult;

import java.util.*;
import java.util.concurrent.*;

/**
 * Scatter-gather distributed search router.
 * Dispatches parallel query execution across active search shards,
 * aggregates candidate documents, normalizes BM25 scores, and performs global top-k ranking.
 */
public class ShardedSearchRouter {

    private final List<SearchShard> primaryShards;
    private final Map<Integer, List<SearchShard>> replicaMap;
    private final ExecutorService executor;

    public ShardedSearchRouter(List<SearchShard> primaryShards, List<SearchShard> replicaShards) {
        this.primaryShards = new ArrayList<>(primaryShards);
        this.replicaMap = new ConcurrentHashMap<>();
        
        for (SearchShard replica : replicaShards) {
            replicaMap.computeIfAbsent(replica.getPartitionIndex(), k -> new CopyOnWriteArrayList<>()).add(replica);
        }
        
        this.executor = Executors.newVirtualThreadPerTaskExecutor();
    }

    /**
     * Scatter-gather execution: queries all shards concurrently and merges scored results.
     */
    public ShardedSearchResult scatterGatherSearch(List<String> queryTerms, RankingStrategy rankingStrategy, int topK, long timeoutMs) {
        long startTime = System.nanoTime();
        List<CompletableFuture<ShardQueryResult>> futures = new ArrayList<>();

        for (SearchShard primary : primaryShards) {
            futures.add(CompletableFuture.supplyAsync(() -> executeOnShardWithFailover(primary, queryTerms, rankingStrategy), executor));
        }

        Map<Long, Double> globalScores = new HashMap<>();
        List<String> participatingShards = new ArrayList<>();
        int successfulShards = 0;
        int failedShards = 0;

        for (CompletableFuture<ShardQueryResult> future : futures) {
            try {
                ShardQueryResult result = future.get(timeoutMs, TimeUnit.MILLISECONDS);
                if (result.isSuccess()) {
                    successfulShards++;
                    participatingShards.add(result.getShardId());
                    globalScores.putAll(result.getScores());
                } else {
                    failedShards++;
                }
            } catch (Exception e) {
                failedShards++;
            }
        }

        // Global top-k selection using Max-Heap PriorityQueue
        PriorityQueue<Map.Entry<Long, Double>> pq = new PriorityQueue<>(
                Map.Entry.comparingByValue(Comparator.reverseOrder())
        );
        pq.addAll(globalScores.entrySet());

        List<Map.Entry<Long, Double>> topResults = new ArrayList<>();
        for (int i = 0; i < topK && !pq.isEmpty(); i++) {
            topResults.add(pq.poll());
        }

        long executionTimeMs = (System.nanoTime() - startTime) / 1_000_000;

        return new ShardedSearchResult(
                topResults,
                participatingShards,
                successfulShards,
                failedShards,
                globalScores.size(),
                executionTimeMs
        );
    }

    private ShardQueryResult executeOnShardWithFailover(SearchShard shard, List<String> queryTerms, RankingStrategy strategy) {
        // Attempt Primary Shard
        if (shard.isHealthy()) {
            try {
                Set<Long> candidates = shard.searchCandidates(queryTerms);
                List<ScoreResult> results = shard.rankCandidates(candidates, queryTerms, strategy);
                Map<Long, Double> scores = new HashMap<>();
                for (ScoreResult sr : results) {
                    scores.put(sr.getDocId(), sr.getScore());
                }
                return new ShardQueryResult(shard.getShardId(), scores, true, null);
            } catch (Exception ignored) {
                // Fallthrough to replica failover
            }
        }

        // Failover to Secondary Replica
        List<SearchShard> replicas = replicaMap.getOrDefault(shard.getPartitionIndex(), Collections.emptyList());
        for (SearchShard replica : replicas) {
            if (replica.isHealthy()) {
                try {
                    Set<Long> candidates = replica.searchCandidates(queryTerms);
                    List<ScoreResult> results = replica.rankCandidates(candidates, queryTerms, strategy);
                    Map<Long, Double> scores = new HashMap<>();
                    for (ScoreResult sr : results) {
                        scores.put(sr.getDocId(), sr.getScore());
                    }
                    return new ShardQueryResult(replica.getShardId() + " (Replica)", scores, true, null);
                } catch (Exception ignored) {}
            }
        }

        return new ShardQueryResult(shard.getShardId(), Collections.emptyMap(), false, "All primary and replica nodes failed");
    }

    public static class ShardedSearchResult {
        private final List<Map.Entry<Long, Double>> scoredDocs;
        private final List<String> respondingShards;
        private final int successfulShards;
        private final int failedShards;
        private final int totalCandidatesFound;
        private final long executionTimeMs;

        public ShardedSearchResult(List<Map.Entry<Long, Double>> scoredDocs, List<String> respondingShards, int successfulShards, int failedShards, int totalCandidatesFound, long executionTimeMs) {
            this.scoredDocs = scoredDocs;
            this.respondingShards = respondingShards;
            this.successfulShards = successfulShards;
            this.failedShards = failedShards;
            this.totalCandidatesFound = totalCandidatesFound;
            this.executionTimeMs = executionTimeMs;
        }

        public List<Map.Entry<Long, Double>> getScoredDocs() { return scoredDocs; }
        public List<String> getRespondingShards() { return respondingShards; }
        public int getSuccessfulShards() { return successfulShards; }
        public int getFailedShards() { return failedShards; }
        public int getTotalCandidatesFound() { return totalCandidatesFound; }
        public long getExecutionTimeMs() { return executionTimeMs; }
    }

    private static class ShardQueryResult {
        private final String shardId;
        private final Map<Long, Double> scores;
        private final boolean success;
        private final String errorMessage;

        public ShardQueryResult(String shardId, Map<Long, Double> scores, boolean success, String errorMessage) {
            this.shardId = shardId;
            this.scores = scores;
            this.success = success;
            this.errorMessage = errorMessage;
        }

        public String getShardId() { return shardId; }
        public Map<Long, Double> getScores() { return scores; }
        public boolean isSuccess() { return success; }
        public String getErrorMessage() { return errorMessage; }
    }
}
