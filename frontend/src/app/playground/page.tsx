'use client';

import React, { useState, useEffect } from 'react';
import { executeSearch } from '@/lib/api';
import { SearchResponse } from '@/lib/types';
import { PlayCircle, Cpu, ArrowRight, CheckCircle2, BarChart2 } from 'lucide-react';

export default function PlaygroundPage() {
  const [query, setQuery] = useState('java spring');
  const [bm25Results, setBm25Results] = useState<SearchResponse | null>(null);
  const [tfidfResults, setTfidfResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const runPlaygroundComparison = async (q: string) => {
    setLoading(true);
    const [bm25Res, tfidfRes] = await Promise.all([
      executeSearch(q, 'BM25', 1, 5),
      executeSearch(q, 'TF-IDF', 1, 5)
    ]);
    setBm25Results(bm25Res);
    setTfidfResults(tfidfRes);
    setLoading(false);
  };

  useEffect(() => {
    runPlaygroundComparison('java spring');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      runPlaygroundComparison(query.trim());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <PlayCircle className="w-4 h-4" /> Interactive Algorithm Playground
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          TF-IDF vs BM25 Ranking Playground
        </h1>
        <p className="text-sm text-slate-400">
          Compare mathematical ranking algorithm outputs side-by-side in real time to observe term frequency saturation and document length normalization effects.
        </p>
      </div>

      {/* Query Input Form */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter query terms (e.g. java spring, distributed systems)..."
          className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 font-sans"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium text-sm shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 transition-all disabled:opacity-50"
        >
          {loading ? 'Comparing...' : 'Compare Algorithms'}
        </button>
      </form>

      {/* Side-by-Side Results Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* BM25 Column */}
        <div className="glass-panel rounded-2xl p-6 border border-sky-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-sky-400" />
              <h2 className="font-bold text-slate-100 text-lg">BM25 Ranking</h2>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Non-Linear Saturation
            </span>
          </div>

          <div className="text-xs text-slate-400 font-mono bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <strong>Formula:</strong> Score = Σ [ IDF × (TF × (k1+1)) / (TF + k1 × (1 - b + b × (|d|/avgdl))) ]
          </div>

          <div className="space-y-3">
            {bm25Results?.results.map((res, idx) => (
              <div key={res.id} className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 font-mono text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500">Rank #{idx + 1}</span>
                  <span className="text-sky-400 font-bold text-sm">Score: {res.score.toFixed(3)}</span>
                </div>
                <h4 className="font-sans font-semibold text-slate-200 text-sm mb-1">{res.title}</h4>
                <p className="text-slate-400 font-sans line-clamp-2">{res.contentSnippet}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TF-IDF Column */}
        <div className="glass-panel rounded-2xl p-6 border border-indigo-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <h2 className="font-bold text-slate-100 text-lg">TF-IDF Ranking</h2>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Linear Term Weighting
            </span>
          </div>

          <div className="text-xs text-slate-400 font-mono bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <strong>Formula:</strong> Score = Σ [ (Raw TF / |d|) × (ln((N+1)/(df+1)) + 1) ]
          </div>

          <div className="space-y-3">
            {tfidfResults?.results.map((res, idx) => (
              <div key={res.id} className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 font-mono text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500">Rank #{idx + 1}</span>
                  <span className="text-indigo-400 font-bold text-sm">Score: {res.score.toFixed(3)}</span>
                </div>
                <h4 className="font-sans font-semibold text-slate-200 text-sm mb-1">{res.title}</h4>
                <p className="text-slate-400 font-sans line-clamp-2">{res.contentSnippet}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
