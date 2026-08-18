# SearchForge System Architecture

## Architectural Philosophy

**SearchForge** is designed around a modular, layered architecture that strictly decouples the core Information Retrieval (IR) algorithms from the web framework and database storage mechanisms.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          Next.js 14 Web UI                             │
│       (Landing, Search Results, Engineering Mode, Playground)          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ REST API (JSON)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Spring Boot 3 API Layer                         │
│       (SearchController, DocumentController, AnalyticsController)      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           │                        │                        │
           ▼                        ▼                        ▼
┌──────────────────────┐ ┌────────────────────┐ ┌───────────────────┐
│  Search Engine Core  │ │  Document Service  │ │ Analytics & Cache │
│ (Pure Java Standalone│ └──────────┬─────────┘ └─────────┬─────────┘
└──────────┬───────────┘            │                     │
           │                        ▼                     ▼
 ┌─────────┴─────────┐      ┌───────────────┐     ┌───────────────┐
 ▼                   ▼      │  PostgreSQL   │     │     Redis     │
Inverted Index   Ranking    │ (Flyway / JPA)│     │ (Query Cache) │
(Posting Lists) (BM25/TFIDF)└───────────────┘     └───────────────┘
```

## Key Architectural Principles

1. **Framework Independence**: The `com.searchforge.core` package operates with zero Spring Boot or third-party search engine dependencies. It can be compiled, tested, and benchmarked as a standalone Java library.
2. **In-Memory Speed with Persistent Backing**: Inverted index posting lists and Trie prefix autocomplete trees reside in memory for sub-millisecond query candidate lookups, while PostgreSQL maintains persistent document storage.
3. **Multi-Tier Caching**: High-frequency search queries are cached in Redis with configurable TTLs, falling back gracefully to an in-memory `ConcurrentHashMap` cache if Redis is unavailable.
