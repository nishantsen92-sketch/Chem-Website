'use client';

import { useState, useEffect } from 'react';
import { Lock, FileText, Smartphone, Printer, Check, Loader2, ShieldAlert, Sparkles, FolderOpen, ArrowLeft, Send, Calendar, Copy, Download, Image as ImageIcon } from 'lucide-react';

interface TopicRow {
  id: string;
  topic: string;
  script: string;
  app_html: string;
  notes_markdown: string;
  image_url: string;
  status: string;
  created_at: string;
}

export default function PreviewPage() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  
  // Tab states
  const [activeConsoleTab, setActiveConsoleTab] = useState<'draft' | 'archive'>('draft');
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'script' | 'app' | 'image'>('script');

  // Database contents
  const [draft, setDraft] = useState<TopicRow | null>(null);
  const [archiveList, setArchiveList] = useState<TopicRow[]>([]);
  const [selectedArchive, setSelectedArchive] = useState<TopicRow | null>(null);
  
  // Loading, copy, and auto-save statuses
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [publishStatus, setPublishStatus] = useState<'idle' | 'publishing' | 'success' | 'error'>('idle');
  const [copilotPrompt, setCopilotPrompt] = useState('');
  const [isCopilotRunning, setIsCopilotRunning] = useState(false);
  const [copilotStatusMsg, setCopilotStatusMsg] = useState('');
  const [copyStatus, setCopyStatus] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  // Auto-authenticate when 6 digits are typed
  const handlePinChange = (val: string) => {
    setAuthError(false);
    const newPin = val.replace(/\D/g, '').substring(0, 6);
    setPin(newPin);

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

  // Fetch published archive from /api/archive
  const fetchArchiveContent = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/archive');
      if (!res.ok) {
        throw new Error('Failed to load published archive.');
      }
      const data = await res.json();
      setArchiveList(data || []);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to fetch archive.');
    } finally {
      setLoading(false);
    }
  };

  // Switch between tabs and trigger corresponding loads
  const handleConsoleTabChange = (tab: 'draft' | 'archive') => {
    setActiveConsoleTab(tab);
    setSelectedArchive(null);
    if (tab === 'draft') {
      fetchDraftContent();
    } else {
      fetchArchiveContent();
    }
  };

  // Handle publishing approved content
  const handlePublish = async (id: string) => {
    if (!id) return;
    setPublishStatus('publishing');
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: '312000', id }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to publish content.');
      }

      setPublishStatus('success');
      setTimeout(() => {
        setDraft(null);
        setPublishStatus('idle');
        fetchDraftContent();
      }, 2000);
    } catch (err: any) {
      setPublishStatus('error');
      alert(err.message || 'Failed to publish draft.');
    }
  };

  // Copy script text
  const handleCopyScript = () => {
    if (!activePreview) return;
    navigator.clipboard.writeText(activePreview.script);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  // Trigger Supabase persistence PUT call
  const triggerAutoSave = async (field: 'script' | 'app_html' | 'image_url', value: string) => {
    if (!activePreview) return;
    setAutoSaveStatus('saving');
    try {
      const res = await fetch('/api/draft', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: activePreview.id,
          [field]: value,
        }),
      });

      if (!res.ok) throw new Error('Auto-save PUT failed.');
      setAutoSaveStatus('saved');
    } catch (err) {
      console.warn('Auto-save error:', err);
      setAutoSaveStatus('error');
    }
  };

  // Handle local changes inside script textarea
  const handleScriptChange = (newVal: string) => {
    if (selectedArchive) {
      setSelectedArchive({ ...selectedArchive, script: newVal });
    } else if (draft) {
      setDraft({ ...draft, script: newVal });
    }

    // Debounce save action by 1.2s
    if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
    const timeout = setTimeout(() => {
      triggerAutoSave('script', newVal);
    }, 1200);
    setAutoSaveTimeout(timeout);
  };

  // Global Context-Aware AI Copilot refinement handler
  const handleCopilotSubmit = async () => {
    if (!copilotPrompt.trim() || isCopilotRunning || !activePreview) return;

    const promptText = copilotPrompt.trim();
    setCopilotPrompt('');
    setIsCopilotRunning(true);
    setCopilotStatusMsg(`Gemini is refining your ${activeWorkspaceTab === 'app' ? '3D simulation code' : activeWorkspaceTab === 'image' ? 'notes card design' : 'video script'}...`);

    try {
      // Map tabs to API targets
      const target = activeWorkspaceTab === 'app' ? 'app' : activeWorkspaceTab;
      const currentContent = 
        activeWorkspaceTab === 'script' ? activePreview.script :
        activeWorkspaceTab === 'app' ? activePreview.app_html :
        activePreview.image_url || '';

      const res = await fetch('/api/refine-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target,
          prompt: promptText,
          currentContent,
          topic: activePreview.topic,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Content refinement request failed.');
      }

      const data = await res.json();

      // Update states and trigger immediate save
      if (activeWorkspaceTab === 'script') {
        const updatedVal = data.script;
        if (selectedArchive) setSelectedArchive({ ...selectedArchive, script: updatedVal });
        else if (draft) setDraft({ ...draft, script: updatedVal });
        await triggerAutoSave('script', updatedVal);
      } else if (activeWorkspaceTab === 'app') {
        const updatedVal = data.app_html;
        if (selectedArchive) setSelectedArchive({ ...selectedArchive, app_html: updatedVal });
        else if (draft) setDraft({ ...draft, app_html: updatedVal });
        await triggerAutoSave('app_html', updatedVal);
      } else {
        const updatedVal = data.image_url;
        if (selectedArchive) setSelectedArchive({ ...selectedArchive, image_url: updatedVal });
        else if (draft) setDraft({ ...draft, image_url: updatedVal });
        await triggerAutoSave('image_url', updatedVal);
      }

      setCopilotStatusMsg('Changes applied and auto-saved successfully.');
      setTimeout(() => setCopilotStatusMsg(''), 3000);
    } catch (err: any) {
      setCopilotStatusMsg(`⚠️ Error: ${err.message || 'Action failed.'}`);
      setTimeout(() => setCopilotStatusMsg(''), 5000);
    } finally {
      setIsCopilotRunning(false);
    }
  };

  // Active preview object
  const activePreview = selectedArchive || (activeConsoleTab === 'draft' ? draft : null);

  // Render Lock Gatekeeper
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 select-none font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-engineering opacity-[0.12] pointer-events-none"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] -top-40 -left-40 pointer-events-none"></div>
        
        <div className="w-full max-w-sm bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-2xl relative z-10 text-center animate-fadeIn">
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

  // Render Loader
  if (loading && !activePreview) {
    return (
      <main className="min-h-screen bg-[#0b0f19] flex items-center justify-center flex-col gap-3 font-sans">
        <Loader2 className="text-cyan-400 animate-spin" size={32} />
        <span className="text-xs text-slate-400 font-bold uppercase tracking-widest font-mono">Loading Database Content...</span>
      </main>
    );
  }

  // Render SaaS Sidebar Layout
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200 font-sans flex overflow-hidden">
      
      {/* ── LEFT SIDEBAR PANEL (w-64) ── */}
      <aside className="w-64 bg-[#0d1320] border-r border-slate-800/80 flex flex-col justify-between shrink-0 no-print select-none">
        
        <div>
          {/* Admin title logo */}
          <div className="px-6 py-5 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-xs font-black text-white uppercase tracking-widest font-mono">
                SaaS Console
              </span>
            </div>
            <span className="text-[9px] text-slate-500 font-bold font-mono uppercase tracking-wider block mt-1">Nishant Chemistry Hub</span>
          </div>

          {/* Draft/Archive console toggles */}
          <div className="p-4 border-b border-slate-800/40">
            <div className="flex bg-[#0b0f19] border border-slate-800/60 rounded-xl p-1 gap-1">
              <button 
                onClick={() => handleConsoleTabChange('draft')}
                className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition cursor-pointer ${
                  activeConsoleTab === 'draft' 
                    ? 'bg-slate-850 text-cyan-400 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                🧪 Draft
              </button>
              <button 
                onClick={() => handleConsoleTabChange('archive')}
                className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition cursor-pointer ${
                  activeConsoleTab === 'archive' 
                    ? 'bg-slate-850 text-cyan-400 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                📚 Archive
              </button>
            </div>
          </div>

          {/* 3-Tab Sidebar Navigation Panel (Shown only when a preview item is active) */}
          {activePreview && (
            <nav className="p-4 space-y-1.5">
              <span className="px-3 text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-2.5 font-mono">WORKSPACE TABS</span>
              
              <button
                onClick={() => setActiveWorkspaceTab('script')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeWorkspaceTab === 'script'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20'
                    : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200 border border-transparent'
                }`}
              >
                <FileText size={14} />
                <span>🎬 Video Script</span>
              </button>

              <button
                onClick={() => setActiveWorkspaceTab('app')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeWorkspaceTab === 'app'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20'
                    : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Smartphone size={14} />
                <span>🧪 Interactive 3D App</span>
              </button>

              <button
                onClick={() => setActiveWorkspaceTab('image')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeWorkspaceTab === 'image'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20'
                    : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200 border border-transparent'
                }`}
              >
                <ImageIcon size={14} />
                <span>🖼️ Notes Sheet</span>
              </button>
            </nav>
          )}

        </div>

        {/* Sidebar Footer Auto-Save Status */}
        <div className="p-4 border-t border-slate-800/80 bg-[#0c121e]">
          <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-500">
            <span>SYNC STATUS:</span>
            {autoSaveStatus === 'saving' ? (
              <span className="text-amber-400 animate-pulse">💾 SAVING...</span>
            ) : autoSaveStatus === 'error' ? (
              <span className="text-red-500">⚠️ SAVE ERROR</span>
            ) : (
              <span className="text-emerald-500">✅ AUTO-SAVED</span>
            )}
          </div>
        </div>

      </aside>

      {/* ── MAIN WORKSPACE CONTENT ── */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* ── TOP HEADER INFOBAR ── */}
        <header className="relative z-10 h-16 border-b border-slate-800/80 bg-[#0e1626]/85 backdrop-blur-sm flex items-center justify-between px-6 no-print select-none">
          <div className="flex items-center gap-3">
            {selectedArchive && (
              <button
                onClick={() => setSelectedArchive(null)}
                className="mr-2 p-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
                title="Back to archive list"
              >
                <ArrowLeft size={12} />
              </button>
            )}

            <div>
              <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest font-mono">
                {activeConsoleTab === 'archive' ? '📚 ARCHIVED PREVIEW' : '🧪 PENDING DRAFT'}
              </h2>
              <h1 className="text-sm sm:text-base font-black text-white leading-tight uppercase tracking-tight mt-0.5 max-w-[280px] truncate">
                {activePreview ? activePreview.topic : 'No Active Topic Selected'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Publish Deadline Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-850 border border-slate-800 text-[10px] text-slate-400 font-bold font-mono">
              <Calendar size={11} className="text-cyan-400" />
              <span>Target Publish: Mon/Thu 9:00 AM</span>
            </div>

            {/* Primary Action Button */}
            {activeConsoleTab === 'draft' && draft && (
              publishStatus === 'success' ? (
                <div className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-emerald-600 border border-emerald-500 text-white rounded-xl text-[10px] font-black shadow-md shadow-emerald-500/20 select-none">
                  <Check size={12} className="stroke-[3]" />
                  PUBLISHED LIVE
                </div>
              ) : (
                <button
                  onClick={() => handlePublish(draft.id)}
                  disabled={publishStatus === 'publishing'}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-98 disabled:opacity-50 text-white rounded-xl text-[10px] font-black shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  {publishStatus === 'publishing' ? (
                    <>
                      <Loader2 size={11} className="animate-spin text-white" />
                      <span>PUBLISHING...</span>
                    </>
                  ) : (
                    <>
                      <Check size={11} className="stroke-[3]" />
                      <span>APPROVE &amp; PUBLISH LIVE</span>
                    </>
                  )}
                </button>
              )
            )}
          </div>
        </header>

        {/* ── WORKSPACE BODY PANELS ── */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col justify-center items-center">
          
          {/* Empty draft view */}
          {activeConsoleTab === 'draft' && !draft && !loading && (
            <div className="w-full max-w-sm bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl text-center select-none animate-fadeIn">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="text-amber-400" size={20} />
              </div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">No Active Drafts</h2>
              <p className="text-[11px] text-slate-400 mt-2 mb-6 leading-relaxed">
                No draft rows exist in Supabase. Please trigger your n8n workflow pipeline to push review data here first.
              </p>
              <button 
                onClick={fetchDraftContent}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs text-white font-bold rounded-xl border border-slate-700 transition cursor-pointer"
              >
                Refresh Drafts
              </button>
            </div>
          )}

          {/* List display under Archive tab */}
          {activeConsoleTab === 'archive' && !selectedArchive && !loading && (
            <div className="bg-[#111827]/80 border border-slate-800/80 rounded-3xl p-6 w-full max-w-2xl shadow-lg text-left animate-fadeIn">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-5 select-none">
                <FolderOpen className="text-cyan-400" size={16} />
                <h3 className="text-xs font-black uppercase tracking-wider text-white font-sans">Published Archive</h3>
              </div>

              {archiveList.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs font-semibold">
                  No published topics found in the archive.
                </div>
              ) : (
                <div className="divide-y divide-slate-800/60 max-h-[440px] overflow-y-auto pr-1">
                  {archiveList.map((item) => (
                    <div key={item.id} className="py-3 flex justify-between items-center gap-4 group">
                      <div>
                        <span className="text-[8px] text-slate-500 font-mono font-bold block">
                          {new Date(item.created_at).toLocaleDateString(undefined, { 
                            year: 'numeric', month: 'short', day: 'numeric' 
                          })}
                        </span>
                        <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition">
                          {item.topic}
                        </span>
                      </div>
                      <button 
                        onClick={() => setSelectedArchive(item)}
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-[10px] font-bold text-white border border-slate-700 rounded-xl transition cursor-pointer"
                      >
                        Inspect Preview
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── DETAILED VIEWS ── */}
          {activePreview && (
            <div className="w-full h-full flex flex-col justify-center items-center">
              
              {/* TAB 1: Video Script View */}
              {activeWorkspaceTab === 'script' && (
                <div className="w-full max-w-3xl bg-[#111827]/80 border border-slate-800/80 rounded-3xl p-5 md:p-6 flex flex-col h-[520px] shadow-lg animate-fadeIn text-left">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 select-none">
                    <span className="text-xs font-black text-white uppercase tracking-wider font-mono">
                      🎬 Video Script Editor
                    </span>
                    <button
                      onClick={handleCopyScript}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white text-[10px] font-black rounded-lg border border-slate-700 transition cursor-pointer"
                    >
                      <Copy size={11} />
                      <span>{copyStatus ? 'Copied!' : 'Copy Script'}</span>
                    </button>
                  </div>
                  
                  {/* Rich Text Editor */}
                  <textarea
                    value={activePreview.script}
                    onChange={(e) => handleScriptChange(e.target.value)}
                    className="flex-1 bg-slate-900/60 border border-slate-800/80 focus:border-cyan-500 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 leading-relaxed outline-none resize-none font-mono placeholder-slate-600"
                    placeholder="Enter Reels scripting here..."
                  />
                  <div className="mt-3 flex items-center justify-between text-[9px] font-mono text-slate-500 select-none">
                    <span>💡 Timecodes [00:00] will be highlighted on the mobile script previews.</span>
                    <span>{activePreview.script?.length || 0} characters</span>
                  </div>
                </div>
              )}

              {/* TAB 2: Interactive 3D Web App Frame */}
              {activeWorkspaceTab === 'app' && (
                <div className="w-full max-w-4xl bg-[#111827]/80 border border-slate-800/80 rounded-3xl p-5 flex flex-col h-[520px] shadow-lg animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 select-none">
                    <span className="text-xs font-black text-white uppercase tracking-wider font-mono text-left">
                      🧪 Live 3D Simulation Frame
                    </span>
                    <span className="text-[8px] font-bold text-slate-500 font-mono uppercase bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                      Three.js / WebGL
                    </span>
                  </div>
                  
                  <div className="flex-1 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 relative">
                    <iframe 
                      srcDoc={activePreview.app_html}
                      className="w-full h-full border-none"
                      title="Threejs App preview"
                      sandbox="allow-scripts"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: Handwritten Notes Sheet */}
              {activeWorkspaceTab === 'image' && (
                <div className="w-full max-w-xl bg-[#111827]/80 border border-slate-800/80 rounded-3xl p-5 flex flex-col h-[520px] shadow-lg animate-fadeIn text-left">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 select-none">
                    <span className="text-xs font-black text-white uppercase tracking-wider font-mono">
                      🖼️ Handwritten Note Sheet
                    </span>
                    <a
                      href={activePreview.image_url || 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=800&q=80'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white text-[10px] font-black rounded-lg border border-slate-700 transition cursor-pointer"
                    >
                      <Download size={11} />
                      <span>Download High-Res JPG</span>
                    </a>
                  </div>
                  
                  {/* Pinterest-style Image Container */}
                  <div className="flex-1 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center p-4 relative group">
                    <img 
                      src={activePreview.image_url || 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=800&q=80'}
                      alt="Handwritten Notes Preview" 
                      className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition duration-300 hover:scale-[1.01]"
                    />
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* ── GLOBAL CONTEXT-AWARE AI COPILOT (Bottom Floating Bar) ── */}
        {activePreview && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 no-print select-none">
            
            {/* Status indicator loader panel */}
            {isCopilotRunning && (
              <div className="mb-2 bg-purple-950/45 border border-purple-500/20 text-purple-300 text-[10px] font-mono font-bold px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <Loader2 size={11} className="animate-spin" />
                <span>{copilotStatusMsg}</span>
              </div>
            )}
            {!isCopilotRunning && copilotStatusMsg && (
              <div className="mb-2 bg-slate-900 border border-slate-800 text-cyan-400 text-[10px] font-mono font-bold px-4 py-2 rounded-xl shadow-lg">
                <span>{copilotStatusMsg}</span>
              </div>
            )}

            {/* Input bar card */}
            <div className="bg-[#0e1626]/95 border border-slate-800 rounded-2xl p-2 shadow-2xl backdrop-blur flex items-center gap-2">
              
              {/* Context Pill Indicator */}
              <div className="px-3 py-2 bg-slate-850 rounded-xl text-[9px] font-black uppercase tracking-wider text-cyan-400 border border-slate-800 shrink-0 font-mono">
                {activeWorkspaceTab === 'script' ? '🎬 Script' : activeWorkspaceTab === 'app' ? '🧪 3D App' : '🖼️ Notes Image'}
              </div>

              {/* Chat Text Input */}
              <input
                type="text"
                value={copilotPrompt}
                onChange={(e) => setCopilotPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCopilotSubmit();
                }}
                disabled={isCopilotRunning}
                placeholder={
                  activeWorkspaceTab === 'script' ? 'Ask Gemini to modify Hinglish tone, pacing, or formatting...' :
                  activeWorkspaceTab === 'app' ? 'Ask Gemini to refine atom colors, camera, speed, shapes...' :
                  'Ask Gemini to modify visual styles or generate new keywords...'
                }
                className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-slate-500 py-2 px-1 font-medium"
              />

              {/* Action Submit */}
              <button
                onClick={handleCopilotSubmit}
                disabled={!copilotPrompt.trim() || isCopilotRunning}
                className="p-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white rounded-xl active:scale-95 transition flex items-center justify-center shrink-0 cursor-pointer"
                title="Ask Copilot"
              >
                <Send size={13} />
              </button>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
