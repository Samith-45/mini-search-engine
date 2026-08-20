package com.searchforge.controller;

import com.searchforge.core.index.InvertedIndex;
import com.searchforge.core.ranking.RelevanceEvaluator;
import com.searchforge.dto.RelevanceEvaluationResult;
import com.searchforge.service.DocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/relevance")
public class RelevanceController {

    private final DocumentService documentService;
    private final RelevanceEvaluator evaluator;

    public RelevanceController(DocumentService documentService) {
        this.documentService = documentService;
        this.evaluator = new RelevanceEvaluator();
    }

    @GetMapping("/evaluate")
    public ResponseEntity<List<RelevanceEvaluationResult>> evaluateRelevance(
            @RequestParam(defaultValue = "50") int queryCount
    ) {
        InvertedIndex index = documentService.getInvertedIndex();

        List<RelevanceEvaluator.GroundTruthQuery> fullTestSet = buildComprehensiveTestSet();
        List<RelevanceEvaluator.GroundTruthQuery> testSet = fullTestSet.subList(0, Math.min(queryCount, fullTestSet.size()));

        List<RelevanceEvaluationResult> results = evaluator.evaluateAll(index, testSet);
        return ResponseEntity.ok(results);
    }

    private List<RelevanceEvaluator.GroundTruthQuery> buildComprehensiveTestSet() {
        List<RelevanceEvaluator.GroundTruthQuery> queries = new ArrayList<>();

        // 1. Algorithms & Data Structures
        queries.add(new RelevanceEvaluator.GroundTruthQuery("inverted index posting list traversal", Set.of(21L, 22L, 37L, 52L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("trie autocomplete prefix tree lookup", Set.of(22L, 37L, 52L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("binary search tree red black self balancing", Set.of(21L, 22L, 37L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("lsm tree sstable log structured merge", Set.of(24L, 39L, 54L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("b plus tree indexing database range queries", Set.of(24L, 39L, 54L)));

        // 2. Distributed Systems & Consensus
        queries.add(new RelevanceEvaluator.GroundTruthQuery("raft distributed consensus leader election", Set.of(2L, 12L, 27L, 43L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("paxos distributed state machine replication", Set.of(2L, 12L, 27L, 43L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("vector clocks causality conflict resolution", Set.of(2L, 12L, 27L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("two phase commit 2pc atomic transactions", Set.of(2L, 12L, 27L, 43L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("consistent hashing virtual node sharding", Set.of(2L, 12L, 27L)));

        // 3. Concurrency & Multithreading
        queries.add(new RelevanceEvaluator.GroundTruthQuery("Java 21 virtual threads Project Loom", Set.of(1L, 3L, 19L, 35L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("lock free queues compare and swap CAS", Set.of(1L, 3L, 19L, 35L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("Java Memory Model JMM volatile memory barrier", Set.of(1L, 3L, 19L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("actor model message passing akka concurrency", Set.of(1L, 3L, 19L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("async await event loop preemptive scheduling", Set.of(1L, 3L, 19L, 35L)));

        // 4. Information Retrieval & Ranking
        queries.add(new RelevanceEvaluator.GroundTruthQuery("Okapi BM25 non linear term saturation formula", Set.of(21L, 22L, 37L, 52L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("TF IDF term frequency inverse document frequency", Set.of(21L, 22L, 37L, 52L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("NDCG normalized discounted cumulative gain ranking", Set.of(21L, 22L, 37L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("mean reciprocal rank MRR evaluation metric", Set.of(21L, 22L, 37L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("vector search HNSW cosine similarity embeddings", Set.of(4L, 7L, 13L, 31L)));

        // 5. Databases & Caching
        queries.add(new RelevanceEvaluator.GroundTruthQuery("PostgreSQL B-Tree versus GIN inverted index", Set.of(24L, 39L, 54L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("Redis cache aside query acceleration TTL", Set.of(25L, 40L, 55L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("MVCC multi version concurrency control snapshot", Set.of(24L, 39L, 54L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("write ahead logging WAL database crash recovery", Set.of(24L, 39L, 54L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("buffer pool LRU 2Q database memory management", Set.of(24L, 39L, 54L)));

        // 6. Operating Systems & Kernel
        queries.add(new RelevanceEvaluator.GroundTruthQuery("eBPF Linux kernel tracing and observability", Set.of(26L, 41L, 56L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("io_uring asynchronous I/O syscall interface", Set.of(26L, 41L, 56L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("virtual memory page tables translation lookaside buffer", Set.of(26L, 41L, 56L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("DPDK data plane development kit kernel bypass", Set.of(26L, 41L, 56L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("Linux cgroups namespaces container isolation", Set.of(26L, 41L, 56L)));

        // 7. Compilers & AI Runtimes
        queries.add(new RelevanceEvaluator.GroundTruthQuery("LLVM intermediate representation IR JIT compiler", Set.of(27L, 42L, 57L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("FlashAttention-2 fast CUDA kernel attention memory", Set.of(8L, 9L, 14L, 20L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("vLLM PagedAttention high throughput GPU inference", Set.of(8L, 9L, 14L, 20L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("DeepSeek-R1 mixture of experts reasoning architecture", Set.of(8L, 9L, 14L, 20L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("llama.cpp pure C++ quantized GGUF execution", Set.of(8L, 9L, 14L, 20L)));

        // 8. Popular AI Tools Ecosystem
        queries.add(new RelevanceEvaluator.GroundTruthQuery("ChatGPT GPT-4o multimodal OpenAI conversational AI", Set.of(1L, 2L, 3L, 4L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("Claude 3.5 Sonnet Anthropic artifacts assistant", Set.of(1L, 2L, 3L, 4L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("Grok xAI real time vision model reasoning", Set.of(1L, 2L, 3L, 4L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("Google Gemini 2.0 Flash multimodal DeepMind", Set.of(1L, 2L, 3L, 4L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("Bolt.new StackBlitz webcontainers full stack AI app", Set.of(5L, 6L, 7L)));

        // 9. System Design & Cloud Architecture
        queries.add(new RelevanceEvaluator.GroundTruthQuery("token bucket rate limiting distributed API gateway", Set.of(10L, 15L, 30L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("circuit breaker fault tolerance pattern resilience", Set.of(10L, 15L, 30L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("event driven architecture Kafka message streaming", Set.of(10L, 15L, 30L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("Layer 4 versus Layer 7 load balancer routing", Set.of(10L, 15L, 30L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("content delivery network CDN edge caching", Set.of(10L, 15L, 30L)));

        // 10. Certifications & Roadmaps
        queries.add(new RelevanceEvaluator.GroundTruthQuery("NeetCode 150 data structures algorithms roadmap", Set.of(28L, 43L, 58L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("System Design interview high level low level roadmap", Set.of(28L, 43L, 58L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("AWS Solutions Architect professional certification", Set.of(29L, 44L, 59L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("Google Cloud GCP Professional Cloud Architect", Set.of(29L, 44L, 59L)));
        queries.add(new RelevanceEvaluator.GroundTruthQuery("Oracle Certified Professional Java 21 Developer 1Z0-830", Set.of(29L, 44L, 59L)));

        return queries;
    }
}
