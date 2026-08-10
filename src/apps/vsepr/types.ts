export type Position3D = [number, number, number];

export interface Atom {
  id: string;
  element: string;
  color: string;
  radius: number;
  idealPos: Position3D;
  realPos: Position3D;
  label: string;
}

export interface LonePair {
  id: string;
  idealVector: Position3D;
  realVector: Position3D;
  label: string;
}

export interface RepulsionInfo {
  id: string;
  type: 'lp-lp' | 'lp-bp' | 'bp-bp';
  description: string;
  fromVector: Position3D;
  toVector: Position3D;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface PresetMolecule {
  id: string;
  name: string;
  formula: string;
  axeNotation: string;
  stericNumber: number;
  hybridization: string;
  molecularShape: string;
  electronGeometry: string;
  idealAngle: string;
  realAngle: string;
  description: string;
  centralAtom: {
    element: string;
    color: string;
    radius: number;
  };
  ligands: Atom[];
  lonePairs: LonePair[];
  repulsions: RepulsionInfo[];
  examNotes: string;
  examQuestion: QuizQuestion;
}

export interface VisualSettings {
  showLonePairs: boolean;
  showAngles: boolean;
  showRepulsionVectors: boolean;
  showLabels: boolean;
  idealToRealSlider: number;
  autoRotate: boolean;
  rotationSpeed: number;
}
