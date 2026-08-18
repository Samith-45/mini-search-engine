package com.searchforge.core.benchmark;

import com.searchforge.core.index.InvertedIndex;
import com.searchforge.core.normalizer.DefaultTextNormalizer;
import com.searchforge.core.normalizer.TextNormalizer;
import com.searchforge.core.query.QueryNode;
import com.searchforge.core.query.QueryParser;
import com.searchforge.core.ranking.BM25RankingStrategy;
import com.searchforge.core.ranking.RankingStrategy;
import com.searchforge.core.tokenizer.SimpleTokenizer;
import com.searchforge.core.tokenizer.Tokenizer;

import java.util.*;

/**
 * Benchmark runner testing indexing throughput and P95/P99 query latency across document scales (e.g. 1k, 10k, 100k).
 */
public class SearchBenchmarkRunner {

    private static final String[] VOCABULARY = {
            "java", "spring", "boot", "postgresql", "redis", "distributed", "systems", "indexing",
            "search", "engine", "algorithm", "ranking", "bm25", "tfidf", "database", "concurrency",
            "microservices", "performance", "latency", "throughput", "cache", "memory", "trie", "autocomplete"
    };

    public BenchmarkResult runBenchmark(int docCount, int queryCount) {
        InvertedIndex index = new InvertedIndex();
        Tokenizer tokenizer = new SimpleTokenizer();
        TextNormalizer normalizer = new DefaultTextNormalizer();
        RankingStrategy rankingStrategy = new BM25RankingStrategy();
        QueryParser parser = new QueryParser(tokenizer, normalizer);

        Random random = new Random(42); // deterministic seed

        // 1. Benchmark Indexing Phase
        long startIndexing = System.nanoTime();
        for (long id = 1; id <= docCount; id++) {
            List<String> rawTokens = generateSyntheticDocument(random);
            List<String> normTokens = normalizer.normalizeTokens(rawTokens);
            index.addDocument(id, normTokens);
        }
        long endIndexing = System.nanoTime();
        long indexingTimeMs = (endIndexing - startIndexing) / 1_000_000;
        if (indexingTimeMs == 0) indexingTimeMs = 1; // avoid divide by zero

        double indexingThroughput = (double) docCount / (indexingTimeMs / 1000.0);

        // 2. Benchmark Query Execution Phase
        List<Long> latenciesNanos = new ArrayList<>();
        String[] benchmarkQueries = {"java spring", "distributed systems", "indexing algorithm", "postgresql redis", "search engine"};

        for (int q = 0; q < queryCount; q++) {
            String queryStr = benchmarkQueries[q % benchmarkQueries.length];
            long startQuery = System.nanoTime();

            QueryNode node = parser.parse(queryStr);
            Set<Long> candidates = node.evaluate(index);
            rankingStrategy.rank(candidates, node.getTerms(), index);

            long endQuery = System.nanoTime();
            latenciesNanos.add(endQuery - startQuery);
        }

        Collections.sort(latenciesNanos);

        double avgLatencyMs = latenciesNanos.stream().mapToLong(l -> l).average().orElse(0.0) / 1_000_000.0;
        int p95Idx = (int) Math.ceil(0.95 * latenciesNanos.size()) - 1;
        int p99Idx = (int) Math.ceil(0.99 * latenciesNanos.size()) - 1;

        double p95LatencyMs = latenciesNanos.get(Math.max(0, p95Idx)) / 1_000_000.0;
        double p99LatencyMs = latenciesNanos.get(Math.max(0, p99Idx)) / 1_000_000.0;

        Runtime runtime = Runtime.getRuntime();
        runtime.gc();
        double memoryUsedMb = (double) (runtime.totalMemory() - runtime.freeMemory()) / (1024 * 1024);

        return new BenchmarkResult(
                docCount,
                indexingTimeMs,
                indexingThroughput,
                avgLatencyMs,
                p95LatencyMs,
                p99LatencyMs,
                memoryUsedMb
        );
    }

    private List<String> generateSyntheticDocument(Random random) {
        int length = 50 + random.nextInt(100);
        List<String> tokens = new ArrayList<>(length);
        for (int i = 0; i < length; i++) {
            tokens.add(VOCABULARY[random.nextInt(VOCABULARY.length)]);
        }
        return tokens;
    }
}
