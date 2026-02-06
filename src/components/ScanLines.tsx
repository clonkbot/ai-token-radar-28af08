export function ScanLines() {
  return (
    <>
      {/* Horizontal scan lines */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.015]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.5) 2px, rgba(0, 255, 255, 0.5) 4px)',
        }}
      />

      {/* Moving scan line */}
      <div className="fixed inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none z-50 animate-scan-vertical" />

      {/* Vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />
    </>
  );
}
