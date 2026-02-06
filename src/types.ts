export interface Token {
  id: string;
  name: string;
  symbol: string;
  agent: string;
  agentType: string;
  launchDate: string;
  marketCap: number;
  price: number;
  change24h: number;
  holders: number;
  status: 'active' | 'inactive' | 'trending' | 'new';
  chain: string;
}

export type FilterType = 'all' | 'trending' | 'new' | 'active';

export interface Stats {
  totalTokens: number;
  totalMarketCap: number;
  trendingCount: number;
  activeAgents: number;
}
