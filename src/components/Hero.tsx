'use client';

import FloatingElements from './FloatingElements';

interface HeroProps {
  onLaunchVsepr: () => void;
}

// Helper to classify elements by group and assign colorful classes
const getCategoryClasses = (sym: string) => {
  // Alkali Metals (Rose/Pink Accent)
  if (["Li", "Na", "K", "Rb", "Cs", "Fr"].includes(sym)) {
    return {
      bg: "bg-rose-500/15",
      border: "border-rose-400/40",
      numText: "text-rose-500/70",
      symText: "text-rose-950/85"
    };
  }
  // Alkaline Earth Metals (Amber/Gold Accent)
  if (["Be", "Mg", "Ca", "Sr", "Ba", "Ra"].includes(sym)) {
    return {
      bg: "bg-amber-500/15",
      border: "border-amber-400/40",
      numText: "text-amber-500/70",
      symText: "text-amber-950/85"
    };
  }
  // Transition Metals (Royal Blue Accent)
  if (["Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "La", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Ac", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn"].includes(sym)) {
    return {
      bg: "bg-blue-500/15",
      border: "border-blue-400/40",
      numText: "text-blue-500/70",
      symText: "text-blue-950/85"
    };
  }
  // Post-Transition Metals (Emerald/Green Accent)
  if (["Al", "Ga", "In", "Sn", "Tl", "Pb", "Bi", "Po", "Nh", "Fl", "Mc", "Lv"].includes(sym)) {
    return {
      bg: "bg-emerald-500/15",
      border: "border-emerald-400/40",
      numText: "text-emerald-500/70",
      symText: "text-emerald-950/85"
    };
  }
  // Metalloids (Teal/Cyan Accent)
  if (["B", "Si", "Ge", "As", "Sb", "Te"].includes(sym)) {
    return {
      bg: "bg-teal-500/15",
      border: "border-teal-400/40",
      numText: "text-teal-500/70",
      symText: "text-teal-950/85"
    };
  }
  // Reactive Nonmetals (Orange Accent)
  if (["H", "C", "N", "O", "P", "S", "Se"].includes(sym)) {
    return {
      bg: "bg-orange-500/15",
      border: "border-orange-400/40",
      numText: "text-orange-500/70",
      symText: "text-orange-950/85"
    };
  }
  // Halogens (Cyan/Sky Accent)
  if (["F", "Cl", "Br", "I", "At", "Ts"].includes(sym)) {
    return {
      bg: "bg-cyan-500/15",
      border: "border-cyan-400/40",
      numText: "text-cyan-500/70",
      symText: "text-cyan-950/85"
    };
  }
  // Noble Gases (Purple Accent)
  if (["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"].includes(sym)) {
    return {
      bg: "bg-purple-500/15",
      border: "border-purple-400/40",
      numText: "text-purple-500/70",
      symText: "text-purple-950/85"
    };
  }
  return {
    bg: "bg-zinc-500/15",
    border: "border-zinc-400/40",
    numText: "text-zinc-500/70",
    symText: "text-zinc-950/85"
  };
};

export default function Hero({ onLaunchVsepr }: HeroProps) {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Periodic Table Elements Matrix for Background (H to Og, standard 18 columns)
  const periodicElements = [
    // Period 1
    [
      { num: 1, sym: "H" },
      ...Array(16).fill(null),
      { num: 2, sym: "He" }
    ],
    // Period 2
    [
      { num: 3, sym: "Li" }, { num: 4, sym: "Be" },
      ...Array(10).fill(null),
      { num: 5, sym: "B" }, { num: 6, sym: "C" }, { num: 7, sym: "N" }, { num: 8, sym: "O" }, { num: 9, sym: "F" }, { num: 10, sym: "Ne" }
    ],
    // Period 3
    [
      { num: 11, sym: "Na" }, { num: 12, sym: "Mg" },
      ...Array(10).fill(null),
      { num: 13, sym: "Al" }, { num: 14, sym: "Si" }, { num: 15, sym: "P" }, { num: 16, sym: "S" }, { num: 17, sym: "Cl" }, { num: 18, sym: "Ar" }
    ],
    // Period 4
    [
      { num: 19, sym: "K" }, { num: 20, sym: "Ca" }, { num: 21, sym: "Sc" }, { num: 22, sym: "Ti" }, { num: 23, sym: "V" }, { num: 24, sym: "Cr" },
      { num: 25, sym: "Mn" }, { num: 26, sym: "Fe" }, { num: 27, sym: "Co" }, { num: 28, sym: "Ni" }, { num: 29, sym: "Cu" }, { num: 30, sym: "Zn" },
      { num: 31, sym: "Ga" }, { num: 32, sym: "Ge" }, { num: 33, sym: "As" }, { num: 34, sym: "Se" }, { num: 35, sym: "Br" }, { num: 36, sym: "Kr" }
    ],
    // Period 5
    [
      { num: 37, sym: "Rb" }, { num: 38, sym: "Sr" }, { num: 39, sym: "Y" }, { num: 40, sym: "Zr" }, { num: 41, sym: "Nb" }, { num: 42, sym: "Mo" },
      { num: 43, sym: "Tc" }, { num: 44, sym: "Ru" }, { num: 45, sym: "Rh" }, { num: 46, sym: "Pd" }, { num: 47, sym: "Ag" }, { num: 48, sym: "Cd" },
      { num: 49, sym: "In" }, { num: 50, sym: "Sn" }, { num: 51, sym: "Sb" }, { num: 52, sym: "Te" }, { num: 53, sym: "I" }, { num: 54, sym: "Xe" }
    ],
    // Period 6
    [
      { num: 55, sym: "Cs" }, { num: 56, sym: "Ba" }, { num: 57, sym: "La" }, { num: 72, sym: "Hf" }, { num: 73, sym: "Ta" }, { num: 74, sym: "W" },
      { num: 75, sym: "Re" }, { num: 76, sym: "Os" }, { num: 77, sym: "Ir" }, { num: 78, sym: "Pt" }, { num: 79, sym: "Au" }, { num: 80, sym: "Hg" },
      { num: 81, sym: "Tl" }, { num: 82, sym: "Pb" }, { num: 83, sym: "Bi" }, { num: 84, sym: "Po" }, { num: 85, sym: "At" }, { num: 86, sym: "Rn" }
    ],
    // Period 7
    [
      { num: 87, sym: "Fr" }, { num: 88, sym: "Ra" }, { num: 89, sym: "Ac" }, { num: 104, sym: "Rf" }, { num: 105, sym: "Db" }, { num: 106, sym: "Sg" },
      { num: 107, sym: "Bh" }, { num: 108, sym: "Hs" }, { num: 109, sym: "Mt" }, { num: 110, sym: "Ds" }, { num: 111, sym: "Rg" }, { num: 112, sym: "Cn" },
      { num: 113, sym: "Nh" }, { num: 114, sym: "Fl" }, { num: 115, sym: "Mc" }, { num: 116, sym: "Lv" }, { num: 117, sym: "Ts" }, { num: 118, sym: "Og" }
    ]
  ];

  return (
    <section className="relative overflow-hidden bg-white pt-[24px] pb-0 border-b border-zinc-200/40 select-none">
      
      {/* 1. Clastro radial gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,rgba(96,165,250,0.38)_0%,rgba(197,218,255,0.18)_40%,rgba(255,255,255,1)_75%)] pointer-events-none"></div>

      {/* 2. Soft Blue Gradient Blur Aura layer */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[75%] h-[60%] rounded-full bg-[#3b82f6]/20 blur-[100px] pointer-events-none"></div>

      {/* Engineering Faint Background Grid Line backdrop */}
      <div className="absolute inset-0 bg-grid-engineering opacity-25 pointer-events-none"></div>

      {/* Dynamic Floating symbols backdrop */}
      <FloatingElements />

      {/* 3. Full Periodic Table (Periods 1-7) Rising from bottom behind the image */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] overflow-hidden pointer-events-none z-10 flex flex-col justify-end px-4 select-none pb-1"
        style={{
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.45) 85%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.45) 85%, rgba(0,0,0,0) 100%)'
        }}
      >
        <div className="flex flex-col gap-1 w-full">
          {periodicElements.map((row, rIdx) => (
            <div 
              key={rIdx} 
              className="w-full gap-1"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(18, minmax(0, 1fr))'
              }}
            >
              {row.map((cell, cIdx) => {
                if (!cell) {
                  return <div key={cIdx} className="bg-transparent"></div>;
                }
                const classes = getCategoryClasses(cell.sym);
                return (
                  <div 
                    key={cIdx} 
                    className={`border ${classes.border} ${classes.bg} flex flex-col justify-between p-0.5 sm:p-1 rounded-sm aspect-square max-h-[58px] select-none transition-all duration-300`}
                  >
                    <span className={`text-[5px] sm:text-[6px] font-mono font-bold ${classes.numText} leading-none`}>
                      {cell.num}
                    </span>
                    <span className={`text-[8px] sm:text-[10px] font-extrabold ${classes.symText} text-center leading-none`}>
                      {cell.sym}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center">
        
        {/* Central Title container with overlapping buttons */}
        <div className="relative inline-block text-center mt-8 mb-4 md:mb-6">
          {/* Huge condensed Oswald Title */}
          <h1 className="font-display font-extrabold text-[56px] sm:text-[72px] md:text-[104px] lg:text-[132px] text-[#091b33] uppercase tracking-tighter leading-[0.92] select-none text-center">
            ENHANCE YOUR <br />
            EXPERTISE TODAY.
          </h1>

          {/* Mobile-only: 3D Labs button sits directly below heading */}
          <div className="block sm:hidden mt-6">
            <button
              onClick={() => handleScroll('3d-labs')}
              className="group cursor-pointer relative"
            >
              <span className="absolute inset-0 rounded-2xl bg-indigo-500/20 scale-[1.06] opacity-0 group-hover:opacity-100 group-hover:scale-[1.12] transition-all duration-300 blur-[6px] pointer-events-none"></span>
              <span className="relative flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-[size:200%_auto] hover:bg-[position:right_center] text-white text-sm font-black shadow-lg shadow-indigo-500/30 overflow-hidden select-none transition-all duration-500">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></span>
                <span className="relative tracking-wide">3D Labs</span>
                <span className="relative w-5 h-5 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M2 10 L10 2" />
                    <path d="M4 2 L10 2 L10 8" />
                  </svg>
                </span>
              </span>
            </button>
          </div>

          {/* ── 3D Labs CTA Button — Desktop/tablet only: Floating Left, Rotated ── */}
          <button
            onClick={() => handleScroll('3d-labs')}
            className="hidden sm:block absolute left-[8%] top-[54%] md:left-[12%] md:top-[52%] lg:left-[16%] lg:top-[51%] rotate-[-6deg] group cursor-pointer z-20"
          >
            {/* Outer glow ring that pulses on hover */}
            <span className="absolute inset-0 rounded-2xl bg-indigo-500/20 scale-[1.06] opacity-0 group-hover:opacity-100 group-hover:scale-[1.12] transition-all duration-300 blur-[6px] pointer-events-none"></span>

            {/* Main pill button */}
            <span className="relative flex items-center gap-2.5 px-5 py-2.5 sm:px-8 sm:py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-[size:200%_auto] hover:bg-[position:right_center] text-white text-xs sm:text-base font-black shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.04] active:scale-[0.97] transition-all duration-500 overflow-hidden select-none">

              {/* Shimmer sweep on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></span>

              {/* Label */}
              <span className="relative tracking-wide">3D Labs</span>

              {/* Diagonal Arrow Icon ↗ */}
              <span className="relative w-5 h-5 rounded-lg bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition duration-200 shrink-0">
                <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform duration-200">
                  <path d="M2 10 L10 2" />
                  <path d="M4 2 L10 2 L10 8" />
                </svg>
              </span>
            </span>
          </button>
        </div>

        {/* Centered Single Large Portrait resting on the bottom border */}
        <div className="w-full max-w-xl mx-auto flex justify-center select-none relative z-25 mt-2 mb-0">
          <img 
            src="/teachers-portrait.png" 
            alt="Nishant Sen" 
            className="w-full max-w-[380px] sm:max-w-[480px] md:max-w-[540px] h-auto object-contain block hover:scale-[1.02] transition duration-300" 
          />

          {/* Handwriting pointer arrow widget with text labels stacked at the tail (above the arrow) */}
          <div className="absolute right-[-100px] md:right-[-140px] bottom-[50%] hidden sm:flex flex-col items-start text-left select-none pointer-events-none transform rotate-[3deg]">
            {/* Text labels positioned above (in front of/tail of) the arrow */}
            <span className="font-handwritten text-4xl text-indigo-600 font-bold leading-none">
              Nishant Sen
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#091b33]/70 font-mono mt-1">
              Interactive Chemistry Educator
            </span>

            {/* Pointer arrow swooping down-left from underneath the text */}
            <svg 
              className="w-14 h-14 text-indigo-500/80 mt-1 translate-x-[-24px]"
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3"
              strokeLinecap="round"
            >
              {/* Curved pointer arrow pointing left-down towards the portrait */}
              <path d="M 75,15 C 50,20 25,40 15,65" />
              <path d="M 15,65 L 30,62" />
              <path d="M 15,65 L 18,48" />
            </svg>
          </div>
        </div>

      </div>

    </section>
  );
}
