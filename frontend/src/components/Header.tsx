'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Cpu, 
  PlayCircle, 
  Layers, 
  Activity, 
  ShieldAlert, 
  FlaskConical, 
  HeartPulse, 
  FileCode2, 
  Compass, 
  Github, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLabsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainNav = [
    { name: 'Search', href: '/search?q=distributed+systems', icon: Search, color: 'text-sky-400' },
    { name: 'Benchmark Lab', href: '/engineering', icon: Cpu, color: 'text-indigo-400' },
    { name: 'Architecture & ADRs', href: '/architecture', icon: Layers, color: 'text-purple-400' },
    { name: 'Performance', href: '/performance', icon: Activity, color: 'text-amber-400' },
    { name: '60s Overview', href: '/overview', icon: FileCode2, color: 'text-emerald-400' },
  ];

  const labsNav = [
    { name: 'Algorithm Playground', href: '/playground', icon: PlayCircle, desc: 'Interactive step-by-step TF-IDF & BM25 formula explorer' },
    { name: 'Relevance Lab (IR)', href: '/relevance', icon: Activity, desc: '50-query Precision@K, Recall@K, MRR & NDCG@10 evaluations' },
    { name: 'Reliability & Fault Lab', href: '/reliability', icon: ShieldAlert, desc: 'Simulated shard kills, failover & latency injection' },
    { name: 'Performance Investigator', href: '/performance', icon: Cpu, desc: 'Component microsecond execution breakdown & Loom benchmarks' },
    { name: 'Experiment History', href: '/experiments', icon: FlaskConical, desc: 'Persistent commit-linked benchmark run database' },
    { name: 'System Health', href: '/health', icon: HeartPulse, desc: 'Live cluster nodes, JVM heap, cache & telemetry' },
    { name: 'Knowledge Explorer', href: '/explorer', icon: Compass, desc: 'Interactive CS topic and systems domain taxonomy' },
    { name: 'API Docs', href: '/api-docs', icon: FileCode2, desc: 'REST API endpoints, OpenAPI specs & cURL examples' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg text-slate-100 tracking-tight flex items-center gap-1.5">
              SearchForge <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/25 font-mono">Distributed Lab</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono -mt-1 hidden sm:inline">Distributed Search & Benchmark Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 font-medium text-xs text-slate-300">
          {mainNav.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-850/80 transition-colors flex items-center gap-1.5"
            >
              <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
              {item.name}
            </Link>
          ))}

          {/* Research & Systems Labs Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLabsDropdownOpen((prev) => !prev)}
              className="px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-850/80 transition-colors flex items-center gap-1 text-slate-300 focus:outline-none"
            >
              <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
              <span>Systems Labs</span>
              <ChevronDown className={`w-3 h-3 ml-0.5 text-slate-400 transition-transform ${labsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {labsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-800 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2">
                {labsNav.map((lab) => (
                  <Link
                    key={lab.name}
                    href={lab.href}
                    onClick={() => setLabsDropdownOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-800 transition-colors group cursor-pointer"
                  >
                    <lab.icon className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-sky-300">{lab.name}</div>
                      <div className="text-[10px] text-slate-400 leading-tight">{lab.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/engineering"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600/90 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all"
          >
            <Cpu className="w-3.5 h-3.5" /> Run Benchmark
          </Link>
          <a 
            href="https://github.com/Samith-45/mini-search-engine" 
            target="_blank" 
            rel="noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-slate-300" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 px-4 py-4 space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2">Core Platform</div>
          {mainNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-850"
            >
              <item.icon className={`w-4 h-4 ${item.color}`} />
              {item.name}
            </Link>
          ))}

          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 pt-2">Laboratories & Observability</div>
          {labsNav.map((lab) => (
            <Link
              key={lab.name}
              href={lab.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-850"
            >
              <lab.icon className="w-4 h-4 text-sky-400" />
              {lab.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
