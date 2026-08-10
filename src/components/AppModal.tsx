'use client';

import { X, FlaskConical } from 'lucide-react';
import { useEffect } from 'react';

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function AppModal({ isOpen, onClose, title, children }: AppModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
      ></div>

      {/* Modal Container (Crisp White/Off-White) */}
      <div className="relative w-full h-[95vh] max-w-7xl bg-[#f8fafc] rounded-3xl border border-slate-250 shadow-2xl flex flex-col overflow-hidden z-10 animate-scale-up">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3.5 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <FlaskConical size={14} />
            </div>
            <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-800 border border-transparent hover:border-slate-200 transition cursor-pointer"
            title="Close Application (Esc)"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal App Body Viewport */}
        <div className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50 relative">
          {children}
        </div>

      </div>
    </div>
  );
}
