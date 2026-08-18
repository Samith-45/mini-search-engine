'use client';

import React, { useState } from 'react';
import { FileText, Scissors, Filter, Layers, Database, Cpu, ListFilter, ArrowRight } from 'lucide-react';

const PIPELINE_STEPS = [
  {
    id: 'documents',
    title: 'Documents',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
    description: 'Raw text ingested from post requests or seed data files containing titles, body content, and metadata.'
  },
  {
    id: 'tokenization',
    title: 'Tokenization',
    icon: Scissors,
    color: 'from-cyan-500 to-teal-500',
    description: 'Regex-based tokenizer splits raw document string on boundaries, stripping punctuation and special symbols.'
  },
  {
    id: 'normalization',
    title: 'Normalization',
    icon: Filter,
    color: 'from-teal-500 to-emerald-500',
    description: 'Lowercasing, English stop-word filtering ("a", "the", "in"), and Porter-inspired suffix stemming.'
  },
  {
    id: 'index',
    title: 'Inverted Index',
    icon: Layers,
    color: 'from-emerald-500 to-indigo-500',
    description: 'Thread-safe memory mapping term -> PostingList (sorted docIds, term frequencies, positional offsets).'
  },
  {
    id: 'retrieval',
    title: 'Candidate Retrieval',
    icon: Database,
    color: 'from-indigo-500 to-purple-500',
    description: 'AST Query Parser evaluates Boolean AND/OR intersections, Unions, and phrase positional matches.'
  },
  {
    id: 'ranking',
    title: 'Ranking',
    icon: Cpu,
    color: 'from-purple-500 to-pink-500',
    description: 'First-principles TF-IDF or Okapi BM25 non-linear relevance scoring with length normalization penalty.'
  },
  {
    id: 'results',
    title: 'Search Results',
    icon: ListFilter,
    color: 'from-pink-500 to-rose-500',
    description: 'Formatted search results with execution latency, term highlighting, snippets, and explanation drawers.'
  }
];

export default function PipelineDiagram() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full glass-panel rounded-2xl p-6 border border-slate-800 my-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center justify-center gap-2">
          <Layers className="w-5 h-5 text-sky-400" /> How SearchForge Works
        </h2>
        <p className="text-xs text-slate-400 font-mono mt-1">First-Principles Information Retrieval Execution Pipeline</p>
      </div>

      {/* Steps Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-2 mb-6">
        {PIPELINE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === activeStep;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-left transition-all relative flex flex-col items-center justify-center ${
                isActive
                  ? 'bg-slate-800/90 border-sky-500/80 shadow-lg shadow-sky-500/10 scale-105 z-10'
                  : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${step.color} flex items-center justify-center text-white mb-2 shadow-md`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-200 text-center leading-tight">{step.title}</span>
              <span className="text-[9px] font-mono text-slate-500 mt-1">Step 0{idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Details */}
      <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${PIPELINE_STEPS[activeStep].color} flex items-center justify-center text-white shrink-0 shadow-lg`}>
          {React.createElement(PIPELINE_STEPS[activeStep].icon, { className: "w-5 h-5" })}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Stage 0{activeStep + 1} of 07
            </span>
            <h3 className="font-bold text-slate-100 text-base">{PIPELINE_STEPS[activeStep].title}</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mt-1">
            {PIPELINE_STEPS[activeStep].description}
          </p>
        </div>
      </div>
    </div>
  );
}
