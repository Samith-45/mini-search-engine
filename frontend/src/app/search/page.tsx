'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchInput from '@/components/SearchInput';
import ResultCard from '@/components/ResultCard';
import { executeSearch } from '@/lib/api';
import { SearchResponse } from '@/lib/types';
import { Cpu, Zap, ChevronLeft, ChevronRight, AlertCircle, RefreshCw, Layers } from 'lucide-react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryParam = searchParams.get('q') || '';
  const algoParam = searchParams.get('algorithm') || 'BM25';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const categoryParam = searchParams.get('category') || 'All';

  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [algorithm, setAlgorithm] = useState(algoParam);
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  const categories = ['All', 'Popular AI & Cloud Tools', 'AI & LLM Tools', 'Roadmaps', 'Certifications', 'Systems & Architecture', 'Documentation', 'Articles', 'Projects'];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    executeSearch(queryParam, algorithm, pageParam, 10, activeCategory)
      .then((res) => {
        if (isMounted) {
          setResponse(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [queryParam, algorithm, pageParam, activeCategory]);

  const handleAlgorithmChange = (newAlgo: string) => {
    setAlgorithm(newAlgo);
    router.push(`/search?q=${encodeURIComponent(queryParam)}&algorithm=${newAlgo}&category=${activeCategory}`);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    router.push(`/search?q=${encodeURIComponent(queryParam)}&algorithm=${algorithm}&category=${cat}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Search Input Bar */}
      <div className="max-w-3xl">
        <SearchInput initialQuery={queryParam} size="md" />
      </div>

      {/* Controls & Metrics Header Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
        
        {/* Results Metadata */}
        <div className="text-xs sm:text-sm text-slate-400 flex flex-wrap items-center gap-3 font-mono">
          {response && !loading && (
            <>
              <span>
                Found <strong className="text-slate-100">{response.totalResults}</strong> documents in <strong className="text-sky-400">{response.executionTimeMs}ms</strong>
              </span>
              {response.cacheHit ? (
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Cache Hit (Redis)
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Inverted Index Query
                </span>
              )}
            </>
          )}
        </div>

        {/* Algorithm Switcher & Category Tabs */}
        <div className="flex items-center gap-3 flex-wrap w-full lg:w-auto justify-between lg:justify-end">
          
          {/* BM25 vs TF-IDF Switcher */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10 text-xs font-mono">
            <span className="text-slate-400 px-2 flex items-center gap-1 text-[11px]"><Cpu className="w-3 h-3 text-sky-400" /> Rank:</span>
            <button
              onClick={() => handleAlgorithmChange('BM25')}
              className={`px-3 py-1 rounded-lg transition-all text-xs font-semibold ${
                algorithm === 'BM25' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              BM25
            </button>
            <button
              onClick={() => handleAlgorithmChange('TF-IDF')}
              className={`px-3 py-1 rounded-lg transition-all text-xs font-semibold ${
                algorithm === 'TF-IDF' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              TF-IDF
            </button>
          </div>

        </div>
      </div>

      {/* Category Pills (Scrollable) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs font-medium">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all border ${
              activeCategory === cat 
                ? 'bg-slate-800 border-sky-500/50 text-sky-300 font-semibold shadow-sm' 
                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Results Container */}
      {loading ? (
        <div className="max-w-4xl space-y-4 pt-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="glass-card rounded-2xl p-5 border border-white/5 animate-pulse space-y-3">
              <div className="h-4 bg-slate-800 rounded w-1/3"></div>
              <div className="h-5 bg-slate-800 rounded w-2/3"></div>
              <div className="h-12 bg-slate-800/60 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : response && response.results.length > 0 ? (
        <div className="max-w-4xl space-y-4">
          {response.results.map((item) => (
            <ResultCard key={item.id} result={item} algorithm={algorithm} />
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-8 font-mono text-xs text-slate-400">
            <span>Page {response.page} of {Math.ceil(response.totalResults / response.size) || 1}</span>
            <div className="flex items-center gap-2">
              <button
                disabled={response.page <= 1}
                onClick={() => router.push(`/search?q=${encodeURIComponent(queryParam)}&algorithm=${algorithm}&page=${response.page - 1}&category=${activeCategory}`)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-800 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                disabled={response.page * response.size >= response.totalResults}
                onClick={() => router.push(`/search?q=${encodeURIComponent(queryParam)}&algorithm=${algorithm}&page=${response.page + 1}&category=${activeCategory}`)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-800 transition-colors flex items-center gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20 text-center max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-200">No matching documents found</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Try adjusting your query terms, checking for spelling, or switching between BM25 and TF-IDF scoring algorithms.
          </p>
        </div>
      )}

    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400 font-mono text-xs">Loading SearchEngine...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
