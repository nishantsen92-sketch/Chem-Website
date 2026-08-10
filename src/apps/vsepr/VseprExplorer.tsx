import { useState, useMemo } from 'react';
import SidebarControls from './components/SidebarControls';
import VSEPRCanvas from './components/VSEPRCanvas';
import InfoPanel from './components/InfoPanel';
import { presets } from './data/presets';
import type { PresetMolecule, VisualSettings } from './types';
import { Maximize2, Minimize2, Eye, EyeOff, Atom as AtomIcon } from 'lucide-react';

export default function VseprExplorer() {
  // Tabs & Navigation State
  const [activeTab, setActiveTab] = useState<'presets' | 'builder'>('presets');

  // Presets Tab State
  const [activeMolecule, setActiveMolecule] = useState<PresetMolecule>(
    presets.find((p) => p.id === 'h2o') || presets[0]
  );

  // Custom Builder Assembly States
  const [builderLigands, setBuilderLigands] = useState<number>(2); // Default to 2
  const [builderLonePairs, setBuilderLonePairs] = useState<number>(2); // Default to 2

  const [settings, setSettings] = useState<VisualSettings>({
    showLonePairs: true,
    showAngles: true,
    showRepulsionVectors: true,
    showLabels: true,
    idealToRealSlider: 0.5, // Start halfway to show distortion dynamics
    autoRotate: true,
    rotationSpeed: 0.8,
  });

  // Fullscreen viewport states
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showLeftFloat, setShowLeftFloat] = useState<boolean>(true);
  const [showRightFloat, setShowRightFloat] = useState<boolean>(true);

  // Dynamically generate the molecule shown in the builder tab
  const builderMolecule = useMemo<PresetMolecule>(() => {
    const bp = builderLigands;
    const lp = builderLonePairs;

    // A. Special Case: Isolated Central Atom (0 Ligands)
    if (bp === 0) {
      return {
        id: 'isolated_atom',
        name: 'Single Central Atom',
        formula: 'A',
        axeNotation: `AX₀E${lp}`,
        stericNumber: lp,
        hybridization: lp === 2 ? 'sp' : lp === 3 ? 'sp²' : lp === 4 ? 'sp³' : 'None',
        molecularShape: 'Isolated Atom',
        electronGeometry: lp > 0 ? 'Lone Pair Cloud' : 'Isolated Atom',
        idealAngle: 'N/A',
        realAngle: 'N/A',
        description: lp > 0 
          ? `A single central atom surrounded by ${lp} lone pair(s) of electrons but zero bonded atoms.` 
          : 'A single, isolated central atom. Add ligand atoms or lone pairs in the left menu to start assembling a molecule!',
        centralAtom: { element: 'A', color: '#3b82f6', radius: 0.5 },
        ligands: [],
        lonePairs: Array.from({ length: lp }).map((_, idx) => {
          // Distribute lone pairs symmetrically in the XY plane
          const angle = (idx / lp) * Math.PI * 2;
          const vector: [number, number, number] = lp === 1
            ? [0, 1.6, 0]
            : [Math.cos(angle) * 1.6, Math.sin(angle) * 1.6, 0];
          return { id: `lp-${idx}`, idealVector: vector, realVector: vector, label: `Lone Pair ${idx + 1}` };
        }),
        repulsions: [],
        examNotes: 'In physical chemistry, a single atom does not possess molecular shape or bond angles, because molecular shapes are defined solely by the relative positions of atomic nuclei.',
        examQuestion: {
          question: 'Why does an isolated atom (AX₀E_y) have no molecular shape?',
          options: [
            'Because lone pairs occupy too much space',
            'Molecular shapes are defined by the positions of bonded atomic nuclei, which requires at least two bonds (three atoms)',
            'Because isolated atoms are always gases',
            'Because isolated atoms do not hybridize'
          ],
          answer: 1,
          explanation: 'A molecular shape is defined by the nuclear coordinates of its constituent atoms. A single atom has no bond directions, so no shape or angles exist.'
        }
      };
    }

    // B. Special Case: Diatomic Molecule (1 Ligand)
    if (bp === 1) {
      return {
        id: `diatomic_lp_${lp}`,
        name: `Diatomic Molecule (AX₁E${lp})`,
        formula: `AXE${lp > 0 ? lp : ''}`,
        axeNotation: `AX₁E${lp}`,
        stericNumber: 1 + lp,
        hybridization: (1 + lp) === 2 ? 'sp' : (1 + lp) === 3 ? 'sp²' : (1 + lp) === 4 ? 'sp³' : 'None',
        molecularShape: 'Linear',
        electronGeometry: 'Linear',
        idealAngle: '180°',
        realAngle: '180°',
        description: `A diatomic molecule consisting of a central atom A bonded to ligand X, with ${lp} lone pair(s). All diatomic molecules are linear by definition because two points in space always form a straight line.`,
        centralAtom: { element: 'A', color: '#3b82f6', radius: 0.5 },
        ligands: [
          { id: 'l1', element: 'X', color: '#10b981', radius: 0.35, idealPos: [0, 0, 1.6], realPos: [0, 0, 1.6], label: 'Ligand X' }
        ],
        lonePairs: Array.from({ length: lp }).map((_, idx) => {
          // Place lone pairs pointing in opposite direction of the ligand (at +z)
          const angle = (idx / Math.max(1, lp)) * Math.PI * 2;
          const vector: [number, number, number] = lp === 1
            ? [0, 0, -1.6]
            : [Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, -1.0];
          return { id: `lp-${idx}`, idealVector: vector, realVector: vector, label: `Lone Pair ${idx + 1}` };
        }),
        repulsions: [],
        examNotes: 'Diatomic molecules like HCl, CO, or HF are always linear. There is no central bond angle because a minimum of three atoms is required to define a bond angle.',
        examQuestion: {
          question: 'What is the bond angle in a diatomic molecule like Hydrogen Fluoride (HF)?',
          options: [
            '90°',
            '180°',
            'No bond angle is defined (requires a minimum of three atoms)',
            '109.5°'
          ],
          answer: 2,
          explanation: 'An angle requires three points (two intersecting lines). A diatomic molecule only has two points (one line segment), so no bond angle is defined.'
        }
      };
    }

    // C. Try to map (bp, lp) to a real-world chemical preset
    const match = presets.find((m) => {
      return m.ligands.length === bp && m.lonePairs.length === lp;
    });

    if (match) {
      return match;
    }

    // D. Fallback Generic Molecule (for any unmapped valid steric configuration)
    return {
      id: 'generic_molecule',
      name: `Generic VSEPR AX${bp}E${lp}`,
      formula: `AX${bp}E${lp}`,
      axeNotation: `AX${bp}E${lp}`,
      stericNumber: bp + lp,
      hybridization: 'sp³d',
      molecularShape: 'Generic Geometry',
      electronGeometry: 'Generic',
      idealAngle: 'N/A',
      realAngle: 'N/A',
      description: `A custom generated VSEPR geometry representing a steric number of ${bp + lp} (containing ${bp} ligands and ${lp} lone pair(s)).`,
      centralAtom: { element: 'A', color: '#6b7280', radius: 0.5 },
      ligands: [],
      lonePairs: [],
      repulsions: [],
      examNotes: 'This is a generic representation of this steric combination. Add or remove domains to snap to a standard chemical preset.',
      examQuestion: {
        question: 'What is the primary factor determining molecular shapes in VSEPR theory?',
        options: [
          'Nuclear size differences',
          'Minimizing repulsion between electron pairs in the valence shell',
          'Electronegativity of ligand elements',
          'Intermolecular forces'
        ],
        answer: 1,
        explanation: 'VSEPR theory states that electron pairs around a central atom arrange themselves to minimize electrostatic repulsion, which determines the final molecular shape.'
      }
    };
  }, [builderLigands, builderLonePairs]);

  // Determine active molecule to feed to canvas and right panel
  const displayedMolecule = activeTab === 'presets' ? activeMolecule : builderMolecule;

  return (
    <div className={`flex flex-col gap-4 w-full h-full text-slate-800 transition-all duration-300 ${
      isFullscreen ? 'fixed inset-0 z-50 bg-[#f8fafc] p-0 overflow-hidden' : ''
    }`}>
      {/* 1. App-Specific Title / Repulsion Legend Header (Standard Mode Only) */}
      {!isFullscreen && (
        <header className="flex flex-col md:flex-row items-stretch md:items-center justify-between border border-slate-200 bg-white p-4 px-6 rounded-2xl gap-4 shadow-sm">
          {/* Title block */}
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 pulse-glow shrink-0">
              <AtomIcon size={24} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-slate-800">
                VSEPR 3D Explorer <span className="text-blue-600 font-semibold text-base md:text-lg">&amp; Distortion Visualizer</span>
              </h1>
              <p className="text-[10px] md:text-xs text-slate-500 font-medium">
                Simulate spatial repulsion, lone-pair orbital domains, and study NCERT board exam preparation trap notes.
              </p>
            </div>
          </div>

          {/* Repulsion Hierarchy Legend Banner */}
          <div className="flex items-center justify-between md:justify-end gap-2.5 bg-slate-50 p-2 px-4 rounded-xl border border-slate-200 shrink-0">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 font-mono">
              Repulsion Hierarchy
            </span>
            <div className="flex items-center gap-1 text-xs font-bold">
              <span className="px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200 text-teal-700 text-[10px] font-mono shadow-sm">
                lp-lp
              </span>
              <span className="text-slate-400 font-mono">&gt;</span>
              <span className="px-1.5 py-0.5 rounded bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-mono shadow-sm">
                lp-bp
              </span>
              <span className="text-slate-400 font-mono">&gt;</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono shadow-sm">
                bp-bp
              </span>
            </div>
          </div>
        </header>
      )}

      {/* 2. Workspace Layout */}
      {isFullscreen ? (
        // A. Immersive Fullscreen Mode inside the app viewport
        <div className="relative w-full h-full overflow-hidden flex-1 bg-[#f8fafc]">
          {/* Full-width 3D Canvas */}
          <div className="absolute inset-0 z-0">
            <VSEPRCanvas molecule={displayedMolecule} settings={settings} />
          </div>

          {/* Floating Control Dock (Top Center) */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 p-1.5 bg-white/95 backdrop-blur border border-slate-250/80 rounded-xl shadow-lg select-none">
            <button
              onClick={() => setShowLeftFloat(!showLeftFloat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                showLeftFloat ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Toggle Left Menu"
            >
              {showLeftFloat ? <EyeOff size={14} /> : <Eye size={14} />}
              Controls Panel
            </button>
            
            <button
              onClick={() => setIsFullscreen(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition flex items-center gap-1.5 text-slate-700 cursor-pointer"
              title="Exit Fullscreen"
            >
              <Minimize2 size={14} />
              Exit Fullscreen
            </button>

            <button
              onClick={() => setShowRightFloat(!showRightFloat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                showRightFloat ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Toggle Right Menu"
            >
              {showRightFloat ? <EyeOff size={14} /> : <Eye size={14} />}
              Specs &amp; Quiz
            </button>
          </div>

          {/* Floating Left Control Panel */}
          {showLeftFloat && (
            <div className="absolute top-4 left-4 z-10 w-80 max-h-[calc(100vh-2rem)] overflow-y-auto flex flex-col shadow-xl rounded-2xl">
              <SidebarControls
                activeMolecule={activeMolecule}
                setActiveMolecule={setActiveMolecule}
                settings={settings}
                setSettings={setSettings}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                builderLigands={builderLigands}
                setBuilderLigands={setBuilderLigands}
                builderLonePairs={builderLonePairs}
                setBuilderLonePairs={setBuilderLonePairs}
              />
            </div>
          )}

          {/* Floating Right Specification & Quiz Panel */}
          {showRightFloat && (
            <div className="absolute top-4 right-4 z-10 w-80 max-h-[calc(100vh-2rem)] overflow-y-auto flex flex-col shadow-xl rounded-2xl">
              <InfoPanel molecule={displayedMolecule} />
            </div>
          )}
        </div>
      ) : (
        // B. Standard Dashboard Grid Layout
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1 min-h-0">
          
          {/* Left Side: Controls & Hybridization Presets */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col h-full min-h-0">
            <SidebarControls
              activeMolecule={activeMolecule}
              setActiveMolecule={setActiveMolecule}
              settings={settings}
              setSettings={setSettings}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              builderLigands={builderLigands}
              setBuilderLigands={setBuilderLigands}
              builderLonePairs={builderLonePairs}
              setBuilderLonePairs={setBuilderLonePairs}
            />
          </div>

          {/* Center: 3D WebGL Canvas with Expand Button */}
          <div className="lg:col-span-8 xl:col-span-5 h-[480px] lg:h-full min-h-[400px] flex flex-col relative group">
            <VSEPRCanvas molecule={displayedMolecule} settings={settings} />
            
            {/* Fullscreen Expand Action Button */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-blue-600 shadow-md backdrop-blur transition-all duration-200 cursor-pointer"
              title="Expand to Fullscreen"
            >
              <Maximize2 size={16} />
            </button>
          </div>

          {/* Right Side: Chemical Specs & Interactive NCERT Quiz */}
          <div className="lg:col-span-12 xl:col-span-4 flex flex-col h-full min-h-0">
            <InfoPanel molecule={displayedMolecule} />
          </div>

        </div>
      )}
    </div>
  );
}
