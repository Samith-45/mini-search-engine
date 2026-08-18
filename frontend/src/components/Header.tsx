'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Cpu, PlayCircle, Trophy, Github, Terminal } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-100 tracking-tight flex items-center gap-1.5">
              SearchForge <span className="text-xs px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono font-normal">v1.0</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono -mt-1">First-Principles Search</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-slate-300">
          <Link href="/search?q=java+spring" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5">
            <Search className="w-4 h-4 text-sky-400" /> Search Engine
          </Link>
          <Link href="/engineering" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-indigo-400" /> Engineering Mode
          </Link>
          <Link href="/playground" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5">
            <PlayCircle className="w-4 h-4 text-emerald-400" /> Algorithm Playground
          </Link>
          <Link href="/challenge" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" /> 10s Challenge
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="GitHub Repository"
          >
            <Github className="w-5 h-5" />
          </a>
          <Link
            href="/search?q=distributed+systems"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-500 shadow-md shadow-sky-600/20 transition-all"
          >
            <Terminal className="w-3.5 h-3.5" /> Demo Search
          </Link>
        </div>

      </div>
    </header>
  );
}
