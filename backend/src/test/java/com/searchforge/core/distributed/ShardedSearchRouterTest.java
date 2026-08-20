package com.searchforge.core.distributed;

import com.searchforge.core.ranking.BM25RankingStrategy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

public class ShardedSearchRouterTest {

    private ShardedSearchRouter router;
    private List<SearchShard> primaryShards;
    private List<SearchShard> replicaShards;

    @BeforeEach
    void setUp() {
        primaryShards = new ArrayList<>();
        replicaShards = new ArrayList<>();

        for (int i = 0; i < 3; i++) {
            SearchShard primary = new SearchShard("shard-pri-" + (i + 1), i, 3, "127.0.0.1", 8080 + i, true);
            SearchShard replica = new SearchShard("shard-rep-" + (i + 1), i, 3, "127.0.0.1", 9080 + i, false);

            primary.addDocument((long) (i + 1), Arrays.asList("distributed", "search", "engine", "java"));
            replica.addDocument((long) (i + 1), Arrays.asList("distributed", "search", "engine", "java"));

            primaryShards.add(primary);
            replicaShards.add(replica);
        }

        router = new ShardedSearchRouter(primaryShards, replicaShards);
    }

    @Test
    void testScatterGatherSearchAllShardsHealthy() {
        ShardedSearchRouter.ShardedSearchResult result = router.scatterGatherSearch(
                Arrays.asList("distributed", "engine"),
                new BM25RankingStrategy(),
                10,
                2000
        );

        assertNotNull(result);
        assertEquals(3, result.getSuccessfulShards());
        assertEquals(0, result.getFailedShards());
        assertEquals(3, result.getTotalCandidatesFound());
        assertFalse(result.getScoredDocs().isEmpty());
    }

    @Test
    void testReplicaFailoverWhenPrimaryFails() {
        // Kill Primary Shard 1
        primaryShards.get(0).setHealthy(false);

        ShardedSearchRouter.ShardedSearchResult result = router.scatterGatherSearch(
                Arrays.asList("distributed", "engine"),
                new BM25RankingStrategy(),
                10,
                2000
        );

        assertNotNull(result);
        // Replica should take over shard 1, maintaining all 3 shards successful
        assertEquals(3, result.getSuccessfulShards());
        assertEquals(0, result.getFailedShards());
        assertEquals(3, result.getTotalCandidatesFound());
    }
}
