'use client';

import React, { useState } from 'react';
import { SearchResultItem } from '@/lib/types';
import ExplainModal from './ExplainModal';
import { ExternalLink, Cpu, Tag, User, Sparkles } from 'lucide-react';

interface ResultCardProps {
  result: SearchResultItem;
  algorithm: string;
}

export default function ResultCard({ result, algorithm }: ResultCardProps) {
  const [showExplain, setShowExplain] = useState(false);

  // Highlight matched terms in snippet
  const renderHighlightedSnippet = (snippet: string, terms: string[]) => {
    if (!terms || terms.length === 0) return snippet;
    
    // Create regex for terms
    const pattern = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = snippet.split(pattern);

    return parts.map((part, idx) => 
      terms.some(t => t.toLowerCase() === part.toLowerCase()) ? (
        <mark key={idx} className="bg-sky-500/25 text-sky-300 font-semibold px-0.5 rounded border-b border-sky-400/50">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <article className="glass-card rounded-xl p-5 mb-4 border border-slate-800 hover:border-slate-700 transition-all group">
        
        {/* Header Metadata */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-300 truncate max-w-md">{result.url}</span>
            {result.category && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {result.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
              <Cpu className="w-3 h-3 text-sky-400" /> {algorithm}: {result.score.toFixed(2)}
            </span>
            <button
              onClick={() => setShowExplain(true)}
              className="text-xs text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1 font-medium transition-colors"
            >
              <Sparkles className="w-3 h-3" /> Why this result?
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-sky-400 group-hover:text-sky-300 mb-2 transition-colors">
          <a href={result.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
            {result.title}
            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </h3>

        {/* Content Snippet */}
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          {renderHighlightedSnippet(result.contentSnippet, result.matchedTerms)}
        </p>

        {/* Tags & Author */}
        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2.5 mt-2">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Tag className="w-3 h-3 text-slate-400" />
            <span>{result.tags}</span>
          </div>
          {result.author && (
            <div className="flex items-center gap-1 text-slate-400">
              <User className="w-3 h-3" />
              <span>{result.author}</span>
            </div>
          )}
        </div>

      </article>

      {/* Why This Result Explanation Drawer Modal */}
      {showExplain && (
        <ExplainModal
          result={result}
          algorithm={algorithm}
          onClose={() => setShowExplain(false)}
        />
      )}
    </>
  );
}
