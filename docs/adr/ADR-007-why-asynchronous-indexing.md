# ADR-007: Asynchronous Batch Ingestion with Checkpointing

## Status
ACCEPTED

## Context
Ingesting large technical document corpora (up to 5,000,000 documents) without blocking HTTP API threads or risking index corruption on sudden process termination.

## Decision
Implement asynchronous chunked batching (`batchSize = 5,000`) with persistent checkpoints stored in `IndexingCheckpoint`.
