'use client';

import React, { useState } from 'react';
import { executeSearch } from '@/lib/api';
import { SearchResponse } from '@/lib/types';
import { Trophy, Zap, CheckCircle2, ArrowRight, Share2, Sparkles, Cpu } from 'lucide-react';

export default function ChallengePage() {
  const challengeQueries = [
    { title: 'Consistency & Availability', query: 'distributed systems consistency' },
    { title: 'High-Throughput Concurrency', query: 'java 21 virtual threads' },
    { title: 'Non-Linear Ranking', query: 'bm25 ranking formula' },
    { title: 'Low-Latency Cache-Aside', query: 'redis caching strategies' },
  ];

  const [activeQuery, setActiveQuery] = useState(challengeQueries[0].query);
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRunChallenge = async (q: string) => {
    setActiveQuery(q);
    setLoading(true);
    const res = await executeSearch(q, 'BM25', 1, 3);
    setResponse(res);
    setLoading(false);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      
      {/* Challenge Hero */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
          <Trophy className="w-4 h-4" /> Search Engine Challenge
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          Can SearchForge find the best answer in 10 seconds?
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Test first-principles candidate retrieval and BM25 relevance scoring against complex computer science queries.
        </p>
      </div>

      {/* Challenge Preset Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
        {challengeQueries.map((cq, idx) => (
          <button
            key={idx}
            onClick={() => handleRunChallenge(cq.query)}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
              activeQuery === cq.query
                ? 'bg-amber-500/10 border-amber-500/50 shadow-lg text-amber-200'
                : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div>
              <span className="text-xs font-mono text-slate-400 block">Challenge #0{idx + 1}</span>
              <strong className="text-sm font-semibold block mt-0.5">{cq.title}</strong>
              <span className="text-xs font-mono text-sky-400 font-normal">"{cq.query}"</span>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
          </button>
        ))}
      </div>

      {/* Execution Results Banner */}
      {response && (
        <div className="glass-panel rounded-2xl p-6 border border-amber-500/30 space-y-4 animate-fade-in">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-slate-100 text-lg">SearchForge Execution Results</h2>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-sky-400 font-bold">{response.executionTimeMs}ms</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-bold">{response.algorithm}</span>
            </div>
          </div>

          {/* Top Ranked Result */}
          {response.results.length > 0 && (
            <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold">#1 TOP RANKED MATCH</span>
                <span className="text-slate-400">BM25 Score: <strong className="text-slate-100">{response.results[0].score.toFixed(3)}</strong></span>
              </div>
              <h3 className="text-lg font-semibold text-sky-400">{response.results[0].title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{response.results[0].contentSnippet}</p>
            </div>
          )}

          {/* Share Button */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified in-memory index evaluation
            </span>
            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share Result'}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
