'use client';

import React from 'react';
import { SearchResultItem } from '@/lib/types';
import { X, Cpu, Layers, HelpCircle, CheckCircle2, BarChart2 } from 'lucide-react';

interface ExplainModalProps {
  result: SearchResultItem;
  algorithm: String;
  onClose: () => void;
}

export default function ExplainModal({ result, algorithm, onClose }: ExplainModalProps) {
  const explanation = result.explanation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-2xl border border-slate-700 shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-lg">Why this result?</h3>
              <p className="text-xs text-slate-400 font-mono">Relevance Score Explanation — {algorithm} Algorithm</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto pr-1 space-y-4">
          
          {/* Summary Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 text-center font-mono text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">FINAL SCORE</span>
              <span className="text-sky-400 font-bold text-base">{result.score.toFixed(3)}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">MATCHED TERMS</span>
              <span className="text-emerald-400 font-bold text-base">{result.matchedTerms?.length || 0}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">DOC LENGTH |d|</span>
              <span className="text-indigo-400 font-bold text-base">{explanation?.documentLength || 0}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">AVG LENGTH avgdl</span>
              <span className="text-amber-400 font-bold text-base">{explanation?.averageDocumentLength?.toFixed(1) || 0}</span>
            </div>
          </div>

          {/* Mathematical Formula Banner */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 font-mono">
            {algorithm === 'BM25' ? (
              <p>
                <strong className="text-sky-400">BM25 Formula:</strong> Score = Σ [ IDF(t) × (TF × (k1 + 1)) / (TF + k1 × (1 - b + b × (|d| / avgdl))) ]
                <br />
                <span className="text-[11px] text-slate-500 mt-1 block">Configured parameters: k1 = 1.2 (saturation), b = 0.75 (length norm penalty)</span>
              </p>
            ) : (
              <p>
                <strong className="text-sky-400">TF-IDF Formula:</strong> Score = Σ [ (Raw TF / |d|) × (ln((N + 1) / (df + 1)) + 1) ]
                <br />
                <span className="text-[11px] text-slate-500 mt-1 block">Normalizes term frequency against document length & logarithmic inverse doc frequency</span>
              </p>
            )}
          </div>

          {/* Term Breakdown Table */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-sky-400" /> Term Decompositions
            </h4>

            {explanation?.termExplanations && Object.keys(explanation.termExplanations).length > 0 ? (
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2 px-3">Term</th>
                      <th className="py-2 px-3">TF (Raw)</th>
                      <th className="py-2 px-3">DF (Docs)</th>
                      <th className="py-2 px-3">IDF Score</th>
                      <th className="py-2 px-3 text-right">Contribution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {Object.values(explanation.termExplanations).map((t, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="py-2 px-3 font-bold text-sky-400">{t.term}</td>
                        <td className="py-2 px-3">{t.termFrequency}</td>
                        <td className="py-2 px-3">{t.documentFrequency}</td>
                        <td className="py-2 px-3">{t.idfScore.toFixed(3)}</td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-400">+{t.termContribution.toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 text-center">
                Query terms matched directly via inverted index positional/phrase union lookup.
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> First-Principles Verification</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
