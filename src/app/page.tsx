'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StudyHubGrid from '../components/StudyHubGrid';
import StudentTrustBanner from '../components/StudentTrustBanner';
import AppModal from '../components/AppModal';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

// Load the 3D VseprExplorer dynamically to disable SSR (essential for WebGL / React Three Fiber canvas)
const VseprExplorer = dynamic(
  () => import('../apps/vsepr/VseprExplorer'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center min-h-[400px] bg-slate-50 border border-slate-200 rounded-2xl select-none">
        <div className="w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
        <span className="text-xs font-bold text-slate-500 mt-3 font-mono">Initializing 3D Lab Engine...</span>
      </div>
    )
  }
);

export default function Home() {
  const [activeApp, setActiveApp] = useState<string | null>(null);

  const handleLaunchApp = (appId: string) => {
    setActiveApp(appId);
  };

  const handleCloseModal = () => {
    setActiveApp(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#fafafa] text-[#18181b]">
      {/* Navigation Top Bar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onLaunchVsepr={() => handleLaunchApp('vsepr-explorer')} />

        {/* Curriculum Alignment Badges Banner */}
        <StudentTrustBanner />

        {/* 3D App Showcase Section */}
        <StudyHubGrid onLaunchVsepr={() => handleLaunchApp('vsepr-explorer')} />

        {/* Contact & Support Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* App Simulation Modal Box */}
      <AppModal
        isOpen={activeApp === 'vsepr-explorer'}
        onClose={handleCloseModal}
        title="3D Molecular Science Sandbox"
      >
        <VseprExplorer />
      </AppModal>
    </div>
  );
}
