export interface AppConfig {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'ACTIVE' | 'COMING_SOON';
  badge: string;
  componentPath?: string;
}

export const appsConfig: AppConfig[] = [
  {
    id: 'vsepr-explorer',
    title: '3D VSEPR Explorer',
    category: 'Molecular Geometry',
    description: 'Visualize molecular shapes, orbital lone pairs, and steric repulsions in real-time. Snap between ideal configurations and real distorted structures with live NCERT quiz prep.',
    status: 'ACTIVE',
    badge: '🧪 Interactive 3D',
    componentPath: 'vsepr/VseprExplorer',
  },
  {
    id: 'sn1-sn2-simulator',
    title: 'SN1 vs SN2 Mechanism Simulator',
    category: 'Organic Reaction Mechanisms',
    description: 'Compare unimolecular and bimolecular nucleophilic substitution pathways. Watch step-by-step carbocation formation, backside attack, stereochemical inversion, and transition states in 3D.',
    status: 'COMING_SOON',
    badge: 'Releasing Soon',
  },
  {
    id: 'electrochem-nernst',
    title: 'Electrochemistry & Nernst Cell',
    category: 'Physical Chemistry',
    description: 'Assemble galvanic cells and dynamically calculate cell potentials under non-standard conditions. Adjust ion concentrations and temperature to see electron flows and electrode mass changes.',
    status: 'COMING_SOON',
    badge: 'Releasing Soon',
  },
];
