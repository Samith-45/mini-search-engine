'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchInput from '@/components/SearchInput';
import ResultCard from '@/components/ResultCard';
import { executeSearch } from '@/lib/api';
import { SearchResponse, SearchResultItem } from '@/lib/types';
import { Cpu, Filter, Zap, ChevronLeft, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';

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

  const categories = ['All', 'Roadmaps', 'Articles', 'Documentation', 'Projects'];

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        
        {/* Results Metadata */}
        <div className="text-sm text-slate-400 flex items-center gap-3">
          {response && !loading && (
            <>
              <span>
                About <strong className="text-slate-100 font-mono">{response.totalResults}</strong> results 
                (<strong className="text-sky-400 font-mono">{response.executionTimeMs}ms</strong>)
              </span>
              {response.cacheHit && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Redis Cache Hit
                </span>
              )}
            </>
          )}
        </div>

        {/* Algorithm Switcher & Category Tabs */}
        <div className="flex items-center gap-4 flex-wrap">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-medium">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeCategory === cat ? 'bg-sky-500/20 text-sky-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* BM25 vs TF-IDF Switcher */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <span className="text-slate-500 px-2 flex items-center gap-1"><Cpu className="w-3 h-3" /> Algo:</span>
            <button
              onClick={() => handleAlgorithmChange('BM25')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                algorithm === 'BM25' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              BM25
            </button>
            <button
              onClick={() => handleAlgorithmChange('TF-IDF')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                algorithm === 'TF-IDF' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              TF-IDF
            </button>
          </div>

        </div>
      </div>

      {/* Main Results Container */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-3 font-mono text-sm">
          <RefreshCw className="w-6 h-6 text-sky-400 animate-spin" />
          <span>Executing inverted index lookup & candidate ranking...</span>
        </div>
      ) : response && response.results.length > 0 ? (
        <div className="max-w-4xl space-y-4">
          {response.results.map((item) => (
            <ResultCard key={item.id} result={item} algorithm={algorithm} />
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-6 mt-8 font-mono text-xs text-slate-400">
            <span>Page {response.page} of {Math.ceil(response.totalResults / response.size) || 1}</span>
            <div className="flex items-center gap-2">
              <button
                disabled={response.page <= 1}
                onClick={() => router.push(`/search?q=${encodeURIComponent(queryParam)}&algorithm=${algorithm}&page=${response.page - 1}&category=${activeCategory}`)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                disabled={response.page * response.size >= response.totalResults}
                onClick={() => router.push(`/search?q=${encodeURIComponent(queryParam)}&algorithm=${algorithm}&page=${response.page + 1}&category=${activeCategory}`)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-colors flex items-center gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-16 text-center max-w-md mx-auto space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-semibold text-slate-200">No matching documents found</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Try adjusting your query terms, checking for typos, or switching between BM25 and TF-IDF algorithms.
          </p>
        </div>
      )}

    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading SearchEngine...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
