import { Token } from '../types';

interface TokenCardProps {
  token: Token;
  index: number;
}

function formatPrice(price: number): string {
  if (price < 0.001) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(2)}`;
}

function formatMarketCap(mcap: number): string {
  if (mcap >= 1000000) return `$${(mcap / 1000000).toFixed(2)}M`;
  if (mcap >= 1000) return `$${(mcap / 1000).toFixed(0)}K`;
  return `$${mcap.toFixed(0)}`;
}

function getChainColor(chain: string): string {
  switch (chain) {
    case 'Ethereum': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    case 'Solana': return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
    case 'Base': return 'text-sky-400 border-sky-500/30 bg-sky-500/10';
    case 'Arbitrum': return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
    default: return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
  }
}

function getStatusConfig(status: Token['status']) {
  switch (status) {
    case 'trending': return { label: 'TRENDING', color: 'text-fuchsia-400', bgColor: 'bg-fuchsia-500/20', borderColor: 'border-fuchsia-500/50' };
    case 'new': return { label: 'NEW', color: 'text-lime-400', bgColor: 'bg-lime-500/20', borderColor: 'border-lime-500/50' };
    case 'active': return { label: 'ACTIVE', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20', borderColor: 'border-cyan-500/50' };
    case 'inactive': return { label: 'INACTIVE', color: 'text-[#606070]', bgColor: 'bg-[#202030]', borderColor: 'border-[#303040]' };
  }
}

export function TokenCard({ token, index }: TokenCardProps) {
  const isPositive = token.change24h >= 0;
  const statusConfig = getStatusConfig(token.status);
  const chainColorClass = getChainColor(token.chain);

  return (
    <div
      className="group relative bg-[#0c0c14]/80 backdrop-blur-sm border border-[#1a1a2e] hover:border-cyan-500/30 transition-all duration-300 overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Animated border glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent" />
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/30" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/30" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-fuchsia-500/30" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-fuchsia-500/30" />

      <div className="p-4 md:p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Token icon placeholder */}
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 border border-[#2a2a3e] flex items-center justify-center">
              <span className="text-base md:text-lg font-bold font-mono text-cyan-400">
                {token.symbol.slice(0, 2)}
              </span>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold font-mono text-white tracking-tight">{token.name}</h3>
              <span className="text-xs md:text-sm text-[#606070] font-mono">${token.symbol}</span>
            </div>
          </div>

          {/* Status badge */}
          <div className={`px-2 py-1 text-[10px] md:text-xs font-mono ${statusConfig.color} ${statusConfig.bgColor} border ${statusConfig.borderColor}`}>
            {statusConfig.label}
          </div>
        </div>

        {/* Price & Change */}
        <div className="flex items-baseline justify-between mb-3 md:mb-4 pb-3 md:pb-4 border-b border-[#1a1a2e]">
          <div>
            <div className="text-[10px] md:text-xs text-[#404050] font-mono mb-0.5">PRICE</div>
            <div className="text-lg md:text-xl font-bold font-mono text-white">{formatPrice(token.price)}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] md:text-xs text-[#404050] font-mono mb-0.5">24H</div>
            <div className={`text-base md:text-lg font-bold font-mono flex items-center gap-1 ${isPositive ? 'text-lime-400' : 'text-red-400'}`}>
              <span className="text-xs">{isPositive ? '▲' : '▼'}</span>
              {Math.abs(token.change24h).toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Agent info */}
        <div className="mb-3 md:mb-4">
          <div className="text-[10px] md:text-xs text-[#404050] font-mono mb-1">LAUNCHED BY</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm md:text-base font-mono text-cyan-400">{token.agent}</span>
          </div>
          <div className="text-[10px] md:text-xs text-[#505060] font-mono mt-0.5">{token.agentType}</div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 text-center">
          <div className="bg-[#08080c] p-2 md:p-2.5 border border-[#151520]">
            <div className="text-[10px] text-[#404050] font-mono">MCAP</div>
            <div className="text-xs md:text-sm font-mono text-[#a0a0b0]">{formatMarketCap(token.marketCap)}</div>
          </div>
          <div className="bg-[#08080c] p-2 md:p-2.5 border border-[#151520]">
            <div className="text-[10px] text-[#404050] font-mono">HOLDERS</div>
            <div className="text-xs md:text-sm font-mono text-[#a0a0b0]">{token.holders.toLocaleString()}</div>
          </div>
          <div className="bg-[#08080c] p-2 md:p-2.5 border border-[#151520]">
            <div className="text-[10px] text-[#404050] font-mono">CHAIN</div>
            <div className={`text-xs md:text-sm font-mono px-1 py-0.5 border rounded ${chainColorClass}`}>
              {token.chain.slice(0, 3).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Launch date */}
        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#1a1a2e] flex items-center justify-between">
          <span className="text-[10px] md:text-xs text-[#404050] font-mono">LAUNCHED</span>
          <span className="text-[10px] md:text-xs text-[#606070] font-mono">
            {new Date(token.launchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Scan line effect on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-scan" />
      </div>
    </div>
  );
}
