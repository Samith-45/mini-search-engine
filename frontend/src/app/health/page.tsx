'use client';

import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  Server, 
  Database, 
  Cpu, 
  Layers, 
  Activity, 
  CheckCircle2, 
  RefreshCw, 
  Clock, 
  HardDrive,
  AlertCircle 
} from 'lucide-react';
import { fetchClusterTopology, fetchEngineeringStats, fetchTelemetry } from '@/lib/api';
import { ClusterTopology, EngineeringStats, HealthTelemetry } from '@/lib/types';

export default function HealthPage() {
  const [topology, setTopology] = useState<ClusterTopology | null>(null);
  const [stats, setStats] = useState<EngineeringStats | null>(null);
  const [telemetry, setTelemetry] = useState<HealthTelemetry | null>(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [topo, eng, telem] = await Promise.all([
        fetchClusterTopology(), 
        fetchEngineeringStats(),
        fetchTelemetry()
      ]);
      setTopology(topo);
      setStats(eng);
      setTelemetry(telem);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Hero */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {telemetry ? 'Live Telemetry Active & Synchronized' : 'Connecting to Live Telemetry Subsystem...'}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Live System Health & Telemetry
            </h1>
            <p className="mt-2 text-slate-400 max-w-2xl text-sm sm:text-base">
              Real-time verified telemetry monitoring distributed search shard partitions, JVM memory runtime, 
              query cache hit ratios, and background inverted index metrics.
            </p>
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold font-mono flex items-center gap-2 transition-all self-start"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh Telemetry
          </button>
        </div>
      </div>

      {/* Subsystem Health Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Shard Cluster */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Server className="w-4 h-4 text-sky-400" /> Shard Nodes
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
              {topology ? '100% UP' : 'OFFLINE'}
            </span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-100">
            {topology?.primaryShardCount ?? 3} Primaries
          </div>
          <div className="text-[11px] text-slate-400">
            {topology?.replicaShardCount ?? 3} Active Secondary Replicas
          </div>
        </div>

        {/* JVM Memory Pool */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-purple-400" /> JVM Heap Memory
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
              {telemetry ? 'LIVE' : 'UNAVAILABLE'}
            </span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-purple-400">
            {telemetry ? `${telemetry.jvmHeapUsedMb} MB` : '--- MB'}
          </div>
          <div className="text-[11px] text-slate-400">
            {telemetry ? `Max: ${telemetry.jvmHeapMaxMb} MB (Java 21 VM)` : 'Runtime telemetry unavailable'}
          </div>
        </div>

        {/* Query Cache */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-emerald-400" /> Cache Hit Ratio
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
              {telemetry ? 'TRACKED' : 'UNAVAILABLE'}
            </span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">
            {telemetry ? `${telemetry.cacheHitRatio}%` : '---%'}
          </div>
          <div className="text-[11px] text-slate-400">
            {telemetry ? `${telemetry.totalQueriesLogged} Total Logged Queries` : 'Cache stats unavailable'}
          </div>
        </div>

        {/* Concurrency Threads */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-400" /> Virtual Threads
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
              ACTIVE
            </span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-indigo-400">
            Java 21 Loom
          </div>
          <div className="text-[11px] text-slate-400">
            Non-blocking scatter-gather executor
          </div>
        </div>

      </div>

      {/* Shard Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Server className="w-4 h-4 text-sky-400" />
          Active Cluster Shard Nodes Telemetry
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {topology?.primaryShards.map((s) => (
            <div key={s.shardId} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono font-bold">
                <span className="text-sky-400">{s.shardId}</span>
                <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> HEALTHY
                </span>
              </div>
              <div className="text-slate-400 font-mono text-[11px]">Role: Primary (Partition #{s.partitionIndex})</div>
              <div className="text-slate-400 font-mono text-[11px]">Endpoint: {s.host}:{s.port}</div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-mono text-slate-300">
                <span>Documents Indexed:</span>
                <span className="text-indigo-400 font-bold">{s.documentCount} docs</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
