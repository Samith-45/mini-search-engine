# ADR-002: Redis Key-Value Store with Cache-Aside Strategy

## Status
ACCEPTED

## Context
High-frequency search queries repeatedly trigger full inverted index scans and BM25 ranking computations.

## Problem
At 500+ QPS, repeated popular queries ("java", "distributed systems", "docker") consume up to 80% of CPU cycles re-calculating the same top-$k$ scores.

## Options Considered
1. **Local JVM Guava / Caffeine Cache**: Process-local cache with no network overhead.
2. **Distributed Redis Cache**: In-memory key-value store with TTL expiration.
3. **Database Query Caching in PostgreSQL**: Relying on relational buffer cache.

## Decision
Adopt **Redis** using the Cache-Aside pattern with a 10-minute sliding TTL and MD5-normalized query hashing.

## Benchmark Evidence
Cache-hit queries return in **$0.45\text{ ms}$ (P50)** and **$0.80\text{ ms}$ (P95)**, offloading $82\%$ of shard CPU computation.

## Tradeoffs & Consequences
- **Pros**: Sub-millisecond lookups, shared across horizontal backend instances, automatic TTL expiration.
- **Cons**: Adds a network round-trip ($\sim 0.3\text{ ms}$) on cache misses.
