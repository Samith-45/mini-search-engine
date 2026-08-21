'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: 'Engineering', href: '/engineering', icon: Cpu, color: 'text-indigo-400' },
    { name: 'Architecture', href: '/architecture', icon: Layers, color: 'text-purple-400' },
    { name: 'Experiments', href: '/experiments', icon: FlaskConical, color: 'text-amber-400' },
    { name: 'Performance', href: '/performance', icon: Activity, color: 'text-emerald-400' },
    { name: 'Reliability', href: '/reliability', icon: ShieldAlert, color: 'text-rose-400' },
  ];

  const labsNav = [
    { name: 'Algorithm Playground', href: '/playground', icon: PlayCircle, desc: 'Interactive step-by-step TF-IDF & BM25 formula explorer' },
    { name: 'Relevance Lab (IR)', href: '/relevance', icon: Activity, desc: '50-query Precision@K, Recall@K, MRR & NDCG@10 evaluations' },
    { name: 'Reliability & Fault Lab', href: '/reliability', icon: ShieldAlert, desc: 'Simulated shard kills, failover & latency injection' },
    { name: 'Performance Investigator', href: '/performance', icon: Cpu, desc: 'Component microsecond execution breakdown & Loom benchmarks' },
    { name: 'Experiment History', href: '/experiments', icon: FlaskConical, desc: 'Persistent commit-linked benchmark run database' },
    { name: 'System Health', href: '/health', icon: HeartPulse, desc: 'Live cluster nodes, JVM heap, cache & telemetry' },
    { name: 'Knowledge Explorer', href: '/explorer', icon: Compass, desc: 'Interactive CS topic and systems domain taxonomy' },
    { name: 'API Docs', href: '/api-docs', icon: FileCode2, desc: 'REST API endpoints, OpenAPI specs & cURL examples' },
    { name: '60s Overview', href: '/overview', icon: FileCode2, desc: 'Summary of distributed architecture & verified metrics' }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/60' 
          : 'bg-slate-950/40 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Search className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base text-slate-100 tracking-tight flex items-center gap-1.5 font-sans">
              SEARCHFORGE <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase">v2.0</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono -mt-1 hidden sm:inline">Distributed Information Retrieval</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-300">
          {mainNav.map((item) => {
            const isActive = pathname === item.href || (item.href.startsWith('/search') && pathname === '/search');
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  isActive 
                    ? 'text-white bg-slate-800/80 border border-white/10 font-semibold shadow-sm' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                {item.name}
              </Link>
            );
          })}

          {/* Research & Systems Labs Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLabsDropdownOpen((prev) => !prev)}
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-900/60 transition-colors flex items-center gap-1 text-slate-300 focus:outline-none"
            >
              <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
              <span>Labs</span>
              <ChevronDown className={`w-3 h-3 ml-0.5 text-slate-400 transition-transform ${labsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {labsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900/95 border border-slate-800 p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-1 font-semibold">
                  Engineering Systems & Labs
                </div>
                {labsNav.map((lab) => (
                  <Link
                    key={lab.name}
                    href={lab.href}
                    onClick={() => setLabsDropdownOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-800/80 transition-colors group cursor-pointer"
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
        <div className="flex items-center gap-2.5">
          <Link
            href="/api-docs"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-900/60 transition-colors border border-transparent hover:border-slate-800"
          >
            <FileCode2 className="w-3.5 h-3.5 text-sky-400" /> API Docs
          </Link>
          <a 
            href="https://github.com/Samith-45/mini-search-engine" 
            target="_blank" 
            rel="noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors border border-white/5"
            title="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>
          <Link
            href="/engineering"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 transition-all font-mono"
          >
            <Cpu className="w-3.5 h-3.5" /> Benchmark
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-white/5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-slate-300" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-mono px-2">Primary Systems</div>
          {mainNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800"
            >
              <item.icon className={`w-4 h-4 ${item.color}`} />
              {item.name}
            </Link>
          ))}

          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-mono px-2 pt-3">Observability & Labs</div>
          {labsNav.map((lab) => (
            <Link
              key={lab.name}
              href={lab.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800"
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
