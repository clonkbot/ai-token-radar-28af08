import { Stats } from '../types';

interface StatsPanelProps {
  stats: Stats;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
  return `$${num.toFixed(2)}`;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const statItems = [
    { label: 'TOKENS TRACKED', value: stats.totalTokens.toString(), color: 'text-cyan-400' },
    { label: 'TOTAL MCAP', value: formatNumber(stats.totalMarketCap), color: 'text-lime-400' },
    { label: 'TRENDING', value: stats.trendingCount.toString(), color: 'text-fuchsia-400' },
    { label: 'ACTIVE AGENTS', value: stats.activeAgents.toString(), color: 'text-amber-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
      {statItems.map((stat, index) => (
        <div
          key={stat.label}
          className="relative bg-[#0c0c14] border border-[#1a1a2e] p-3 md:p-4 group hover:border-cyan-500/30 transition-all duration-300"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50" />

          <div className="text-[10px] md:text-xs text-[#606070] font-mono tracking-wider mb-1">{stat.label}</div>
          <div className={`text-xl md:text-2xl lg:text-3xl font-bold font-mono ${stat.color} tracking-tight`}>
            {stat.value}
          </div>

          {/* Hover glow */}
          <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
}
