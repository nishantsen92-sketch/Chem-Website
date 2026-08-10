'use client';

import { Mail, Send, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import FloatingElements from './FloatingElements';

export default function ContactSection() {
  return (
    <section id="connect" className="py-16 md:py-24 bg-[#dce9ff] border-b border-zinc-200/80 relative select-none">
      
      {/* 1. Clastro radial gradient backdrop for lower section */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,218,255,0.15)_0%,rgba(255,255,255,0.2)_80%)] pointer-events-none -z-10"></div>

      {/* Floating Chemistry Elements */}
      <FloatingElements />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Testimonials Block: Asymmetrical Floating Design matching the screenshot */}
        <div className="mb-24 md:mb-32 relative min-h-[720px] lg:h-[800px] w-full flex flex-col justify-center items-center py-8 select-none">
          
          {/* Giant Background Navy Title Text Layer */}
          <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0">
            <h3 className="font-display font-black text-[55px] sm:text-[96px] md:text-[132px] lg:text-[164px] text-[#091b33] uppercase tracking-tighter leading-[0.78] text-center w-full">
              WHAT OUR <br />
              STUDENTS SAY
            </h3>
          </div>

          {/* Floating Testimonial Cards Layer */}
          {/* On desktop (lg:), these sit absolute. On mobile/tablet, they stack nicely in a responsive flex grid */}
          <div className="w-full max-w-6xl mx-auto relative z-10 lg:h-full flex flex-col lg:block gap-6">
            
            {/* Card 1: Top Right (Priyanshu Raj) */}
            <div className="bg-white p-5 rounded-[22px] shadow-lg text-left flex flex-col justify-between relative group hover:scale-[1.01] hover:shadow-xl transition duration-200 w-full lg:w-[305px] lg:absolute lg:top-[4%] lg:right-[2%]">
              <p className="text-xs sm:text-[13px] text-zinc-800 leading-relaxed font-normal">
                &quot;I used to struggle with chemistry logic. The 3D instructor explained complex molecular distortion topics so easily that I finally built my first full structure map!&quot;
              </p>
              <div className="flex items-center gap-3 mt-5 pt-3.5 border-t border-zinc-100">
                <div className="w-9 h-9 rounded-full overflow-hidden relative border border-zinc-200 shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150" 
                    alt="Priyanshu Raj" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="block text-xs font-black text-zinc-800 leading-tight">Priyanshu Raj</span>
                  <span className="block text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-mono mt-0.5">IIT JEE Prep Student</span>
                </div>
              </div>
            </div>

            {/* Card 2: Middle Left (Neha Sharma) */}
            <div className="bg-white p-5 rounded-[22px] shadow-lg text-left flex flex-col justify-between relative group hover:scale-[1.01] hover:shadow-xl transition duration-200 w-full lg:w-[290px] lg:absolute lg:top-[22%] lg:left-[0%]">
              <p className="text-xs sm:text-[13px] text-zinc-800 leading-relaxed font-normal">
                &quot;The VSEPR explorer helped me anticipate bond distortion angles I could never understand from flat pages before. Now I can confidently solve stereochemistry questions.&quot;
              </p>
              <div className="flex items-center gap-3 mt-5 pt-3.5 border-t border-zinc-100">
                <div className="w-9 h-9 rounded-full overflow-hidden relative border border-zinc-200 shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
                    alt="Neha Sharma" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="block text-xs font-black text-zinc-800 leading-tight">Neha Sharma</span>
                  <span className="block text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-mono mt-0.5">NEET Aspirant</span>
                </div>
              </div>
            </div>

            {/* Card 3: Bottom Left (Divya Patel) */}
            <div className="bg-white p-5 rounded-[22px] shadow-lg text-left flex flex-col justify-between relative group hover:scale-[1.01] hover:shadow-xl transition duration-200 w-full lg:w-[290px] lg:absolute lg:bottom-[4%] lg:left-[2%]">
              <p className="text-xs sm:text-[13px] text-zinc-800 leading-relaxed font-normal">
                &quot;Visual-first teaching is next level. Watching the SN2 backside attack mechanism video solved weeks of coordination compounds confusion. Highly recommended educator.&quot;
              </p>
              <div className="flex items-center gap-3 mt-5 pt-3.5 border-t border-zinc-100">
                <div className="w-9 h-9 rounded-full overflow-hidden relative border border-zinc-200 shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                    alt="Divya Patel" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="block text-xs font-black text-zinc-800 leading-tight">Divya Patel</span>
                  <span className="block text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-mono mt-0.5">JEE Advanced Candidate</span>
                </div>
              </div>
            </div>

            {/* Card 4: Center Bottom (Kabir Malhotra) */}
            <div className="bg-white p-5 rounded-[22px] shadow-lg text-left flex flex-col justify-between relative group hover:scale-[1.01] hover:shadow-xl transition duration-200 w-full lg:w-[300px] lg:absolute lg:bottom-[2%] lg:left-[36%]">
              <p className="text-xs sm:text-[13px] text-zinc-800 leading-relaxed font-normal">
                &quot;The visual-first organic lessons saved my organic chemistry reactions score. Nishant&apos;s 1-page notes are my go-to revision sheets before every mock exam.&quot;
              </p>
              <div className="flex items-center gap-3 mt-5 pt-3.5 border-t border-zinc-100">
                <div className="w-9 h-9 rounded-full overflow-hidden relative border border-zinc-200 shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150" 
                    alt="Kabir Malhotra" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="block text-xs font-black text-zinc-800 leading-tight">Kabir Malhotra</span>
                  <span className="block text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-mono mt-0.5">BITS Pilani Aspirant</span>
                </div>
              </div>
            </div>

            {/* Card 5: Middle Right (Aryan Mehta) */}
            <div className="bg-white p-5 rounded-[22px] shadow-lg text-left flex flex-col justify-between relative group hover:scale-[1.01] hover:shadow-xl transition duration-200 w-full lg:w-[300px] lg:absolute lg:bottom-[10%] lg:right-[1%]">
              <p className="text-xs sm:text-[13px] text-zinc-800 leading-relaxed font-normal">
                &quot;I never realized how visual chemistry could be until I joined this portal. Now I can summarize complex reaction mechanisms on a single cheat sheet without memorizing lines.&quot;
              </p>
              <div className="flex items-center gap-3 mt-5 pt-3.5 border-t border-zinc-100">
                <div className="w-9 h-9 rounded-full overflow-hidden relative border border-zinc-200 shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" 
                    alt="Aryan Mehta" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="block text-xs font-black text-zinc-800 leading-tight">Aryan Mehta</span>
                  <span className="block text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-mono mt-0.5">Class 12 Student</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── GET IN TOUCH: Bold Editorial Dark Block ── */}
        <div className="relative rounded-[40px] overflow-hidden bg-[#060d1a] shadow-[0_0_80px_rgba(59,130,246,0.12)]">

          {/* Subtle dot grid texture */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          </div>
          {/* Blue radial glow top-left */}
          <div className="absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full bg-blue-600/10 blur-[80px] pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-12 gap-0">

            {/* ── LEFT: Giant Typographic CTA ── */}
            <div className="col-span-12 lg:col-span-5 p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/8 min-h-[320px]">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-400/20 text-blue-400 text-[8px] font-black uppercase tracking-[0.2em] font-mono px-2.5 py-1 rounded-md mb-5">
                  ✉ Get in Touch
                </span>
                <h3 className="text-[42px] sm:text-[54px] font-black text-white uppercase tracking-tighter leading-[0.88]">
                  REACH<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400">
                    OUT.
                  </span>
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed mt-4 max-w-xs font-normal">
                  Have an exam hurdle or doubt? Connect with Nishant Sir directly for personalized chemistry guidance.
                </p>
              </div>

              {/* Telegram strip */}
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-blue-400/30 rounded-2xl px-4 py-3 transition duration-200 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-[#229ED9]/15 border border-[#229ED9]/25 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-[#229ED9]">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.08 14.063l-2.95-.924c-.64-.204-.654-.64.136-.954l11.527-4.445c.537-.194 1.006.131.769.508z"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <span className="block text-[10px] font-black text-white leading-tight">Join Telegram Study Group</span>
                  <span className="block text-[9px] text-zinc-500 font-mono mt-0.5">Free NEET/JEE MCQ polls daily</span>
                </div>
                <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 group-hover:text-blue-400 transition shrink-0">
                  <path d="M2 10 L10 2M4 2 L10 2 L10 8" />
                </svg>
              </a>
            </div>

            {/* ── RIGHT: Channel Cards ── */}
            <div className="col-span-12 lg:col-span-7 grid grid-cols-2 divide-x divide-y divide-white/8">

              {/* WhatsApp */}
              <a
                href="https://wa.me/917232091341"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-6 md:p-8 hover:bg-white/[0.03] transition duration-200 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center group-hover:bg-green-500/20 transition duration-200">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-green-400">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.856L.057 23.625a.5.5 0 0 0 .625.601l5.953-1.56A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.696-.5-5.25-1.378l-.377-.214-3.896 1.022 1.04-3.795-.232-.389A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                </div>
                <div>
                  <span className="block text-[9px] font-black text-zinc-500 uppercase tracking-widest font-mono mb-1">WhatsApp</span>
                  <span className="block text-sm font-black text-white leading-tight">+91 72320 91341</span>
                  <span className="block text-[10px] text-zinc-600 mt-1">Click-to-chat direct support</span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:nishantsen92@gmail.com"
                className="group flex flex-col gap-3 p-6 md:p-8 hover:bg-white/[0.03] transition duration-200 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center group-hover:bg-blue-500/20 transition duration-200">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <span className="block text-[9px] font-black text-zinc-500 uppercase tracking-widest font-mono mb-1">Email</span>
                  <span className="block text-sm font-black text-white leading-tight break-all">nishantsen92@gmail.com</span>
                  <span className="block text-[10px] text-zinc-600 mt-1">Student & creator queries</span>
                </div>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-6 md:p-8 hover:bg-white/[0.03] transition duration-200 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-400/20 flex items-center justify-center group-hover:bg-red-500/20 transition duration-200">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                    <polygon points="10 15 15 12 10 9" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <span className="block text-[9px] font-black text-zinc-500 uppercase tracking-widest font-mono mb-1">YouTube</span>
                  <span className="block text-sm font-black text-white leading-tight">Nishant Sen 3D Chem</span>
                  <span className="block text-[10px] text-zinc-600 mt-1">High-yield chemistry lessons</span>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-6 md:p-8 hover:bg-white/[0.03] transition duration-200 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-400/20 flex items-center justify-center group-hover:bg-pink-500/20 transition duration-200">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </div>
                <div>
                  <span className="block text-[9px] font-black text-zinc-500 uppercase tracking-widest font-mono mb-1">Instagram</span>
                  <span className="block text-sm font-black text-white leading-tight">@nishantsen.chem</span>
                  <span className="block text-[10px] text-zinc-600 mt-1">Quick 60s organic hacks</span>
                </div>
              </a>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
