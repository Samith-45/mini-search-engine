import React from 'react';
import { Terminal, Code2, Database, Cpu, Layers } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950/80 text-slate-400 text-sm py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <Terminal className="w-4 h-4 text-sky-400" /> SearchForge Engine
          </div>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="text-xs text-slate-400">Built from first principles in Java 21, Spring Boot, PostgreSQL, Redis & Next.js</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Code2 className="w-3.5 h-3.5 text-sky-400" /> Inverted Index</span>
          <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-emerald-400" /> BM25 & TF-IDF</span>
          <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-indigo-400" /> Trie Autocomplete</span>
          <span className="flex items-center gap-1"><Database className="w-3.5 h-3.5 text-purple-400" /> Redis Cache</span>
        </div>

      </div>
    </footer>
  );
}
