'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Play, 
  Activity, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Server, 
  Zap, 
  RefreshCw 
} from 'lucide-react';
import { runReliabilityExperiment } from '@/lib/api';
import { ReliabilityExperimentResult } from '@/lib/types';

export default function ReliabilityPage() {
  const [faultAction, setFaultAction] = useState('KILL_SHARD');
  const [targetShardId, setTargetShardId] = useState('shard-pri-1');
  const [injectedLatency, setInjectedLatency] = useState(100);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReliabilityExperimentResult | null>(null);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await runReliabilityExperiment(faultAction, targetShardId, injectedLatency);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Hero Banner */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono mb-4">
          <ShieldAlert className="w-3.5 h-3.5" />
          Controlled Distributed Fault Injection & Resilience Testing
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Reliability & Fault Injection Lab
        </h1>
        <p className="mt-2 text-slate-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Safely trigger real-time simulated failures on cluster nodes, inspect automated replica failover mechanisms, 
          and measure degraded-mode latency versus instant post-recovery performance.
        </p>
      </div>

      {/* Control Console & Real-Time Test Rig */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Fault Generator Controls */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-slate-200 font-bold text-base">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Fault Injection Scenarios
          </div>

          <div className="space-y-4 text-xs">
            {/* Fault Selection */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Failure Action</label>
              <div className="space-y-1.5">
                {[
                  { id: 'KILL_SHARD', label: 'Kill Primary Shard (Crash Failover)', desc: 'Shuts down node; triggers replica failover' },
                  { id: 'INJECT_LATENCY', label: 'Inject Network Latency', desc: 'Adds artificial network delay to node' },
                  { id: 'SIMULATE_TIMEOUT', label: 'Simulate Router Timeout (4000ms)', desc: 'Exceeds router threshold; circuit trip' },
                  { id: 'FLUSH_CACHE', label: 'Flush Distributed Cache', desc: 'Purges Redis to test cold shard load' }
                ].map((act) => (
                  <button
                    key={act.id}
                    onClick={() => setFaultAction(act.id)}
                    className={`w-full p-2.5 rounded-xl text-left border transition-all ${
                      faultAction === act.id 
                        ? 'bg-rose-600/20 border-rose-500 text-white shadow-lg' 
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-slate-200">{act.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{act.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Shard */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Target Primary Shard</label>
              <div className="grid grid-cols-3 gap-1.5">
                {['shard-pri-1', 'shard-pri-2', 'shard-pri-3'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setTargetShardId(s)}
                    className={`py-2 rounded-lg font-mono text-[11px] border transition-all ${
                      targetShardId === s 
                        ? 'bg-sky-600 text-white border-sky-500 font-bold' 
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Injected Delay Slider (if applicable) */}
            {faultAction === 'INJECT_LATENCY' && (
              <div>
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span>Artificial Latency</span>
                  <span className="font-mono font-bold text-amber-400">{injectedLatency} ms</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="500" 
                  step="20"
                  value={injectedLatency} 
                  onChange={(e) => setInjectedLatency(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            )}

            {/* Trigger Button */}
            <button
              onClick={handleSimulate}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                loading 
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-rose-600/25'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Injecting Fault & Measuring...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Execute Resilience Test</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Resilience Report & Latency Impact */}
        <div className="lg:col-span-2 space-y-6">
          
          {result ? (
            <>
              {/* Key Resilience Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-slate-900/40">
                  <div className="text-slate-400 text-xs flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Data Availability</div>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">
                    {result.dataAvailabilityPercent}%
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Measured during fault</div>
                </div>

                <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-slate-900/40">
                  <div className="text-slate-400 text-xs flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Request Failure Rate</div>
                  <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">
                    {result.requestFailureRatePercent}%
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Replica absorbed queries</div>
                </div>

                <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-slate-900/40 col-span-2 sm:col-span-1">
                  <div className="text-slate-400 text-xs flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-sky-400" /> Recovery Duration</div>
                  <div className="text-2xl font-extrabold text-sky-400 font-mono mt-1">
                    {result.recoveryDurationMs}ms
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Self-healing time</div>
                </div>
              </div>

              {/* Three-Phase Latency Transition */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-400" />
                  Three-Phase Latency Progression (Pre-Failure → Degraded Mode → Recovered)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xs text-slate-400 font-mono">1. Baseline (Pre-Failure)</div>
                    <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                      {result.preFailureLatencyMs}ms
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">All shards healthy</div>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40">
                    <div className="text-xs text-rose-300 font-mono">2. Degraded Mode</div>
                    <div className="text-2xl font-bold font-mono text-rose-400 mt-1">
                      {result.degradedLatencyMs}ms
                    </div>
                    <div className="text-[10px] text-rose-300/80 mt-1">Replica failover route</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xs text-slate-400 font-mono">3. Post-Recovery</div>
                    <div className="text-2xl font-bold font-mono text-sky-400 mt-1">
                      {result.postRecoveryLatencyMs}ms
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Normal cluster routing</div>
                  </div>
                </div>

                {/* Experiment Description & Analysis */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-slate-200">Execution Log</div>
                  <p className="text-slate-300 font-mono">{result.description}</p>
                  <div className="pt-2 border-t border-slate-800 text-emerald-400 font-mono">
                    Analysis: {result.analysis}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="glass-panel p-8 rounded-2xl border border-dashed border-slate-800 space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-200">No Verified Fault Injection Recorded</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                SearchForge does not display synthetic default numbers. Select a failure scenario on the left 
                and click <strong>Execute Resilience Test</strong> to inject real-time faults into the distributed cluster and measure actual failover latencies.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
