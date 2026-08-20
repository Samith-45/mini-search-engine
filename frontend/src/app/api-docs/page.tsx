'use client';

import React, { useState } from 'react';
import { 
  FileCode2, 
  Terminal, 
  Copy, 
  Check, 
  Send, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Server, 
  Cpu 
} from 'lucide-react';

export default function ApiDocsPage() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/search',
      title: 'Distributed Document Search',
      desc: 'Executes scatter-gather search query across active shards using BM25 or TF-IDF ranking with Redis cache-aside.',
      params: [
        { name: 'q', type: 'string', required: true, desc: 'Search query string (e.g. "virtual threads")' },
        { name: 'algorithm', type: 'string', required: false, desc: 'BM25 (default) or TFIDF' },
        { name: 'page', type: 'integer', required: false, desc: 'Page number (default: 1)' },
        { name: 'size', type: 'integer', required: false, desc: 'Results per page (default: 10)' }
      ],
      curl: 'curl -X GET "https://mini-search-engine-six.vercel.app/api/v1/search?q=java+virtual+threads&algorithm=BM25"'
    },
    {
      method: 'GET',
      path: '/api/v1/autocomplete',
      title: 'Trie Prefix Autocomplete',
      desc: 'Retrieves sub-millisecond query suggestions from in-memory Trie prefix tree.',
      params: [
        { name: 'q', type: 'string', required: true, desc: 'Prefix string (e.g. "distrib")' },
        { name: 'limit', type: 'integer', required: false, desc: 'Max suggestions to return (default: 5)' }
      ],
      curl: 'curl -X GET "https://mini-search-engine-six.vercel.app/api/v1/autocomplete?q=distrib&limit=5"'
    },
    {
      method: 'POST',
      path: '/api/v1/engineering/benchmark',
      title: 'Multi-Threaded Benchmark Runner',
      desc: 'Executes high-concurrency Virtual Thread benchmark measuring P50-P99 latency, QPS, and throughput.',
      params: [
        { name: 'docCount', type: 'integer', required: false, desc: 'Corpus scale (e.g. 10000)' },
        { name: 'queryCount', type: 'integer', required: false, desc: 'Total queries (default: 100)' },
        { name: 'concurrency', type: 'integer', required: false, desc: 'Concurrent Virtual Threads (default: 10)' },
        { name: 'shardCount', type: 'integer', required: false, desc: 'Distributed shard partitions (default: 3)' }
      ],
      curl: 'curl -X POST "https://mini-search-engine-six.vercel.app/api/v1/engineering/benchmark?docCount=50000&concurrency=50"'
    },
    {
      method: 'GET',
      path: '/api/v1/cluster/topology',
      title: 'Cluster Topology & Health',
      desc: 'Returns current active configuration profile, primary and replica shard nodes status and document counts.',
      params: [],
      curl: 'curl -X GET "https://mini-search-engine-six.vercel.app/api/v1/cluster/topology"'
    },
    {
      method: 'POST',
      path: '/api/v1/reliability/simulate',
      title: 'Resilience & Fault Simulation',
      desc: 'Injects controlled shard failures, network latency, or timeouts to test replica failover.',
      params: [
        { name: 'faultAction', type: 'string', required: false, desc: 'KILL_SHARD | INJECT_LATENCY | SIMULATE_TIMEOUT' },
        { name: 'targetShardId', type: 'string', required: false, desc: 'Target shard identifier' }
      ],
      curl: 'curl -X POST "https://mini-search-engine-six.vercel.app/api/v1/reliability/simulate?faultAction=KILL_SHARD&targetShardId=shard-pri-1"'
    },
    {
      method: 'GET',
      path: '/api/v1/relevance/evaluate',
      title: 'IR Metric Evaluation (NDCG/MRR)',
      desc: 'Runs ground-truth Information Retrieval quality benchmark comparing TF-IDF and BM25.',
      params: [],
      curl: 'curl -X GET "https://mini-search-engine-six.vercel.app/api/v1/relevance/evaluate"'
    }
  ];

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-4">
          <FileCode2 className="w-3.5 h-3.5" />
          REST API & OpenAPI Specification
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Interactive API Documentation
        </h1>
        <p className="mt-2 text-slate-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Complete RESTful API reference for querying the search engine, executing distributed benchmarks, 
          inspecting cluster topologies, and triggering resilience simulations.
        </p>
      </div>

      {/* Endpoints List */}
      <div className="space-y-6">
        {endpoints.map((ep, idx) => (
          <div key={ep.path} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded text-xs font-mono font-extrabold ${
                  ep.method === 'GET' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {ep.method}
                </span>
                <span className="font-mono text-sm font-bold text-slate-100">{ep.path}</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">{ep.title}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{ep.desc}</p>

            {/* Parameters Table */}
            {ep.params.length > 0 && (
              <div className="space-y-2">
                <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Query Parameters</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-mono">
                    <thead>
                      <tr className="border-b border-slate-800/80 text-slate-400 text-[10px]">
                        <th className="pb-1.5 pr-4">Param</th>
                        <th className="pb-1.5 pr-4">Type</th>
                        <th className="pb-1.5 pr-4">Required</th>
                        <th className="pb-1.5">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-slate-300">
                      {ep.params.map((p) => (
                        <tr key={p.name}>
                          <td className="py-1.5 pr-4 text-sky-400 font-bold">{p.name}</td>
                          <td className="py-1.5 pr-4 text-slate-400">{p.type}</td>
                          <td className="py-1.5 pr-4">
                            {p.required ? <span className="text-rose-400">Yes</span> : <span className="text-slate-400">No</span>}
                          </td>
                          <td className="py-1.5 text-slate-400 font-sans">{p.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* cURL Snippet */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1"><Terminal className="w-3 h-3 text-sky-400" /> Example cURL</span>
                <button
                  onClick={() => copyToClipboard(ep.curl, idx)}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedIdx === idx ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto">
                {ep.curl}
              </pre>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
