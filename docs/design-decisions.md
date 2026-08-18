# Design Decisions & Scalability Roadmap

## Key Design Decisions & Trade-Offs

### 1. In-Memory Inverted Index vs Disk-Based Persistent Index
- **Decision**: Implemented an in-memory inverted index backed by relational PostgreSQL document storage.
- **Reason**: Sub-millisecond candidate retrieval speed, simple thread-safe architecture without complex disk segment compaction logic.
- **Trade-off**: Memory scales with corpus size. On restart, index is populated from database.

### 2. Custom IR Core vs Third-Party Engine (Elasticsearch/Lucene)
- **Decision**: Developed tokenization, normalization, inverted index, AST query parser, BM25/TF-IDF, and Trie from first principles in Java.
- **Reason**: Portfolio-grade demonstration of computer science fundamentals, data structures, and IR math.

---

## Future Scalability Roadmap (V1 -> V7)

```text
V1: Single-Node In-Memory Search Engine (CURRENT IMPLEMENTATION)
 └── Single JVM process, in-memory Inverted Index & Trie, PostgreSQL persistence, Redis cache

V2: Segmented Persistent Index File System
 └── Disk-based immutable index segments, LSM-tree inspired memtable flush & background merging

V3: Distributed Indexing & Partitioning
 └── MapReduce/Spark batch index generation, document ID hash partitioning across nodes

V4: Sharded Search Nodes & Router Gateway
 └── Horizontal index sharding (document partitioning), query scatter-gather aggregation gateway

V5: Multi-Region Replication & Active-Active Failover
 └── High-availability leaderless index replica synchronization across regions

V6: Distributed Parallel Ranking & Candidate Selection
 └── WAND (Weak AND) optimization for early query termination, multi-stage reranking pipeline

V7: Enterprise Distributed Neural Hybrid Search System
 └── Sparse lexical inverted index + Dense HNSW vector search hybrid fusion (RRF)
```
