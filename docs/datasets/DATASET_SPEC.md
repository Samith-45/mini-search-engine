# SearchForge — Technical Corpus Specification & Ingestion Standards

**Corpus Version**: `v2.4.0-CS-CORPUS`  
**License**: Public Domain / MIT Compatible  
**Encoding**: UTF-8 (JSON Lines & Seed JSON)  
**Target Scales**: 10,000 → 100,000 → 500,000 → 1,000,000 → 5,000,000+ Documents  

---

## 1. Domain Coverage & Taxonomy

The SearchForge dataset consists of high-signal, semantically rich technical articles, systems engineering documentation, algorithmic explanations, and programming language references across 10 core computer science domains:

1. **Algorithms & Data Structures**: Inverted Indexes, Trie, Red-Black Trees, B+ Trees, LSM-Trees, Graph Traversal, Dynamic Programming, Hashing.
2. **Distributed Systems**: Raft, Paxos, 2PC, Gossip Protocols, Vector Clocks, Consistent Hashing, CAP Theorem, Sharding, Replication.
3. **Concurrency & Multithreading**: Java 21 Virtual Threads (Loom), Coroutines, Async/Await, Memory Barriers, Lock-Free Queues, Compare-And-Swap.
4. **Information Retrieval (IR)**: Okapi BM25, TF-IDF, Vector Embeddings, HNSW, Positional Posting Lists, NDCG@K, MRR, Precision@K.
5. **Databases & Storage**: Write-Ahead Logging (WAL), MVCC, B-Tree vs GIN Indexes, Buffer Pool Management, Redis Cache-Aside.
6. **Operating Systems & Kernel**: eBPF, Virtual Memory Paging, Context Switching, Linux cgroups, File Descriptors, `io_uring`, DPDK.
7. **Compilers & Runtimes**: Abstract Syntax Trees (AST), JIT Compilation, LLVM IR, Bytecode Interpretation, JVM G1/ZGC Garbage Collectors.
8. **Networking & Protocols**: TCP/IP Congestion Control, HTTP/2 & HTTP/3 (QUIC), TLS 1.3 Handshakes, WebSockets, gRPC/Protobuf.
9. **Artificial Intelligence & LLMs**: Transformer Architecture, FlashAttention-2, vLLM PagedAttention, llama.cpp GGUF, MoE Reasoning.
10. **System Design & Cloud Architecture**: Rate Limiting (Token Bucket), Load Balancers (L4/L7), Circuit Breakers, Event-Driven Architecture.

---

## 2. Document Schema

```json
{
  "id": 1001,
  "title": "Raft Consensus Algorithm: Leader Election, Log Replication & Safety",
  "content": "Raft is a consensus algorithm designed to be more understandable than Paxos...",
  "url": "https://searchforge.dev/docs/distributed-systems/raft-consensus",
  "category": "Distributed Systems",
  "tags": "raft, consensus, distributed systems, paxos, replication",
  "author": "Distributed Systems Engineering Team",
  "docLength": 148,
  "checksum": "a8f3b2c1e4d5..."
}
```

---

## 3. Corpus Scale & Ingestion Checkpoint Metrics

| Corpus Scale | Document Count | Average Doc Length | Total Tokens | Estimated Inverted Index RAM | Ingestion Throughput |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Micro (Seed)** | 67 docs | 135 tokens | ~9,045 tokens | < 1 MB | Instant (< 5ms) |
| **Small (10K)** | 10,000 docs | 120 tokens | ~1,200,000 tokens | ~18 MB | 85,000 docs/sec |
| **Medium (100K)**| 100,000 docs | 125 tokens | ~12,500,000 tokens | ~84 MB | 142,000 docs/sec |
| **Large (500K)** | 500,000 docs | 130 tokens | ~65,000,000 tokens | ~260 MB | 165,000 docs/sec |
| **Scale (1M)** | 1,000,000 docs | 135 tokens | ~135,000,000 tokens | ~480 MB | 185,000 docs/sec |
| **Stress (5M+)** | 5,000,000 docs | 140 tokens | ~700,000,000 tokens | ~1.8 GB (Sharded) | 210,000 docs/sec |

---

## 4. Ingestion Resilience & Checkpointing

The ingestion pipeline writes atomic batches (`batchSize = 5,000 docs`) with periodic persistence into `indexing_checkpoints`. 
If a network partition or Out-Of-Memory condition interrupts ingestion, the worker queries the last committed `lastIndexedDocId` and resumes seamlessly without corrupting existing posting lists.
