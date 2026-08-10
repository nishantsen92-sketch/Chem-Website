'use client';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200/85 select-none py-8 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Brand Name with double pill Clastro logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex flex-col gap-1 transform rotate-[-25deg] shrink-0">
            <div className="w-5.5 h-1.8 rounded-full bg-cyan-400"></div>
            <div className="w-5.5 h-1.8 rounded-full bg-cyan-500/80"></div>
          </div>
          <span className="text-sm font-black text-[#091b33] tracking-[0.18em] font-sans">
            CLASTRO
          </span>
        </div>

        {/* Copyright notice */}
        <span className="text-[10px] text-zinc-400 font-bold font-sans uppercase tracking-wider">
          All rights reserved &copy; CLASTRO 2026
        </span>
      </div>
    </footer>
  );
}
