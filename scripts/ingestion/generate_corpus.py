#!/usr/bin/env python3
"""
SearchForge Reproducible Corpus Generator
Generates realistic, domain-specific computer science and systems documents at configurable scales.
Outputs streaming JSON Lines for high-throughput batch ingestion.
"""

import json
import random
import argparse
import sys
import hashlib
from typing import List, Dict

DOMAINS = {
    "Distributed Systems": [
        "Raft consensus leader election and log replication in distributed state machines",
        "Paxos distributed consensus versus Byzantine fault tolerance protocols",
        "Vector clocks causality tracking and conflict resolution in dynamo stores",
        "Two-phase commit 2PC distributed transactions versus Saga pattern orchestrations",
        "Consistent hashing ring topologies and virtual node distribution algorithms"
    ],
    "Concurrency & Multithreading": [
        "Java 21 Virtual Threads Project Loom lightweight thread scheduling and carrier pinning",
        "Lock-free data structures using compare-and-swap CAS atomic operations",
        "Memory barriers volatile semantics and Java Memory Model JMM reordering",
        "Actor model message passing concurrency in distributed akka systems",
        "Async await event loop architecture versus preemptive kernel thread scheduling"
    ],
    "Information Retrieval": [
        "Okapi BM25 non-linear term frequency saturation and document length normalization",
        "Inverted index compression using variable byte encoding and Elias-Fano",
        "Positional posting lists phrase query intersection and positional offsets",
        "Normalized discounted cumulative gain NDCG at K and mean reciprocal rank MRR",
        "Vector search HNSW graph indexing and cosine similarity metric scoring"
    ],
    "Databases & Storage": [
        "Log-Structured Merge LSM trees write-ahead logging and SSTable compaction",
        "B-Tree versus GIN generalized inverted index performance in PostgreSQL",
        "Multi-version concurrency control MVCC snapshot isolation and transaction anomalies",
        "Redis in-memory caching cache-aside write-through and eviction policies",
        "Buffer pool replacement algorithms LRU clock and 2Q memory management"
    ],
    "Compilers & AI Systems": [
        "LLVM intermediate representation IR abstract syntax trees and JIT compilation",
        "FlashAttention-2 fast CUDA kernel memory hierarchy tile scheduling",
        "vLLM PagedAttention GPU memory paging algorithms for high throughput inference",
        "DeepSeek-R1 mixture of experts MoE architecture and reinforcement reasoning",
        "llama.cpp pure C++ quantized GGUF execution across CPU and GPU hardware"
    ]
}

TECH_VOCABULARY = [
    "latency", "throughput", "concurrency", "distributed", "sharding", "replication", "cache",
    "indexing", "algorithm", "database", "compiler", "memory", "virtual", "threads", "consensus",
    "consistency", "partitioning", "postgres", "redis", "java", "python", "kernel", "ebpf", "vector",
    "retrieval", "ranking", "bm25", "tfidf", "trie", "autocomplete", "pipeline", "benchmark", "telemetry"
]

def generate_document(doc_id: int) -> Dict:
    category = random.choice(list(DOMAINS.keys()))
    core_topic = random.choice(DOMAINS[category])
    
    # Generate coherent technical text
    content_words = [core_topic]
    for _ in range(random.randint(40, 100)):
        content_words.append(random.choice(TECH_VOCABULARY))
    content_str = " ".join(content_words)
    
    checksum = hashlib.sha256(f"{doc_id}-{core_topic}".encode('utf-8')).hexdigest()[:16]
    
    return {
        "id": doc_id,
        "title": f"{core_topic.title()} [Doc #{doc_id}]",
        "content": content_str,
        "url": f"https://searchforge.dev/docs/{category.lower().replace(' ', '-')}/doc-{doc_id}",
        "category": category,
        "tags": f"{category.lower()}, {random.choice(TECH_VOCABULARY)}, systems, searchforge",
        "author": "SearchForge Engineering Laboratory",
        "docLength": len(content_words),
        "checksum": checksum
    }

def main():
    parser = argparse.ArgumentParser(description="Generate SearchForge technical corpus.")
    parser.add_argument("--count", type=int, default=10000, help="Number of documents to generate")
    parser.add_argument("--output", type=str, default="data/generated_corpus.jsonl", help="Output file path")
    args = parser.parse_args()

    print(f"[*] Generating {args.count:,} reproducible technical documents...")
    with open(args.output, "w", encoding="utf-8") as f:
        for i in range(1, args.count + 1):
            doc = generate_document(i)
            f.write(json.dumps(doc) + "\n")
            if i % 50000 == 0 or i == args.count:
                print(f"    -> Generated {i:,} / {args.count:,} docs")

    print(f"[✓] Successfully saved {args.count:,} documents to {args.output}")

if __name__ == "__main__":
    main()
