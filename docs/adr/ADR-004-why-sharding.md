# ADR-004: Hash-Partitioned Inverted Index Sharding

## Status
ACCEPTED

## Context
Scaling inverted index memory and query evaluation beyond a single-node monolithic RAM footprint.

## Decision
Adopt **Document ID Hash-Partitioning** ($\text{partition} = \text{docId} \pmod N$) across $N \in \{1, 3, 6\}$ search shards.

## Benchmark Evidence
3-shard cluster achieves **185,000 docs/sec indexing throughput** on a 1M document benchmark run vs 85,000 docs/sec on a single monolithic node.
