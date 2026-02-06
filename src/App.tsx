import { useState, useEffect } from 'react';
import { TokenCard } from './components/TokenCard';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { StatsPanel } from './components/StatsPanel';
import { ScanLines } from './components/ScanLines';
import { Token, FilterType } from './types';

const mockTokens: Token[] = [
  {
    id: '1',
    name: 'NEURAL',
    symbol: 'NRL',
    agent: 'GPT-Trader',
    agentType: 'Trading Bot',
    launchDate: '2024-01-15',
    marketCap: 2450000,
    price: 0.0234,
    change24h: 12.5,
    holders: 1893,
    status: 'active',
    chain: 'Solana',
  },
  {
    id: '2',
    name: 'SYNTHEX',
    symbol: 'SYN',
    agent: 'Claude-Finance',
    agentType: 'DeFi Agent',
    launchDate: '2024-01-18',
    marketCap: 890000,
    price: 0.0089,
    change24h: -5.2,
    holders: 654,
    status: 'active',
    chain: 'Base',
  },
  {
    id: '3',
    name: 'AXIOM',
    symbol: 'AXM',
    agent: 'AutoGPT-Alpha',
    agentType: 'Autonomous Agent',
    launchDate: '2024-01-20',
    marketCap: 5670000,
    price: 0.0567,
    change24h: 34.8,
    holders: 3421,
    status: 'trending',
    chain: 'Ethereum',
  },
  {
    id: '4',
    name: 'COGNET',
    symbol: 'COG',
    agent: 'Gemini-Swarm',
    agentType: 'Multi-Agent',
    launchDate: '2024-01-12',
    marketCap: 120000,
    price: 0.0012,
    change24h: -18.3,
    holders: 234,
    status: 'inactive',
    chain: 'Arbitrum',
  },
  {
    id: '5',
    name: 'PULSENET',
    symbol: 'PLS',
    agent: 'Mistral-Miner',
    agentType: 'Data Agent',
    launchDate: '2024-01-22',
    marketCap: 3200000,
    price: 0.032,
    change24h: 8.7,
    holders: 2103,
    status: 'active',
    chain: 'Solana',
  },
  {
    id: '6',
    name: 'VECTRA',
    symbol: 'VCT',
    agent: 'LLaMA-Liquidity',
    agentType: 'Market Maker',
    launchDate: '2024-01-25',
    marketCap: 780000,
    price: 0.0078,
    change24h: 2.1,
    holders: 512,
    status: 'new',
    chain: 'Base',
  },
  {
    id: '7',
    name: 'DAEMON',
    symbol: 'DMN',
    agent: 'Anthropic-Yield',
    agentType: 'Yield Optimizer',
    launchDate: '2024-01-28',
    marketCap: 4100000,
    price: 0.041,
    change24h: 22.4,
    holders: 2876,
    status: 'trending',
    chain: 'Ethereum',
  },
  {
    id: '8',
    name: 'NEXUS-AI',
    symbol: 'NXA',
    agent: 'OpenAI-Oracle',
    agentType: 'Oracle Agent',
    launchDate: '2024-01-30',
    marketCap: 1560000,
    price: 0.0156,
    change24h: -3.8,
    holders: 987,
    status: 'active',
    chain: 'Arbitrum',
  },
];

function App() {
  const [tokens, setTokens] = useState<Token[]>(mockTokens);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'marketCap' | 'change24h' | 'launchDate'>('marketCap');

  const filteredTokens = tokens
    .filter((token) => {
      if (filter === 'all') return true;
      if (filter === 'trending') return token.status === 'trending';
      if (filter === 'new') return token.status === 'new';
      if (filter === 'active') return token.status === 'active';
      return true;
    })
    .filter((token) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        token.name.toLowerCase().includes(query) ||
        token.symbol.toLowerCase().includes(query) ||
        token.agent.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'marketCap') return b.marketCap - a.marketCap;
      if (sortBy === 'change24h') return b.change24h - a.change24h;
      if (sortBy === 'launchDate') return new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime();
      return 0;
    });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens((prev) =>
        prev.map((token) => ({
          ...token,
          price: token.price * (1 + (Math.random() - 0.5) * 0.02),
          change24h: token.change24h + (Math.random() - 0.5) * 2,
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    totalTokens: tokens.length,
    totalMarketCap: tokens.reduce((acc, t) => acc + t.marketCap, 0),
    trendingCount: tokens.filter((t) => t.status === 'trending').length,
    activeAgents: new Set(tokens.map((t) => t.agent)).size,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e0e0e0] relative overflow-hidden">
      <ScanLines />

      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Glow orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 min-h-screen flex flex-col">
        <Header />
        <StatsPanel stats={stats} />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredTokens.map((token, index) => (
              <TokenCard key={token.id} token={token} index={index} />
            ))}
          </div>

          {filteredTokens.length === 0 && (
            <div className="text-center py-20">
              <div className="text-cyan-400/50 font-mono text-lg">NO TOKENS FOUND</div>
              <div className="text-[#606070] font-mono text-sm mt-2">Adjust filters or search query</div>
            </div>
          )}
        </main>

        <footer className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-[#1a1a2e]">
          <div className="text-center">
            <p className="text-[#404055] text-xs font-mono tracking-wide">
              Requested by @JornvanFlagship · Built by @clonkbot
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
