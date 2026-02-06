import { useState, useEffect } from 'react';

export function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          {/* Logo */}
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-cyan-400 rotate-45 flex items-center justify-center">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-cyan-400 -rotate-45" />
            </div>
            <div className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 border-2 border-fuchsia-500 rotate-45 animate-pulse opacity-50" />
          </div>

          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight font-mono">
              <span className="text-cyan-400">AI</span>
              <span className="text-white">_</span>
              <span className="text-fuchsia-400">TOKEN</span>
              <span className="text-white">_</span>
              <span className="text-lime-400">RADAR</span>
            </h1>
            <p className="text-[10px] md:text-xs text-[#606070] font-mono tracking-[0.2em] md:tracking-[0.3em] uppercase">
              Tracking Agent-Launched Tokens
            </p>
          </div>
        </div>

        {/* Live indicator & time */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 bg-lime-400 rounded-full" />
              <div className="absolute inset-0 w-2 h-2 bg-lime-400 rounded-full animate-ping" />
            </div>
            <span className="text-lime-400 text-xs font-mono uppercase tracking-wider">Live</span>
          </div>

          <div className="font-mono text-xs md:text-sm text-[#808090] bg-[#0f0f18] px-3 py-1.5 md:px-4 md:py-2 border border-[#1a1a2e] rounded">
            <span className="text-cyan-400">{time.toLocaleTimeString('en-US', { hour12: false })}</span>
            <span className="text-[#404050] mx-2">|</span>
            <span className="hidden sm:inline">{time.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="sm:hidden">{time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="mt-4 md:mt-6 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </header>
  );
}
