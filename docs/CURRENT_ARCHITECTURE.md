# SearchForge — Current Architecture & System Audit

**Document Version**: 2.0.0  
**Audit Timestamp**: August 2026  
**System Classification**: Standalone Distributed Information Retrieval & Systems Performance Platform  

---

## 1. Executive Summary

SearchForge is a custom, first-principles search engine and distributed performance engineering laboratory implemented in **Java 21 (Spring Boot 3)** with a **Next.js 14 (TypeScript / TailwindCSS)** user interface. 

Unlike standard search application wrappers that delegate indexing and query evaluation to Lucene, Elasticsearch, or Solr, SearchForge implements all core information retrieval algorithms directly in memory:
- **Tokenization & Normalization**: Custom punctuation stripping, stopword filtering, and light suffix stemming.
- **Inverted Index**: Memory-mapped hash-table structure storing sorted `PostingList` nodes with term frequencies ($TF$), document frequencies ($DF$), document lengths, and positional offsets.
- **Pluggable Relevance Scoring**: Okapi BM25 non-linear term frequency saturation ($k_1=1.2, b=0.75$) alongside classical Vector Space TF-IDF.
- **Prefix Autocomplete**: Memory-efficient $O(L)$ Trie (Prefix Tree) with top-$k$ frequency ranking.
- **Distributed Sharding & Routing**: Document-partitioned shards ($docId \pmod N$) evaluated concurrently via Java 21 Virtual Threads (Project Loom) with secondary replica failover.
- **Caching & Persistence**: PostgreSQL relational document storage with Flyway versioned migrations and Redis cache-aside query acceleration.

---

## 2. Current Component Architecture

```text
                                  ┌────────────────────────────────┐
                                  │   Next.js 14 User Interface    │
                                  │  (Search, 4 Labs, Observability│
                                  └───────────────┬────────────────┘
                                                  │ REST API / JSON (HTTP)
                                                  ▼
                                  ┌────────────────────────────────┐
                                  │    Spring Boot 3 API Layer     │
                                  │ (Controllers, Swagger OpenAPI) │
                                  └───────────────┬────────────────┘
                                                  │
                 ┌────────────────────────────────┼────────────────────────────────┐
                 │                                │                                │
                 ▼                                ▼                                ▼
  ┌──────────────────────────────┐ ┌──────────────────────────────┐ ┌──────────────────────────────┐
  │     ShardedSearchRouter      │ │       DocumentService        │ │     Analytics & Cache        │
  │ (Loom Virtual Threads Scatter│ │(JPA Entity & Inverted Index) │ │(Redis Cache-Aside & Query    │
  │  Gather Coordinator)         │ └──────────────┬───────────────┘ │ Logs)                        │
  └──────────────┬───────────────┘                │                 └──────────────┬───────────────┘
                 │                                ▼                                ▼
  ┌──────────────┴───────────────┐ ┌──────────────────────────────┐ ┌──────────────────────────────┐
  │    Distributed Shard Array   │ │      PostgreSQL Storage      │ │     Redis Key-Value Cache    │
  │  ┌───────────┐ ┌───────────┐ │ │ (Flyway Migrations, Corpus   │ │(Normalized Query Hashes with │
  │  │Primary S1 │ │Primary S2 │ │ │  Records, Experiment History)│ │ TTL Expiration)              │
  │  └─────┬─────┘ └─────┬─────┘ │ └──────────────────────────────┘ └──────────────────────────────┘
  │        │Failover     │Failover
  │  ┌─────┴─────┐ ┌─────┴─────┐ │
  │  │Replica S1 │ │Replica S2 │ │
  │  └───────────┘ └───────────┘ │
  └──────────────────────────────┘
```

---

## 3. Data Flow & Search Execution Pipeline

```text
User Query ("distributed systems")
       │
       ▼
[1. REST Controller & Query Cache Check] ──(Cache Hit)──> [Return Cached JSON under 0.8ms]
       │ (Cache Miss)
       ▼
[2. Lexical Analysis Pipeline]
  ├── SimpleTokenizer: Split on whitespace/punctuation -> ["distributed", "systems"]
  └── DefaultTextNormalizer: Lowercase + 100+ English Stopword Filter -> ["distributed", "system"]
       │
       ▼
[3. Distributed ShardedSearchRouter]
  ├── Concurrent Dispatch: Virtual Thread per Primary Shard (timeout = 3000ms)
  ├── Shard Partition: Evaluate local Inverted Index posting lists
  └── Failover Check: If Primary fails/times out, dynamically route to Hot Standby Replica
       │
       ▼
[4. Ranking Strategy Scoring]
  ├── Okapi BM25: Non-linear term saturation (k1=1.2, b=0.75) with document length normalization
  └── Term Explanation: Capture TF, IDF, length ratios, and relative term contributions
       │
       ▼
[5. Scatter-Gather Score Merge]
  ├── PriorityQueue (Max-Heap): Global Top-K document selection in O(N log K) time
  └── Redis Cache Insertion: Write result with 10-minute TTL
       │
       ▼
[6. Response Formatter] -> HTTP 200 JSON with matched terms, scores, and execution telemetry
```

---

## 4. Current System Strengths

1. **Zero External IR Dependencies**: Pure Java 21 implementation isolated from heavy frameworks, enabling full transparency and direct benchmarking.
2. **True Non-Blocking Concurrency**: Leverages Java 21 Virtual Threads (`Executors.newVirtualThreadPerTaskExecutor()`) to handle concurrent shard scatter-gather without platform thread exhaustion.
3. **Information Retrieval Transparency**: "Why This Result?" mathematical explanation decomposition exposes exact BM25 formulas down to term frequency, IDF, and document length ratios.
4. **Resilience & Failover Mechanism**: Cluster topology accommodates node failures, simulated network latencies, and circuit-breaker cutoffs with replica hot-standby fallback.
5. **Reproducible Experiment Tracking**: Flyway-versioned `experiment_records` table persistently logs benchmark runs with Git commit SHAs, concurrency counts, and latency percentiles.

---

## 5. Identified Technical Debt & Bottlenecks

| Area | Current State | Technical Risk | Mitigation Plan |
| :--- | :--- | :--- | :--- |
| **Corpus Ingestion** | In-memory synthetic generation & static 67-doc seed | Memory pressure when scaling to 1M+ documents in a single JVM run | Implement chunked batch ingestion with disk-backed checkpoints (`IndexingCheckpoint`) |
| **Relevance Ground Truth** | 5 test queries in `RelevanceEvaluator` | Small sample size limits statistical significance of NDCG@10 metrics | Expand ground-truth test suite to 50+ diverse queries across 10 CS domains |
| **Concurrency Benchmarking** | In-memory simulated load generator | Does not evaluate external network socket saturation or HTTP connection pools | Integrate k6 load testing scripts simulating external HTTP workloads |
| **Profiling & Bottlenecks** | JVM heap metrics tracked via `Runtime.getRuntime()` | Lacks component-level execution breakdown (e.g. tokenization vs scoring vs network) | Build Performance Investigator with measured vs estimated execution breakdowns |

---

## 6. Recommended Incremental Implementation Order

1. **Phase 1 & 2**: Large-scale technical corpus ingestion pipeline (`/data`, `/scripts/ingestion`, `/docs/datasets`) with checkpoint resumption.
2. **Phase 3**: Inverted index memory layout audit and `docs/INDEX_DESIGN.md`.
3. **Phase 4 & 5**: Relevance Lab 50+ query ground-truth expansion and interactive BM25 step-by-step calculation API.
4. **Phase 6, 7 & 8**: Multi-shard configurable topology (1, 3, 6 shards) and replica failover routing.
5. **Phase 9 & 10**: JVM Concurrency Lab (Platform vs Fixed vs Virtual Threads) and k6 load tests.
6. **Phase 11 & 12**: Benchmark Lab and persistent experiment history.
7. **Phase 13 & 14**: Performance Investigator and active-load reliability testing.
8. **Phase 15 & 16**: Observability (Micrometer / Actuator / Prometheus) and live health telemetry.
9. **Phase 17**: 10 formal ADRs in `docs/adr/`.
10. **Phase 18, 19, 20 & 25**: Recruiter overview mode, architecture explorer, and API documentation.
11. **Phase 21, 22, 23 & 26**: Automated test suite hardening, Docker verification, CI/CD, and evidence-driven README.
