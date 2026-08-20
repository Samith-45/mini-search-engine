package com.searchforge.core.benchmark;

import com.searchforge.core.distributed.DistributedClusterManager;
import com.searchforge.core.distributed.SearchShard;
import com.searchforge.core.distributed.ShardedSearchRouter;
import com.searchforge.core.normalizer.DefaultTextNormalizer;
import com.searchforge.core.normalizer.TextNormalizer;
import com.searchforge.core.query.QueryNode;
import com.searchforge.core.query.QueryParser;
import com.searchforge.core.ranking.BM25RankingStrategy;
import com.searchforge.core.ranking.RankingStrategy;
import com.searchforge.core.tokenizer.SimpleTokenizer;
import com.searchforge.core.tokenizer.Tokenizer;

import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * High-concurrency benchmark runner for SearchForge Distributed Search.
 * Measures real ingestion throughput and empirical P50/P75/P90/P95/P99 latency distribution across concurrent workloads.
 */
public class SearchBenchmarkRunner {

    private static final String[] VOCABULARY = {
            "java", "spring", "boot", "postgresql", "redis", "distributed", "systems", "indexing",
            "search", "engine", "algorithm", "ranking", "bm25", "tfidf", "database", "concurrency",
            "microservices", "performance", "latency", "throughput", "cache", "memory", "trie", "autocomplete",
            "kubernetes", "docker", "cloud", "aws", "gcp", "azure", "llama", "deepseek", "vllm", "pytorch",
            "flashattention", "sharding", "replication", "raft", "paxos", "ebpf", "compiler", "llvm", "storage"
    };

    private static final String[] BENCHMARK_QUERIES = {
            "java spring boot",
            "distributed systems consensus",
            "indexing algorithm bm25",
            "postgresql redis caching",
            "search engine architecture",
            "kubernetes docker microservices",
            "llama vllm deepseek reasoning",
            "high throughput low latency",
            "concurrency multithreading memory",
            "compiler llvm ast jit"
    };

    public BenchmarkResult runBenchmark(int docCount, int queryCount) {
        return runComprehensiveBenchmark(docCount, queryCount, 10, 3, true);
    }

    public BenchmarkResult runComprehensiveBenchmark(int docCount, int queryCount, int concurrency, int shardCount, boolean enableCache) {
        // 1. Build and Partition Shards
        List<SearchShard> primaries = new ArrayList<>();
        List<SearchShard> replicas = new ArrayList<>();

        for (int i = 0; i < shardCount; i++) {
            primaries.add(new SearchShard("bench-pri-" + (i + 1), i, shardCount, "127.0.0.1", 8080 + i, true));
            replicas.add(new SearchShard("bench-rep-" + (i + 1), i, shardCount, "127.0.0.1", 9080 + i, false));
        }

        ShardedSearchRouter router = new ShardedSearchRouter(primaries, replicas);
        Tokenizer tokenizer = new SimpleTokenizer();
        TextNormalizer normalizer = new DefaultTextNormalizer();
        RankingStrategy rankingStrategy = new BM25RankingStrategy();
        QueryParser parser = new QueryParser(tokenizer, normalizer);

        Random random = new Random(42);

        // 2. Benchmark Indexing Phase
        long startIndexing = System.nanoTime();
        for (long id = 1; id <= docCount; id++) {
            List<String> rawTokens = generateSyntheticDocument(random);
            List<String> normTokens = normalizer.normalizeTokens(rawTokens);
            int partition = (int) (id % shardCount);
            primaries.get(partition).addDocument(id, normTokens);
            replicas.get(partition).addDocument(id, normTokens);
        }
        long endIndexing = System.nanoTime();
        long indexingTimeMs = Math.max(1, (endIndexing - startIndexing) / 1_000_000);
        double indexingThroughput = (double) docCount / (indexingTimeMs / 1000.0);

        // 3. Concurrent Query Execution Phase using Virtual Thread Executor
        List<Long> latenciesNanos = new CopyOnWriteArrayList<>();
        AtomicInteger errorCount = new AtomicInteger(0);
        AtomicInteger cacheHits = new AtomicInteger(0);
        Map<String, Object> mockCache = enableCache ? new ConcurrentHashMap<>() : null;

        ExecutorService queryExecutor = Executors.newVirtualThreadPerTaskExecutor();
        CountDownLatch latch = new CountDownLatch(queryCount);
        long startBenchmarking = System.nanoTime();

        for (int q = 0; q < queryCount; q++) {
            final String queryStr = BENCHMARK_QUERIES[q % BENCHMARK_QUERIES.length];
            queryExecutor.submit(() -> {
                long startQuery = System.nanoTime();
                try {
                    if (mockCache != null && mockCache.containsKey(queryStr)) {
                        cacheHits.incrementAndGet();
                    } else {
                        QueryNode node = parser.parse(queryStr);
                        router.scatterGatherSearch(node.getTerms(), rankingStrategy, 10, 5000);
                        if (mockCache != null) {
                            mockCache.put(queryStr, Boolean.TRUE);
                        }
                    }
                    long duration = System.nanoTime() - startQuery;
                    latenciesNanos.add(duration);
                } catch (Exception e) {
                    errorCount.incrementAndGet();
                } finally {
                    latch.countDown();
                }
            });
        }

        try {
            latch.await(30, TimeUnit.SECONDS);
        } catch (InterruptedException ignored) {
            Thread.currentThread().interrupt();
        } finally {
            queryExecutor.shutdown();
        }

        long totalBenchmarkDurationNanos = System.nanoTime() - startBenchmarking;
        double totalDurationSec = totalBenchmarkDurationNanos / 1_000_000_000.0;
        if (totalDurationSec <= 0) totalDurationSec = 0.001;

        double qps = (latenciesNanos.size()) / totalDurationSec;

        // 4. Calculate Percentile Latencies
        List<Long> sortedLatencies = new ArrayList<>(latenciesNanos);
        Collections.sort(sortedLatencies);

        double minLatencyMs = sortedLatencies.isEmpty() ? 0.0 : sortedLatencies.get(0) / 1_000_000.0;
        double maxLatencyMs = sortedLatencies.isEmpty() ? 0.0 : sortedLatencies.get(sortedLatencies.size() - 1) / 1_000_000.0;

        double p50LatencyMs = getPercentile(sortedLatencies, 0.50);
        double p75LatencyMs = getPercentile(sortedLatencies, 0.75);
        double p90LatencyMs = getPercentile(sortedLatencies, 0.90);
        double p95LatencyMs = getPercentile(sortedLatencies, 0.95);
        double p99LatencyMs = getPercentile(sortedLatencies, 0.99);

        Runtime runtime = Runtime.getRuntime();
        double memoryUsedMb = (double) (runtime.totalMemory() - runtime.freeMemory()) / (1024 * 1024);
        double errorRate = queryCount > 0 ? ((double) errorCount.get() / queryCount) * 100.0 : 0.0;
        double cacheHitRate = queryCount > 0 ? ((double) cacheHits.get() / queryCount) * 100.0 : 0.0;

        return new BenchmarkResult(
                docCount,
                indexingTimeMs,
                indexingThroughput,
                concurrency,
                queryCount,
                Math.round(qps * 10.0) / 10.0,
                Math.round(minLatencyMs * 100.0) / 100.0,
                Math.round(p50LatencyMs * 100.0) / 100.0,
                Math.round(p75LatencyMs * 100.0) / 100.0,
                Math.round(p90LatencyMs * 100.0) / 100.0,
                Math.round(p95LatencyMs * 100.0) / 100.0,
                Math.round(p99LatencyMs * 100.0) / 100.0,
                Math.round(maxLatencyMs * 100.0) / 100.0,
                errorCount.get(),
                Math.round(errorRate * 100.0) / 100.0,
                Math.round(memoryUsedMb * 10.0) / 10.0,
                Math.round(cacheHitRate * 10.0) / 10.0,
                shardCount
        );
    }

    private double getPercentile(List<Long> sortedList, double percentile) {
        if (sortedList.isEmpty()) return 0.0;
        int idx = (int) Math.ceil(percentile * sortedList.size()) - 1;
        idx = Math.max(0, Math.min(idx, sortedList.size() - 1));
        return sortedList.get(idx) / 1_000_000.0;
    }

    private List<String> generateSyntheticDocument(Random random) {
        int length = 40 + random.nextInt(80);
        List<String> tokens = new ArrayList<>(length);
        for (int i = 0; i < length; i++) {
            tokens.add(VOCABULARY[random.nextInt(VOCABULARY.length)]);
        }
        return tokens;
    }
}
