import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'sky' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple';
  statusBadge?: string;
}

const colorMap = {
  sky: {
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    text: 'text-sky-400',
    hoverBorder: 'hover:border-sky-500/40',
  },
  indigo: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    text: 'text-indigo-400',
    hoverBorder: 'hover:border-indigo-500/40',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/40',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    hoverBorder: 'hover:border-amber-500/40',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    text: 'text-rose-400',
    hoverBorder: 'hover:border-rose-500/40',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
    hoverBorder: 'hover:border-purple-500/40',
  }
};

export default function MetricsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  variant = 'sky',
  statusBadge 
}: MetricsCardProps) {
  const styles = colorMap[variant] || colorMap.sky;

  return (
    <div className={`glass-card rounded-xl p-4.5 border border-white/5 flex items-start justify-between transition-all group ${styles.hoverBorder}`}>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">{title}</span>
          {statusBadge && (
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {statusBadge}
            </span>
          )}
        </div>
        <div className="text-2xl font-bold font-mono text-slate-100 tracking-tight">{value}</div>
        {subtitle && <p className="text-[11px] text-slate-400 font-sans leading-tight">{subtitle}</p>}
      </div>
      <div className={`w-10 h-10 rounded-lg ${styles.bg} border ${styles.border} flex items-center justify-center ${styles.text} shrink-0 group-hover:scale-105 transition-transform`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
