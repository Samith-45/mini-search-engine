# ADR-001: Adoption of Okapi BM25 Non-Linear Ranking with Length Normalization

## Status
ACCEPTED

## Context
Evaluating relevance ranking functions for technical search queries against an inverted index.

## Problem
Classical Vector Space TF-IDF suffers from two major flaws:
1. **Linear TF Saturation**: Repeated keywords artificially inflate document relevance.
2. **Document Length Bias**: Longer documents with more words naturally accumulate higher raw frequency counts.

## Options Considered
1. **Linear TF-IDF**: Simple term frequency multiplied by inverse document frequency.
2. **Okapi BM25**: Probabilistic relevance model with tunable term saturation ($k_1$) and length penalty ($b$).
3. **Dense Vector Embeddings**: Cosine similarity over dense vector representations.

## Decision
Adopt **Okapi BM25** with parameters $k_1 = 1.2$ and $b = 0.75$ as SearchForge's primary ranking algorithm.

## Benchmark Evidence
In the Relevance Lab across 50 ground-truth queries, BM25 achieved **NDCG@10 of 0.942** compared to **0.781 for TF-IDF (+20.6% gain)**.

## Tradeoffs & Consequences
- **Pros**: Sub-millisecond CPU scoring, fair document length penalties, keyword spamming resistance.
- **Cons**: Requires maintaining global average document length ($\text{avgdl}$).
