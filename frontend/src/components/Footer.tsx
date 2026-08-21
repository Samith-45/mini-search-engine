import React from 'react';
import Link from 'next/link';
import { Terminal, Database, Layers, Server, GitCommit } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 text-slate-400 text-xs py-14 mt-24 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3.5 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-slate-100 text-sm font-sans tracking-tight">
              <Terminal className="w-4 h-4 text-sky-400" />
              SEARCHFORGE
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Distributed Information Retrieval Platform & Performance Engineering Laboratory built from first principles with Java 21 Virtual Threads, Inverted Indexing, Okapi BM25, and Sharded Scatter-Gather Routing.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Distributed Cluster: Online
            </div>
          </div>

          {/* Col 2: Core Laboratories */}
          <div className="space-y-2.5">
            <div className="text-slate-200 font-semibold text-[11px] uppercase tracking-wider font-mono">Systems Labs</div>
            <ul className="space-y-2">
              <li><Link href="/engineering" className="hover:text-sky-400 transition-colors">Benchmark Lab (P50/P95/P99)</Link></li>
              <li><Link href="/relevance" className="hover:text-sky-400 transition-colors">Relevance Lab (NDCG@10 & MRR)</Link></li>
              <li><Link href="/reliability" className="hover:text-sky-400 transition-colors">Reliability & Fault Lab</Link></li>
              <li><Link href="/performance" className="hover:text-sky-400 transition-colors">Performance Investigator</Link></li>
              <li><Link href="/playground" className="hover:text-sky-400 transition-colors">Algorithm Playground</Link></li>
            </ul>
          </div>

          {/* Col 3: Architecture & ADRs */}
          <div className="space-y-2.5">
            <div className="text-slate-200 font-semibold text-[11px] uppercase tracking-wider font-mono">Architecture & Audit</div>
            <ul className="space-y-2">
              <li><Link href="/architecture" className="hover:text-sky-400 transition-colors">Topology & ADR Records</Link></li>
              <li><Link href="/experiments" className="hover:text-sky-400 transition-colors">Experiment Run Ledger</Link></li>
              <li><Link href="/health" className="hover:text-sky-400 transition-colors">Live Telemetry & JVM Heap</Link></li>
              <li><Link href="/overview" className="hover:text-sky-400 transition-colors">60-Second Overview</Link></li>
              <li><Link href="/api-docs" className="hover:text-sky-400 transition-colors">REST API Specifications</Link></li>
            </ul>
          </div>

          {/* Col 4: Knowledge & Search */}
          <div className="space-y-2.5">
            <div className="text-slate-200 font-semibold text-[11px] uppercase tracking-wider font-mono">Search & Knowledge</div>
            <ul className="space-y-2">
              <li><Link href="/explorer" className="hover:text-sky-400 transition-colors">Knowledge Domain Taxonomy</Link></li>
              <li><Link href="/search?q=virtual+threads" className="hover:text-sky-400 transition-colors">Java 21 Concurrency Search</Link></li>
              <li><Link href="/search?q=distributed+consensus" className="hover:text-sky-400 transition-colors">Distributed Consensus Index</Link></li>
              <li><Link href="/search?q=bm25+ranking" className="hover:text-sky-400 transition-colors">Probabilistic BM25 Search</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} SearchForge Engineering</span>
            <span>•</span>
            <a 
              href="https://github.com/Samith-45/mini-search-engine" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1 text-sky-400 hover:underline font-mono"
            >
              <GitCommit className="w-3.5 h-3.5" /> Commit 1fba004
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-mono text-[11px]"><Server className="w-3.5 h-3.5 text-indigo-400" /> Java 21 Loom</span>
            <span className="flex items-center gap-1 font-mono text-[11px]"><Database className="w-3.5 h-3.5 text-sky-400" /> PostgreSQL + Redis</span>
            <span className="flex items-center gap-1 font-mono text-[11px]"><Layers className="w-3.5 h-3.5 text-purple-400" /> Next.js 14</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
