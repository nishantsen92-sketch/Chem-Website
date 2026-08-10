'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id: string) => {
    setIsOpen(false);
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
    <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-zinc-200/50 shadow-sm select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Clastro Logo Representation */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 cursor-pointer group text-left"
            >
              {/* Clastro double pill logo */}
              <div className="flex flex-col gap-1 transform rotate-[-25deg]">
                <div className="w-5.5 h-1.8 rounded-full bg-cyan-400"></div>
                <div className="w-5.5 h-1.8 rounded-full bg-cyan-500/80"></div>
              </div>
              <span className="text-sm font-black text-[#091b33] tracking-[0.18em] font-sans">
                CLASTRO
              </span>
            </button>
          </div>

          {/* Desktop Navigation Pill Container */}
          <div className="hidden md:flex items-center bg-[#f4f4f5]/65 border border-zinc-200/60 rounded-full px-6 py-2 shadow-inner gap-6">
            <button
              onClick={() => handleScroll('3d-labs')}
              className="text-[10px] sm:text-xs font-bold text-zinc-650 hover:text-[#091b33] transition cursor-pointer"
            >
              3D Labs
            </button>
            <button
              onClick={() => handleScroll('one-page-notes')}
              className="text-[10px] sm:text-xs font-bold text-zinc-655 hover:text-[#091b33] transition cursor-pointer"
            >
              Cheat Sheets
            </button>
            <button
              onClick={() => handleScroll('quizzes')}
              className="text-[10px] sm:text-xs font-bold text-zinc-655 hover:text-[#091b33] transition cursor-pointer"
            >
              Flashcards
            </button>
            <button
              onClick={() => handleScroll('connect')}
              className="text-[10px] sm:text-xs font-bold text-zinc-655 hover:text-[#091b33] transition cursor-pointer"
            >
              Students Say
            </button>
          </div>

          {/* Contact Sir CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleScroll('connect')}
              className="px-5 py-2 text-[10px] sm:text-xs font-bold text-white bg-[#091b33] hover:bg-[#0f2c52] rounded-full shadow-sm hover:shadow active:scale-95 transition-all transform duration-150 cursor-pointer flex items-center gap-1.5"
            >
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white shrink-0">
                <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5l-3 2V4z" />
              </svg>
              Contact Sir
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-600 hover:bg-zinc-55 hover:text-zinc-900 transition cursor-pointer focus:outline-none"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-200 bg-white/95 px-4 pt-2 pb-4 space-y-1 shadow-inner">
          <button
            onClick={() => handleScroll('3d-labs')}
            className="block w-full text-left px-3 py-2 rounded-md text-sm font-bold text-zinc-650 hover:bg-zinc-50 hover:text-[#091b33] transition cursor-pointer"
          >
            3D Labs
          </button>
          <button
            onClick={() => handleScroll('one-page-notes')}
            className="block w-full text-left px-3 py-2 rounded-md text-sm font-bold text-zinc-650 hover:bg-zinc-50 hover:text-[#091b33] transition cursor-pointer"
          >
            Cheat Sheets
          </button>
          <button
            onClick={() => handleScroll('quizzes')}
            className="block w-full text-left px-3 py-2 rounded-md text-sm font-bold text-zinc-650 hover:bg-zinc-50 hover:text-[#091b33] transition cursor-pointer"
          >
            Flashcards
          </button>
          <button
            onClick={() => handleScroll('connect')}
            className="block w-full text-left px-3 py-2 rounded-md text-sm font-bold text-zinc-650 hover:bg-zinc-50 hover:text-[#091b33] transition cursor-pointer"
          >
            Students Say
          </button>
          <div className="pt-2 px-3">
            <button
              onClick={() => handleScroll('connect')}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 text-sm font-bold text-white bg-[#091b33] hover:bg-[#0f2c52] rounded-full shadow-sm transition active:scale-95 cursor-pointer"
            >
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white shrink-0">
                <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5l-3 2V4z" />
              </svg>
              Contact Sir
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
