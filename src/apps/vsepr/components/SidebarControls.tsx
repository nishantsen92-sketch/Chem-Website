import type { PresetMolecule, VisualSettings } from '../types';
import { presets } from '../data/presets';
import { Sliders, Eye, RotateCw, Layers, Compass, Plus, Minus } from 'lucide-react';

interface SidebarControlsProps {
  activeMolecule: PresetMolecule;
  setActiveMolecule: (m: PresetMolecule) => void;
  settings: VisualSettings;
  setSettings: React.Dispatch<React.SetStateAction<VisualSettings>>;
  activeTab: 'presets' | 'builder';
  setActiveTab: (tab: 'presets' | 'builder') => void;
  builderLigands: number;
  setBuilderLigands: React.Dispatch<React.SetStateAction<number>>;
  builderLonePairs: number;
  setBuilderLonePairs: React.Dispatch<React.SetStateAction<number>>;
}

export default function SidebarControls({
  activeMolecule,
  setActiveMolecule,
  settings,
  setSettings,
  activeTab,
  setActiveTab,
  builderLigands,
  setBuilderLigands,
  builderLonePairs,
  setBuilderLonePairs,
}: SidebarControlsProps) {
  
  // Group presets by hybridization state for Presets Tab
  const groupedPresets = presets.reduce((acc, current) => {
    const key = current.hybridization;
    if (!acc[key]) acc[key] = [];
    acc[key].push(current);
    return acc;
  }, {} as Record<string, PresetMolecule[]>);

  const toggleSetting = (key: keyof Omit<VisualSettings, 'idealToRealSlider' | 'rotationSpeed'>) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      idealToRealSlider: parseFloat(e.target.value),
    }));
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      rotationSpeed: parseFloat(e.target.value),
    }));
  };

  // Check if current builder coordinates match one of our 15 database presets by length
  const matchedPreset = presets.find((p) => {
    return p.ligands.length === builderLigands && p.lonePairs.length === builderLonePairs;
  });

  // Check if a combination is chemically valid according to our presets + diatomic rules
  const isValidCombination = (bp: number, lp: number): boolean => {
    if (bp === 0 && lp === 0) return true; // isolated central atom
    if (bp === 0 && lp > 0) return false;  // lone pairs cannot exist alone without bonds
    if (bp === 1 && lp <= 3) return true;  // diatomic molecules are linear and valid (0 to 3 lone pairs)
    
    // For bp >= 2, check if it matches one of our presets by length
    return presets.some(
      (m) => m.ligands.length === bp && m.lonePairs.length === lp
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-250/80 p-5 gap-6 overflow-y-auto max-h-[85vh] shadow-sm">
      
      {/* Tabs selector */}
      <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
        <button
          onClick={() => setActiveTab('presets')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'presets'
              ? 'bg-white text-blue-600 border border-slate-200 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers size={14} />
          Presets Database
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'builder'
              ? 'bg-white text-blue-600 border border-slate-200 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass size={14} />
          Custom Builder
        </button>
      </div>

      {/* Tab Content 1: Presets Database */}
      {activeTab === 'presets' && (
        <div className="flex flex-col gap-4">
          <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 flex items-center gap-2">
            <Layers size={14} className="text-blue-600" />
            Select Preset Exceptions
          </h3>
          
          <div className="flex flex-col gap-4 max-h-[35vh] overflow-y-auto pr-1">
            {Object.entries(groupedPresets).map(([hybrid, molecules]) => (
              <div key={hybrid} className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase pl-1">
                  {hybrid} Hybridization
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {molecules.map((mol) => {
                    const isSelected = mol.id === activeMolecule.id;
                    return (
                      <button
                        key={mol.id}
                        onClick={() => {
                          setActiveMolecule(mol);
                          // Sync builder domains so switching tabs starts with this molecule's counts
                          setBuilderLigands(mol.ligands.length);
                          setBuilderLonePairs(mol.lonePairs.length);
                        }}
                        className={`py-2 px-2.5 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/50 border-blue-500/80 text-blue-700 font-bold shadow-sm'
                            : 'bg-slate-50/50 border-slate-200 hover:border-slate-350 hover:bg-slate-100/50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-bold truncate pr-1">{mol.formula}</span>
                          <span className="text-[9px] font-mono text-slate-400">{mol.axeNotation}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 truncate">{mol.molecularShape}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 2: Custom VSEPR Builder */}
      {activeTab === 'builder' && (
        <div className="flex flex-col gap-4">
          <div className="text-[11px] text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed text-left">
            Start with 1 central atom (A). Use the plus/minus buttons to add ligand atoms (X) or lone pairs (E) to assemble your steric configuration.
          </div>

          {/* Ligand Atoms Controller */}
          <div className="flex flex-col gap-2.5 bg-slate-50/50 p-3 rounded-xl border border-slate-200 text-left">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-semibold text-slate-600">Ligand Atoms (Bonds)</span>
              <span className="text-sm font-extrabold text-blue-600 font-mono">{builderLigands}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setBuilderLigands((prev) => Math.max(0, prev - 1))}
                disabled={builderLigands <= 0 || !isValidCombination(builderLigands - 1, builderLonePairs)}
                className="flex-1 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-xs font-bold text-slate-600 hover:text-slate-800 transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Minus size={12} /> Remove
              </button>
              <button
                onClick={() => setBuilderLigands((prev) => prev + 1)}
                disabled={builderLigands + builderLonePairs >= 7 || !isValidCombination(builderLigands + 1, builderLonePairs)}
                className="flex-1 py-1.5 bg-blue-50 border border-blue-200 hover:bg-blue-100/50 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-xs font-bold text-blue-600 hover:text-blue-800 transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus size={12} /> Add Atom
              </button>
            </div>
          </div>

          {/* Lone Pairs Controller */}
          <div className="flex flex-col gap-2.5 bg-slate-50/50 p-3 rounded-xl border border-slate-200 text-left">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-semibold text-slate-600">Lone Pairs (LPs)</span>
              <span className="text-sm font-extrabold text-blue-600 font-mono">{builderLonePairs}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setBuilderLonePairs((prev) => Math.max(0, prev - 1))}
                disabled={builderLonePairs <= 0 || !isValidCombination(builderLigands, builderLonePairs - 1)}
                className="flex-1 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-xs font-bold text-slate-600 hover:text-slate-800 transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Minus size={12} /> Remove
              </button>
              <button
                onClick={() => setBuilderLonePairs((prev) => prev + 1)}
                disabled={builderLigands + builderLonePairs >= 7 || !isValidCombination(builderLigands, builderLonePairs + 1)}
                className="flex-1 py-1.5 bg-blue-50 border border-blue-200 hover:bg-blue-100/50 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-xs font-bold text-blue-600 hover:text-blue-800 transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus size={12} /> Add Lone Pair
              </button>
            </div>
          </div>

          {/* VSEPR Assembly Info Card */}
          <div className="flex flex-col gap-2 p-3 bg-slate-50/50 rounded-xl border border-slate-200 text-left">
            <div className="flex justify-between items-center">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">VSEPR Formula</span>
              <span className="text-[11px] font-bold text-slate-700 font-mono">
                AX{builderLigands}E{builderLonePairs}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Steric Number</span>
              <span className="text-[11px] font-bold text-slate-700 font-mono">
                {builderLigands + builderLonePairs}
              </span>
            </div>

            {matchedPreset ? (
              <div className="mt-2 pt-2 border-t border-slate-200 flex flex-col gap-2">
                <div className="text-[10px] text-slate-500">
                  Matches Chemical Preset:
                  <span className="block font-bold text-blue-600 mt-0.5">
                    {matchedPreset.formula} ({matchedPreset.name})
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveMolecule(matchedPreset);
                    setActiveTab('presets');
                  }}
                  className="w-full py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-[10px] font-extrabold transition flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                >
                  Study Exam Notes &amp; Take Quiz
                </button>
              </div>
            ) : (
              <div className="mt-2 pt-2 border-t border-slate-200 text-[10px] text-amber-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                Generic VSEPR State (Diatomic or Unbound)
              </div>
            )}
          </div>
        </div>
      )}

      {/* Section 2: Geometry Morphing Slider */}
      <div className="flex flex-col gap-3 bg-slate-50/50 p-4 rounded-xl border border-slate-200 text-left">
        <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 flex items-center gap-2">
          <Sliders size={14} className="text-amber-500" />
          Geometry Morphing (Ideal vs Real)
        </h3>
        
        <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
          <span>Ideal (0%)</span>
          <span>Real (100%)</span>
        </div>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={settings.idealToRealSlider}
          onChange={handleSliderChange}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />

        <div className="flex justify-between items-center mt-1">
          <div className="flex gap-1.5 w-full">
            <button
              onClick={() => setSettings(prev => ({ ...prev, idealToRealSlider: 0 }))}
              className={`flex-1 py-1 rounded text-[10px] font-bold border transition cursor-pointer ${
                settings.idealToRealSlider === 0
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
            >
              Snap Ideal
            </button>
            <button
              onClick={() => setSettings(prev => ({ ...prev, idealToRealSlider: 1 }))}
              className={`flex-1 py-1 rounded text-[10px] font-bold border transition cursor-pointer ${
                settings.idealToRealSlider === 1
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
            >
              Snap Real
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Render Settings Toggles */}
      <div className="flex flex-col gap-3 text-left">
        <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 flex items-center gap-2">
          <Eye size={14} className="text-purple-600" />
          Render Settings
        </h3>
        
        <div className="flex flex-col gap-2 bg-slate-50/50 p-3.5 rounded-xl border border-slate-200">
          {/* Lone Pairs Toggle */}
          <label className="flex items-center justify-between cursor-pointer py-1 select-none">
            <span className="text-xs text-slate-600">Show Lone Pair Lobes</span>
            <input
              type="checkbox"
              checked={settings.showLonePairs}
              onChange={() => toggleSetting('showLonePairs')}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-350 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white peer-checked:after:border-transparent"></div>
          </label>

          {/* Angles Toggle */}
          <label className="flex items-center justify-between cursor-pointer py-1 select-none">
            <span className="text-xs text-slate-600">Show Bond Angles</span>
            <input
              type="checkbox"
              checked={settings.showAngles}
              onChange={() => toggleSetting('showAngles')}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-355 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white peer-checked:after:border-transparent"></div>
          </label>

          {/* Repulsions Toggle */}
          <label className="flex items-center justify-between cursor-pointer py-1 select-none">
            <span className="text-xs text-slate-600">Show Repulsion Vectors</span>
            <input
              type="checkbox"
              checked={settings.showRepulsionVectors}
              onChange={() => toggleSetting('showRepulsionVectors')}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-355 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white peer-checked:after:border-transparent"></div>
          </label>

          {/* Labels Toggle */}
          <label className="flex items-center justify-between cursor-pointer py-1 select-none">
            <span className="text-xs text-slate-600">Show Atom/Domain Labels</span>
            <input
              type="checkbox"
              checked={settings.showLabels}
              onChange={() => toggleSetting('showLabels')}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-355 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white peer-checked:after:border-transparent"></div>
          </label>
        </div>
      </div>

      {/* Section 4: Auto-Rotation Controls */}
      <div className="flex flex-col gap-3 text-left">
        <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 flex items-center gap-2">
          <RotateCw size={14} className="text-emerald-600" />
          Camera Rotation
        </h3>
        
        <div className="flex flex-col gap-3 bg-slate-50/50 p-3.5 rounded-xl border border-slate-200">
          <label className="flex items-center justify-between cursor-pointer select-none">
            <span className="text-xs text-slate-600">Enable Auto-Rotation</span>
            <input
              type="checkbox"
              checked={settings.autoRotate}
              onChange={() => toggleSetting('autoRotate')}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-355 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white peer-checked:after:border-transparent"></div>
          </label>

          {settings.autoRotate && (
            <div className="flex flex-col gap-1.5 mt-1 font-mono">
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>Speed</span>
                <span>{settings.rotationSpeed}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={settings.rotationSpeed}
                onChange={handleSpeedChange}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
