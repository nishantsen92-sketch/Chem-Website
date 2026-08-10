'use client';

import { Play, Download, HelpCircle, RefreshCw, Sparkles, Check, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import FloatingElements from './FloatingElements';

interface StudyHubGridProps {
  onLaunchVsepr: () => void;
}

export default function StudyHubGrid({ onLaunchVsepr }: StudyHubGridProps) {
  // Flashcard Flip State
  const [isFlipped, setIsFlipped] = useState(false);
  
  // MCQ Quiz State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const quizOptions = [
    { text: 'Trigonal Planar', isCorrect: false },
    { text: 'T-shaped', isCorrect: true },
    { text: 'Trigonal Bipyramidal', isCorrect: false },
    { text: 'Bent', isCorrect: false }
  ];

  return (
    <div className="select-none bg-[#fafafa]">
      
      {/* ========================================================================= */}
      {/* SECTION 1: INTERACTIVE WEB APPS (Asymmetrical Double-Card Split) */}
      {/* ========================================================================= */}
      <section id="3d-labs" className="py-16 md:py-24 relative border-b border-zinc-200/80 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-engineering opacity-40 pointer-events-none -z-10"></div>
        <FloatingElements />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200/60 uppercase tracking-widest font-mono shadow-sm">
              <Sparkles size={10} className="text-blue-500 animate-spin-slow" /> Interactive Workbench
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-none mt-3.5">
              Interactive Chemistry Web Apps
            </h3>
            <p className="text-xs sm:text-sm text-zinc-505 mt-3 max-w-xl mx-auto leading-relaxed">
              Interact with spatial molecular structures or explore complex chemical reaction mechanisms in real-time.
            </p>
          </div>

          {/* Asymmetrical Double-Card Split Grid enclosed in black container frame */}
          <div className="bg-[#121214] p-4.5 rounded-[32px] shadow-2xl grid grid-cols-12 gap-6 items-stretch max-w-5xl mx-auto border-[12px] border-zinc-950">
            
            {/* Left Card: Indian students studying chemistry with a real HTML progress bar overlay */}
            <div className="col-span-12 lg:col-span-7 flex flex-col">
              <div className="flex-1 rounded-[24px] overflow-hidden shadow-lg relative min-h-[440px] bg-zinc-900 border border-zinc-800 flex flex-col justify-end p-5 sm:p-6 group">
                
                {/* Background Image of Indian Students */}
                <img 
                  src="/indian-students.png" 
                  alt="Indian Students studying chemistry" 
                  className="absolute inset-0 w-full h-full object-cover opacity-85 hover:scale-[1.01] transition duration-300 pointer-events-none"
                />
                
                {/* Gradient Vignette to darken bottom for clear text overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>

                {/* Real HTML Progress Bar Card Overlay */}
                <div className="bg-white border border-zinc-200/60 p-5 rounded-[20px] shadow-xl text-zinc-900 w-full max-w-[340px] relative z-10 self-start transition duration-150 transform hover:translate-y-[-2px]">
                  <h5 className="text-[28px] sm:text-[32px] font-extrabold text-zinc-900 leading-none tracking-tight">
                    85%
                  </h5>
                  <p className="text-[10px] sm:text-[11px] font-bold text-zinc-500 leading-snug mt-1 mb-3.5 text-left">
                    Percentage of students who reported improved concept clarity after using our interactive 3D apps.
                  </p>
                  
                  {/* Custom Progress Ticks Bar */}
                  <div className="flex gap-[3.5px] h-3.5 items-end">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 rounded-[1.5px] transition-all duration-300 ${
                          i < 20 
                            ? 'bg-[#818cf8] h-3.5 shadow-sm' // Indigo color
                            : 'bg-zinc-200 h-2'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[8px] font-mono font-bold text-zinc-400 mt-1.5">
                    <span>0</span>
                    <span>100</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Split Stacked widgets */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 justify-between">
              
              {/* Top Right Card: VSEPR Explorer launcher (Dark Theme) */}
              <div className="bg-[#1e1e22] rounded-[24px] text-white p-6 md:p-8 flex flex-col justify-between flex-1 gap-6 text-left border border-zinc-800/40 relative">
                <div>
                  {/* Yellow Badge Icon */}
                  <div className="w-10 h-10 rounded-full bg-[#bef264]/20 border border-[#bef264]/30 text-[#a3d63b] flex items-center justify-center mb-6">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="12 8 8 12 12 16 16 12 12 8" />
                    </svg>
                  </div>

                  <h4 className="text-xl font-extrabold text-white tracking-tight mb-2">
                    3D VSEPR Structure Explorer
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    Interactive 3D geometry engine. Drag, scale, and inspect ligands, repulsion forces, and bond angles for all primary AXE configurations.
                  </p>
                </div>

                <button 
                  onClick={onLaunchVsepr}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-sm transition duration-200 cursor-pointer w-full transform hover:scale-[1.01]"
                >
                  <Play size={11} className="fill-white" />
                  Launch 3D Lab
                </button>
              </div>

              {/* Bottom Right Card: SN1/SN2 Coming soon (Light Theme) */}
              <div className="bg-white border border-zinc-200/80 rounded-[24px] p-6 md:p-8 flex flex-col justify-between flex-1 gap-6 text-left relative shadow-sm">
                
                {/* Coming Soon tag */}
                <div className="absolute top-6 right-6 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md text-[8px] font-extrabold font-mono uppercase tracking-wider">
                  Coming Soon ⚡
                </div>

                <div>
                  {/* Yellow Badge Icon */}
                  <div className="w-10 h-10 rounded-full bg-[#bef264]/20 border border-[#bef264]/30 text-[#a3d63b] flex items-center justify-center mb-6">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect width="15" height="14" x="1" y="5" rx="2" ry="2" />
                    </svg>
                  </div>

                  <h4 className="text-xl font-extrabold text-[#091b33] tracking-tight mb-2">
                    SN1 &amp; SN2 Mechanisms
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                    Step-by-step nucleophilic substitution simulator. Watch backside attack, carbocation intermediate formation, and stereochemical inversion in real-time.
                  </p>
                </div>

                <button 
                  disabled
                  className="w-full inline-flex items-center justify-center py-3 text-xs font-bold text-zinc-400 bg-zinc-50 border border-zinc-150 rounded-xl cursor-not-allowed opacity-60"
                >
                  Locked Simulation
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: ONE PAGE REVISION NOTES (Course Cards Grid) */}
      {/* ========================================================================= */}
      <section id="one-page-notes" className="py-16 md:py-24 relative border-b border-zinc-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200/60 uppercase tracking-widest font-mono shadow-sm">
              📝 Quick Revision
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight mt-3.5">
              1-Page Chemistry Cheat Sheets
            </h3>
            <p className="text-xs sm:text-sm text-zinc-505 mt-2.5 leading-relaxed max-w-xl mx-auto">
              Zero-clutter physical-notebook summary pages mapping key organic and inorganic reactions on a single sheet.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Sheet 1 */}
            <div className="bg-white border border-zinc-200/80 rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between text-left group hover:border-zinc-350">
              
              {/* Thumbnail Container with ruled backdrop */}
              <div className="h-44 w-full bg-ruled-lines bg-amber-50/20 border-b border-zinc-100 flex items-center justify-center p-4 relative overflow-hidden shrink-0">
                {/* Visual binder spirals */}
                <div className="absolute top-2 left-6 right-6 flex justify-between pointer-events-none">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-5 rounded-full border border-zinc-350 bg-zinc-200"></div>
                  ))}
                </div>
                <div className="text-center font-mono">
                  <span className="text-[10px] font-black text-amber-600 block mb-1">CHEMISTRY</span>
                  <span className="text-base font-black text-zinc-800 uppercase tracking-tight block max-w-[200px] leading-tight">
                    ORGANIC REAGENTS
                  </span>
                </div>
              </div>

              {/* Card info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[8px] font-extrabold uppercase tracking-widest text-zinc-400 font-mono mb-2">
                    <span>PDF Document</span>
                    <span>1.2 MB</span>
                  </div>
                  <h4 className="text-base font-extrabold text-[#091b33] tracking-tight leading-snug mb-2 group-hover:text-blue-600 transition">
                    Organic Reagents &amp; Synthesis Map
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                    Catalysts, reaction steps, and common NEET/JEE traps mapped on a single notebook-style sheet.
                  </p>
                </div>

                <div className="border-t border-zinc-150 pt-4 flex items-center justify-between mt-6">
                  <span className="text-xs font-black text-emerald-600 font-sans tracking-wide">
                    FREE DOWNLOAD
                  </span>
                  <a 
                    href="#connect"
                    className="inline-flex items-center justify-center py-2 px-4 bg-[#091b33] hover:bg-[#0f2c52] text-white text-xs font-bold rounded-xl shadow-sm transition cursor-pointer active:scale-95"
                  >
                    <Download size={11} className="mr-1.5" />
                    Download
                  </a>
                </div>
              </div>

            </div>

            {/* Sheet 2 */}
            <div className="bg-white border border-zinc-200/80 rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between text-left group hover:border-zinc-350">
              
              {/* Thumbnail Container */}
              <div className="h-44 w-full bg-ruled-lines bg-blue-50/20 border-b border-zinc-100 flex items-center justify-center p-4 relative overflow-hidden shrink-0">
                <div className="absolute top-2 left-6 right-6 flex justify-between pointer-events-none">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-5 rounded-full border border-zinc-350 bg-zinc-200"></div>
                  ))}
                </div>
                <div className="text-center font-mono">
                  <span className="text-[10px] font-black text-blue-600 block mb-1">INORGANIC</span>
                  <span className="text-base font-black text-zinc-800 uppercase tracking-tight block max-w-[200px] leading-tight">
                    COORDINATION CMPD
                  </span>
                </div>
              </div>

              {/* Card info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[8px] font-extrabold uppercase tracking-widest text-zinc-400 font-mono mb-2">
                    <span>PDF Document</span>
                    <span>0.8 MB</span>
                  </div>
                  <h4 className="text-base font-extrabold text-[#091b33] tracking-tight leading-snug mb-2 group-hover:text-blue-600 transition">
                    Coordination Compounds &amp; Isomers
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                    Visual isomers builder, ligand splitting diagrams, and magnetic moment calculation shortcuts.
                  </p>
                </div>

                <div className="border-t border-zinc-150 pt-4 flex items-center justify-between mt-6">
                  <span className="text-xs font-black text-emerald-600 font-sans tracking-wide">
                    FREE DOWNLOAD
                  </span>
                  <a 
                    href="#connect"
                    className="inline-flex items-center justify-center py-2 px-4 bg-[#091b33] hover:bg-[#0f2c52] text-white text-xs font-bold rounded-xl shadow-sm transition cursor-pointer active:scale-95"
                  >
                    <Download size={11} className="mr-1.5" />
                    Download
                  </a>
                </div>
              </div>

            </div>

            {/* Sheet 3 */}
            <div className="bg-white border border-zinc-200/80 rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between text-left group hover:border-zinc-350">
              
              {/* Thumbnail Container */}
              <div className="h-44 w-full bg-ruled-lines bg-purple-50/20 border-b border-zinc-100 flex items-center justify-center p-4 relative overflow-hidden shrink-0">
                <div className="absolute top-2 left-6 right-6 flex justify-between pointer-events-none">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-5 rounded-full border border-zinc-350 bg-zinc-200"></div>
                  ))}
                </div>
                <div className="text-center font-mono">
                  <span className="text-[10px] font-black text-purple-600 block mb-1">STRUCTURE</span>
                  <span className="text-base font-black text-zinc-800 uppercase tracking-tight block max-w-[200px] leading-tight">
                    CHEMICAL BONDING
                  </span>
                </div>
              </div>

              {/* Card info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[8px] font-extrabold uppercase tracking-widest text-zinc-400 font-mono mb-2">
                    <span>PDF Document</span>
                    <span>1.5 MB</span>
                  </div>
                  <h4 className="text-base font-extrabold text-[#091b33] tracking-tight leading-snug mb-2 group-hover:text-blue-600 transition">
                    Chemical Bonding &amp; VSEPR Sheet
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                    Geometry configuration matrices, hybridization shortcuts, and electronegativity dipole trends.
                  </p>
                </div>

                <div className="border-t border-zinc-150 pt-4 flex items-center justify-between mt-6">
                  <span className="text-xs font-black text-emerald-600 font-sans tracking-wide">
                    FREE DOWNLOAD
                  </span>
                  <a 
                    href="#connect"
                    className="inline-flex items-center justify-center py-2 px-4 bg-[#091b33] hover:bg-[#0f2c52] text-white text-xs font-bold rounded-xl shadow-sm transition cursor-pointer active:scale-95"
                  >
                    <Download size={11} className="mr-1.5" />
                    Download
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: FLASHCARD & QUIZ (Interactive Recall Dashboard) */}
      {/* ========================================================================= */}
      <section id="quizzes" className="py-16 md:py-24 relative border-b border-zinc-200/80 bg-[#f4f4f5]/65">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-extrabold bg-purple-50 text-purple-700 border border-purple-200/60 uppercase tracking-widest font-mono shadow-sm">
              🎯 Active Recall
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight mt-3.5">
              NCERT Chemistry Flashcards &amp; Quizzes
            </h3>
            <p className="text-xs sm:text-sm text-zinc-505 mt-2.5 leading-relaxed max-w-xl mx-auto">
              Double your conceptual retention rate with active recall index cards and topic-wise MCQ mock tests.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Flashcard Column (3D Index Card) */}
            <div className="col-span-12 md:col-span-6 flex flex-col">
              <div className="flex-1 flex flex-col justify-between bg-white border border-zinc-200/80 rounded-[32px] p-6 shadow-sm text-left gap-6">
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-purple-600 font-mono">
                    Recall Tool 01 — Index Cards
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-zinc-900 tracking-tight mt-1 mb-2">
                    5-Minute NCERT Flashcards
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Click on the index card below. It will flip 180° in 3D to reveal answers regarding molecular boiling exceptions.
                  </p>
                </div>

                {/* 3D Ruled Index Card */}
                <div 
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full h-[160px] cursor-pointer select-none [perspective:1000px] transform hover:scale-[1.01] transition duration-200"
                >
                  <div className={`relative w-full h-full text-center transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                    
                    {/* Front Side */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white border border-zinc-200/80 rounded-2xl shadow-sm bg-ruled-lines p-4.5 flex flex-col justify-between text-left">
                      <div className="border-l border-red-500/25 pl-4 ml-1.5 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center text-[7px] sm:text-[8px] uppercase tracking-widest font-extrabold text-purple-500 font-mono">
                            <span>Inorganic Chemistry</span>
                            <span>Click to Flip 🔄</span>
                          </div>
                          <p className="text-xs font-black text-zinc-800 leading-relaxed mt-3">
                            Q: Why does NH₃ possess a higher boiling point than PH₃?
                          </p>
                        </div>
                        <span className="text-[8px] sm:text-[9px] font-bold text-purple-750 flex items-center gap-1.5 font-mono">
                          <RefreshCw size={10} className="animate-spin-slow" /> TAP TO REVEAL ANSWER
                        </span>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-purple-50/50 border border-purple-200 rounded-2xl p-4.5 flex flex-col justify-between text-left shadow-sm">
                      <div className="border-l border-red-500/25 pl-4 ml-1.5 h-full flex flex-col justify-between">
                        <div>
                          <div className="text-[7px] sm:text-[8px] uppercase tracking-widest font-extrabold text-purple-500 font-mono">
                            ANSWER SPEC SHEET
                          </div>
                          <p className="text-[9px] sm:text-[10px] font-bold text-purple-900 leading-relaxed mt-3">
                            💡 Nitrogen is highly electronegative and forms strong intermolecular hydrogen bonds, whereas phosphorus in PH₃ forms weak dispersion forces.
                          </p>
                        </div>
                        <span className="text-[8px] sm:text-[9px] font-bold text-purple-750 font-mono">TAP TO FLIP BACK</span>
                      </div>
                    </div>

                  </div>
                </div>

                <button 
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-zinc-650 bg-zinc-50 border border-zinc-200 hover:border-purple-300 hover:bg-purple-50/10 rounded-xl transition cursor-pointer"
                >
                  <RefreshCw size={11} className="text-purple-650" />
                  Flip Index Card
                </button>
              </div>
            </div>

            {/* Quiz Column (MCQ Widget) */}
            <div className="col-span-12 md:col-span-6 flex flex-col">
              <div className="flex-1 flex flex-col justify-between bg-white border border-zinc-200/80 rounded-[32px] p-6 shadow-sm text-left gap-6">
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-600 font-mono">
                    Recall Tool 02 — Topic Check
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-zinc-900 tracking-tight mt-1 mb-2">
                    Quick MCQ VSEPR Quiz
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Test your geometry visual skills. Select the correct atomic structure configuration for Chlorine Trifluoride (ClF₃).
                  </p>
                </div>

                {/* MCQ Options List */}
                <div className="flex flex-col gap-2.5">
                  {quizOptions.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    let optionClasses = "border-zinc-200 hover:border-zinc-350 hover:bg-zinc-50/40 text-zinc-800";
                    if (isSelected) {
                      optionClasses = opt.isCorrect 
                        ? "border-emerald-500 bg-emerald-50/50 text-emerald-950" 
                        : "border-red-400 bg-red-50/50 text-red-950";
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setSelectedOption(oIdx);
                          setShowExplanation(true);
                        }}
                        className={`w-full flex items-center justify-between p-3 border text-xs font-bold rounded-2xl transition duration-150 cursor-pointer ${optionClasses}`}
                      >
                        <span>{opt.text}</span>
                        {isSelected && (
                          <span className="text-[10px] font-bold font-mono">
                            {opt.isCorrect ? '✅ CORRECT' : '❌ INCORRECT'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Quiz feedback text */}
                <div className="min-h-[48px] flex items-center justify-between border-t border-zinc-150 pt-4">
                  {showExplanation ? (
                    <p className="text-[10px] sm:text-[11px] text-zinc-500 leading-tight">
                      💡 ClF₃ has 3 bond pairs and 2 lone pairs (AX₃E₂ configuration), causing axial ligands to bend backwards to form a distorted <strong>T-shape</strong>.
                    </p>
                  ) : (
                    <span className="text-[9px] font-bold text-zinc-400 font-mono uppercase tracking-wider">
                      Select an option to evaluate
                    </span>
                  )}
                  {showExplanation && (
                    <button 
                      onClick={() => {
                        setSelectedOption(null);
                        setShowExplanation(false);
                      }}
                      className="text-[9px] font-black text-blue-600 hover:text-blue-700 font-mono uppercase shrink-0 ml-3 cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: FULL NOTES — Editorial Split Magazine Layout */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 relative bg-[#060d1a] overflow-hidden">

        {/* Deep space radial glow backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.18)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(190,242,100,0.08)_0%,transparent_60%)] pointer-events-none"></div>

        {/* Faint dot-grid texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Split Grid: Left Visual + Right Content */}
          <div className="grid grid-cols-12 gap-0 items-stretch max-w-6xl mx-auto rounded-[40px] overflow-hidden border border-white/8 shadow-[0_0_80px_rgba(59,130,246,0.15)]">

            {/* ── LEFT: Chemical Formula Art Panel ── */}
            <div className="col-span-12 lg:col-span-5 bg-[#0a1628] relative flex flex-col items-center justify-center p-10 min-h-[380px] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/8">

              {/* Animated rotating outer glow ring */}
              <div className="absolute w-[280px] h-[280px] rounded-full border border-blue-500/15 animate-[spin_18s_linear_infinite]"></div>
              <div className="absolute w-[200px] h-[200px] rounded-full border border-[#bef264]/10 animate-[spin_12s_linear_infinite_reverse]"></div>

              {/* Formula cluster — center stage */}
              <div className="relative flex flex-col items-center gap-2 z-10">
                {/* Main formula */}
                <div className="text-[52px] font-black text-white leading-none tracking-tighter font-mono drop-shadow-[0_0_20px_rgba(99,179,237,0.5)]">
                  CH₃
                </div>
                {/* Bond line */}
                <div className="w-[2px] h-8 bg-gradient-to-b from-blue-400 to-transparent"></div>
                <div className="text-[38px] font-black text-blue-300 leading-none tracking-tighter font-mono drop-shadow-[0_0_14px_rgba(147,197,253,0.6)]">
                  COOH
                </div>

                {/* Electron dot markers */}
                <div className="absolute -top-4 -left-12 w-2 h-2 rounded-full bg-[#bef264] opacity-80 animate-pulse"></div>
                <div className="absolute top-8 -right-10 w-1.5 h-1.5 rounded-full bg-blue-400 opacity-70 animate-[pulse_2.3s_ease-in-out_infinite]"></div>
                <div className="absolute -bottom-2 left-0 w-1 h-1 rounded-full bg-purple-400 opacity-60 animate-[pulse_3s_ease-in-out_infinite]"></div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <span className="text-[9px] font-black text-blue-400/60 uppercase tracking-[0.25em] font-mono">
                  Organic · Inorganic · Physical
                </span>
              </div>
            </div>

            {/* ── RIGHT: Content Panel ── */}
            <div className="col-span-12 lg:col-span-7 bg-[#0d1f3a] flex flex-col justify-between p-8 md:p-10 gap-8">

              {/* Header Row */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 bg-[#bef264]/10 border border-[#bef264]/25 text-[#bef264] text-[8px] font-black uppercase tracking-[0.22em] font-mono px-2.5 py-1 rounded-md mb-3">
                    ⏰ Coming Soon
                  </span>
                  <h3 className="text-2xl sm:text-[28px] font-black text-white tracking-tight leading-snug">
                    Complete Chapter<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-[#bef264]">Notes &amp; Lectures</span>
                  </h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed mt-2.5 font-normal max-w-sm">
                    Deep-dive chapter references covering all JEE Advanced and NEET theory, derivations, inorganic trends, and reaction maps — in a single structured library.
                  </p>
                </div>
              </div>

              {/* Chapter Pills Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: 'Chemical Bonding', tag: 'Ch. 04', color: 'blue' },
                  { label: 'Organic Reactions', tag: 'Ch. 12', color: 'lime' },
                  { label: 'Electrochemistry', tag: 'Ch. 08', color: 'purple' },
                  { label: 'p-Block Elements', tag: 'Ch. 11', color: 'amber' },
                  { label: 'Thermodynamics', tag: 'Ch. 06', color: 'blue' },
                  { label: 'Coordination Cmpd', tag: 'Ch. 09', color: 'lime' },
                ].map((ch, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white/5 border border-white/8 rounded-2xl px-3.5 py-2.5 hover:bg-white/8 transition duration-200 group/chip cursor-default">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      ch.color === 'blue' ? 'bg-blue-400' :
                      ch.color === 'lime' ? 'bg-[#bef264]' :
                      ch.color === 'purple' ? 'bg-purple-400' : 'bg-amber-400'
                    }`}></div>
                    <span className="text-[10px] font-bold text-zinc-300 group-hover/chip:text-white transition leading-tight">{ch.label}</span>
                    <span className="ml-auto text-[8px] font-mono font-black text-zinc-600 group-hover/chip:text-zinc-400 transition">{ch.tag}</span>
                  </div>
                ))}
              </div>

              {/* Progress Strip */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                  <span>Content Completion</span>
                  <span className="text-blue-400">68%</span>
                </div>
                <div className="flex gap-[3px] h-2 items-end">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-[1px] ${
                        i < 20 ? 'bg-gradient-to-t from-blue-600 to-blue-400 h-2' : 'bg-white/8 h-1.5'
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-[9px] text-zinc-600 font-mono">20 of 30 chapters authored — launching Q3 2026</p>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
