# ADR-008: Scatter-Gather Query Routing & Top-K Max-Heap Merge

## Status
ACCEPTED

## Context
Merging local candidate scores from $N$ search shards into a globally sorted top-$K$ result list.

## Decision
Coordinator dispatches queries across active shards in parallel and uses a **PriorityQueue (Max-Heap)** to merge scores in $O(N \log K)$ time rather than sorting all aggregated items in $O(N \log N)$.
