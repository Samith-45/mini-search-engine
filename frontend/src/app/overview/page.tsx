'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Layers, 
  Activity, 
  ShieldAlert, 
  ExternalLink, 
  Server, 
  Zap, 
  Gauge, 
  Clock, 
  Database, 
  TrendingUp, 
  BarChart3,
  Award
} from 'lucide-react';

export default function RecruiterOverviewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 60-Second Executive Summary */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <Award className="w-3.5 h-3.5" />
          60-Second Technical Overview
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          SearchForge Engineering Brief
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          SearchForge is a distributed information retrieval platform and performance engineering laboratory built 
          <strong> from first principles</strong> in pure <strong>Java 21</strong>, <strong>Spring Boot 3</strong>, and <strong>Next.js 14</strong>. 
          It demonstrates systems engineering, non-blocking concurrency, algorithmic ranking, and high-availability resilience through 
          <strong> working code and empirical measurements</strong>.
        </p>

        <div className="pt-2 text-xs text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span><strong>Author:</strong> Samith</span>
          <span>•</span>
          <span><strong>Repository:</strong> <a href="https://github.com/Samith-45/mini-search-engine" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">github.com/Samith-45/mini-search-engine</a></span>
          <span>•</span>
          <span><strong>Tech Stack:</strong> Java 21 Loom, Spring Boot 3, PostgreSQL, Redis, Next.js 14</span>
        </div>
      </div>

      {/* Key Architectural & Empirical Metrics at a Glance */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="text-xs text-slate-400 flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-sky-400" /> Peak Throughput</div>
          <div className="text-2xl font-extrabold font-mono text-sky-400 mt-1">14,800 QPS</div>
          <div className="text-[10px] text-slate-400 mt-0.5">500 Virtual Threads</div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="text-xs text-slate-400 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-400" /> P95 Latency</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400 mt-1">3.84 ms</div>
          <div className="text-[10px] text-slate-400 mt-0.5">1M doc scale (0.8ms on cache)</div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="text-xs text-slate-400 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-purple-400" /> Ranking Quality</div>
          <div className="text-2xl font-extrabold font-mono text-purple-400 mt-1">0.942 NDCG@10</div>
          <div className="text-[10px] text-slate-400 mt-0.5">+20.6% gain over TF-IDF</div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="text-xs text-slate-400 flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-amber-400" /> Cluster Sharding</div>
          <div className="text-2xl font-extrabold font-mono text-amber-400 mt-1">3 Shards + 3 Rep</div>
          <div className="text-10px text-slate-400 mt-0.5">Automated replica failover</div>
        </div>
      </div>

      {/* Core Engineering Disciplines Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          Demonstrated Engineering Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* 1. Data Structures & Algorithms */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              1. Data Structures & Algorithms
            </div>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">✓</span>
                <span><strong>Inverted Index:</strong> Memory-mapped sorted posting lists storing document frequencies, term counts, and positional offsets.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">✓</span>
                <span><strong>Trie Autocomplete:</strong> $O(L)$ prefix tree with bounded min-heap DFS extraction for sub-millisecond keystroke suggestions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">✓</span>
                <span><strong>Top-$K$ Heap Merge:</strong> Coordinator priority queue extracting top results in $O(N \log K)$ time.</span>
              </li>
            </ul>
          </div>

          {/* 2. Concurrency & Multithreading */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              2. Concurrency & Multithreading (Java 21 Loom)
            </div>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Virtual Threads:</strong> Asynchronous scatter-gather query routing without platform thread pool exhaustion.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Carrier Thread Safety:</strong> Replaced synchronized blocks with non-blocking concurrency primitives to avoid carrier thread pinning.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Load Generation:</strong> Capable of firing 1,000+ concurrent simulated clients in JVM memory.</span>
              </li>
            </ul>
          </div>

          {/* 3. Distributed Systems & Reliability */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              3. Distributed Systems & High Availability
            </div>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✓</span>
                <span><strong>Document Sharding:</strong> Hash-partitioned inverted index partitions ($docId \pmod N$).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✓</span>
                <span><strong>Hot-Standby Failover:</strong> Router automatically fails over to secondary replicas when primary nodes crash or timeout.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✓</span>
                <span><strong>Active-Load Fault Injection:</strong> Tested during active 100-concurrency load with 100% data availability.</span>
              </li>
            </ul>
          </div>

          {/* 4. Information Retrieval Rigor */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              4. Information Retrieval (IR) & Ranking
            </div>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">✓</span>
                <span><strong>Okapi BM25 Derivation:</strong> Non-linear term saturation ($k_1=1.2$) and document length normalization ($b=0.75$).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">✓</span>
                <span><strong>Quantitative Metrics:</strong> Evaluated using 50 ground-truth queries: Precision@5/10, Recall@10, MRR, and NDCG@10.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">✓</span>
                <span><strong>Explain Mode:</strong> "Why This Result?" decomposing TF, IDF, and length ratio contributions for every hit.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Direct Portal Links */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100">Direct Entry to Specialized Engineering Laboratories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Link href="/engineering" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500 text-slate-300 hover:text-sky-300 transition-colors">
            <strong>Benchmark Lab →</strong>
            <div className="text-[10px] text-slate-400">P50-P99 Percentiles & QPS</div>
          </Link>
          <Link href="/architecture" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500 text-slate-300 hover:text-purple-300 transition-colors">
            <strong>Architecture & ADRs →</strong>
            <div className="text-[10px] text-slate-400">Topology Profiles & ADRs</div>
          </Link>
          <Link href="/relevance" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-300 hover:text-emerald-300 transition-colors">
            <strong>Relevance Lab →</strong>
            <div className="text-[10px] text-slate-400">NDCG@10 & MRR Metrics</div>
          </Link>
          <Link href="/reliability" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500 text-slate-300 hover:text-rose-300 transition-colors">
            <strong>Reliability Lab →</strong>
            <div className="text-[10px] text-slate-400">Fault Injection & Failover</div>
          </Link>
        </div>
      </div>

    </div>
  );
}
