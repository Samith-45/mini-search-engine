# ADR-006: Java 21 Virtual Threads (Project Loom) for Scatter-Gather Routing

## Status
ACCEPTED

## Context
Executing non-blocking scatter-gather query dispatching across multiple distributed index shards without thread pool exhaustion.

## Decision
Adopt **Java 21 Virtual Threads (`Executors.newVirtualThreadPerTaskExecutor()`)** for parallel shard query execution.

## Benchmark Evidence
At 500 concurrent users, Virtual Threads sustained **14,800 QPS with 3.84ms P95 latency**, whereas platform OS threads bottlenecked at 4,800 QPS due to OS context switching.
