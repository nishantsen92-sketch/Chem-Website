import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { PresetMolecule, VisualSettings } from '../types';
import MoleculeMesh from './MoleculeMesh';

interface VSEPRCanvasProps {
  molecule: PresetMolecule;
  settings: VisualSettings;
}

// Sub-component to manage automatic rotation of the molecule
function RotatingGroup({
  autoRotate,
  speed,
  children,
}: {
  autoRotate: boolean;
  speed: number;
  children: React.ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (autoRotate && groupRef.current) {
      // Rotate slowly around the Y axis
      groupRef.current.rotation.y += delta * speed * 0.2;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function VSEPRCanvas({ molecule, settings }: VSEPRCanvasProps) {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fafc]">
      {/* 3D Scene Controls Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 select-none pointer-events-none">
        <span className="text-[9px] uppercase tracking-widest font-bold text-blue-600/90">3D Viewport</span>
        <span className="text-sm font-bold text-slate-800">{molecule.name}</span>
        <span className="text-[10px] text-slate-500 font-mono">AXE: {molecule.axeNotation}</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 select-none pointer-events-none bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] text-slate-500 flex items-center gap-2 shadow-sm">
        <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></div>
        Drag to Rotate | Scroll to Zoom
      </div>

      {/* R3F Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        {/* Soft surrounding ambient light */}
        <ambientLight intensity={0.5} />
        
        {/* Key light casting shadows */}
        <directionalLight
          castShadow
          position={[6, 8, 4]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={20}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
        />
        
        {/* Backlight / Fill light for nice metallic reflections */}
        <pointLight position={[-6, 4, -4]} intensity={0.8} color="#c084fc" />
        <pointLight position={[0, -5, 0]} intensity={0.4} color="#06b6d4" />

        {/* Orbit controls to rotate, zoom and pan */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={10}
          makeDefault
        />

        {/* Rotating group containing the molecular structure */}
        <RotatingGroup autoRotate={settings.autoRotate} speed={settings.rotationSpeed}>
          <MoleculeMesh molecule={molecule} settings={settings} />
        </RotatingGroup>

        {/* Optional floor grid helper for context */}
        <gridHelper
          args={[10, 10, '#cbd5e1', '#f1f5f9']}
          position={[0, -2, 0]}
          rotation={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
