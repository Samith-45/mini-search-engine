# SEARCHFORGE — Professional 3D Product UI/UX Redesign Specification

## 1. Executive Summary & Design Philosophy
**SearchForge** is transformed from a basic dashboard layout into a high-end, technically sophisticated developer & infrastructure platform. The design balances **engineering precision** with **cinematic 3D minimalism**—avoiding generic AI tropes (no neon overload, spinning planets, or rainbow gradients) and favoring a refined developer aesthetic reminiscent of Linear, Vercel, Datadog, and Stripe.

---

## 2. Visual Identity & Design System

### 2.1 Color Palette
- **Background Primary**: `#090d16` (Graphite / Deep Space Void)
- **Background Secondary / Surfaces**: `#0f172a` (Deep Slate Charcoal)
- **Border & Dividers**: `rgba(255, 255, 255, 0.07)` / `rgba(56, 189, 248, 0.15)`
- **Primary Accent**: `#38bdf8` (Electric Sky Blue) → `#818cf8` (Subtle Indigo / Violet)
- **Status Colors**:
  - Success / Verified: `#10b981` (Emerald)
  - Warning / In-Progress: `#f59e0b` (Amber)
  - Destructive / Degraded: `#ef4444` (Rose / Red)
  - Observability / Metric: `#a855f7` (Purple)

### 2.2 Typography
- **Sans-serif (Primary Body & Headings)**: `Inter`, system-ui, -apple-system, sans-serif
- **Monospace (Code, Metrics, Latency, SHA, Endpoints)**: `JetBrains Mono`, `Fira Code`, monospace
- **Hierarchy**:
  - Display Title: 48px–64px (`font-extrabold tracking-tight`)
  - Section Header: 28px–36px (`font-bold tracking-tight`)
  - Subheading / Card Title: 16px–20px (`font-semibold`)
  - Body Text: 14px–15px (`text-slate-300 leading-relaxed`)
  - Metric / Pill / Metadata: 11px–13px (`font-mono font-medium`)

### 2.3 Spacing, Grid & Layout Rhythm
- **Container Max-Width**: `max-w-7xl` (1280px–1440px desktop), `max-w-5xl` for editorial/detail pages.
- **Grid Layout**: 12-column desktop grid, 8-column tablet grid, 4-column mobile grid.
- **Section Spacing**: `py-16 sm:py-24 space-y-16 sm:space-y-24` with breathing room.

---

## 3. Cinematic 3D "Search Core" Hero Architecture

### 3.1 3D Concept & Visual Language
The 3D centerpiece represents an abstract **"Distributed Search Core"**:
- **Central Geometric Crystalline Icosahedron / Octahedron**: Represents the centralized query engine, slowly rotating with faceted glass reflections.
- **Orbital Shard Rings & Interconnected Nodes**: Three concentric wireframe orbital ellipses with instanced spherical nodes representing distributed index partitions.
- **Luminescent Signal Beams & Traversal Vectors**: Thin line geometry pulsing between shards to signify non-blocking query scatter-gather routing.
- **Floating Knowledge Cloud Particles**: 150–200 restrained point particles creating ambient depth.

### 3.2 Performance & Resilience Strategy
- **Dynamic Import (`next/dynamic`)**: Lazy loaded with `ssr: false` to ensure 0s First Contentful Paint block.
- **Adaptive DPR & Mobile Throttling**: Auto-detects device pixel ratio (capped at `Math.min(window.devicePixelRatio, 2)`). Mobile devices run with lower particle counts and reduced orbital complexity.
- **WebGL Fallback**: If WebGL context is lost or unsupported, renders an elegant SVG geometric wireframe with CSS ambient breathing motion.
- **Accessibility (`prefers-reduced-motion`)**: Respects accessibility preferences by disabling orbital rotation and interactive parallax.
- **Zero Memory Leaks**: Full cleanup on unmount (disposes all geometries, materials, textures, and cancels the `requestAnimationFrame` loop).

---

## 4. Reusable UI Components Architecture

1. **`SearchCore3D.tsx`**: High-performance Three.js Canvas hero visualization.
2. **`MetricCard.tsx`**: Technical observability card with title, verified value, sparkline, and latency delta indicator.
3. **`PipelineDiagram.tsx`**: Interactive query & indexing lifecycle pipeline with step inspector.
4. **`ResultCard.tsx`**: Search result snippet with BM25 score decomposition, highlighted terms, and source attribution.
5. **`ExplainModal.tsx`**: Deep-dive mathematical inspector for TF-IDF / BM25 document score breakdowns.
6. **`Header.tsx`**: Floating glassmorphism navbar with outside-click ref-managed dropdown and mobile drawer.
7. **`Footer.tsx`**: Engineering footer with GitHub commit status, license, and architectural sitemap.

---

## 5. Page-by-Page Redesign Plan

1. **Homepage (`/`)**:
   - Hero with 3D Search Core, clear technical value proposition, and quick tech badges (Java 21, BM25, Redis, PostgreSQL).
   - "What is SearchForge?" editorial architectural section.
   - Interactive 7-stage "How Search Works" pipeline.
   - 6-card Engineering Capabilities grid.
   - Live Search Playground preview.
   - Conceptual Architecture Diagram.
   - Verified Performance & Latency breakdown.
   - Cluster Reliability & Fault-Tolerance preview.
   - Verified Experiment Ledger preview.
   - GitHub & Documentation CTA.
2. **Search Experience (`/search`)**:
   - Prominent search bar with instant query suggestions, category filters (All, CS, Distributed Systems, Algorithms, Databases), response time breakdown (e.g., `4.2ms`, `67 hits`), and BM25 relevance score inspection.
3. **Benchmark Lab (`/engineering`)**:
   - High-density observability dashboard for empirical load testing across shard counts, concurrency levels, and cache configurations.
4. **Architecture & ADRs (`/architecture`)**:
   - Interactive system architecture diagram, data-flow pipelines, and Architectural Decision Records (ADRs 001–006).
5. **Algorithm Playground (`/playground`)**:
   - Interactive BM25 / TF-IDF parameter explorer with live score curves and formula evaluation.
6. **Relevance Lab (`/relevance`)**:
   - IR benchmarking dashboard evaluating NDCG@10, MRR, Precision@K, and Recall@K over 50 ground-truth queries.
7. **Reliability Lab (`/reliability`)**:
   - Active fault injection dashboard with simulated shard kills and failover metrics.
8. **Performance Investigator (`/performance`)**:
   - Nanosecond pipeline breakdown (Tokenization, Cache, Shard Dispatch, BM25 Scoring, Heap Merge).
9. **Experiment History (`/experiments`)**:
   - Commit-linked reproducibility ledger with search, filtering, and metric comparison.
10. **System Health (`/health`)**:
    - Live cluster nodes, JVM heap, cache hit ratios, and telemetry.
11. **API Docs (`/api-docs`)**:
    - Interactive developer API reference with cURL code snippets and JSON payload specs.
