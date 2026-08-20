'use client';

import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Server, 
  Database, 
  Cpu, 
  ShieldCheck, 
  GitBranch, 
  CheckCircle2, 
  RefreshCw, 
  FileText, 
  ArrowRight, 
  Zap, 
  Network 
} from 'lucide-react';
import { fetchClusterTopology, switchClusterProfile, fetchADRs } from '@/lib/api';
import { ClusterTopology, ArchitectureDecisionRecord } from '@/lib/types';

export default function ArchitecturePage() {
  const [topology, setTopology] = useState<ClusterTopology | null>(null);
  const [adrs, setAdrs] = useState<ArchitectureDecisionRecord[]>([]);
  const [switching, setSwitching] = useState(false);
  const [selectedAdr, setSelectedAdr] = useState<string>('ADR-001');

  useEffect(() => {
    fetchClusterTopology().then(setTopology).catch(console.error);
    fetchADRs().then(setAdrs).catch(console.error);
  }, []);

  const handleProfileSwitch = async (profileKey: string) => {
    setSwitching(true);
    try {
      const updated = await switchClusterProfile(profileKey);
      setTopology(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setSwitching(false);
    }
  };

  const currentAdr = adrs.find(a => a.id === selectedAdr) || adrs[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Header */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
          <Network className="w-3.5 h-3.5" />
          Progressive Distributed Architecture Explorer
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Distributed System Topology & ADRs
        </h1>
        <p className="mt-2 text-slate-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Explore SearchForge&apos;s scatter-gather sharded topology, inspect dynamic cluster failover states, 
          and review evidence-backed Architectural Decision Records (ADRs) demonstrating Google SWE-grade design choices.
        </p>
      </div>

      {/* Dynamic Topology Configuration Switcher */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Server className="w-5 h-5 text-sky-400" />
              Cluster Architecture Profile
            </h2>
            <p className="text-xs text-slate-400">Switch runtime configuration to observe live topology mutations</p>
          </div>

          {/* Profile Switch Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'CONFIG_A_SINGLE_NODE', label: 'Config A', desc: 'Single Node' },
              { id: 'CONFIG_B_SINGLE_NODE_CACHE', label: 'Config B', desc: 'Single + Cache' },
              { id: 'CONFIG_C_SHARDED', label: 'Config C', desc: '3 Shards' },
              { id: 'CONFIG_D_SHARDED_REPLICATED', label: 'Config D', desc: '3 Shards + 3 Replicas' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => handleProfileSwitch(p.id)}
                disabled={switching}
                className={`px-3 py-2 rounded-xl text-left border transition-all ${
                  topology?.activeProfile === p.id 
                    ? 'bg-sky-600/20 border-sky-500 text-white shadow-lg shadow-sky-500/10' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold font-mono text-sky-400">{p.label}</div>
                <div className="text-[10px] truncate">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Visual Topology Diagram */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
              <div>
                <span className="font-semibold text-slate-200 text-sm">{topology?.profileDescription}</span>
                <span className="text-xs text-slate-400 ml-2 font-mono">({topology?.activeProfile})</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-400">Primaries: <strong className="text-sky-400">{topology?.primaryShardCount}</strong></span>
              <span className="text-slate-400">Replicas: <strong className="text-purple-400">{topology?.replicaShardCount}</strong></span>
              <span className="text-slate-400">Cache: <strong className={topology?.cacheEnabled ? 'text-emerald-400' : 'text-rose-400'}>{topology?.cacheEnabled ? 'Redis' : 'None'}</strong></span>
            </div>
          </div>

          {/* Node Visualizer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Client & Gateway Layer */}
            <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Gateway & Router
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-mono text-xs font-bold text-slate-200">ShardedSearchRouter</div>
                <div className="text-[11px] text-slate-400">Virtual Threads Scatter-Gather (Java 21 Loom)</div>
                <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Max-Heap Top-K Merge
                </div>
              </div>
              {topology?.cacheEnabled && (
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-[11px] text-emerald-300 flex items-center justify-between">
                  <span>Redis Cache-Aside</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20">TTL 10m</span>
                </div>
              )}
            </div>

            {/* 2. Primary Search Shards */}
            <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3 md:col-span-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-sky-400" /> Primary & Replica Shards (Hash-Partitioned)</span>
                <span className="text-[10px] font-mono text-slate-400">docId % {topology?.primaryShardCount}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {topology?.primaryShards.map((shard) => (
                  <div key={shard.shardId} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-sky-400">{shard.shardId}</span>
                      <span className={`w-2 h-2 rounded-full ${shard.isHealthy ? 'bg-emerald-400' : 'bg-rose-500'}`}></span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">Partition #{shard.partitionIndex}</div>
                    <div className="text-[10px] text-slate-300 font-mono flex justify-between">
                      <span>{shard.host}:{shard.port}</span>
                      <span className="text-indigo-400">{shard.documentCount} docs</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Secondary Replicas */}
              {topology && topology.replicaShards.length > 0 && (
                <div className="pt-2 border-t border-slate-800/60">
                  <div className="text-[10px] uppercase font-mono text-purple-400 mb-2">Secondary Replicas (Active Failover Targets)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {topology.replicaShards.map((rep) => (
                      <div key={rep.shardId} className="p-2.5 rounded-lg bg-purple-950/20 border border-purple-800/30 text-[10px] font-mono flex justify-between items-center text-purple-300">
                        <span>{rep.shardId}</span>
                        <span className="text-emerald-400">HEALTHY</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Engineering Decision Records (ADRs) */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            Architectural Decision Records (ADRs)
          </h2>
          <p className="text-xs text-slate-400">Formal technical rationale, empirical benchmarks, and trade-off evaluations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* ADR Navigation Selector */}
          <div className="space-y-2">
            {adrs.map((adr) => (
              <button
                key={adr.id}
                onClick={() => setSelectedAdr(adr.id)}
                className={`w-full p-3 rounded-xl text-left border transition-all ${
                  selectedAdr === adr.id 
                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg' 
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-purple-400">{adr.id}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    {adr.status}
                  </span>
                </div>
                <div className="text-xs font-semibold line-clamp-1">{adr.title}</div>
              </button>
            ))}
          </div>

          {/* ADR Detail Content Viewer */}
          {currentAdr && (
            <div className="lg:col-span-3 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
              
              <div className="border-b border-slate-800 pb-4">
                <div className="text-xs font-mono text-purple-400 font-bold">{currentAdr.id}</div>
                <h3 className="text-xl font-bold text-slate-100 mt-1">{currentAdr.title}</h3>
                <div className="text-xs text-slate-400 mt-1">{currentAdr.context}</div>
              </div>

              {/* Problem & Considered Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="font-bold text-slate-300">Problem Statement</div>
                  <p className="text-slate-400 leading-relaxed">{currentAdr.problem}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="font-bold text-slate-300">Options Evaluated</div>
                  <ul className="space-y-1 text-slate-400">
                    {currentAdr.optionsConsidered.map((opt, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-purple-400 font-mono">•</span>
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Decision & Benchmark Evidence */}
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs space-y-2">
                <div className="font-bold text-purple-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  Adopted Decision & Empirical Validation
                </div>
                <p className="text-slate-200 font-medium leading-relaxed">{currentAdr.decision}</p>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-purple-900/40 text-slate-300 font-mono text-[11px]">
                  <strong>Evidence:</strong> {currentAdr.benchmarkEvidence}
                </div>
              </div>

              {/* Trade-offs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-800/30 space-y-1.5">
                  <div className="font-bold text-emerald-400">Positive Trade-offs</div>
                  <ul className="space-y-1 text-slate-300">
                    {currentAdr.positiveTradeoffs.map((t, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-emerald-400">✓</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-amber-950/10 border border-amber-800/30 space-y-1.5">
                  <div className="font-bold text-amber-400">Negative Trade-offs / Mitigations</div>
                  <ul className="space-y-1 text-slate-300">
                    {currentAdr.negativeTradeoffs.map((t, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-amber-400">⚠</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
