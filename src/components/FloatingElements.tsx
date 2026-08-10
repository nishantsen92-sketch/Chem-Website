'use client';

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      
      {/* 1. Benzene Ring Hexagon (Top Left) */}
      <div className="absolute top-12 left-[5%] opacity-15 text-blue-600 animate-float-slow transform scale-75 md:scale-100">
        <svg viewBox="0 0 100 100" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polygon points="50,5 90,27 90,73 50,95 10,73 10,27" />
          <circle cx="50" cy="50" r="28" strokeDasharray="6,4" />
        </svg>
      </div>

      {/* 2. Covalent Bond connection (Top Right) */}
      <div className="absolute top-16 right-[8%] opacity-20 text-indigo-500 animate-float-medium transform scale-75 md:scale-90">
        <svg viewBox="0 0 120 100" width="100" height="80" fill="none" stroke="currentColor" strokeWidth="3">
          {/* Central Atom */}
          <circle cx="60" cy="50" r="12" fill="currentColor" />
          {/* Bonds */}
          <line x1="60" y1="50" x2="20" y2="20" />
          <line x1="60" y1="50" x2="100" y2="20" />
          <line x1="60" y1="50" x2="60" y2="90" />
          {/* Ligand Atoms */}
          <circle cx="20" cy="20" r="7" fill="white" />
          <circle cx="100" cy="20" r="7" fill="white" />
          <circle cx="60" cy="90" r="7" fill="white" />
        </svg>
      </div>

      {/* 3. H2O text notation (Middle Left) */}
      <div className="absolute top-[42%] left-[3%] opacity-25 text-zinc-400 animate-float-medium text-xs md:text-sm font-mono font-bold">
        H₂O (104.5°)
      </div>

      {/* 4. sp3d Hybridization bubble (Middle Right) */}
      <div className="absolute top-[38%] right-[5%] opacity-20 text-zinc-400 animate-float-slow text-[10px] md:text-xs font-mono font-bold bg-zinc-200/50 border border-zinc-300 px-2 py-1 rounded-lg">
        sp³d² hybrid
      </div>

      {/* 5. CO2 text notation (Bottom Left) */}
      <div className="absolute bottom-[20%] left-[8%] opacity-20 text-zinc-400 animate-float-slow text-xs md:text-sm font-mono font-bold">
        O=C=O (180°)
      </div>

      {/* 6. Orbital lobe shape (Bottom Right) */}
      <div className="absolute bottom-[15%] right-[10%] opacity-15 text-teal-600 animate-float-medium transform scale-95">
        <svg viewBox="0 0 80 120" width="60" height="90" fill="currentColor" className="opacity-75">
          {/* Figure-8 double lobe */}
          <path d="M 40,60 C 20,40 20,10 40,10 C 60,10 60,40 40,60 Z" />
          <path d="M 40,60 C 20,80 20,110 40,110 C 60,110 60,80 40,60 Z" className="opacity-50" />
        </svg>
      </div>

      {/* 7. Repulsion formula badge (Center-ish Background) */}
      <div className="absolute top-[65%] left-[45%] opacity-10 text-zinc-400 animate-float-slow text-[8px] md:text-[10px] font-mono font-extrabold tracking-widest uppercase hidden lg:block">
        lp-lp &gt; lp-bp &gt; bp-bp
      </div>

    </div>
  );
}
