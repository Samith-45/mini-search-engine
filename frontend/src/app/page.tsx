'use client';

import React from 'react';
import Link from 'next/link';
import SearchInput from '@/components/SearchInput';
import PipelineDiagram from '@/components/PipelineDiagram';
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
  Trophy, 
  Bot, 
  Sparkles, 
  Terminal, 
  BookOpen, 
  Award, 
  Server, 
  Globe2, 
  Activity, 
  ShieldAlert, 
  FlaskConical, 
  HeartPulse, 
  Network 
} from 'lucide-react';

export default function LandingPage() {
  const quickCategories = [
    {
      title: 'Popular AI & Cloud Ecosystem',
      icon: Globe2,
      color: 'from-pink-500/20 to-rose-500/20 text-rose-400 border-rose-500/30',
      items: [
        { label: 'ChatGPT & GPT-4o', query: 'chatgpt gpt-4o openai' },
        { label: 'Claude 3.5 Sonnet', query: 'claude 3.5 sonnet artifacts' },
        { label: 'Grok by xAI', query: 'grok xai real-time' },
        { label: 'Google Gemini 2.0', query: 'gemini 2.0 flash google' },
        { label: 'Bolt.new (App Builder)', query: 'bolt.new stackblitz webcontainers' },
        { label: 'Lovable.dev (AI Dev)', query: 'lovable.dev supabase' },
        { label: 'Replit Agent', query: 'replit cloud ide agent' },
        { label: 'Cursor & Windsurf IDE', query: 'cursor windsurf ai editor' },
        { label: 'Suno AI (Music)', query: 'suno ai audio synthesis' },
        { label: 'Higgsfield & Runway', query: 'higgsfield runway video' },
        { label: 'Jasper AI (Marketing)', query: 'jasper ai copywriting' },
        { label: 'Firebase (Google BaaS)', query: 'firebase firestore auth' },
        { label: 'Supabase (PostgreSQL)', query: 'supabase postgresql pgvector' },
        { label: 'UiPath (RPA)', query: 'uipath rpa robotic automation' },
        { label: 'ElevenLabs (Voice)', query: 'elevenlabs voice cloning' }
      ]
    },
    {
      title: 'Low-Level AI & LLM Engines',
      icon: Bot,
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
      items: [
        { label: 'llama.cpp (C++ Inference)', query: 'llama.cpp pure c++' },
        { label: 'Ollama (Local Models)', query: 'ollama local models' },
        { label: 'vLLM (PagedAttention)', query: 'vllm pagedattention' },
        { label: 'DeepSeek-R1 (MoE Reasoning)', query: 'deepseek r1 architecture' },
        { label: 'FlashAttention-2', query: 'flashattention-2 cuda' },
        { label: 'TensorRT-LLM & Triton', query: 'tensorrt-llm triton nvidia' }
      ]
    },
    {
      title: 'Systems & Concurrency',
      icon: Server,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      items: [
        { label: 'Java 21 Virtual Threads', query: 'java 21 virtual threads concurrency' },
        { label: 'eBPF & Linux Kernel', query: 'ebpf linux kernel' },
        { label: 'LLVM & JIT Compilers', query: 'llvm compiler ast jit' },
        { label: 'LSM-Trees vs B+ Trees', query: 'lsm-tree vs b+ tree' },
        { label: 'Raft Distributed Consensus', query: 'raft paxos consensus etcd' },
        { label: 'DPDK & io_uring', query: 'dpdk io_uring networking' }
      ]
    },
    {
      title: 'Roadmaps & Certifications',
      icon: Award,
      color: 'from-amber-500/20 to-purple-500/20 text-amber-400 border-amber-500/30',
      items: [
        { label: 'NeetCode 150 Roadmap', query: 'neetcode 150 roadmap' },
        { label: 'System Design (HLD/LLD)', query: 'system design roadmap' },
        { label: 'AWS Solutions Architect', query: 'aws certification coursera' },
        { label: 'Google Cloud Architect', query: 'google cloud gcp certification' },
        { label: 'Oracle Java 21 (1Z0-830)', query: 'oracle java 21 certification' },
        { label: 'Kubernetes CKA & CKAD', query: 'kubernetes cka simplilearn' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto pt-4 space-y-6">
        
        {/* Banner Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          SearchForge — Distributed Technical Search & Performance Laboratory
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
          Distributed Search Engine & <br />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Systems Performance Lab.
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          High-performance distributed search platform built in Java 21 Loom, Inverted Index, Okapi BM25, and Redis. 
          Experiment with multi-threaded load generators, IR quality benchmarks (NDCG@10), and fault-injection labs.
        </p>

        {/* Primary Search Bar */}
        <div className="pt-2 max-w-2xl mx-auto">
          <SearchInput size="lg" autoFocus />
        </div>

      </section>

      {/* Systems Laboratories Hub */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-indigo-400" /> Systems Engineering & Research Laboratories
          </h2>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">Google SWE Level Rigor & Telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Lab 1: Benchmark */}
          <Link href="/engineering" className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all group flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base group-hover:text-indigo-300 transition-colors">Benchmark Lab</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scale corpus to 500K+ docs and test 500+ Virtual Threads. Measure empirical P50/P75/P90/P95/P99 latency and QPS.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
              <span>Launch Lab</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Lab 2: Architecture */}
          <Link href="/architecture" className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all group flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base group-hover:text-purple-300 transition-colors">Architecture & ADRs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Switch between Single Node, Sharded, and Replicated cluster configurations. Inspect 6 formal Engineering Decision Records.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
              <span>View Topology</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Lab 3: Relevance */}
          <Link href="/relevance" className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all group flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base group-hover:text-emerald-300 transition-colors">Relevance Lab (IR)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Quantitative Information Retrieval quality comparisons. Measure Precision@K, Recall@K, MRR, and NDCG@10.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Evaluate IR</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Lab 4: Reliability */}
          <Link href="/reliability" className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-rose-500/50 transition-all group flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-100 text-base group-hover:text-rose-300 transition-colors">Reliability & Faults</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Simulate shard crashes, inject network latency, and observe real-time replica failover with zero data loss.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-rose-400 group-hover:translate-x-1 transition-transform">
              <span>Inject Faults</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

        </div>
      </section>

      {/* Quick Discovery Topic Hub */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" /> Technical Corpus & AI Discovery Hub
          </h2>
          <Link href="/explorer" className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono">
            Knowledge Explorer <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="glass-card rounded-xl p-5 border border-slate-800 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${cat.color} border`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-slate-100 text-sm">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, itemIdx) => (
                      <Link
                        key={itemIdx}
                        href={`/search?q=${encodeURIComponent(item.query)}`}
                        className="px-2.5 py-1 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 text-slate-300 hover:text-sky-300 text-xs transition-all font-mono"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Search Pipeline */}
      <section>
        <PipelineDiagram />
      </section>

      {/* Technology Stack Grid */}
      <section className="glass-panel rounded-2xl p-8 border border-slate-800 text-center space-y-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center justify-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-400" /> Technology Architecture
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-sky-400 font-bold block text-sm">Java 21</span>
            <span className="text-slate-400">Virtual Threads</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-emerald-400 font-bold block text-sm">Spring Boot 3</span>
            <span className="text-slate-400">Scatter-Gather Router</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-indigo-400 font-bold block text-sm">PostgreSQL</span>
            <span className="text-slate-400">Flyway Migrations</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-purple-400 font-bold block text-sm">Redis</span>
            <span className="text-slate-400">Cache-Aside Store</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-amber-400 font-bold block text-sm">Next.js 14</span>
            <span className="text-slate-400">TypeScript & Tailwind</span>
          </div>
        </div>
      </section>

    </div>
  );
}
