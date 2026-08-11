'use client';

import React from 'react';

interface AestheticNoteSheetProps {
  topic: string;
  notes_markdown: string;
}

interface Section {
  title: string;
  content: string;
}

export default function AestheticNoteSheet({ topic, notes_markdown }: AestheticNoteSheetProps) {
  
  // Parse raw markdown chapters into structured card segments
  const parseMarkdown = (md: string): Section[] => {
    if (!md) return [];
    const rawSections = md.split(/(?=^#{1,3} )/m).filter(Boolean);
    return rawSections.map((sec) => {
      const lines = sec.trim().split('\n');
      const titleLine = lines[0] || '';
      const title = titleLine.replace(/^#{1,3}\s+/, '').trim();
      const content = lines.slice(1).join('\n').trim();
      return { title, content };
    });
  };

  const sections = parseMarkdown(notes_markdown);

  // Mini renderer formatting text, list items, and bold lines
  const renderCardContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-2"></div>;

      // Render markdown list bullets
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const itemText = trimmed.substring(2);
        return (
          <li key={idx} className="list-none text-slate-800 my-1 font-handwritten text-sm flex items-start gap-1.5 leading-snug">
            <span className="text-pink-500/80 font-bold shrink-0">➜</span>
            <span>{parseBold(itemText)}</span>
          </li>
        );
      }

      return (
        <p key={idx} className="text-slate-800 my-1 text-sm font-handwritten leading-relaxed">
          {parseBold(trimmed)}
        </p>
      );
    });
  };

  // Helper replacing **bold** with styled strong tags
  const parseBold = (text: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <strong key={match.index} className="font-extrabold text-slate-900 underline decoration-cyan-400/40 decoration-2">
          {match[1]}
        </strong>
      );
      lastIndex = boldRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  // Define background pastel colors for card containers
  const colors = [
    { bg: 'bg-[#E8F5E9]', border: 'border-green-200/60', tape: 'bg-green-200/40 border-green-300/40' },  // Soft Mint
    { bg: 'bg-[#FCE4EC]', border: 'border-pink-200/60', tape: 'bg-pink-200/40 border-pink-300/40' },    // Soft Rose
    { bg: 'bg-[#EDE7F6]', border: 'border-purple-200/60', tape: 'bg-purple-200/40 border-purple-300/40' },// Soft Lavender
    { bg: 'bg-[#FFFDE7]', border: 'border-yellow-200/60', tape: 'bg-yellow-200/40 border-yellow-300/40' } // Soft Lemon
  ];

  return (
    <div className="w-full overflow-x-auto p-2">
      {/* Google fonts injection inside style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Caveat:wght@700&display=swap');
        .font-handwritten {
          font-family: 'Patrick Hand', cursive;
        }
        .font-handwritten-title {
          font-family: 'Caveat', cursive;
        }
        .grid-ruled {
          background-color: #FBFBF6;
          background-image: radial-gradient(#e2e8f0 1.2px, transparent 1.2px);
          background-size: 20px 20px;
        }
      `}</style>

      {/* Main Revision Sheet Card */}
      <div 
        id="aesthetic-note-sheet"
        className="w-[720px] min-h-[960px] grid-ruled border border-slate-300/60 rounded-[32px] p-8 shadow-2xl relative flex flex-col justify-between select-none mx-auto text-left"
      >
        
        {/* Aesthetic Clip-art Grid Binder Lines */}
        <div className="absolute top-4 left-6 right-6 flex justify-between pointer-events-none opacity-40">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-2.5 h-6 rounded-full border border-slate-400 bg-slate-200/50 shadow-inner"></div>
          ))}
        </div>

        <div>
          {/* Header Title Section */}
          <div className="mt-6 border-b-2 border-dashed border-slate-300 pb-4 mb-6 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-slate-900 text-slate-100 font-mono px-2 py-0.5 rounded font-black uppercase tracking-wider">
                  Chemistry Cheat Sheet
                </span>
                <span className="text-[10px] text-pink-500 font-handwritten font-bold">Class 12 NCERT</span>
              </div>
              <h2 className="text-3xl font-black font-handwritten-title text-slate-950 uppercase tracking-tight leading-none mt-2.5">
                {topic || 'Notes Review'}
              </h2>
            </div>
            
            {/* Cute doodle drawings */}
            <div className="flex gap-1.5 pb-1">
              <span className="text-xl">🧬</span>
              <span className="text-xl">🧪</span>
            </div>
          </div>

          {/* Cards Grid */}
          {sections.length === 0 ? (
            <div className="text-center py-20 text-slate-400 font-handwritten text-md">
              No content parsed. Add markdown tags like ## Header and - bullet items to generate cards.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 items-stretch">
              {sections.map((section, idx) => {
                const color = colors[idx % colors.length] || colors[0];
                return (
                  <div 
                    key={idx}
                    className={`rounded-[24px] border ${color.border} ${color.bg} p-5 relative shadow-sm hover:shadow-md transition duration-200 flex flex-col`}
                  >
                    {/* Visual Masking Tape Element */}
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 ${color.tape} backdrop-blur-[0.5px] border-l border-r border-dashed rotate-[-1.5deg] shadow-sm`}></div>

                    <h4 className="text-md font-black font-handwritten-title text-slate-950 border-b border-slate-400/25 pb-2 mb-3.5 mt-1 tracking-wide">
                      📌 {section.title}
                    </h4>

                    <div className="flex-1">
                      {renderCardContent(section.content)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info line */}
        <div className="mt-8 border-t border-slate-200/60 pt-4 flex justify-between items-center text-[10px] text-slate-400 font-mono">
          <span>Authored by Nishant Sen Hub</span>
          <span>© 2026 Clastro Premium</span>
        </div>

      </div>
    </div>
  );
}
