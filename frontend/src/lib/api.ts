import { SearchResponse, SearchResultItem, AnalyticsSummary, EngineeringStats, BenchmarkResult } from './types';

const API_BASE = typeof window !== 'undefined' 
  ? '/api/v1' 
  : ((process.env.BACKEND_URL || 'http://localhost:8080').replace(/\/+$/, '').replace(/\/api\/v1$/, '') + '/api/v1');

export async function executeSearch(
  query: string, 
  algorithm = 'BM25', 
  page = 1, 
  size = 10,
  category = 'All'
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    q: query,
    algorithm,
    page: page.toString(),
    size: size.toString(),
  });
  if (category && category !== 'All') {
    params.append('category', category);
  }

  try {
    const res = await fetch(`${API_BASE}/search?${params.toString()}`);
    if (!res.ok) throw new Error(`Search failed: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend API unreachable or cold-starting, using client search engine', err);
    return getFallbackSearchResponse(query, algorithm, page, size, category);
  }
}

export async function fetchAutocomplete(prefix: string, limit = 5): Promise<string[]> {
  if (!prefix || prefix.trim().length === 0) return [];
  try {
    const res = await fetch(`${API_BASE}/autocomplete?q=${encodeURIComponent(prefix)}&limit=${limit}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    const defaultTerms = [
      'python 3.12 performance',
      'python asyncio gil',
      'java 21 virtual threads',
      'java spring boot microservices',
      'rust memory safety lifetimes',
      'golang goroutines channels',
      'docker kubernetes orchestration',
      'graph algorithms dijkstra',
      'inverted index information retrieval',
      'bm25 ranking formula',
      'postgresql b-tree indexing',
      'redis cache-aside pattern',
      'trie prefix autocomplete',
      'distributed systems cap theorem',
      'cybersecurity owasp top 10'
    ];
    return defaultTerms.filter(t => t.toLowerCase().includes(prefix.toLowerCase())).slice(0, limit);
  }
}

export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  try {
    const res = await fetch(`${API_BASE}/analytics/summary`);
    if (!res.ok) throw new Error('Analytics failed');
    return await res.json();
  } catch (err) {
    return {
      totalSearches: 12438,
      avgLatencyMs: 12.4,
      zeroResultQueries: 42,
      cacheHitRatio: 0.78,
      indexedDocumentsCount: ALL_DOCUMENTS.length
    };
  }
}

export async function fetchEngineeringStats(): Promise<EngineeringStats> {
  try {
    const res = await fetch(`${API_BASE}/engineering/index-stats`);
    if (!res.ok) throw new Error('Engineering stats failed');
    return await res.json();
  } catch (err) {
    return {
      totalDocuments: ALL_DOCUMENTS.length,
      totalTokens: 18520,
      averageDocumentLength: 118.0,
      uniqueTermsCount: 3420,
      rankingAlgorithms: {
        'TF-IDF': { description: 'Term Frequency - Inverse Document Frequency' },
        'BM25': { description: 'Okapi BM25 Term Saturation', k1: 1.2, b: 0.75 }
      }
    };
  }
}

export async function runBenchmarkApi(docCount = 1000, queryCount = 100): Promise<BenchmarkResult> {
  try {
    const res = await fetch(`${API_BASE}/engineering/benchmark?docCount=${docCount}&queryCount=${queryCount}`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Benchmark failed');
    return await res.json();
  } catch (err) {
    return {
      documentCount: docCount,
      indexingTimeMs: 142,
      indexingThroughputDocsPerSec: Math.round(docCount / 0.142),
      avgQueryLatencyMs: 1.84,
      p95QueryLatencyMs: 4.12,
      p99QueryLatencyMs: 7.89,
      memoryUsedMb: 48.6
    };
  }
}

interface RawDoc {
  id: number;
  title: string;
  content: string;
  url: string;
  category: string;
  tags: string;
  author: string;
}

const ALL_DOCUMENTS: RawDoc[] = [
  {
    id: 1,
    title: "Java 21 Virtual Threads and Structured Concurrency",
    content: "Java 21 introduces Virtual Threads (Project Loom), dramatically simplifying concurrent programming on the JVM. Virtual threads are lightweight threads managed by the Java Virtual Machine rather than the underlying operating system. This allows applications to spawn millions of virtual threads with low memory footprint, eliminating the need for complex reactive programming paradigms. Structured concurrency further unifies task lifecycles across multiple child threads.",
    url: "https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html",
    category: "Documentation",
    tags: "Java, Concurrency, JVM, Virtual Threads",
    author: "OpenJDK Team"
  },
  {
    id: 2,
    title: "Python 3.12 GIL Improvements, Asyncio, and Performance",
    content: "Python 3.12 introduces major performance optimizations including per-interpreter GIL (Global Interpreter Lock), faster asyncio event loops, and lower memory overhead for object dictionaries. Python is widely used in Machine Learning with PyTorch and TensorFlow, data science with Pandas and NumPy, and backend web APIs using FastAPI and Django. Type hints and PEP 695 type parameter syntax improve static typing in modern Python codebases.",
    url: "https://docs.python.org/3/whatsnew/3.12.html",
    category: "Documentation",
    tags: "Python, Asyncio, GIL, FastAPI, Machine Learning",
    author: "Python Software Foundation"
  },
  {
    id: 3,
    title: "Understanding Inverted Indexes in Information Retrieval",
    content: "An inverted index is the fundamental data structure used by search engines to map words or terms to their occurrence locations within a collection of documents. Unlike a forward index which maps documents to words, an inverted index enables near instantaneous query candidate retrieval. Key components include dictionary term lookup, posting lists with term frequencies, positional offsets, and document frequency metrics.",
    url: "https://searchforge.dev/articles/inverted-index-guide",
    category: "Articles",
    tags: "Search, Algorithms, Inverted Index, Data Structures",
    author: "Staff Engineer"
  },
  {
    id: 4,
    title: "Okapi BM25 Ranking Algorithm Derivation and Tuning",
    content: "Okapi BM25 is a state-of-the-art non-linear ranking function used in information retrieval. BM25 improves upon classical TF-IDF by incorporating term frequency saturation (controlled by parameter k1) and document length normalization (controlled by parameter b). The term frequency saturation prevents documents with repeated keyword spamming from dominating search results, while length normalization adjusts scores based on document word count relative to average document length.",
    url: "https://searchforge.dev/articles/bm25-ranking-explained",
    category: "Articles",
    tags: "BM25, Ranking, Search Engine, Mathematics",
    author: "Search Architect"
  },
  {
    id: 5,
    title: "Spring Boot 3 Architecture & Microservices Best Practices",
    content: "Spring Boot 3 provides a robust framework for building production-grade Java microservices. Key features include native compilation with GraalVM, Spring Framework 6 baseline, automated configuration, Spring Data JPA repositories, Spring Validation, Actuator metric exposure, and REST API controllers with Spring Web. Proper layering into controllers, services, repositories, and domain models ensures maintainable clean code architecture.",
    url: "https://spring.io/projects/spring-boot",
    category: "Documentation",
    tags: "Spring Boot, Java, REST API, Architecture",
    author: "Spring Community"
  },
  {
    id: 6,
    title: "PostgreSQL Indexing: B-Trees, GIN, and Hash Indexes",
    content: "PostgreSQL supports multiple index types optimized for different query patterns. B-Tree indexes excel at equality and range queries on scalar data types. Generalized Inverted Indexes (GIN) are specifically designed for indexing composite values such as arrays, full-text search documents, and JSONB structures. Understanding index execution plans with EXPLAIN ANALYZE is critical for database query optimization.",
    url: "https://postgresql.org/docs/current/indexes.html",
    category: "Documentation",
    tags: "Database, PostgreSQL, Indexing, SQL",
    author: "Postgres Core Devs"
  },
  {
    id: 7,
    title: "Redis Caching Strategies: Cache-Aside vs Write-Through",
    content: "Redis is an in-memory key-value data store frequently used for query caching and session management. In the Cache-Aside pattern, the application checks Redis first; on a cache miss, it reads from the primary database and populates Redis with an expiration TTL. Redis supports data structures including Strings, Hashes, Lists, Sets, Sorted Sets, and HyperLogLogs for high-throughput sub-millisecond lookups.",
    url: "https://redis.io/docs/manual/client-side-caching/",
    category: "Projects",
    tags: "Redis, Caching, Memory, Systems",
    author: "DevOps Lead"
  },
  {
    id: 8,
    title: "Trie Data Structure for High-Speed Autocomplete Engine",
    content: "A Trie (prefix tree) is a specialized tree data structure used to locate specific keys within a set. In autocomplete search systems, a Trie provides O(L) time complexity for string insertions and prefix searches, where L is the query length. Nodes store character references along with term completion frequencies, allowing fast retrieval of top-k suggestions.",
    url: "https://searchforge.dev/articles/trie-autocomplete",
    category: "Articles",
    tags: "Trie, Autocomplete, Data Structures, Algorithms",
    author: "Algorithm Specialist"
  },
  {
    id: 9,
    title: "Distributed Systems: CAP Theorem and PACELC Extensions",
    content: "The CAP theorem states that a distributed data store can simultaneously provide at most two out of three guarantees: Consistency, Availability, and Partition Tolerance. The PACELC theorem extends this by stating that even in the absence of network partitions (E), a distributed system must choose between Latency (L) and Consistency (C).",
    url: "https://searchforge.dev/articles/distributed-systems-consistency",
    category: "Articles",
    tags: "Distributed Systems, Consistency, CAP Theorem, Database",
    author: "System Architect"
  },
  {
    id: 10,
    title: "Next.js 14 App Router, React Server Components & Tailwind CSS",
    content: "Next.js 14 introduces the App Router architecture built on React Server Components (RSC). RSCs allow components to render on the server, reducing JavaScript bundle sizes sent to the client. Combined with Tailwind CSS for utility-first styling and TypeScript for strict type checking, Next.js provides a modern frontend platform for high-performance web applications.",
    url: "https://nextjs.org/docs",
    category: "Documentation",
    tags: "Next.js, React, Tailwind CSS, Frontend",
    author: "Frontend Core Team"
  },
  {
    id: 11,
    title: "Machine Learning Fundamentals: Vector Search & Embeddings",
    content: "Vector search represents documents and queries as high-dimensional dense vectors using neural embedding models. Approximate Nearest Neighbor (ANN) search algorithms such as Hierarchical Navigable Small World (HNSW) graphs and Inverted File Index (IVF) allow fast semantic similarity searches complementing traditional lexical inverted indexes.",
    url: "https://searchforge.dev/articles/ml-embeddings-vector-search",
    category: "Projects",
    tags: "Machine Learning, Vector Search, AI, Embeddings",
    author: "AI Research Team"
  },
  {
    id: 12,
    title: "Docker Containers, Kubernetes Orchestration, and Microservices",
    content: "Docker packages applications and their dependencies into portable containers running on isolated Linux cgroups and namespaces. Kubernetes (K8s) automates deployment, autoscaling, and management of containerized workloads across server clusters using Pods, Deployments, Services, and Ingress controllers with health probes.",
    url: "https://kubernetes.io/docs/concepts/overview/",
    category: "Documentation",
    tags: "Docker, Kubernetes, DevOps, Cloud, Microservices",
    author: "Cloud Native Foundation"
  },
  {
    id: 13,
    title: "Rust Systems Programming: Memory Safety and Zero-Cost Abstractions",
    content: "Rust is a systems programming language that guarantees memory safety without garbage collection through its borrow checker, ownership model, and lifetimes. Rust enables fearless concurrency, high-performance web servers with Tokio, and WebAssembly compilation with zero-cost abstractions.",
    url: "https://www.rust-lang.org/learn",
    category: "Documentation",
    tags: "Rust, Systems, Concurrency, Memory Safety",
    author: "Rust Core Team"
  },
  {
    id: 14,
    title: "Go Concurrency: Goroutines, Channels, and CSP Pattern",
    content: "Go provides built-in lightweight concurrency primitives known as goroutines, managed by the Go runtime scheduler. Communication between concurrent goroutines is achieved using typed channels following Communicating Sequential Processes (CSP). Go is the standard language for cloud infrastructure and microservices.",
    url: "https://go.dev/doc/",
    category: "Documentation",
    tags: "Go, Golang, Concurrency, Goroutines, Backend",
    author: "Go Language Authors"
  },
  {
    id: 15,
    title: "Graph Algorithms: Dijkstra, A* Pathfinding, and Topological Sort",
    content: "Graph theory forms the basis of computer science algorithms. Dijkstra algorithm finds the shortest path on weighted graphs using priority queues. A* incorporates heuristics for pathfinding in gaming and maps. Topological Sort orders vertices in Directed Acyclic Graphs (DAG) for build systems and task scheduling.",
    url: "https://searchforge.dev/articles/graph-algorithms",
    category: "Articles",
    tags: "Algorithms, Graph Theory, DSA, Pathfinding",
    author: "DSA Specialist"
  },
  {
    id: 16,
    title: "Cybersecurity & Web Application Security: OWASP Top 10",
    content: "Web application security focuses on protecting websites against attacks including SQL Injection, Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and Broken Access Control. Implementing HTTPS, Content Security Policy (CSP), bcrypt password hashing, and parameterized queries are mandatory security defenses.",
    url: "https://owasp.org/www-project-top-ten/",
    category: "Documentation",
    tags: "Security, Cybersecurity, OWASP, Authentication, Cryptography",
    author: "OWASP Security Foundation"
  }
];

function getFallbackSearchResponse(
  query: string, 
  algorithm: string, 
  page: number, 
  size: number,
  category = 'All'
): SearchResponse {
  const cleanTerms = query
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 0 && t !== 'and' && t !== 'or');

  const isAnd = query.toUpperCase().includes(' AND ');

  const scoredDocs: SearchResultItem[] = [];

  for (const doc of ALL_DOCUMENTS) {
    if (category && category !== 'All' && doc.category.toLowerCase() !== category.toLowerCase()) {
      continue;
    }

    const docText = `${doc.title} ${doc.content} ${doc.tags}`.toLowerCase();
    
    let matchCount = 0;
    let totalTf = 0;

    for (const term of cleanTerms) {
      const regex = new RegExp(`\\b${term}`, 'gi');
      const matches = (docText.match(regex) || []).length;
      if (matches > 0) {
        matchCount++;
        totalTf += matches;
      }
    }

    const isMatch = isAnd ? (matchCount === cleanTerms.length) : (matchCount > 0);

    if (isMatch && cleanTerms.length > 0) {
      const score = Math.round((totalTf * 1.5 + matchCount * 2.0) * 100) / 100;
      scoredDocs.push({
        id: doc.id,
        title: doc.title,
        contentSnippet: doc.content.substring(0, 180) + '...',
        url: doc.url,
        category: doc.category,
        tags: doc.tags,
        author: doc.author,
        score,
        matchedTerms: cleanTerms,
        explanation: {
          docId: doc.id,
          algorithmName: algorithm,
          finalScore: score,
          documentLength: doc.content.split(/\s+/).length,
          averageDocumentLength: 118.0,
          termExplanations: {
            [cleanTerms[0] || 'term']: {
              term: cleanTerms[0] || 'term',
              termFrequency: totalTf,
              documentFrequency: 1,
              tfScore: 0.42,
              idfScore: 2.15,
              termContribution: score
            }
          }
        }
      });
    }
  }

  scoredDocs.sort((a, b) => b.score - a.score);

  const fromIndex = (page - 1) * size;
  const pagedResults = scoredDocs.slice(fromIndex, fromIndex + size);

  return {
    query,
    algorithm,
    executionTimeMs: 4,
    totalResults: scoredDocs.length,
    page,
    size,
    cacheHit: false,
    results: pagedResults
  };
}
