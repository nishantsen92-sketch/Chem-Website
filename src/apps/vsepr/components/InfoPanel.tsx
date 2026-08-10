import { useState, useEffect } from 'react';
import type { PresetMolecule } from '../types';
import confetti from 'canvas-confetti';
import { BookOpen, HelpCircle, AlertCircle, ArrowDownCircle, CheckCircle, XCircle } from 'lucide-react';

interface InfoPanelProps {
  molecule: PresetMolecule;
}

export default function InfoPanel({ molecule }: InfoPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'quiz'>('info');
  
  // Quiz states
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);

  // Reset quiz state when molecule changes
  useEffect(() => {
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setIsCorrectAnswer(false);
  }, [molecule]);

  const handleAnswerSubmit = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswer(idx);
    setQuizSubmitted(true);
    
    const correct = idx === molecule.examQuestion.answer;
    setIsCorrectAnswer(correct);

    if (correct) {
      // Fire confetti celebration!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#3b82f6', '#14b8a6', '#10b981', '#f59e0b', '#f43f5e'],
      });
    }
  };

  const lpCount = molecule.lonePairs.length;
  const bpCount = molecule.ligands.length;

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-250/80 p-5 gap-5 overflow-y-auto max-h-[85vh] shadow-sm">
      
      {/* Sub-tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
        <button
          onClick={() => setActiveSubTab('info')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'info'
              ? 'bg-white text-blue-600 border border-slate-200 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen size={14} />
          Chemical Specs
        </button>
        <button
          onClick={() => setActiveSubTab('quiz')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'quiz'
              ? 'bg-white text-blue-600 border border-slate-200 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <HelpCircle size={14} />
          Exam Quiz Prep
        </button>
      </div>

      {activeSubTab === 'info' ? (
        <div className="flex flex-col gap-4 text-left">
          
          {/* Molecule Title Card */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800 flex items-baseline gap-2">
                {molecule.name} 
                <span className="text-sm font-mono text-blue-600">{molecule.formula}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">{molecule.molecularShape} Molecular Geometry</p>
            </div>
            <div className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-center">
              <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">AXE Class</span>
              <span className="text-sm font-extrabold text-blue-600 font-mono">{molecule.axeNotation}</span>
            </div>
          </div>

          {/* VSEPR Characteristics Table */}
          <div className="grid grid-cols-2 gap-2 bg-slate-50/50 p-3 rounded-xl border border-slate-200">
            <div className="flex flex-col p-1.5">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Steric Number</span>
              <span className="text-sm font-bold text-slate-700 font-mono">{molecule.stericNumber}</span>
            </div>
            <div className="flex flex-col p-1.5">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Hybridization</span>
              <span className="text-sm font-bold text-slate-700 font-mono">{molecule.hybridization}</span>
            </div>
            <div className="flex flex-col p-1.5 border-t border-slate-200">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Bonding Pairs</span>
              <span className="text-sm font-bold text-slate-700 font-mono">{bpCount}</span>
            </div>
            <div className="flex flex-col p-1.5 border-t border-slate-200">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Lone Pairs</span>
              <span className="text-sm font-bold text-slate-700 font-mono">{lpCount}</span>
            </div>
            <div className="flex flex-col p-1.5 border-t border-slate-200">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Ideal Angle</span>
              <span className="text-sm font-bold text-amber-600 font-mono">{molecule.idealAngle}</span>
            </div>
            <div className="flex flex-col p-1.5 border-t border-slate-200">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Actual Angle</span>
              <span className="text-sm font-bold text-blue-600 font-mono">{molecule.realAngle}</span>
            </div>
          </div>

          {/* Core Chemistry Narrative */}
          <div className="flex flex-col gap-1">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">Structural Summary</h4>
            <p className="text-xs leading-relaxed text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              {molecule.description}
            </p>
          </div>

          {/* Repulsion Profile Log */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">Active Valence Repulsions</h4>
            {molecule.repulsions.length > 0 ? (
              <div className="flex flex-col gap-1.5">
                {molecule.repulsions.map((rep) => (
                  <div key={rep.id} className="text-xs p-2 bg-rose-50/50 border border-rose-100 rounded-lg flex items-start gap-2">
                    <ArrowDownCircle size={14} className="text-rose-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-[10px] uppercase text-rose-600 tracking-wide mr-1.5 font-mono">
                        {rep.type}
                      </span>
                      <span className="text-slate-600 text-[11px]">{rep.description}</span>
                    </div>
                  </div>
                ))}
                <div className="text-[9px] text-slate-400 pl-1 mt-0.5">
                  Repulsion strength order: <span className="font-bold text-slate-500 font-mono">lp-lp &gt; lp-bp &gt; bp-bp</span> (VSEPR theory)
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                Symmetrical system with no lone pair distortions.
              </div>
            )}
          </div>

          {/* NCERT Cheat Sheet Card */}
          <div className="bg-amber-50 border border-amber-250/70 rounded-xl p-4 flex gap-3 flex-col">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertCircle size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">NCERT / JEE Exam Trap</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed pl-1">
              {molecule.examNotes}
            </p>
          </div>

        </div>
      ) : (
        <div className="flex flex-col gap-4 text-left">
          
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <HelpCircle size={15} className="text-blue-600" />
              NCERT Evaluation
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5 font-mono">Test your understanding of {molecule.formula} VSEPR rules.</p>
          </div>

          {/* Question card */}
          <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-xl flex flex-col gap-4">
            <span className="text-xs font-bold text-slate-800 leading-relaxed">
              {molecule.examQuestion.question}
            </span>

            {/* Options grid */}
            <div className="flex flex-col gap-2">
              {molecule.examQuestion.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === molecule.examQuestion.answer;
                
                let optionStyle = 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 text-slate-700';
                if (quizSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'bg-green-50 border-green-400 text-green-700';
                  } else if (isSelected) {
                    optionStyle = 'bg-rose-50 border-rose-400 text-rose-700';
                  } else {
                    optionStyle = 'bg-slate-100/50 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-blue-50 border-blue-400 text-blue-700';
                }

                return (
                  <button
                    key={idx}
                    disabled={quizSubmitted}
                    onClick={() => handleAnswerSubmit(idx)}
                    className={`p-3 rounded-lg text-xs font-medium text-left border transition duration-200 flex items-center justify-between cursor-pointer ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {quizSubmitted && isCorrect && <CheckCircle size={14} className="text-green-600" />}
                    {quizSubmitted && isSelected && !isCorrect && <XCircle size={14} className="text-rose-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation panel */}
          {quizSubmitted && (
            <div className={`p-4 rounded-xl border transition-all ${
              isCorrectAnswer 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-xs uppercase mb-2">
                {isCorrectAnswer ? (
                  <>
                    <CheckCircle size={14} className="text-green-600" />
                    Correct Answer!
                  </>
                ) : (
                  <>
                    <XCircle size={14} className="text-rose-600" />
                    Incorrect Attempt
                  </>
                )}
              </div>
              <p className="text-[11px] leading-relaxed">
                {molecule.examQuestion.explanation}
              </p>
              
              {!isCorrectAnswer && (
                <button
                  onClick={() => {
                    setSelectedAnswer(null);
                    setQuizSubmitted(false);
                    setIsCorrectAnswer(false);
                  }}
                  className="mt-3 py-1 px-3 bg-white hover:bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-slate-600 transition shadow-sm cursor-pointer"
                >
                  Retry Question
                </button>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
