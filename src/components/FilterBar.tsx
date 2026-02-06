import { FilterType } from '../types';

interface FilterBarProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'marketCap' | 'change24h' | 'launchDate';
  setSortBy: (sort: 'marketCap' | 'change24h' | 'launchDate') => void;
}

export function FilterBar({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: FilterBarProps) {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'ALL' },
    { key: 'trending', label: 'TRENDING' },
    { key: 'new', label: 'NEW' },
    { key: 'active', label: 'ACTIVE' },
  ];

  return (
    <div className="mb-6 md:mb-8 space-y-4">
      {/* Search */}
      <div className="relative">
        <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-[#404050]">
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search tokens, symbols, or agents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#0c0c14] border border-[#1a1a2e] text-[#e0e0e0] font-mono text-sm pl-10 md:pl-12 pr-4 py-3 md:py-3.5 focus:outline-none focus:border-cyan-500/50 placeholder-[#404050] transition-colors"
        />
        <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-[10px] md:text-xs text-[#303040] font-mono hidden sm:block">
          SEARCH_QUERY
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 md:px-4 py-2 md:py-2.5 font-mono text-xs md:text-sm tracking-wider transition-all duration-200 min-h-[44px] flex items-center ${
                filter === f.key
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'bg-[#0c0c14] text-[#606070] border border-[#1a1a2e] hover:border-[#2a2a3e] hover:text-[#808090]'
              }`}
            >
              {f.key === 'trending' && (
                <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 bg-fuchsia-400 rounded-full mr-1.5 md:mr-2 animate-pulse" />
              )}
              {f.label}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-[10px] md:text-xs text-[#404050] font-mono hidden sm:inline">SORT_BY:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'marketCap' | 'change24h' | 'launchDate')}
            className="bg-[#0c0c14] border border-[#1a1a2e] text-[#808090] font-mono text-xs md:text-sm px-3 py-2 md:py-2.5 focus:outline-none focus:border-cyan-500/50 cursor-pointer min-h-[44px] flex-1 sm:flex-none"
          >
            <option value="marketCap">MARKET CAP</option>
            <option value="change24h">24H CHANGE</option>
            <option value="launchDate">LAUNCH DATE</option>
          </select>
        </div>
      </div>
    </div>
  );
}
