'use client';

import React from 'react';
import Link from 'next/link';
import SearchInput from '@/components/SearchInput';
import PipelineDiagram from '@/components/PipelineDiagram';
import { Search, Cpu, Database, Layers, ArrowRight, Zap, Code2, ShieldCheck, PlayCircle, Trophy } from 'lucide-react';

export default function LandingPage() {
  const sampleQueries = [
    'neetcode 150 roadmap',
    'aws certification coursera',
    'kubernetes cka simplilearn',
    'system design roadmap',
    'oracle java 21 certification',
    'deeplearning ai coursera'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto pt-6 space-y-6">
        
        {/* Banner Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono">
          <Zap className="w-3.5 h-3.5 text-sky-400" /> First-Principles Engineering Project
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
          Intelligent search, <br />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            built from first principles.
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          SearchForge is an educational, high-performance search engine built in pure Java 21 without external search engine abstractions. Experience custom indexing, BM25 ranking, and trie autocomplete.
        </p>

        {/* Primary Search Bar */}
        <div className="pt-4 max-w-2xl mx-auto">
          <SearchInput size="lg" autoFocus />
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-400">
            <span>Try searching:</span>
            {sampleQueries.map((sq, idx) => (
              <Link
                key={idx}
                href={`/search?q=${encodeURIComponent(sq)}`}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:border-sky-500/50 hover:text-sky-300 font-mono transition-all"
              >
                {sq}
              </Link>
            ))}
          </div>
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
            href="/search?q=java+spring"
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
