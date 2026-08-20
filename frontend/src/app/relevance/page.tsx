'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Award, 
  BarChart2, 
  CheckCircle2, 
  FileSearch, 
  HelpCircle, 
  Layers, 
  RefreshCw, 
  SlidersHorizontal, 
  Zap 
} from 'lucide-react';
import { fetchRelevanceEvaluation } from '@/lib/api';
import { RelevanceEvaluationResult } from '@/lib/types';

export default function RelevancePage() {
  const [results, setResults] = useState<RelevanceEvaluationResult[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRelevance = async () => {
    setLoading(true);
    try {
      const data = await fetchRelevanceEvaluation();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRelevance();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
          <Activity className="w-3.5 h-3.5" />
          Information Retrieval (IR) Relevance Laboratory
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Search Quality & Ranking Evaluation
        </h1>
        <p className="mt-2 text-slate-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Quantitatively compare scoring algorithms against standard ground-truth technical queries. 
          Evaluate Information Retrieval metrics: <span className="font-mono text-emerald-400">Precision@K</span>, 
          <span className="font-mono text-sky-400"> Recall@K</span>, 
          <span className="font-mono text-indigo-400"> MRR (Mean Reciprocal Rank)</span>, and 
          <span className="font-mono text-purple-400"> NDCG@10 (Normalized Discounted Cumulative Gain)</span>.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={loadRelevance}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Re-evaluate IR Metric Benchmark
          </button>
        </div>
      </div>

      {/* Metrics Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {results.map((res, idx) => {
          const isBest = res.strategyName.includes('BM25');
          return (
            <div 
              key={res.strategyName} 
              className={`glass-panel p-6 rounded-2xl border transition-all ${
                res.strategyName === 'Field-Boosted BM25' 
                  ? 'border-emerald-500/50 bg-emerald-950/10 shadow-xl shadow-emerald-500/5' 
                  : 'border-slate-800 bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono font-bold text-sm text-slate-200">{res.strategyName}</span>
                {res.strategyName === 'Field-Boosted BM25' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
                    HIGHEST ACCURACY
                  </span>
                )}
              </div>

              {/* Primary Metric: NDCG@10 */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center mb-6">
                <div className="text-[11px] text-slate-400 font-mono uppercase">NDCG@10 Score</div>
                <div className={`text-3xl font-extrabold font-mono mt-1 ${
                  res.ndcgAt10 > 0.9 ? 'text-emerald-400' : res.ndcgAt10 > 0.85 ? 'text-sky-400' : 'text-amber-400'
                }`}>
                  {res.ndcgAt10}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Ideal Cumulative Gain ratio</div>
              </div>

              {/* Detailed Metrics List */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                  <span className="text-slate-400">Precision@5</span>
                  <span className="font-mono font-bold text-slate-200">{res.precisionAt5}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                  <span className="text-slate-400">Precision@10</span>
                  <span className="font-mono font-bold text-slate-200">{res.precisionAt10}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                  <span className="text-slate-400">Recall@10</span>
                  <span className="font-mono font-bold text-sky-400">{res.recallAt10}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                  <span className="text-slate-400">MRR (Mean Reciprocal Rank)</span>
                  <span className="font-mono font-bold text-indigo-400">{res.meanReciprocalRank}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Ground Truth Evaluation Methodology */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <FileSearch className="w-4 h-4 text-sky-400" />
          Standard Ground-Truth Evaluation Benchmark Queries
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          The relevance evaluation engine runs against 5 pre-judged technical queries across distributed systems, concurrency, vector search, and IR:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {[
            { query: 'Java 21 virtual threads concurrency', docs: 'Virtual Threads, Project Loom, Concurrency Benchmarks' },
            { query: 'Distributed systems consensus raft paxos', docs: 'Raft Consensus, Paxos Replication, Distributed Commit' },
            { query: 'Vector search embeddings neural machine learning', docs: 'Vector Indexing, HNSW, Embedding Cosine Similarity' },
            { query: 'Inverted index information retrieval BM25 ranking', docs: 'Inverted Index, Posting Lists, Okapi BM25 Derivation' },
            { query: 'llama.cpp vLLM local deepseek inference', docs: 'llama.cpp, vLLM PagedAttention, DeepSeek Reasoning' }
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="font-mono font-bold text-sky-400 mb-1">&quot;{item.query}&quot;</div>
              <div className="text-[11px] text-slate-400">Target Ground Truth: {item.docs}</div>
            </div>
          ))}
        </div>
      </div>

      {/* IR Mathematical Derivations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400">
        <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
          <div className="font-bold text-slate-200">NDCG@K (Normalized Discounted Cumulative Gain)</div>
          <div className="font-mono text-[11px] text-slate-300 p-2 rounded bg-slate-950 border border-slate-800">
            DCG@K = ∑ (2^rel_i - 1) / log2(i + 1), &nbsp; NDCG@K = DCG@K / IDCG@K
          </div>
          <p>
            Penalizes relevant documents appearing late in search results logarithmically. An NDCG of 1.0 represents the mathematically optimal ranking.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
          <div className="font-bold text-slate-200">MRR (Mean Reciprocal Rank)</div>
          <div className="font-mono text-[11px] text-slate-300 p-2 rounded bg-slate-950 border border-slate-800">
            MRR = (1 / |Q|) * ∑ (1 / rank_i)
          </div>
          <p>
            Calculates the reciprocal rank of the first relevant document. A score of 1.0 means the top result was relevant for 100% of tested queries.
          </p>
        </div>
      </div>

    </div>
  );
}
