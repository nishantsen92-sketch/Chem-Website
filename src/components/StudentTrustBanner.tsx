'use client';

export default function StudentTrustBanner() {
  const badges = [
    { text: '100% NCERT Aligned', code: 'NCERT.100', sub: 'pH = -log[H+]', color: 'text-blue-600 bg-blue-50/50 border-blue-200/60' },
    { text: 'Zero Formula Memorization', code: 'RULES.00', sub: 'sp³d² hybrid', color: 'text-amber-700 bg-amber-50/50 border-amber-200/60' },
    { text: 'Built by M.Sc. Chemist', code: 'CHEM.MSC', sub: 'C₆H₁₂O₆ + O₂', color: 'text-emerald-700 bg-emerald-50/50 border-emerald-250/60' },
    { text: 'Interactive 3D Geometry', code: 'VSEPR.3D', sub: 'H₂O (104.5°)', color: 'text-purple-600 bg-purple-50/50 border-purple-200/60' },
    { text: 'JEE & NEET Ready', code: 'PREP.READY', sub: 'BF₃ (120°)', color: 'text-pink-600 bg-pink-50/50 border-pink-200/60' },
    { text: 'Zero-BS Shortcuts Included', code: 'TIPS.RAW', sub: 'R-CH₂-OH', color: 'text-zinc-700 bg-zinc-100 border-zinc-200' },
  ];

  // Repeat the list to allow seamless infinite scroll width
  const scrollBadges = [...badges, ...badges, ...badges];

  return (
    <div className="w-full bg-[#f4f4f5]/30 border-y border-zinc-200/50 py-5.5 overflow-hidden relative select-none z-10 flex">
      {/* Scroll track */}
      <div className="flex whitespace-nowrap gap-6 items-center animate-ticker w-max">
        {scrollBadges.map((badge, idx) => (
          <div 
            key={idx} 
            className="inline-flex items-center gap-4 shrink-0"
          >
            {/* Micro science tag */}
            <span className={`text-[10px] font-mono font-black border rounded px-1.5 py-0.5 leading-none ${badge.color}`}>
              {badge.code}
            </span>
            {/* Monospace formula */}
            <span className="text-[10px] font-mono font-bold text-zinc-400">
              {badge.sub}
            </span>
            {/* Divider dot */}
            <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
            {/* Oswald title (Large Font) */}
            <span className="font-display font-extrabold text-lg sm:text-xl md:text-2xl uppercase text-[#091b33] tracking-tight leading-none pt-0.5">
              {badge.text}
            </span>
            {/* Light Grey Partition Line */}
            <div className="w-[1.5px] h-7 bg-zinc-300/65 ml-6 shrink-0"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
