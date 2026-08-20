# ADR-010: Information Retrieval (IR) Relevance Evaluation Methodology

## Status
ACCEPTED

## Context
Scientifically validating search relevance improvements beyond subjective inspection.

## Decision
Adopt standard Cranfield Information Retrieval evaluation methodology using:
- **50 Ground-Truth Pre-Judged Technical Queries**
- **Precision@5 and Precision@10**
- **Recall@10**
- **Mean Reciprocal Rank (MRR)**
- **Normalized Discounted Cumulative Gain (NDCG@10)**

## Benchmark Evidence
Okapi BM25 scores **0.942 NDCG@10** and **0.950 MRR** vs **0.781 NDCG@10** for TF-IDF.
