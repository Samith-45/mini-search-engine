'use client';

import React, { useState, useEffect } from 'react';
import { executeSearch, calculateBM25Playground } from '@/lib/api';
import { SearchResponse, BM25CalculationResponse } from '@/lib/types';
import { PlayCircle, Cpu, Sliders, CheckCircle2, BarChart2, Zap, RefreshCw, Calculator } from 'lucide-react';

export default function PlaygroundPage() {
  const [query, setQuery] = useState('java virtual threads');
  const [bm25Results, setBm25Results] = useState<SearchResponse | null>(null);
  const [tfidfResults, setTfidfResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Interactive Mathematical Calculator State
  const [k1, setK1] = useState(1.2);
  const [b, setB] = useState(0.75);
  const [termFrequency, setTermFrequency] = useState(3);
  const [documentLength, setDocumentLength] = useState(120);
  const [averageDocumentLength, setAverageDocumentLength] = useState(135.0);
  const [totalDocuments, setTotalDocuments] = useState(10000);
  const [documentFrequency, setDocumentFrequency] = useState(45);
  const [calcResult, setCalcResult] = useState<BM25CalculationResponse | null>(null);
  const [calculating, setCalculating] = useState(false);

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

  const runLiveCalculation = async () => {
    setCalculating(true);
    try {
      const res = await calculateBM25Playground({
        k1,
        b,
        termFrequency,
        documentLength,
        averageDocumentLength,
        totalDocuments,
        documentFrequency
      });
      setCalcResult(res);
    } catch {
      // Fallback
    } finally {
      setCalculating(false);
    }
  };

  useEffect(() => {
    runPlaygroundComparison('java virtual threads');
    runLiveCalculation();
  }, []);

  useEffect(() => {
    runLiveCalculation();
  }, [k1, b, termFrequency, documentLength, averageDocumentLength, totalDocuments, documentFrequency]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      runPlaygroundComparison(query.trim());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <PlayCircle className="w-4 h-4" /> Interactive Algorithm Laboratory
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          TF-IDF vs Okapi BM25 Ranking & Mathematical Explorer
        </h1>
        <p className="text-sm text-slate-400">
          Compare ranking algorithm outputs on real technical documents and interactively adjust mathematical saturation ($k_1$) and length normalization ($b$) parameters.
        </p>
      </div>

      {/* Query Input Form */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter query terms (e.g. java virtual threads, distributed raft)..."
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
              <h2 className="font-bold text-slate-100 text-lg">Okapi BM25 Ranking</h2>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Non-Linear Saturation
            </span>
          </div>

          <div className="text-xs text-slate-400 font-mono bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <strong>Formula:</strong> Score = &Sigma; [ IDF &times; (TF &times; (k1+1)) / (TF + k1 &times; (1 - b + b &times; (|d|/avgdl))) ]
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
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-slate-100 text-lg">Classical TF-IDF</h2>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Linear Frequency
            </span>
          </div>

          <div className="text-xs text-slate-400 font-mono bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <strong>Formula:</strong> Score = &Sigma; [ (TF / |d|) &times; (ln((N + 1) / (DF + 1)) + 1) ]
          </div>

          <div className="space-y-3">
            {tfidfResults?.results.map((res, idx) => (
              <div key={res.id} className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 font-mono text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500">Rank #{idx + 1}</span>
                  <span className="text-amber-400 font-bold text-sm">Score: {res.score.toFixed(3)}</span>
                </div>
                <h4 className="font-sans font-semibold text-slate-200 text-sm mb-1">{res.title}</h4>
                <p className="text-slate-400 font-sans line-clamp-2">{res.contentSnippet}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Interactive Step-by-Step Mathematical Decomposition */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-400" />
              Live BM25 Step-by-Step Formula Decomposition
            </h2>
            <p className="text-xs text-slate-400">
              Tweak parameters to observe exact intermediate values calculated live by the backend.
            </p>
          </div>
        </div>

        {/* Parameter Sliders */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>k1 (Saturation):</span>
              <span className="text-sky-400 font-bold">{k1}</span>
            </div>
            <input 
              type="range" min="0.1" max="3.0" step="0.05" value={k1}
              onChange={(e) => setK1(parseFloat(e.target.value))}
              className="w-full accent-sky-500"
            />
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>b (Length Penalty):</span>
              <span className="text-emerald-400 font-bold">{b}</span>
            </div>
            <input 
              type="range" min="0.0" max="1.0" step="0.05" value={b}
              onChange={(e) => setB(parseFloat(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>TF (Term Frequency):</span>
              <span className="text-purple-400 font-bold">{termFrequency}</span>
            </div>
            <input 
              type="range" min="1" max="25" step="1" value={termFrequency}
              onChange={(e) => setTermFrequency(parseInt(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>|d| (Doc Length):</span>
              <span className="text-amber-400 font-bold">{documentLength}</span>
            </div>
            <input 
              type="range" min="20" max="500" step="10" value={documentLength}
              onChange={(e) => setDocumentLength(parseInt(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>
        </div>

        {/* Live Calculation Output Card */}
        {calcResult && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Intermediate Scores */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[11px]">IDF Component</div>
                <div className="text-xl font-extrabold text-sky-400">{calcResult.idfScore}</div>
                <div className="text-[10px] text-slate-500">Rarity multiplier</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[11px]">Length Norm Penalty</div>
                <div className="text-xl font-extrabold text-emerald-400">{calcResult.lengthNormalizationPenalty}</div>
                <div className="text-[10px] text-slate-500">1 - b + b*(|d|/avgdl)</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[11px]">Saturated TF Factor</div>
                <div className="text-xl font-extrabold text-purple-400">{calcResult.saturatedTfScore}</div>
                <div className="text-[10px] text-slate-500">Bounded by (k1 + 1)</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[11px]">Final BM25 Score</div>
                <div className="text-xl font-extrabold text-emerald-400">{calcResult.finalBM25Score}</div>
                <div className="text-[10px] text-slate-500">vs TF-IDF: {calcResult.tfIdfBaselineScore}</div>
              </div>
            </div>

            {/* Step-by-Step Text Output */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
              <div className="text-slate-400 text-[11px] font-bold border-b border-slate-800 pb-1">Mathematical Derivation Trace:</div>
              <pre className="whitespace-pre-wrap text-emerald-400 leading-relaxed text-[11px]">
                {calcResult.mathematicalStepBreakdown}
              </pre>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
