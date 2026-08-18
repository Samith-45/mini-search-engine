import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: string;
}

export default function MetricsCard({ title, value, subtitle, icon: Icon, color = 'sky' }: MetricsCardProps) {
  return (
    <div className="glass-card rounded-xl p-4 border border-slate-800 flex items-center justify-between">
      <div>
        <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">{title}</span>
        <span className="text-2xl font-bold font-mono text-slate-100 mt-1 block">{value}</span>
        {subtitle && <span className="text-[11px] text-slate-500 block mt-0.5">{subtitle}</span>}
      </div>
      <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center text-${color}-400 shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
