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
  Layers,
  Zap,
  Flame,
  Bot,
  BrainCircuit,
  Wand2,
  Code2
} from 'lucide-react';
import { ALL_DOCUMENTS } from '@/lib/api';

export default function KnowledgeExplorerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const categories = [
    'All', 
    'Frontier Reasoning & Thinking',
    'Multimodal & Creative Media',
    'AI Coding & App Builders',
    'Open Weights & Local Inference',
    'Systems & Concurrency', 
    'Roadmaps', 
    'Certifications'
  ];

  const filteredDocs = ALL_DOCUMENTS.filter(doc => {
    const text = `${doc.title} ${doc.content} ${doc.tags || ''}`.toLowerCase();
    
    let matchesCat = true;
    if (selectedCategory === 'Frontier Reasoning & Thinking') {
      matchesCat = text.includes('reasoning') || text.includes('thinking') || text.includes('o1') || text.includes('o3-mini') || text.includes('gemini 3.7') || text.includes('claude 3.7') || text.includes('grok 3') || text.includes('deepseek-r1') || text.includes('qwq');
    } else if (selectedCategory === 'Multimodal & Creative Media') {
      matchesCat = text.includes('multimodal') || text.includes('sora') || text.includes('suno') || text.includes('udio') || text.includes('runway') || text.includes('midjourney') || text.includes('flux') || text.includes('elevenlabs') || text.includes('kling') || text.includes('higgsfield') || text.includes('gemini 2.0') || text.includes('gpt-4.5') || text.includes('gpt-4o') || text.includes('fable') || text.includes('opus');
    } else if (selectedCategory === 'AI Coding & App Builders') {
      matchesCat = text.includes('cursor') || text.includes('windsurf') || text.includes('bolt.new') || text.includes('lovable') || text.includes('replit') || text.includes('devin') || text.includes('swe-bench') || text.includes('artifacts') || text.includes('code editor');
    } else if (selectedCategory === 'Open Weights & Local Inference') {
      matchesCat = text.includes('llama.cpp') || text.includes('vllm') || text.includes('ollama') || text.includes('deepseek-v3') || text.includes('llama 3') || text.includes('mistral') || text.includes('qwen') || text.includes('gguf') || text.includes('open weights') || text.includes('tensorrt');
    } else if (selectedCategory === 'Systems & Concurrency') {
      matchesCat = doc.category.includes('Systems') || doc.category.includes('Documentation') || doc.category.includes('Articles') || text.includes('kernel') || text.includes('virtual threads') || text.includes('raft') || text.includes('bm25') || text.includes('inverted index');
    } else if (selectedCategory === 'Roadmaps') {
      matchesCat = doc.category === 'Roadmaps' || text.includes('roadmap') || text.includes('neetcode');
    } else if (selectedCategory === 'Certifications') {
      matchesCat = doc.category === 'Certifications' || text.includes('certification') || text.includes('coursera') || text.includes('simplilearn');
    }

    const matchesSearch = searchFilter === '' || 
      doc.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
      doc.content.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (doc.tags && doc.tags.toLowerCase().includes(searchFilter.toLowerCase()));
    
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Hero Header */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <Compass className="w-3.5 h-3.5" />
          Technical Corpus & AI Frontier Lexicon
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Computer Science & AI Models Knowledge Explorer
        </h1>
        <p className="text-slate-300 max-w-4xl leading-relaxed text-sm sm:text-base">
          Browse the complete indexed corpus of {ALL_DOCUMENTS.length} curated technical documents covering latest frontier reasoning models 
          (<strong>Gemini 3.7 Flash/Pro</strong>, <strong>Claude 3.7 Sonnet</strong>, <strong>Claude Opus & Fable</strong>, <strong>OpenAI o1/o3-mini</strong>, <strong>Grok 3</strong>, <strong>DeepSeek-R1</strong>), 
          AI coding environments, low-level inference engines (<strong>vLLM</strong>, <strong>llama.cpp GGUF</strong>), distributed systems, and interview roadmaps.
        </p>

        {/* Featured Model Badges Spectrum */}
        <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 flex items-center gap-1.5">
            <BrainCircuit className="w-3 h-3" /> Gemini 3.7 Flash & Pro (Thinking)
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center gap-1.5">
            <Bot className="w-3 h-3" /> Claude 3.7 Sonnet & Opus (Fable)
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-1.5">
            <Zap className="w-3 h-3" /> OpenAI o1 & o3-mini (RL Reasoning)
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center gap-1.5">
            <Flame className="w-3 h-3" /> Grok 3 (Colossus H100)
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-300 flex items-center gap-1.5">
            <Code2 className="w-3 h-3" /> DeepSeek-R1 & V3 (MoE MLA)
          </span>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-6 space-y-4 pt-2">
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input 
              type="text"
              placeholder="Search across title, model names, tags, architectures..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-inner"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
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
              <p className="text-xs text-slate-400 line-clamp-4 leading-relaxed">
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
                href={`/search?q=${encodeURIComponent(doc.title.split(':')[0])}`}
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
