'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import SearchInput from '@/components/SearchInput';
import PipelineDiagram from '@/components/PipelineDiagram';
import { fetchLatestExperiment, fetchTelemetry } from '@/lib/api';
import { ExperimentRecord, HealthTelemetry } from '@/lib/types';
import { 
  Search, 
  Cpu, 
  Database, 
  Layers, 
  ArrowRight, 
  Zap, 
  Code2, 
  ShieldCheck, 
  PlayCircle, 
  Terminal, 
  Server, 
  Activity, 
  ShieldAlert, 
  FlaskConical, 
  HeartPulse, 
  Network,
  GitCommit,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// Dynamically import 3D Search Core to ensure 0s FCP blocking
const SearchCore3D = dynamic(() => import('@/components/SearchCore3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] flex items-center justify-center">
      <div className="w-48 h-48 rounded-full border border-sky-500/20 flex items-center justify-center animate-pulse-subtle bg-slate-900/20">
        <div className="w-24 h-24 rounded-full border border-indigo-500/30 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-sky-400/80 animate-ping" />
        </div>
      </div>
    </div>
  )
});

export default function LandingPage() {
  const [latestExp, setLatestExp] = useState<ExperimentRecord | null>(null);
  const [telemetry, setTelemetry] = useState<HealthTelemetry | null>(null);

  useEffect(() => {
    fetchLatestExperiment().then(setLatestExp).catch(() => setLatestExp(null));
    fetchTelemetry().then(setTelemetry).catch(() => setTelemetry(null));
  }, []);

  const capabilities = [
    {
      title: 'Information Retrieval',
      desc: 'Okapi BM25 probabilistic relevance ranking with term saturation (k1) and document length normalization (b).',
      icon: Search,
      href: '/relevance',
      tag: 'BM25 & TF-IDF'
    },
    {
      title: 'Algorithms & Data Structures',
      desc: 'Inverted index posting lists with skip pointers, prefix trie autocomplete, and AST query parsing.',
      icon: PlayCircle,
      href: '/playground',
      tag: 'Trie & Inverted Index'
    },
    {
      title: 'Distributed Systems',
      desc: 'Consistent hashing shard router with scatter-gather parallel execution and master-replica failover.',
      icon: Network,
      href: '/architecture',
      tag: 'Shards & Replicas'
    },
    {
      title: 'Multithreading & Concurrency',
      desc: 'Java 21 Virtual Threads (Project Loom) non-blocking IO with concurrent skip-list postings.',
      icon: Server,
      href: '/performance',
      tag: 'Java 21 Loom'
    },
    {
      title: 'Performance Engineering',
      desc: 'Microsecond query pipeline execution telemetry, memory allocation tracking, and P50–P99 percentiles.',
      icon: Activity,
      href: '/engineering',
      tag: 'P50/P95/P99 Telemetry'
    },
    {
      title: 'Fault Tolerance & Resilience',
      desc: 'Active load fault-injection engine testing shard crashes, router timeouts, and zero-downtime failover.',
      icon: ShieldAlert,
      href: '/reliability',
      tag: 'Chaos Engineering'
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH 3D SEARCH CORE */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-12 lg:pt-16 pb-12 sm:pb-20 border-b border-white/5 bg-radial-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Technical Value Proposition */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/25 text-sky-400 text-xs font-mono backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                <span>Distributed Search & Performance Platform</span>
              </div>

              {/* Display Title */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 tracking-tight font-sans leading-[1.08]">
                  SEARCHFORGE
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 tracking-tight">
                  Distributed Technical Search Engine
                </p>
              </div>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-sans">
                Explore information retrieval, ranking algorithms, concurrency, and distributed search through an interactive engineering platform built from first principles.
              </p>

              {/* Search Bar Input Centerpiece */}
              <div className="pt-1 max-w-xl">
                <SearchInput size="lg" placeholder="Search algorithms, systems, Java, databases..." autoFocus />
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/search?q=distributed+systems"
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-lg shadow-sky-600/25 flex items-center gap-2 transition-all font-mono"
                >
                  <Search className="w-4 h-4" /> Explore Search
                </Link>
                <Link
                  href="/engineering"
                  className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 flex items-center gap-2 transition-all font-mono"
                >
                  <Cpu className="w-4 h-4 text-indigo-400" /> Benchmark Lab
                </Link>
                <a
                  href="https://github.com/Samith-45/mini-search-engine"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-800 flex items-center gap-2 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View GitHub
                </a>
              </div>

              {/* Tech Stack Indicator Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-slate-400">
                <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-sky-400">Java 21 Loom</span>
                <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-indigo-400">Okapi BM25</span>
                <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-purple-400">Inverted Index</span>
                <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-emerald-400">Redis Cache</span>
                <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-amber-400">PostgreSQL</span>
              </div>

            </div>

            {/* Right Column: 3D Search Core Visual */}
            <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[480px] lg:h-[540px] flex items-center justify-center">
              <div className="absolute inset-0 bg-radial-subtle opacity-60 rounded-full blur-3xl pointer-events-none" />
              <SearchCore3D />
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. SECTION — WHAT IS SEARCHFORGE? (EDITORIAL) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-b from-slate-900/80 to-slate-950/90">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
                <Terminal className="w-3.5 h-3.5" /> First-Principles Systems Design
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight font-sans">
                Search, engineered from first principles.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                SearchForge is an engineering-focused information retrieval platform built to demonstrate lexical indexing, probabilistic ranking algorithms, virtual thread concurrency, caching, and distributed scatter-gather execution without relying on black-box search engines.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold block text-sm">Lexical Indexing</span>
                <span className="text-slate-400 text-[11px] leading-tight block">Inverted index posting lists with positional offsets and term frequencies.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-indigo-400 font-bold block text-sm">Probabilistic BM25</span>
                <span className="text-slate-400 text-[11px] leading-tight block">Non-linear term saturation with average document length penalties.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-purple-400 font-bold block text-sm">Scatter-Gather Router</span>
                <span className="text-slate-400 text-[11px] leading-tight block">Non-blocking parallel shard dispatch with bounded top-K heap merging.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block text-sm">Resilient Topology</span>
                <span className="text-slate-400 text-[11px] leading-tight block">Active master-replica failover with automated health heartbeat checks.</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. SECTION — HOW SEARCH WORKS (7-STAGE PIPELINE) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PipelineDiagram />
      </section>


      {/* ========================================================================= */}
      {/* 4. SECTION — ENGINEERING CAPABILITIES (6-CARD GRID) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[11px] mb-2 font-semibold">
              <Code2 className="w-3.5 h-3.5" /> Core Systems Foundations
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight font-sans">
              Engineering Capabilities
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md font-sans">
            Explore dedicated laboratories and interactive components designed for rigorous empirical testing and architectural inspection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <Link
                key={idx}
                href={cap.href}
                className="glass-card p-6 rounded-2xl border border-white/5 hover:border-sky-500/30 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:border-sky-500/40 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {cap.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-sky-400 group-hover:translate-x-1 transition-transform font-mono pt-2">
                  <span>Explore Module</span> <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>

      </section>


      {/* ========================================================================= */}
      {/* 5. SECTION — ARCHITECTURE & DISTRIBUTED TOPOLOGY */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden bg-gradient-to-b from-slate-900/80 to-slate-950/90">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-[11px] mb-2 font-semibold">
                <Network className="w-3.5 h-3.5" /> Conceptual Cluster Topology
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight font-sans">
                Distributed Search Architecture
              </h2>
            </div>
            <Link
              href="/architecture"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-all font-mono"
            >
              <span>Explore Architecture & ADRs</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Conceptual Architecture Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-8 font-mono text-xs text-center">
            
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center space-y-2">
              <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold">1</span>
              <span className="text-slate-200 font-bold">Client / UI</span>
              <span className="text-[10px] text-slate-400">Next.js App Router & REST API</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 flex flex-col items-center justify-center space-y-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">2</span>
              <span className="text-slate-200 font-bold">Search API</span>
              <span className="text-[10px] text-slate-400">Virtual Thread Dispatcher</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 flex flex-col items-center justify-center space-y-2">
              <span className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">3</span>
              <span className="text-slate-200 font-bold">Query Parser (AST)</span>
              <span className="text-[10px] text-slate-400">Lexical Tokenization & Boolean Tree</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col items-center justify-center space-y-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">4</span>
              <span className="text-slate-200 font-bold">Shard Scatter-Gather</span>
              <span className="text-[10px] text-slate-400">Inverted Index Posting Traversal</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-col items-center justify-center space-y-2">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">5</span>
              <span className="text-slate-200 font-bold">BM25 Top-K Merge</span>
              <span className="text-[10px] text-slate-400">PriorityQueue Heap Ranking</span>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. SECTION — VERIFIED PERFORMANCE & EXPERIMENT LEDGER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] mb-2 font-semibold">
              <Activity className="w-3.5 h-3.5" /> Verifiable Backend Measurements
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight font-sans">
              Performance & Experiment Ledger
            </h2>
          </div>
          <Link
            href="/experiments"
            className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono"
          >
            View Complete Ledger <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {latestExp ? (
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Latest Verified Run:</span>
                <span className="text-slate-100 font-bold">{latestExp.experimentName}</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700 flex items-center gap-1">
                  <GitCommit className="w-3 h-3" /> {latestExp.gitCommit}
                </span>
              </div>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Verified in PostgreSQL
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 font-mono text-center">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Corpus Scale</span>
                <span className="text-lg font-bold text-slate-100">{latestExp.documentCount.toLocaleString()} docs</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Virtual Threads</span>
                <span className="text-lg font-bold text-indigo-400">{latestExp.concurrencyLevel}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Throughput</span>
                <span className="text-lg font-bold text-sky-400">{latestExp.queriesPerSec.toLocaleString()} QPS</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">P50 Latency</span>
                <span className="text-lg font-bold text-emerald-400">{latestExp.p50LatencyMs}ms</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">P95 Latency</span>
                <span className="text-lg font-bold text-amber-400">{latestExp.p95LatencyMs}ms</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">P99 Latency</span>
                <span className="text-lg font-bold text-rose-400">{latestExp.p99LatencyMs}ms</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-8 border border-white/10 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-base font-bold text-slate-100">No verified experiment recorded yet</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Run an empirical load test in Benchmark Lab to execute virtual thread benchmarks and persist verifiable measurements.
              </p>
            </div>
            <Link
              href="/engineering"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md transition-all font-mono"
            >
              <Cpu className="w-3.5 h-3.5" /> Run Empirical Benchmark
            </Link>
          </div>
        )}

      </section>


      {/* ========================================================================= */}
      {/* 7. SECTION — GITHUB & DOCUMENTATION CALLOUT */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 text-center space-y-6 bg-radial-subtle">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-sky-500/20">
            <Code2 className="w-6 h-6" />
          </div>
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight font-sans">
              Explore the Implementation
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Inspect the complete open-source repository featuring clean Java 21 architecture, comprehensive JUnit 5 test suites, and OpenAPI specifications.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://github.com/Samith-45/mini-search-engine"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-white text-slate-900 text-xs font-bold font-mono flex items-center gap-2 transition-all shadow-md"
            >
              <ExternalLink className="w-4 h-4" /> GitHub Repository
            </a>
            <Link
              href="/api-docs"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 flex items-center gap-2 transition-all font-mono"
            >
              <Terminal className="w-4 h-4 text-sky-400" /> REST API Documentation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
