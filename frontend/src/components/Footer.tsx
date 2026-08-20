import React from 'react';
import Link from 'next/link';
import { Terminal, Code2, Database, Cpu, Layers, ShieldCheck, GitBranch, Server, Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
              <Terminal className="w-4 h-4 text-sky-400" />
              SearchForge Platform
            </div>
            <p className="text-slate-400 leading-relaxed">
              Distributed Technical Search & Performance Laboratory built from first principles in Java 21, Virtual Threads, Inverted Index, Okapi BM25, and Redis.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Cluster Status: Operational
            </div>
          </div>

          {/* Col 2: Core Laboratories */}
          <div className="space-y-2">
            <div className="text-slate-200 font-semibold text-[11px] uppercase tracking-wider">Laboratories</div>
            <ul className="space-y-1.5">
              <li><Link href="/engineering" className="hover:text-sky-400 transition-colors">Benchmark Lab (P50/P95/P99)</Link></li>
              <li><Link href="/relevance" className="hover:text-sky-400 transition-colors">Relevance Lab (NDCG@10 & MRR)</Link></li>
              <li><Link href="/reliability" className="hover:text-sky-400 transition-colors">Reliability & Fault Lab</Link></li>
              <li><Link href="/playground" className="hover:text-sky-400 transition-colors">Algorithm Playground</Link></li>
            </ul>
          </div>

          {/* Col 3: Architecture & ADRs */}
          <div className="space-y-2">
            <div className="text-slate-200 font-semibold text-[11px] uppercase tracking-wider">Architecture</div>
            <ul className="space-y-1.5">
              <li><Link href="/architecture" className="hover:text-sky-400 transition-colors">Visual Topology & ADRs</Link></li>
              <li><Link href="/experiments" className="hover:text-sky-400 transition-colors">Experiment History Database</Link></li>
              <li><Link href="/health" className="hover:text-sky-400 transition-colors">Live System Health</Link></li>
              <li><Link href="/api-docs" className="hover:text-sky-400 transition-colors">Interactive API Docs</Link></li>
            </ul>
          </div>

          {/* Col 4: Knowledge & Search */}
          <div className="space-y-2">
            <div className="text-slate-200 font-semibold text-[11px] uppercase tracking-wider">Knowledge Base</div>
            <ul className="space-y-1.5">
              <li><Link href="/explorer" className="hover:text-sky-400 transition-colors">Knowledge Explorer (CS & AI)</Link></li>
              <li><Link href="/search?q=virtual+threads" className="hover:text-sky-400 transition-colors">Java 21 Concurrency Search</Link></li>
              <li><Link href="/search?q=deepseek+vllm" className="hover:text-sky-400 transition-colors">Low-Level AI Inference</Link></li>
              <li><Link href="/search?q=consensus+raft" className="hover:text-sky-400 transition-colors">Distributed Consensus</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} SearchForge Engineering Lab</span>
            <span>•</span>
            <span className="text-slate-400">Demonstrating Google SWE Level Systems & IR Capabilities</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-mono text-[11px]"><Server className="w-3.5 h-3.5 text-indigo-400" /> Java 21 Loom</span>
            <span className="flex items-center gap-1 font-mono text-[11px]"><Database className="w-3.5 h-3.5 text-sky-400" /> PostgreSQL + Redis</span>
            <span className="flex items-center gap-1 font-mono text-[11px]"><Layers className="w-3.5 h-3.5 text-purple-400" /> Next.js 14 App Router</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
