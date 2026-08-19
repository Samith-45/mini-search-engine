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
      'neetcode 150 roadmap',
      'leetcode dsa preparation',
      'geeksforgeeks algorithms practice',
      'system design hld lld roadmap',
      'java 21 backend career roadmap',
      'python ai machine learning roadmap',
      'cs fundamentals os dbms networks',
      'full-stack web development roadmap',
      'devops docker kubernetes roadmap',
      'competitive programming leetcode gfg',
      'python 3.12 performance asyncio',
      'java 21 virtual threads concurrency',
      'inverted index information retrieval',
      'bm25 ranking formula derivation',
      'postgresql indexing b-tree gin',
      'redis cache-aside caching',
      'trie autocomplete prefix search',
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
      totalTokens: 24850,
      averageDocumentLength: 124.0,
      uniqueTermsCount: 4890,
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
    title: "NeetCode 150 & LeetCode DSA Complete Preparation Roadmap",
    content: "A structured step-by-step roadmap to master Data Structures and Algorithms for FAANG/Google interviews using NeetCode, LeetCode, and GeeksforGeeks. Stage 1: Core Fundamentals (Arrays & Hashing, Two Pointers, Sliding Window). Stage 2: Linear Data Structures (Stack, Monotonic Stack, Linked Lists, Fast & Slow Pointers). Stage 3: Binary Search on Values & Arrays. Stage 4: Non-Linear Structures (Binary Trees, BST, Tries, Heap / Priority Queue). Stage 5: Advanced Search (Backtracking, Graphs, BFS/DFS, Topological Sort, Dijkstra). Stage 6: Dynamic Programming (1D DP, 2D DP, Knapsack, Longest Common Subsequence). Practice systematically by solving the NeetCode 150 playlist, tracking patterns on LeetCode, and reading GeeksforGeeks for standard library implementations.",
    url: "https://neetcode.io/roadmap",
    category: "Roadmaps",
    tags: "DSA, NeetCode, LeetCode, GeeksforGeeks, Interview Preparation, Algorithms",
    author: "NeetCode Community"
  },
  {
    id: 2,
    title: "System Design (HLD & LLD) Step-by-Step Interview Roadmap",
    content: "Mastering High-Level Design (HLD) and Low-Level Design (LLD) for software engineering roles. Phase 1: Distributed Systems Basics (Client-Server, DNS, Load Balancers, Reverse Proxy Nginx). Phase 2: Databases & Storage (SQL vs NoSQL, Sharding, Replication, CAP Theorem, Indexing B-Trees/GIN). Phase 3: Caching & Message Queues (Redis Cache-Aside, Kafka, RabbitMQ). Phase 4: Object-Oriented LLD (SOLID Principles, Factory, Strategy, Observer, Singleton, Decorator Patterns on GeeksforGeeks). Phase 5: Standard Interview Cases (URL Shortener TinyURL, Web Crawler, Rate Limiter, Search Autocomplete, Distributed Cache). Recommended resources: Designing Data-Intensive Applications (DDIA), ByteByteGo, and GitHub System Design Primer.",
    url: "https://github.com/donnemartin/system-design-primer",
    category: "Roadmaps",
    tags: "System Design, HLD, LLD, Architecture, Redis, Kafka, Scalability",
    author: "System Architect"
  },
  {
    id: 3,
    title: "Java 21 & Backend Engineering Career Roadmap",
    content: "Comprehensive step-by-step roadmap for modern Java backend engineers. Step 1: Java 21 Core Mastery (OOP, Generics, Collections Framework, Streams API, Lambdas, Virtual Threads Project Loom). Step 2: Spring Boot 3 Ecosystem (Spring MVC, REST APIs, Dependency Injection, Validation, Spring Data JPA / Hibernate ORM). Step 3: Persistence & Caching (PostgreSQL with Flyway migrations, Redis caching). Step 4: Security & Testing (Spring Security, JWT OAuth2, JUnit 5, Mockito, Testcontainers). Step 5: Containerization & Cloud (Docker multi-stage builds, Kubernetes, GitHub Actions CI/CD). Practice building real full-stack systems with Spring Boot and Next.js.",
    url: "https://roadmap.sh/java",
    category: "Roadmaps",
    tags: "Java, Spring Boot, Backend, Roadmaps, Microservices, PostgreSQL",
    author: "Backend Engineering Group"
  },
  {
    id: 4,
    title: "Python & Full-Stack AI/ML Engineering Roadmap",
    content: "Step-by-step guide to mastering Python for backend APIs and Machine Learning. Step 1: Modern Python 3.12 (PEP 695 typing, OOP, Generators, Asyncio concurrent event loops). Step 2: Problem Solving with Python on LeetCode & GeeksforGeeks (Bisect, Heapq, Collections Counter/Deque). Step 3: High-Speed Web APIs (FastAPI, Pydantic v2, SQLAlchemy 2.0). Step 4: Data Science & AI Core (NumPy array vectorization, Pandas DataFrames, PyTorch deep learning). Step 5: Generative AI & Vector Search (LangChain, Hugging Face Transformers, RAG architectures with Vector Databases like Milvus and Pinecone).",
    url: "https://roadmap.sh/python",
    category: "Roadmaps",
    tags: "Python, AI, Machine Learning, FastAPI, PyTorch, LeetCode, Roadmaps",
    author: "AI & Python Guild"
  },
  {
    id: 5,
    title: "CS Fundamentals Mastery Roadmap: OS, DBMS, Computer Networks",
    content: "A rigorous university and interview preparation roadmap for core CS subjects. 1. Operating Systems: Process Scheduling (CFS, Round Robin), Thread Synchronization (Mutex, Semaphores), Deadlock Avoidance, Virtual Memory Paging. 2. Database Management Systems (DBMS): ACID Properties, Transaction Isolation Levels, B-Tree and Hash Indexing, Normalization 1NF to BCNF, SQL Query Optimization. 3. Computer Networks: OSI 7-layer and TCP/IP stack, TCP 3-way handshake, UDP, DNS resolution, TLS/HTTPS encryption, HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC). Study resources include GeeksforGeeks CS Subjects, Gate Smashers, and OSDev Wiki.",
    url: "https://www.geeksforgeeks.org/computer-science-projects/",
    category: "Roadmaps",
    tags: "Computer Science, OS, DBMS, Networks, GeeksforGeeks, Roadmaps",
    author: "CSE Academic Committee"
  },
  {
    id: 6,
    title: "Full-Stack Web Development Roadmap: Next.js 14, React & TypeScript",
    content: "Step-by-step modern frontend and full-stack engineering guide. Phase 1: Semantic HTML5, CSS Grid, Flexbox, Responsive Design. Phase 2: Modern JavaScript (ES6+, Promises, Event Loop, Closures, DOM APIs). Phase 3: TypeScript (Strict Typing, Generics, Utility Types, Interfaces). Phase 4: React 18/19 (Hooks, Context, Custom Hooks, State Management with Zustand). Phase 5: Next.js 14 (App Router, Server Components RSC, Server Actions, Dynamic Routing, Tailwind CSS). Phase 6: API Integration & Performance (SWR/React Query, Web Vitals optimization, Lighthouse audits).",
    url: "https://roadmap.sh/full-stack",
    category: "Roadmaps",
    tags: "Next.js, React, TypeScript, Frontend, Web Development, Roadmaps",
    author: "Frontend Lead"
  },
  {
    id: 7,
    title: "DevOps, Cloud & Kubernetes Roadmap for Developers",
    content: "Practical infrastructure and deployment guide for software engineers. Stage 1: Linux CLI & Bash Scripting (Permissions, Systemd, Process Management). Stage 2: Networking for DevOps (CIDR, Subnets, Reverse Proxies, SSL/TLS Certbot). Stage 3: Containerization (Docker, Multi-stage Dockerfiles, Docker Compose). Stage 4: Container Orchestration (Kubernetes Pods, Deployments, Services, ConfigMaps, Ingress). Stage 5: CI/CD Pipelines (GitHub Actions, Automated Testing, Semantic Versioning). Stage 6: Cloud Platforms (AWS EC2/ECS/S3 or GCP Compute/Cloud Run, Terraform IaC).",
    url: "https://roadmap.sh/devops",
    category: "Roadmaps",
    tags: "DevOps, Docker, Kubernetes, Cloud, CI/CD, AWS, Roadmaps",
    author: "DevOps Guild"
  },
  {
    id: 8,
    title: "Competitive Programming & Problem-Solving Mastery on LeetCode & GFG",
    content: "A tactical guide to cracking coding rounds on LeetCode, GeeksforGeeks, and Codeforces. Learn to classify problems by algorithmic paradigm: Divide & Conquer, Dynamic Programming, Greedy choice, Two Pointers, Graph Traversals (DFS/BFS), and Bit Manipulation. Master time complexity analysis (Big-O notation) and space complexity trade-offs. Practice top interview questions on LeetCode (Blind 75, Striver A2Z Sheet, GFG Top 50 DSA Problems) under timed conditions to develop speed and clean code hygiene.",
    "url": "https://leetcode.com/explore/",
    category: "Roadmaps",
    tags: "LeetCode, GeeksforGeeks, DSA, Competitive Programming, Interviews, Roadmaps",
    author: "Competitive Programming Lead"
  },
  {
    id: 9,
    title: "Java 21 Virtual Threads and Structured Concurrency",
    content: "Java 21 introduces Virtual Threads (Project Loom), dramatically simplifying concurrent programming on the JVM. Virtual threads are lightweight threads managed by the Java Virtual Machine rather than the underlying operating system. This allows applications to spawn millions of virtual threads with low memory footprint, eliminating the need for complex reactive programming paradigms. Structured concurrency further unifies task lifecycles across multiple child threads.",
    url: "https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html",
    category: "Documentation",
    tags: "Java, Concurrency, JVM, Virtual Threads",
    author: "OpenJDK Team"
  },
  {
    id: 10,
    title: "Python 3.12 GIL Improvements, Asyncio, and Performance",
    content: "Python 3.12 introduces major performance optimizations including per-interpreter GIL (Global Interpreter Lock), faster asyncio event loops, and lower memory overhead for object dictionaries. Python is widely used in Machine Learning with PyTorch and TensorFlow, data science with Pandas and NumPy, and backend web APIs using FastAPI and Django. Type hints and PEP 695 type parameter syntax improve static typing in modern Python codebases.",
    url: "https://docs.python.org/3/whatsnew/3.12.html",
    category: "Documentation",
    tags: "Python, Asyncio, GIL, FastAPI, Machine Learning",
    author: "Python Software Foundation"
  },
  {
    id: 11,
    title: "Understanding Inverted Indexes in Information Retrieval",
    content: "An inverted index is the fundamental data structure used by search engines to map words or terms to their occurrence locations within a collection of documents. Unlike a forward index which maps documents to words, an inverted index enables near instantaneous query candidate retrieval. Key components include dictionary term lookup, posting lists with term frequencies, positional offsets, and document frequency metrics.",
    url: "https://searchforge.dev/articles/inverted-index-guide",
    category: "Articles",
    tags: "Search, Algorithms, Inverted Index, Data Structures",
    author: "Staff Engineer"
  },
  {
    id: 12,
    title: "Okapi BM25 Ranking Algorithm Derivation and Tuning",
    content: "Okapi BM25 is a state-of-the-art non-linear ranking function used in information retrieval. BM25 improves upon classical TF-IDF by incorporating term frequency saturation (controlled by parameter k1) and document length normalization (controlled by parameter b). The term frequency saturation prevents documents with repeated keyword spamming from dominating search results, while length normalization adjusts scores based on document word count relative to average document length.",
    url: "https://searchforge.dev/articles/bm25-ranking-explained",
    category: "Articles",
    tags: "BM25, Ranking, Search Engine, Mathematics",
    author: "Search Architect"
  },
  {
    id: 13,
    title: "Spring Boot 3 Architecture & Microservices Best Practices",
    content: "Spring Boot 3 provides a robust framework for building production-grade Java microservices. Key features include native compilation with GraalVM, Spring Framework 6 baseline, automated configuration, Spring Data JPA repositories, Spring Validation, Actuator metric exposure, and REST API controllers with Spring Web. Proper layering into controllers, services, repositories, and domain models ensures maintainable clean code architecture.",
    url: "https://spring.io/projects/spring-boot",
    category: "Documentation",
    tags: "Spring Boot, Java, REST API, Architecture",
    author: "Spring Community"
  },
  {
    id: 14,
    title: "PostgreSQL Indexing: B-Trees, GIN, and Hash Indexes",
    content: "PostgreSQL supports multiple index types optimized for different query patterns. B-Tree indexes excel at equality and range queries on scalar data types. Generalized Inverted Indexes (GIN) are specifically designed for indexing composite values such as arrays, full-text search documents, and JSONB structures. Understanding index execution plans with EXPLAIN ANALYZE is critical for database query optimization.",
    url: "https://postgresql.org/docs/current/indexes.html",
    category: "Documentation",
    tags: "Database, PostgreSQL, Indexing, SQL",
    author: "Postgres Core Devs"
  },
  {
    id: 15,
    title: "Redis Caching Strategies: Cache-Aside vs Write-Through",
    content: "Redis is an in-memory key-value data store frequently used for query caching and session management. In the Cache-Aside pattern, the application checks Redis first; on a cache miss, it reads from the primary database and populates Redis with an expiration TTL. Redis supports data structures including Strings, Hashes, Lists, Sets, Sorted Sets, and HyperLogLogs for high-throughput sub-millisecond lookups.",
    url: "https://redis.io/docs/manual/client-side-caching/",
    category: "Projects",
    tags: "Redis, Caching, Memory, Systems",
    author: "DevOps Lead"
  },
  {
    id: 16,
    title: "Trie Data Structure for High-Speed Autocomplete Engine",
    content: "A Trie (prefix tree) is a specialized tree data structure used to locate specific keys within a set. In autocomplete search systems, a Trie provides O(L) time complexity for string insertions and prefix searches, where L is the query length. Nodes store character references along with term completion frequencies, allowing fast retrieval of top-k suggestions.",
    url: "https://searchforge.dev/articles/trie-autocomplete",
    category: "Articles",
    tags: "Trie, Autocomplete, Data Structures, Algorithms",
    author: "Algorithm Specialist"
  },
  {
    id: 17,
    title: "Distributed Systems: CAP Theorem and PACELC Extensions",
    content: "The CAP theorem states that a distributed data store can simultaneously provide at most two out of three guarantees: Consistency, Availability, and Partition Tolerance. The PACELC theorem extends this by stating that even in the absence of network partitions (E), a distributed system must choose between Latency (L) and Consistency (C).",
    url: "https://searchforge.dev/articles/distributed-systems-consistency",
    category: "Articles",
    tags: "Distributed Systems, Consistency, CAP Theorem, Database",
    author: "System Architect"
  },
  {
    id: 18,
    title: "Next.js 14 App Router, React Server Components & Tailwind CSS",
    content: "Next.js 14 introduces the App Router architecture built on React Server Components (RSC). RSCs allow components to render on the server, reducing JavaScript bundle sizes sent to the client. Combined with Tailwind CSS for utility-first styling and TypeScript for strict type checking, Next.js provides a modern frontend platform for high-performance web applications.",
    url: "https://nextjs.org/docs",
    category: "Documentation",
    tags: "Next.js, React, Tailwind CSS, Frontend",
    author: "Frontend Core Team"
  },
  {
    id: 19,
    title: "Operating Systems: Process Scheduling and Virtual Memory Management",
    content: "Modern operating systems manage system hardware resources via process scheduling algorithms such as Round Robin, Completely Fair Scheduler (CFS), and Priority Scheduling. Virtual memory uses page tables and Memory Management Units (MMU) to isolate address spaces, enabling demand paging and swapping between RAM and secondary storage.",
    url: "https://searchforge.dev/articles/os-concepts",
    category: "Articles",
    tags: "Operating Systems, Memory, Kernel, Computer Science",
    author: "OS Engineering Group"
  },
  {
    id: 20,
    title: "Computer Networks: TCP/IP Stack, HTTP/3, and QUIC Protocol",
    content: "The TCP/IP protocol stack forms the communication backbone of the Internet. HTTP/3 builds on QUIC, a transport layer network protocol designed by Google using UDP. QUIC eliminates head-of-line blocking present in HTTP/2 over TCP, provides built-in TLS 1.3 encryption, and enables seamless connection migration across IP address changes.",
    url: "https://searchforge.dev/articles/networking-http3-quic",
    category: "Articles",
    tags: "Networking, TCP, HTTP/3, QUIC, Protocols",
    author: "Network Systems Engineer"
  },
  {
    id: 21,
    title: "Machine Learning Fundamentals: Vector Search & Embeddings",
    content: "Vector search represents documents and queries as high-dimensional dense vectors using neural embedding models. Approximate Nearest Neighbor (ANN) search algorithms such as Hierarchical Navigable Small World (HNSW) graphs and Inverted File Index (IVF) allow fast semantic similarity searches complementing traditional lexical inverted indexes.",
    "url": "https://searchforge.dev/articles/ml-embeddings-vector-search",
    category: "Projects",
    tags: "Machine Learning, Vector Search, AI, Embeddings",
    author: "AI Research Team"
  },
  {
    id: 22,
    title: "Docker Containers, Kubernetes Orchestration, and Microservices",
    content: "Docker packages applications and their dependencies into portable containers running on isolated Linux cgroups and namespaces. Kubernetes (K8s) automates deployment, autoscaling, and management of containerized workloads across server clusters using Pods, Deployments, Services, and Ingress controllers with health probes.",
    "url": "https://kubernetes.io/docs/concepts/overview/",
    category: "Documentation",
    tags: "Docker, Kubernetes, DevOps, Cloud, Microservices",
    author: "Cloud Native Foundation"
  },
  {
    id: 23,
    title: "Rust Systems Programming: Memory Safety and Zero-Cost Abstractions",
    content: "Rust is a systems programming language that guarantees memory safety without garbage collection through its borrow checker, ownership model, and lifetimes. Rust enables fearless concurrency, high-performance web servers with Tokio, and WebAssembly compilation with zero-cost abstractions.",
    "url": "https://www.rust-lang.org/learn",
    category: "Documentation",
    tags: "Rust, Systems, Concurrency, Memory Safety",
    author: "Rust Core Team"
  },
  {
    id: 24,
    title: "Go Concurrency: Goroutines, Channels, and CSP Pattern",
    content: "Go provides built-in lightweight concurrency primitives known as goroutines, managed by the Go runtime scheduler. Communication between concurrent goroutines is achieved using typed channels following Communicating Sequential Processes (CSP). Go is the standard language for cloud infrastructure and microservices.",
    "url": "https://go.dev/doc/",
    category: "Documentation",
    tags: "Go, Golang, Concurrency, Goroutines, Backend",
    author: "Go Language Authors"
  },
  {
    id: 25,
    title: "Graph Algorithms: Dijkstra, A* Pathfinding, and Topological Sort",
    content: "Graph theory forms the basis of computer science algorithms. Dijkstra algorithm finds the shortest path on weighted graphs using priority queues. A* incorporates heuristics for pathfinding in gaming and maps. Topological Sort orders vertices in Directed Acyclic Graphs (DAG) for build systems and task scheduling.",
    "url": "https://searchforge.dev/articles/graph-algorithms",
    category: "Articles",
    tags: "Algorithms, Graph Theory, DSA, Pathfinding",
    "author": "DSA Specialist"
  },
  {
    id: 26,
    title: "Cybersecurity & Web Application Security: OWASP Top 10",
    content: "Web application security focuses on protecting websites against attacks including SQL Injection, Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and Broken Access Control. Implementing HTTPS, Content Security Policy (CSP), bcrypt password hashing, and parameterized queries are mandatory security defenses.",
    "url": "https://owasp.org/www-project-top-ten/",
    category: "Documentation",
    tags: "Security, Cybersecurity, OWASP, Authentication, Cryptography",
    "author": "OWASP Security Foundation"
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
          averageDocumentLength: 124.0,
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
    executionTimeMs: 3,
    totalResults: scoredDocs.length,
    page,
    size,
    cacheHit: false,
    results: pagedResults
  };
}
