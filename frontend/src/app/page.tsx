'use client';

import React from 'react';
import Link from 'next/link';
import SearchInput from '@/components/SearchInput';
import PipelineDiagram from '@/components/PipelineDiagram';
import { Search, Cpu, Database, Layers, ArrowRight, Zap, Code2, ShieldCheck, PlayCircle, Trophy, Bot, Sparkles, Terminal, BookOpen, Award, Server } from 'lucide-react';

export default function LandingPage() {
  const quickCategories = [
    {
      title: 'Low-Level AI & LLM Tools',
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
      title: 'Systems & Architecture',
      icon: Server,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      items: [
        { label: 'eBPF & Linux Kernel', query: 'ebpf linux kernel' },
        { label: 'LLVM & JIT Compilers', query: 'llvm compiler ast jit' },
        { label: 'LSM-Trees vs B+ Trees', query: 'lsm-tree vs b+ tree' },
        { label: 'Raft Distributed Consensus', query: 'raft paxos consensus etcd' },
        { label: 'DPDK & io_uring', query: 'dpdk io_uring networking' },
        { label: 'Quantum Qiskit', query: 'quantum computing qiskit' }
      ]
    },
    {
      title: 'Preparation Roadmaps',
      icon: BookOpen,
      color: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30',
      items: [
        { label: 'NeetCode 150 Roadmap', query: 'neetcode 150 roadmap' },
        { label: 'System Design (HLD/LLD)', query: 'system design roadmap' },
        { label: 'Java 21 Backend Guide', query: 'java 21 backend roadmap' },
        { label: 'Python & AI/ML Roadmap', query: 'python ai ml roadmap' },
        { label: 'CS Fundamentals (OS/DBMS)', query: 'cs fundamentals os dbms' },
        { label: 'DevOps & K8s Roadmap', query: 'devops kubernetes roadmap' }
      ]
    },
    {
      title: 'Industry Certifications',
      icon: Award,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
      items: [
        { label: 'AWS Solutions Architect', query: 'aws certification coursera' },
        { label: 'Google Cloud Architect', query: 'google cloud gcp certification' },
        { label: 'Oracle Java 21 (1Z0-830)', query: 'oracle java 21 certification' },
        { label: 'Kubernetes CKA & CKAD', query: 'kubernetes cka simplilearn' },
        { label: 'DeepLearning.AI Andrew Ng', query: 'deeplearning ai coursera' },
        { label: 'CompTIA Security+ & CISSP', query: 'comptia security plus' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto pt-6 space-y-6">
        
        {/* Banner Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono">
          <Zap className="w-3.5 h-3.5 text-sky-400" /> Global Computer Science & AI Search Engine
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
          Global CS & AI Knowledge, <br />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            indexed from first principles.
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          High-performance search engine built in Java 21 & Spring Boot. Explore low-level AI inference engines, distributed systems, interview roadmaps, and industry certifications.
        </p>

        {/* Primary Search Bar */}
        <div className="pt-4 max-w-2xl mx-auto">
          <SearchInput size="lg" autoFocus />
        </div>

      </section>

      {/* Quick Discovery Topic Hub */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" /> Quick Discovery & AI Tools Hub
          </h2>
          <Link href="/search" className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono">
            Browse all topics <ArrowRight className="w-3.5 h-3.5" />
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

      {/* Visual Search Pipeline Section */}
      <section>
        <PipelineDiagram />
      </section>

      {/* Built With Tech Stack */}
      <section className="glass-panel rounded-2xl p-8 border border-slate-800 text-center space-y-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center justify-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-400" /> Technology Architecture
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-sky-400 font-bold block text-sm">Java 21</span>
            <span className="text-slate-500">Standalone Core</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-emerald-400 font-bold block text-sm">Spring Boot 3</span>
            <span className="text-slate-500">REST Controllers</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-indigo-400 font-bold block text-sm">PostgreSQL</span>
            <span className="text-slate-500">Flyway Schema</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-purple-400 font-bold block text-sm">Redis</span>
            <span className="text-slate-500">Query Result Cache</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-amber-400 font-bold block text-sm">Next.js 14</span>
            <span className="text-slate-500">Tailwind UX</span>
          </div>
        </div>
      </section>

      {/* Engineering Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl p-6 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 text-lg">Inverted Index</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Thread-safe memory mapping of terms to sorted posting lists storing document frequencies, term counts, and positional offsets.
          </p>
        </div>

        <div className="glass-card rounded-xl p-6 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 text-lg">TF-IDF & BM25</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Pluggable relevance scoring with Okapi BM25 non-linear term frequency saturation and document length normalization.
          </p>
        </div>

        <div className="glass-card rounded-xl p-6 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 text-lg">Trie Autocomplete</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            O(L) string insertions and sub-millisecond prefix suggestions ranked by term completion frequency.
          </p>
        </div>
      </section>

      {/* Call to Actions */}
      <section className="glass-panel rounded-2xl p-8 border border-sky-500/20 bg-gradient-to-br from-slate-900 to-sky-950/40 text-center space-y-6">
        <h2 className="text-2xl font-bold text-slate-100">Explore the Engine & Engineering Dashboards</h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Test search queries, inspect posting lists, compare mathematical algorithm outputs, and run live performance benchmarks.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/search?q=llama.cpp+vllm"
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/20 flex items-center gap-2 transition-all"
          >
            <Search className="w-4 h-4" /> Try Search Engine
          </Link>
          <Link
            href="/engineering"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 flex items-center gap-2 transition-all"
          >
            <Cpu className="w-4 h-4 text-indigo-400" /> Engineering Dashboard
          </Link>
          <Link
            href="/challenge"
            className="px-6 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-sm border border-amber-500/30 flex items-center gap-2 transition-all"
          >
            <Trophy className="w-4 h-4 text-amber-400" /> 10s Challenge
          </Link>
        </div>
      </section>

    </div>
  );
}
