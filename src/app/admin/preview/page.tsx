'use client';

import { useState, useEffect } from 'react';
import { Lock, FileText, Smartphone, Printer, Check, Loader2, ShieldAlert, Sparkles, Send } from 'lucide-react';

interface DraftContent {
  topic: string;
  script: string;
  app_html: string;
  notes_markdown: string;
}

export default function PreviewPage() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [draft, setDraft] = useState<DraftContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [publishStatus, setPublishStatus] = useState<'idle' | 'publishing' | 'success' | 'error'>('idle');

  // Handle PIN input changes
  const handlePinChange = (val: string) => {
    setAuthError(false);
    const newPin = val.replace(/\D/g, '').substring(0, 6);
    setPin(newPin);

    // Auto-authenticate when 6 digits are typed
    if (newPin === '312000') {
      setIsAuthenticated(true);
      fetchDraftContent();
    } else if (newPin.length === 6) {
      setAuthError(true);
      setPin('');
    }
  };

  // Fetch draft content from /api/draft
  const fetchDraftContent = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/draft');
      if (!res.ok) {
        throw new Error('No active draft preview found. Please push content from n8n first.');
      }
      const data = await res.json();
      setDraft(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to fetch draft.');
    } finally {
      setLoading(false);
    }
  };

  // Handle publishing approved content
  const handlePublish = async () => {
    setPublishStatus('publishing');
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: '312000' }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to publish content.');
      }

      setPublishStatus('success');
    } catch (err: any) {
      setPublishStatus('error');
      alert(err.message || 'Failed to publish draft.');
    }
  };

  // Simple custom markdown renderer for the notes column
  const renderNotes = (md: string) => {
    if (!md) return '';
    return md
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('# ')) {
          return `<h1 class="text-lg font-black text-white mt-4 mb-2 border-b border-slate-700/60 pb-1.5">${trimmed.substring(2)}</h1>`;
        }
        if (trimmed.startsWith('## ')) {
          return `<h2 class="text-sm font-black text-cyan-400 mt-3 mb-1.5">${trimmed.substring(3)}</h2>`;
        }
        if (trimmed.startsWith('### ')) {
          return `<h3 class="text-xs font-bold text-slate-200 mt-2.5 mb-1">${trimmed.substring(4)}</h3>`;
        }
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return `<li class="ml-4 list-disc text-slate-350 text-xs my-1">${trimmed.substring(2)}</li>`;
        }
        
        // Match bold text **bold**
        let formatted = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-300 font-extrabold">$1</strong>');
        return `<p class="text-slate-400 my-2 leading-relaxed text-xs font-medium">${formatted}</p>`;
      })
      .join('');
  };

  // Highlights timecode lines inside Hinglish Script
  const formatScript = (text: string) => {
    if (!text) return '';
    return text.replace(
      /(\[\d{2}:\d{2}\])/g,
      '<span class="text-cyan-400 font-bold font-mono tracking-wider">$1</span>'
    );
  };

  // Lock screen view
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 select-none font-sans relative overflow-hidden">
        {/* Decorative Grid and Halo background */}
        <div className="absolute inset-0 bg-grid-engineering opacity-[0.12] pointer-events-none"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] -top-40 -left-40 pointer-events-none"></div>
        
        <div className="w-full max-w-sm bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-2xl relative z-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="text-cyan-400" size={20} />
          </div>
          
          <h2 className="text-lg font-black text-white uppercase tracking-wider font-sans">
            Admin Gatekeeper
          </h2>
          <p className="text-xs text-slate-400 mt-1 mb-6">
            Enter your 6-digit access PIN to review pending draft content.
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-10 h-12 rounded-xl border flex items-center justify-center font-bold text-lg transition duration-200 ${
                  authError 
                    ? 'border-red-500 text-red-500 bg-red-500/5 animate-shake' 
                    : pin.length > i 
                      ? 'border-cyan-400 text-cyan-300 bg-cyan-400/5 shadow-[0_0_8px_rgba(34,211,238,0.25)]' 
                      : 'border-slate-800 text-slate-500 bg-slate-900/50'
                }`}
              >
                {pin.length > i ? '•' : ''}
              </div>
            ))}
          </div>

          <input 
            type="text" 
            pattern="[0-9]*"
            inputMode="numeric"
            value={pin}
            onChange={(e) => handlePinChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-default"
            autoFocus
          />

          {authError && (
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-4">
              ⚠️ ACCESS DENIED — INVALID PIN
            </span>
          )}

          <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/40 text-[10px] text-slate-500 leading-normal text-left font-mono">
            📌 TIP: Click anywhere on this card and start typing the 6-digit access pass.
          </div>
        </div>
      </main>
    );
  }

  // Loading view
  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0f19] flex items-center justify-center flex-col gap-3 font-sans">
        <Loader2 className="text-cyan-400 animate-spin" size={32} />
        <span className="text-xs text-slate-400 font-bold uppercase tracking-widest font-mono">Fetching Draft Assets...</span>
      </main>
    );
  }

  // Error/Empty view
  if (errorMsg || !draft) {
    return (
      <main className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 font-sans select-none relative">
        <div className="absolute inset-0 bg-grid-engineering opacity-[0.08] pointer-events-none"></div>
        <div className="w-full max-w-md bg-[#111827] border border-slate-800 rounded-3xl p-8 shadow-xl text-center relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="text-amber-400" size={24} />
          </div>
          <h2 className="text-md font-black text-white uppercase tracking-wider">Draft Fetch Alert</h2>
          <p className="text-xs text-slate-400 mt-2 mb-6 leading-relaxed">
            {errorMsg || 'No content found in draft_content.json. Deploy your n8n workflow webhook to push review data here first.'}
          </p>
          <button 
            onClick={fetchDraftContent}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs text-white font-bold rounded-xl border border-slate-700 transition"
          >
            Retry Fetch
          </button>
        </div>
      </main>
    );
  }

  // Dashboard workspace view
  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-200 font-sans pb-16 relative">
      
      {/* Dynamic Printing isolation rules */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          /* Hide all main interactive layouts */
          .no-print, header, nav, main > div:first-child, .column-script, .column-sim {
            display: none !important;
            visibility: hidden !important;
          }
          /* Expand and isolate note cards */
          .column-notes {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            display: block !important;
            visibility: visible !important;
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          .column-notes * {
            visibility: visible !important;
            color: black !important;
          }
          .column-notes h1 {
            color: black !important;
            border-bottom: 2px solid #000 !important;
            font-size: 24px !important;
            margin-top: 20px !important;
          }
          .column-notes h2 {
            color: #0c4a6e !important;
            font-size: 18px !important;
            margin-top: 16px !important;
          }
          .column-notes li, .column-notes p {
            color: #334155 !important;
            font-size: 14px !important;
          }
        }
      `}</style>

      {/* Radial glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[40%] left-0 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0"></div>

      {/* ── TOP HEADER SECTION ── */}
      <header className="relative z-10 border-b border-slate-800/80 bg-[#0e1626]/85 backdrop-blur-md sticky top-0 px-4 md:px-8 py-4 no-print select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo & Status badges */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-[8px] font-black uppercase tracking-wider font-mono">
                  Draft Preview
                </span>
                <span className="text-[9px] font-bold text-slate-500 font-mono">Ver. 1.0.4</span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-white leading-tight uppercase tracking-tight mt-1">
                {draft.topic}
              </h1>
            </div>
          </div>

          {/* Action Approve Button */}
          <div className="w-full md:w-auto">
            {publishStatus === 'success' ? (
              <div className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 border border-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-500/20 select-none">
                <Check size={14} className="stroke-[3]" />
                APPROVED &amp; PUBLISHED TO VERCEL
              </div>
            ) : (
              <button
                onClick={handlePublish}
                disabled={publishStatus === 'publishing'}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-98 disabled:opacity-50 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                {publishStatus === 'publishing' ? (
                  <>
                    <Loader2 size={13} className="animate-spin text-white" />
                    <span>PUBLISHING DRAFT...</span>
                  </>
                ) : (
                  <>
                    <Check size={13} className="stroke-[3]" />
                    <span>APPROVE &amp; PUBLISH TO WEBSITE</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      </header>

      {/* ── 3-COLUMN LAYOUT CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* ── COLUMN 1: VIDEO SCRIPT ── */}
          <div className="column-script bg-[#111827]/80 border border-slate-800/80 rounded-3xl p-5 md:p-6 flex flex-col gap-4 no-print min-h-[600px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <FileText size={16} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider text-white">Video Reels Script</h3>
              </div>
              <span className="text-[8px] font-bold text-slate-500 font-mono uppercase bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">Hinglish</span>
            </div>
            
            <div 
              className="flex-1 overflow-y-auto pr-1 text-xs leading-relaxed text-slate-350 font-medium whitespace-pre-wrap max-h-[580px]"
              dangerouslySetInnerHTML={{ __html: formatScript(draft.script) }}
            ></div>
          </div>

          {/* ── COLUMN 2: MOBILE APP SIMULATOR ── */}
          <div className="column-sim bg-[#111827]/80 border border-slate-800/80 rounded-3xl p-5 md:p-6 flex flex-col gap-4 no-print items-center min-h-[600px]">
            <div className="w-full flex items-center border-b border-slate-800 pb-3 self-stretch">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Smartphone size={16} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider text-white">Live Web App Simulator</h3>
              </div>
              <span className="ml-auto text-[8px] font-bold text-slate-500 font-mono uppercase bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">HTML5/WebGL</span>
            </div>

            {/* Mobile Bezels & iframe */}
            <div className="w-[316px] h-[550px] bg-slate-950 border-[10px] border-slate-800 rounded-[38px] shadow-2xl relative flex items-center justify-center overflow-hidden shrink-0 mt-4">
              
              {/* Phone Speaker Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-8 h-1 bg-slate-950 rounded-full mb-1"></div>
              </div>

              {/* Status bar */}
              <div className="absolute top-3.5 left-0 right-0 px-4 flex justify-between text-[7px] text-slate-500 font-mono z-20 select-none">
                <span>9:41 AM</span>
                <span>LTE 🔋</span>
              </div>

              {/* Dynamic app code iframe */}
              <iframe 
                srcDoc={draft.app_html}
                className="w-full h-full border-none pt-7 relative z-10"
                title="App Simulation View"
                sandbox="allow-scripts"
              />
            </div>
          </div>

          {/* ── COLUMN 3: NCERT SHORT NOTES ── */}
          <div className="column-notes bg-[#111827]/80 border border-slate-800/80 rounded-3xl p-5 md:p-6 flex flex-col gap-4 min-h-[600px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 no-print">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Printer size={16} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider text-white">NCERT Short Notes</h3>
              </div>
              
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white text-[10px] font-black rounded-lg border border-slate-700 transition cursor-pointer"
              >
                <Printer size={10} />
                <span>Print Notes</span>
              </button>
            </div>
            
            {/* Notes content */}
            <div 
              id="print-target"
              className="flex-1 overflow-y-auto pr-1 text-slate-350 max-h-[580px]"
              dangerouslySetInnerHTML={{ __html: renderNotes(draft.notes_markdown) }}
            ></div>
          </div>

        </div>
      </div>

    </main>
  );
}
