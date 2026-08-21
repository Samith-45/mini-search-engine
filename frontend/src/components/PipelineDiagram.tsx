'use client';

import React, { useState } from 'react';
import { FileText, Scissors, Filter, Layers, Database, Cpu, ListFilter, ArrowRight } from 'lucide-react';

const PIPELINE_STEPS = [
  {
    id: 'documents',
    title: 'Documents',
    subtitle: 'Corpus Input',
    icon: FileText,
    color: 'from-sky-500 to-blue-600',
    description: 'Raw textual documents ingested from structured JSON payloads, seeded technical articles, and distributed files.',
    spec: 'Corpus: 67 docs • UTF-8 Unicode'
  },
  {
    id: 'tokenization',
    title: 'Tokenization',
    subtitle: 'Lexical Split',
    icon: Scissors,
    color: 'from-blue-500 to-indigo-600',
    description: 'Regex-based lexical analyzer splits character streams on non-alphanumeric boundaries, preserving technical tokens.',
    spec: 'Pattern: [^a-zA-Z0-9]+'
  },
  {
    id: 'normalization',
    title: 'Normalization',
    subtitle: 'Linguistic Filter',
    icon: Filter,
    color: 'from-indigo-500 to-violet-600',
    description: 'Case folding to lowercase, English stopword elimination ("the", "is", "at"), and Porter-inspired morphological suffix reduction.',
    spec: 'Stopwords: 128 terms • Lowercasing'
  },
  {
    id: 'index',
    title: 'Inverted Index',
    subtitle: 'Memory Map',
    icon: Layers,
    color: 'from-violet-500 to-purple-600',
    description: 'Thread-safe concurrent posting lists mapping Term -> [DocId, TermFrequency, PositionalOffsets] with partition sharding.',
    spec: 'ConcurrentSkipListMap • O(log N)'
  },
  {
    id: 'retrieval',
    title: 'Retrieval',
    subtitle: 'AST Dispatch',
    icon: Database,
    color: 'from-purple-500 to-fuchsia-600',
    description: 'Query parser transforms input queries into Abstract Syntax Trees (AST) evaluating Boolean AND intersections and OR unions.',
    spec: 'Virtual Thread Scatter-Gather'
  },
  {
    id: 'ranking',
    title: 'BM25 Scoring',
    subtitle: 'Probabilistic IR',
    icon: Cpu,
    color: 'from-fuchsia-500 to-pink-600',
    description: 'Okapi BM25 non-linear relevance scoring evaluating term saturation (k1=1.2) and document length normalization penalty (b=0.75).',
    spec: 'Formula: Okapi BM25 • k1=1.2, b=0.75'
  },
  {
    id: 'results',
    title: 'Top-K Heap',
    subtitle: 'Merged Results',
    icon: ListFilter,
    color: 'from-pink-500 to-rose-600',
    description: 'Bounded min-heap priority queue extracts top-K scored documents with highlighted keyword offsets and microsecond latency telemetry.',
    spec: 'Heap: PriorityQueue<DocScore> • O(N log K)'
  }
];

export default function PipelineDiagram() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 my-10 relative overflow-hidden bg-gradient-to-b from-slate-900/60 to-slate-950/80">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-[11px] mb-2 font-semibold">
            <Layers className="w-3.5 h-3.5" /> First-Principles Query Lifecycle
          </div>
          <h3 className="text-2xl font-bold text-slate-100 tracking-tight font-sans">
            How SearchForge Works
          </h3>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          Non-Blocking Pipeline
        </div>
      </div>

      {/* Interactive Flow Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-6">
        {PIPELINE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === activeStep;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[110px] group ${
                isActive
                  ? 'bg-slate-850/95 border-sky-500/60 shadow-lg shadow-sky-500/10 scale-[1.02] z-10'
                  : 'bg-slate-900/40 border-white/5 hover:bg-slate-850/60 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${step.color} flex items-center justify-center text-white shadow-sm`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200 tracking-tight group-hover:text-sky-300 transition-colors">
                  {step.title}
                </div>
                <div className="text-[10px] text-slate-400 font-sans mt-0.5 leading-none">
                  {step.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep-Dive Inspector */}
      <div className="bg-slate-900/90 rounded-xl p-5 border border-white/10 flex flex-col sm:flex-row items-start gap-4 transition-all">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${PIPELINE_STEPS[activeStep].color} flex items-center justify-center text-white shrink-0 shadow-lg shadow-black/40`}>
          {React.createElement(PIPELINE_STEPS[activeStep].icon, { className: "w-6 h-6" })}
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/25 font-semibold">
                STAGE 0{activeStep + 1} OF 07
              </span>
              <h4 className="font-bold text-slate-100 text-base">{PIPELINE_STEPS[activeStep].title} — {PIPELINE_STEPS[activeStep].subtitle}</h4>
            </div>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 border border-indigo-800/60 px-2.5 py-1 rounded">
              {PIPELINE_STEPS[activeStep].spec}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
            {PIPELINE_STEPS[activeStep].description}
          </p>
        </div>
      </div>

    </div>
  );
}
