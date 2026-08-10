'use client';

import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<'story' | 'started'>('story');

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

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-zinc-200/80 relative select-none">
      {/* Background Grid backdrop */}
      <div className="absolute inset-0 bg-grid-engineering opacity-20 pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[9px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200/60 uppercase tracking-widest font-mono shadow-sm">
            🎓 Educator Profile
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-none mt-3.5">
            Discover the Freedom <br className="hidden sm:block" /> to Learn Your Way
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 mt-3 max-w-2xl mx-auto leading-relaxed">
            Join thousands of learners enjoying the freedom to study chemistry visually, anywhere, anytime, on devices of all sizes.
          </p>

          {/* Nav Tab Pills */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => {
                setActiveTab('started');
                handleScroll('3d-labs');
              }}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer border ${
                activeTab === 'started'
                  ? 'bg-[#091b33] border-transparent text-white'
                  : 'bg-[#f4f4f5]/80 border-zinc-200/80 text-zinc-650 hover:bg-[#eaeaea]'
              }`}
            >
              Get Started
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer border ${
                activeTab === 'story'
                  ? 'bg-[#091b33] border-transparent text-white'
                  : 'bg-[#f4f4f5]/80 border-zinc-200/80 text-zinc-655 hover:bg-[#eaeaea]'
              }`}
            >
              Read My Story
            </button>
          </div>
        </div>

        {/* Double-Card Layout Grid */}
        <div className="grid grid-cols-12 gap-8 items-stretch mt-12">
          
          {/* Left Card: In-Person Learning (Navy Accent Card) */}
          <div className="col-span-12 lg:col-span-7 flex flex-col">
            <div className="flex-1 flex flex-col md:flex-row bg-[#091b33] rounded-[32px] text-white overflow-hidden shadow-xl p-6 md:p-8 relative gap-6 justify-between items-stretch">
              
              {/* Photo Frame Container */}
              <div className="flex-1 max-w-full md:max-w-[280px] min-h-[300px] md:min-h-auto bg-[#0b0f19] rounded-[24px] relative overflow-hidden shrink-0 border border-zinc-800">
                <Image 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600" 
                  alt="Nishant Sen"
                  fill
                  sizes="(max-w-md) 100vw, 280px"
                  priority={false}
                  className="object-cover"
                />

                {/* Overlapping Progress bar overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-zinc-200/50 p-3.5 rounded-2xl shadow-lg text-zinc-900 z-10">
                  <div className="flex items-center justify-between text-[9px] font-extrabold font-mono mb-1">
                    <span>CONCEPT CLARITY</span>
                    <span className="text-[#3b82f6]">85%</span>
                  </div>
                  {/* Progress ticks bar */}
                  <div className="flex gap-0.5 h-2.5 items-end">
                    {Array.from({ length: 22 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 h-${i % 2 === 0 ? '2.5' : '1.5'} rounded-sm ${i < 18 ? 'bg-[#3b82f6]' : 'bg-zinc-200'}`}
                      ></div>
                    ))}
                  </div>
                  <span className="block text-[7px] text-zinc-400 mt-1 font-bold">Percentage of students reporting immediate spatial clarity.</span>
                </div>
              </div>

              {/* Card Content Column */}
              <div className="flex-1 flex flex-col justify-between text-left pt-2">
                <div>
                  {/* Yellow Circular bulb badge */}
                  <div className="w-10 h-10 rounded-full bg-[#bef264]/20 border border-[#bef264]/30 text-[#bef264] flex items-center justify-center mb-6">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide">
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                    </svg>
                  </div>

                  <h4 className="text-xl font-extrabold text-white tracking-tight mb-2">
                    Visual 3D Labs
                  </h4>
                  <p className="text-xs text-zinc-350 leading-relaxed font-normal">
                    Bridge software engineering and molecular science. Here, atoms are not static drawings. Stretch bonds, watch lone pair domains repel ligands, and morph geometries in real-time.
                  </p>
                </div>

                <div className="flex gap-1.5 mt-8 border-t border-zinc-800 pt-4">
                  <div className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[8px] font-extrabold text-zinc-450 rounded-md uppercase tracking-wider font-mono">
                    🎓 NEET/JEE Focused
                  </div>
                  <div className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[8px] font-extrabold text-zinc-450 rounded-md uppercase tracking-wider font-mono">
                    ⚡ Visual-First
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Card: Online Learning (White Card with yellow badge) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col">
            <div className="flex-1 flex flex-col justify-between bg-white border border-zinc-200/80 rounded-[32px] overflow-hidden shadow-lg p-6 md:p-8 relative gap-6 text-left">
              
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-400"></div>

              <div>
                {/* Yellow minus circular icon */}
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center mb-6 shadow-sm">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide">
                    <line x1="5" x2="19" y1="12" y2="12" />
                  </svg>
                </div>

                <h4 className="text-xl font-extrabold text-zinc-900 tracking-tight mb-3">
                  1-Page Cheat Sheets
                </h4>
                <p className="text-xs text-zinc-550 leading-relaxed font-normal">
                  Dear Student, growing up, I hated studying chemistry from flat black-and-white textbook diagrams. We were shown 3D orbitals squished onto a 2D page, and expected to just &quot;imagine&quot; the repulsion forces. I built these cheat sheets to help you visualize the unseen, stop rote learning, and start understanding for real.
                </p>
              </div>

              <div className="border-t border-zinc-200/60 pt-4 flex items-center justify-between mt-4">
                <div>
                  <span className="block text-[8px] text-zinc-400 font-bold uppercase tracking-wider font-mono">Teaching for the next gen,</span>
                  <span className="block text-xs font-black text-zinc-800 mt-0.5 tracking-wide">Nishant Sen</span>
                </div>
                <div className="px-2.5 py-1 bg-amber-50 border border-amber-100 text-[8px] font-extrabold text-amber-750 rounded-md uppercase tracking-wider font-mono">
                  M.Sc. Chemistry
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
