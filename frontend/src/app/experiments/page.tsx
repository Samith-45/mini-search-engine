'use client';

import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, 
  GitCommit, 
  Clock, 
  Database, 
  TrendingUp, 
  CheckCircle2, 
  Filter, 
  Search, 
  RefreshCw 
} from 'lucide-react';
import { fetchExperiments } from '@/lib/api';
import { ExperimentRecord } from '@/lib/types';

export default function ExperimentsPage() {
  const [experiments, setExperiments] = useState<ExperimentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchExperiments();
      setExperiments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = experiments.filter(e => 
    e.experimentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.gitCommit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-4">
          <FlaskConical className="w-3.5 h-3.5" />
          Persistent Benchmark Database & Verification Ledger
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Experiment Run History
        </h1>
        <p className="mt-2 text-slate-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          All benchmark runs and concurrency stress tests are permanently recorded with their corresponding Git commit hashes 
          in PostgreSQL, ensuring scientific reproducibility and historical performance tracking.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text"
              placeholder="Filter by name or commit hash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            onClick={loadData}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold font-mono flex items-center gap-2 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh Runs
          </button>
        </div>
      </div>

      {/* Experiments Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-mono text-[11px] uppercase">
                <th className="py-3.5 px-4 font-semibold">Experiment Name</th>
                <th className="py-3.5 px-4 font-semibold">Commit</th>
                <th className="py-3.5 px-4 font-semibold">Corpus Docs</th>
                <th className="py-3.5 px-4 font-semibold">Shards</th>
                <th className="py-3.5 px-4 font-semibold">Concurrency</th>
                <th className="py-3.5 px-4 font-semibold">QPS</th>
                <th className="py-3.5 px-4 font-semibold">P50</th>
                <th className="py-3.5 px-4 font-semibold">P95</th>
                <th className="py-3.5 px-4 font-semibold">P99</th>
                <th className="py-3.5 px-4 font-semibold">Memory</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filtered.length > 0 ? (
                filtered.map((exp, i) => (
                  <tr key={exp.id || i} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 font-sans font-semibold text-slate-200">{exp.experimentName}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                        <GitCommit className="w-3 h-3" /> {exp.gitCommit}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{exp.documentCount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-purple-400">{exp.shardCount}</td>
                    <td className="py-3 px-4 text-slate-300">{exp.concurrencyLevel} threads</td>
                    <td className="py-3 px-4 text-sky-400 font-bold">{exp.queriesPerSec.toLocaleString()}</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">{exp.p50LatencyMs}ms</td>
                    <td className="py-3 px-4 text-indigo-400">{exp.p95LatencyMs}ms</td>
                    <td className="py-3 px-4 text-amber-400 font-bold">{exp.p99LatencyMs}ms</td>
                    <td className="py-3 px-4 text-slate-400">{exp.memoryUsedMb}MB</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400 font-sans text-xs">
                    No verified experiments recorded yet. Run an empirical load test in <a href="/engineering" className="text-sky-400 hover:underline">Benchmark Lab</a> to record verifiable measurements.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
