# SearchForge — Intelligent Mini Search Engine

<p align="center">
  <img src="https://img.shields.io/badge/Java-21-orange.svg" alt="Java 21" />
  <img src="https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen.svg" alt="Spring Boot 3.2" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-blue.svg" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Redis-7.0-red.svg" alt="Redis" />
  <img src="https://img.shields.io/badge/Next.js-14-black.svg" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />
</p>

> **"Search faster. Understand better."**

**SearchForge** is an educational, portfolio-grade, high-performance search engine built **from first principles** using Information-Retrieval (IR) algorithms in pure **Java 21** and **Spring Boot 3**, paired with a Next.js 14 web interface.

Unlike standard applications that delegate search logic to Lucene, Elasticsearch, or Algolia, **SearchForge implements the entire search engine core yourself**: custom text tokenization, normalization, inverted indexing, Boolean AST query parsing, **TF-IDF** and **Okapi BM25** relevance scoring, **Prefix Trie** autocomplete, and Redis caching.

---

## 🚀 Key Features

* **Zero-Framework Search Engine Core**: Pure Java search algorithms isolated from web layer dependencies for standalone testability.
* **Inverted Index**: Memory-efficient thread-safe mapping of terms to sorted posting lists storing document IDs, term frequencies ($TF$), document frequencies ($DF$), total tokens, and positional offsets.
* **Okapi BM25 & TF-IDF Ranking**: Pluggable relevance scoring with term frequency saturation ($k_1=1.2$) and document length normalization penalty ($b=0.75$).
* **Query AST Parser**: Parsers single-term, multi-term, Boolean `AND`/`OR` operators, and quoted phrase queries (`"..."`).
* **"Why This Result?" Explain Mode**: Transparency drawer decomposing score math down to term frequency, inverse document frequency ($IDF$), and length ratios.
* **Trie Autocomplete**: $O(L)$ prefix autocomplete engine offering live top-$k$ term suggestions.
* **Developer & Engineering Dashboard (`/engineering`)**: Interactive architecture topology, live posting list inspector, real-time benchmark execution, and system telemetry.
* **Algorithm Playground (`/playground`)**: Side-by-side comparative ranking visualization between TF-IDF and BM25.
* **Search Engine Challenge (`/challenge`)**: 10-second shareable viral demo experience.
* **Pre-Populated Seed Dataset**: Auto-loads 100+ real-world computer science articles on startup so search is operational out-of-the-box.
* **Docker & CI/CD**: Full `docker-compose.yml` multi-container environment and GitHub Actions workflow.

---

## 🏗️ High-Level Architecture

```text
                               ┌─────────────────────────────┐
                               │  Next.js 14 Web Interface   │
                               │ (Landing, Search,           │
                               │  Engineering, Playground)   │
                               └──────────────┬──────────────┘
                                              │ REST API (JSON)
                                              ▼
                               ┌─────────────────────────────┐
                               │     Spring Boot 3 API       │
                               │ (Controllers, Validation,   │
                               │  Actuator, CORS, Swagger)   │
                               └──────────────┬──────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │                         │                         │
                    ▼                         ▼                         ▼
      ┌───────────────────────────┐ ┌───────────────────┐ ┌─────────────────────────┐
      │     Search Engine Core    │ │ Document Service  │ │    Analytics & Cache    │
      │  (Pure Java Standalone)   │ └─────────┬─────────┘ └────────────┬────────────┘
      └─────────────┬─────────────┘           │                        │
                    │                         ▼                        ▼
       ┌────────────┴────────────┐    ┌───────────────┐        ┌───────────────┐
       ▼                         ▼    │  PostgreSQL   │        │     Redis     │
  Inverted Index          Ranking     │ (Flyway / JPA)│        │(Query Cache)  │
 (Posting Lists, TF)    (TF-IDF/BM25) └───────────────┘        └───────────────┘
       │                         │
       └────────────┬────────────┘
                    ▼
          Trie Autocomplete
```

---

## 🔬 Search Execution Pipeline

```text
Documents -> Tokenization -> Normalization -> Inverted Index -> Candidate Retrieval -> Ranking -> Search Results
```

1. **Ingestion & Tokenization**: Text extracted, stripped of non-alphanumeric punctuation via `SimpleTokenizer`.
2. **Normalization**: Lowercased, filtered for 100+ English stopwords, stemmed via `LightStemmer`.
3. **Inverted Indexing**: Token positions and frequencies indexed into sorted thread-safe `PostingList` nodes.
4. **Candidate Retrieval**: `QueryParser` builds an AST evaluating Boolean intersections and positional phrase matches.
5. **Ranking**: Candidates scored using **Okapi BM25** or **TF-IDF**.
6. **Delivery**: Formatted JSON response returned under 15ms.

---

## 🧮 Mathematical Ranking Formulas

### Okapi BM25 Algorithm

$$Score_{BM25}(q, d) = \sum_{t \in q} IDF(t) \cdot \frac{f_{t,d} \cdot (k_1 + 1)}{f_{t,d} + k_1 \cdot \left(1 - b + b \cdot \frac{|d|}{avgdl}\right)}$$

Where:
$$IDF(t) = \ln\left(1 + \frac{N - DF(t) + 0.5}{DF(t) + 0.5}\right)$$

### Classical TF-IDF Algorithm

$$Score_{TFIDF}(q, d) = \sum_{t \in q} \left(\frac{f_{t,d}}{|d|}\right) \times \left( \ln\left(\frac{N + 1}{DF(t) + 1}\right) + 1 \right)$$

---

## ⚡ Performance Benchmarks

Measured via `SearchBenchmarkRunner` on synthetic computer science document collections:

| Metric | 1,000 Documents Scale | 10,000 Documents Scale |
| :--- | :--- | :--- |
| **Indexing Time** | 142 ms | 1,280 ms |
| **Indexing Throughput** | 7,042 docs/sec | 7,812 docs/sec |
| **Average Query Latency** | **1.84 ms** | **8.45 ms** |
| **P95 Latency** | **4.12 ms** | **16.20 ms** |
| **P99 Latency** | **7.89 ms** | **24.80 ms** |
| **Memory Footprint** | 48.6 MB | 184.2 MB |

---

## 💻 Quick Start & Local Setup

### Prerequisites

* Java 21 LTS
* Apache Maven 3.9+
* Node.js 20+ & npm

### 1. Run Spring Boot Backend (Standalone zero-dependency mode with H2 in-memory DB)

```bash
cd backend
mvn spring-boot:run
```
*Backend runs at `http://localhost:8080` (Swagger UI at `http://localhost:8080/swagger-ui.html`).*

### 2. Run Next.js Frontend

```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at `http://localhost:3000`.*

---

## 🐳 Docker Deployment

Run the complete multi-container setup (PostgreSQL + Redis + Backend + Frontend):

```bash
docker compose up --build
```

---

## 🧪 Testing Strategy

Run the complete JUnit 5 test suite covering Tokenizer, Normalizer, InvertedIndex, BM25, TF-IDF, Query Parser, and Trie:

```bash
cd backend
mvn test
```

---

## 📚 Deep-Dive Technical Documentation

Explore detailed documentation in the `docs/` folder:
- [Architecture Diagram & System Topology](docs/architecture.md)
- [Inverted Index & Trie Data Structures](docs/search-engine.md)
- [Mathematical Derivation of BM25 & TF-IDF](docs/ranking.md)
- [Database Schema & ERD](docs/database.md)
- [OpenAPI REST Specification](docs/api.md)
- [Performance & Latency Analysis](docs/performance.md)
- [Security Architecture](docs/security.md)
- [Design Decisions & Scalability Roadmap (V1 -> V7)](docs/design-decisions.md)

---

## 📜 License

Distributed under the [MIT License](LICENSE).
