'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  Search, 
  ExternalLink, 
  Tag, 
  Sparkles, 
  Cpu, 
  Server, 
  Award, 
  BookOpen, 
  Layers 
} from 'lucide-react';
import { ALL_DOCUMENTS } from '@/lib/api';

export default function KnowledgeExplorerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const categories = ['All', 'AI Tools', 'Low-Level AI Engines', 'Systems & Concurrency', 'Roadmaps', 'Certifications', 'Engineering'];

  const filteredDocs = ALL_DOCUMENTS.filter(doc => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory || 
      (selectedCategory === 'Engineering' && (doc.category.includes('Engineering') || doc.category.includes('Database')));
    const matchesSearch = searchFilter === '' || 
      doc.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
      doc.content.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (doc.tags && doc.tags.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Hero Header */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
          <Compass className="w-3.5 h-3.5" />
          Technical Corpus & Knowledge Lexicon
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Computer Science & AI Knowledge Explorer
        </h1>
        <p className="mt-2 text-slate-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Browse the complete indexed corpus of {ALL_DOCUMENTS.length} curated technical documents covering popular generative AI platforms, 
          low-level inference kernels (llama.cpp, vLLM, FlashAttention), distributed systems, interview roadmaps, and industry certifications.
        </p>

        {/* Search & Category Filter Controls */}
        <div className="mt-8 space-y-4">
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input 
              type="text"
              placeholder="Search across title, content, and tags..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-inner"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedCategory === cat 
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20' 
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div 
            key={doc.id}
            className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition-all flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                  {doc.category}
                </span>
                <span className="text-[10px] font-mono text-slate-400">Doc #{doc.id}</span>
              </div>
              <h3 className="font-bold text-base text-slate-100 group-hover:text-emerald-300 transition-colors">
                {doc.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {doc.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/60 space-y-3">
              {doc.tags && (
                <div className="flex flex-wrap gap-1">
                  {doc.tags.split(',').slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              <Link
                href={`/search?q=${encodeURIComponent(doc.title)}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300 group/link"
              >
                <span>Search in Inverted Index</span>
                <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
