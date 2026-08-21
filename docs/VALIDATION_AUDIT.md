# SearchForge System Validation & Metric Authenticity Audit

**Audit Date:** August 20, 2026  
**Auditor:** Distributed Systems & Systems Performance Engineering Team  
**Scope:** Complete inspection of Java 21 Backend, In-Memory Algorithms, Concurrency Primitives, Persistence Layer, and Next.js 14 Frontend.

---

## 1. System Topology & Repository Architecture

SearchForge is structured as an experimental distributed search platform divided into two primary execution tiers:

```
                                  +---------------------------------------+
                                  |           Next.js 14 Frontend         |
                                  | (Overview, Investigator, Experiments, |
                                  |  Health, Reliability, Relevance, Lab) |
                                  +---------------------------------------+
                                                      |
                                           REST API (HTTP / JSON)
                                                      |
                                                      v
                                  +---------------------------------------+
                                  |        Spring Boot 3 Backend          |
                                  |   (Java 21 Virtual Threads - Loom)    |
                                  +---------------------------------------+
                                                      |
                  +-----------------------------------+-----------------------------------+
                  |                                   |                                   |
                  v                                   v                                   v
      +------------------------+          +------------------------+          +------------------------+
      |      Core Engine       |          |  Distributed Sharding  |          |      Persistence       |
      | - InvertedIndex (Map)  |          | - ShardedSearchRouter  |          | - H2 / PostgreSQL DB   |
      | - TrieAutocomplete    |          | - 3 Primary Shards     |          | - ExperimentRecordRepo |
      | - BM25 & TF-IDF Score  |          | - 3 Standby Replicas   |          | - SearchQueryLogRepo   |
      | - RelevanceEvaluator   |          | - ReliabilityEngine    |          | - DocumentRepository   |
      +------------------------+          +------------------------+          +------------------------+
```

---

## 2. Comprehensive Validation Audit Matrix

| Feature / Page | Metric / Claim | Current Source | Real Measurement? | Persisted in DB? | Reproducible? | Exact File Responsible | Audit Finding & Required Fix |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **60-Second Overview (`/overview`)** | `14,800 QPS`, `3.84ms P95` | Hardcoded JSX string in frontend | ❌ No (Static text in JSX) | ❌ No | ❌ Claims 1M scale when active corpus is 67 docs | `frontend/src/app/overview/page.tsx` | **CRITICAL INCONSISTENCY**: Overview displays static hardcoded metrics rather than fetching the latest verified experiment from `GET /api/v1/experiments`. **Fix**: Fetch and display dynamic metrics from the most recent verified baseline experiment. |
| **60-Second Overview (`/overview`)** | `0.942 NDCG@10` | Hardcoded JSX string in frontend | ❌ No (Static text in JSX) | ❌ No | ❌ Hardcoded in JSX | `frontend/src/app/overview/page.tsx` | **Fix**: Dynamically fetch latest relevance evaluation result from `GET /api/v1/relevance/evaluate` or show baseline benchmark. |
| **60-Second Overview (`/overview`)** | `3 Shards + 3 Replicas` | Hardcoded JSX string in frontend | ⚠️ Static string | ❌ No | ⚠️ Cluster exists in memory, but count is hardcoded | `frontend/src/app/overview/page.tsx` | **Fix**: Consume `fetchClusterTopology()` to show live primary/replica status. |
| **Benchmark Lab (`/engineering`)** | `67 docs`, `0 ms`, `0 MB`, `0 samples` | Inverted index metadata + uninitialized benchmark state | ⚠️ Partially (Doc count is real; benchmark metrics show 0 until manually clicked) | ❌ Only if user clicks "Run Benchmark" | ⚠️ User sees 0s on initial visit | `backend/src/main/java/com/searchforge/controller/EngineeringController.java`, `frontend/src/app/engineering/page.tsx` | **Fix**: Pre-populate a verified baseline benchmark record for the 67-document corpus on server initialization so metrics are never empty/zero on load. |
| **Experiment History (`/experiments`)** | Past benchmark runs (QPS, P50, P95, Memory) | `GET /api/v1/experiments` backed by `ExperimentRecordRepository` | ✅ Yes (When executed via backend API) / ❌ Static mock in frontend `api.ts` fallback | ✅ Yes (In backend H2/PostgreSQL database) | ✅ Yes (Via `POST /api/v1/engineering/benchmark`) | `backend/src/main/java/com/searchforge/controller/ExperimentController.java`, `frontend/src/lib/api.ts` | **Fix**: Replace fallback mock experiments in `frontend/src/lib/api.ts` with transparent empty states or server-grounded records. Persist git commit SHA, corpus version, and hardware environment. |
| **Relevance Lab (`/relevance`)** | 50 Ground-Truth Queries & NDCG@10 / MRR | `RelevanceController.java` (`buildComprehensiveTestSet()`) | ✅ Yes (Evaluates real ranking against inverted index in backend) / ⚠️ Static fallback in `api.ts` | ❌ Not persisted to database | ⚠️ Document ID mappings in queries must match actual document IDs in corpus | `backend/src/main/java/com/searchforge/controller/RelevanceController.java`, `frontend/src/app/relevance/page.tsx` | **Fix**: Verify all 50 ground-truth query relevance document IDs against active corpus. Save evaluation runs to experiment records table. |
| **Reliability Lab (`/reliability`)** | `100% Availability`, `0% Failure`, `2.14ms -> 4.82ms -> 2.20ms` | Hardcoded default state in React `useState` before test execution | ❌ Initial render shows static numbers before user clicks "Execute Test" | ❌ Simulation is executed in-memory upon trigger | ✅ Real upon trigger (`ReliabilityEngine.java`) | `frontend/src/app/reliability/page.tsx`, `backend/src/main/java/com/searchforge/core/reliability/ReliabilityEngine.java` | **Fix**: Remove hardcoded initial metrics (`2.14ms`, `4.82ms`, `2.20ms`, `100%`). Display "No verified test executed yet" until the user runs a live fault injection test. |
| **System Health (`/health`)** | `48.6 MB Heap`, `84.2% Redis Hit Ratio`, `Loom Engine` | Hardcoded JSX in frontend | ❌ Static numbers in JSX | ❌ No | ❌ Fake metrics on health dashboard | `frontend/src/app/health/page.tsx` | **Fix**: Create live backend telemetry endpoint `GET /api/v1/health/telemetry` returning actual `Runtime.getRuntime()` JVM memory, live cache stats from `SearchQueryLogRepository`, and active virtual thread pool state. |
| **Performance Investigator (`/performance`)** | Platform Threads vs Fixed Pool vs Virtual Threads | `ConcurrencyController.java` & `ConcurrencyComparisonRunner.java` | ✅ Yes (Empirically measured upon POST) / ⚠️ Static fallback in `api.ts` | ❌ Not persisted | ✅ Fully reproducible live | `backend/src/main/java/com/searchforge/core/concurrency/ConcurrencyComparisonRunner.java` | **Fix**: Persist concurrency comparison benchmarks into `ExperimentRecordRepository`. |
| **Performance Investigator (`/performance`)** | Pipeline Latency Breakdown ($42\mu s$ Tokenization, $310\mu s$ Postings, $620\mu s$ BM25) | `PerformanceController.java` (`getPerformanceProfile()`) | ❌ Hardcoded DTO in backend controller | ❌ No | ❌ Static numbers | `backend/src/main/java/com/searchforge/controller/PerformanceController.java` | **Fix**: Implement real nanosecond timers (`System.nanoTime()`) in `SearchService` measuring live microsecond phases during actual query execution. |

---

## 3. List of Fake, Static, or Inconsistent Metrics Identified

1. **Overview Page Hardcoded Metrics**:
   - `frontend/src/app/overview/page.tsx`: Lines 56, 62, 68, 74 hardcode `14,800 QPS`, `3.84 ms P95`, `0.942 NDCG@10`, and `3 Shards + 3 Rep`.
   - **Conflict**: Benchmark Lab shows 67 docs / uninitialized on boot while Overview asserts 1M doc scale without an active experiment reference.

2. **Reliability Initial Render Default Values**:
   - `frontend/src/app/reliability/page.tsx`: Lines 165, 173, 181, 198, 206, 214 render static strings (`100%`, `0.0%`, `2.14ms`, `4.82ms`, `2.20ms`) before any live fault injection is run.

3. **System Health Static Telemetry**:
   - `frontend/src/app/health/page.tsx`: Lines 102 (`48.6 MB`) and 118 (`84.2%`) are static JSX values instead of consuming dynamic backend telemetry.

4. **Performance Profiler Static Latencies**:
   - `backend/src/main/java/com/searchforge/controller/PerformanceController.java`: Returns static constant latency values ($42\mu s$, $310\mu s$, $620\mu s$) rather than live measured query timings.

5. **Client-Side Fallback Mock Experiments**:
   - `frontend/src/lib/api.ts`: Lines 330-415 return static fallback mock experiment objects and static thread benchmarks when the backend is offline.

---

## 4. Exact Responsible Files

1. [`frontend/src/app/overview/page.tsx`](file:///frontend/src/app/overview/page.tsx): Needs dynamic data fetching from latest verified experiment.
2. [`frontend/src/app/reliability/page.tsx`](file:///frontend/src/app/reliability/page.tsx): Needs default `null` state and "No experiment run" display.
3. [`frontend/src/app/health/page.tsx`](file:///frontend/src/app/health/page.tsx): Needs live JVM telemetry binding.
4. [`backend/src/main/java/com/searchforge/controller/PerformanceController.java`](file:///backend/src/main/java/com/searchforge/controller/PerformanceController.java): Needs real microsecond query profiling.
5. [`backend/src/main/java/com/searchforge/service/SeedDataService.java`](file:///backend/src/main/java/com/searchforge/service/SeedDataService.java): Needs automatic baseline experiment execution & persistence on startup.
6. [`backend/src/main/java/com/searchforge/controller/RelevanceController.java`](file:///backend/src/main/java/com/searchforge/controller/RelevanceController.java): Needs document ID alignment with the active corpus and evaluation persistence.
7. [`frontend/src/lib/api.ts`](file:///frontend/src/lib/api.ts): Needs removal of synthetic metric numbers in fallback handlers.

---

## 5. Phased Correction & Truthfulness Implementation Plan

### Phase 1: Establish Single Source of Truth for Telemetry & Experiments
- **Backend `SeedDataService`**:
  - On application startup, automatically execute a live baseline benchmark over the indexed 67 documents (measuring real QPS, P50, P95, P99, heap memory, shard topology, and git SHA).
  - Persist this record to `ExperimentRecordRepository` as `Baseline Corpus (67 Docs)`.
- **Backend `HealthController` / `TelemetryDTO`**:
  - Expose `GET /api/v1/health/telemetry` with:
    - Real JVM memory: `(Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / (1024 * 1024)` MB
    - Real cache hits/misses from `SearchQueryLogRepository`
    - Live active Virtual Thread carrier thread pool stats
    - Real primary & replica shard statuses from `DistributedClusterManager`

### Phase 2: Live Query Profiler in Search Pipeline
- **Backend `SearchService` & `PerformanceController`**:
  - Instrument `SearchService.search()` with high-resolution `System.nanoTime()` timestamps across 5 phases: Tokenization, Cache Lookup, Shard Scatter, Inverted Index Traversal, BM25 Scoring, and Top-K Merge.
  - Store moving average timings and return genuine microsecond breakdowns in `GET /api/v1/performance/profile`.

### Phase 3: Ground-Truth Relevance Alignment & Persistence
- **Backend `RelevanceController` & `RelevanceEvaluator`**:
  - Validate and map all 50 ground-truth query expectations against the active indexed document corpus.
  - Expose endpoint to evaluate live and persist the relevance run (NDCG@10, MRR, Precision, Recall) into the experiment database.

### Phase 4: Frontend Truthfulness & Live Data Binding
- **`/overview` (60-Second Overview)**:
  - Fetch the latest verified experiment from `GET /api/v1/experiments`.
  - If an experiment exists, display its verified metrics (e.g., `Baseline: 67 Docs, Concurrency: 10, QPS: ..., P95: ...ms`).
  - If none exist, display `"No verified benchmark run recorded — Trigger in Benchmark Lab"`.
- **`/reliability` (Reliability Lab)**:
  - Initialize results to `null`.
  - Display `"No verified fault injection executed yet"` until the user clicks "Execute Resilience Test".
- **`/health` (System Health)**:
  - Bind directly to `GET /api/v1/health/telemetry`.
  - If backend is offline, clearly display `"Telemetry Unavailable (Backend Connecting)"` instead of static placeholder numbers.
- **`/performance` (Performance Investigator)**:
  - Bind to live `/api/v1/performance/profile` and live `/api/v1/concurrency/compare`.
- **Clean Client Fallbacks**:
  - In `frontend/src/lib/api.ts`, remove fake static benchmark objects (e.g., hardcoded 14,800 QPS) and replace with authentic status indicators.
