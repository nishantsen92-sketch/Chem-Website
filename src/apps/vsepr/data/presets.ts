import type { PresetMolecule } from '../types';

export const presets: PresetMolecule[] = [
  {
    id: 'co2',
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    axeNotation: 'AX₂E₀',
    stericNumber: 2,
    hybridization: 'sp',
    molecularShape: 'Linear',
    electronGeometry: 'Linear',
    idealAngle: '180°',
    realAngle: '180°',
    description: 'A classic sp hybridized linear molecule. Since there are no lone pairs on the central carbon atom, the two C=O double bonds repel each other equally and lie at 180°.',
    centralAtom: { element: 'C', color: '#6b7280', radius: 0.45 },
    ligands: [
      { id: 'l1', element: 'O', color: '#ef4444', radius: 0.38, idealPos: [0, 0, 1.6], realPos: [0, 0, 1.6], label: 'Oxygen 1' },
      { id: 'l2', element: 'O', color: '#ef4444', radius: 0.38, idealPos: [0, 0, -1.6], realPos: [0, 0, -1.6], label: 'Oxygen 2' }
    ],
    lonePairs: [],
    repulsions: [],
    examNotes: 'Due to the absence of lone pairs on the central carbon atom, there is no asymmetric repulsion. The geometry is perfectly linear with a bond angle of 180°. Double bonds are treated as a single electron domain in VSEPR theory.',
    examQuestion: {
      question: 'What is the hybridization of the central Carbon atom in carbon dioxide (CO₂), and the count of lone pairs on it?',
      options: [
        'sp³, 2 lone pairs',
        'sp², 1 lone pair',
        'sp, 0 lone pairs',
        'sp³, 0 lone pairs'
      ],
      answer: 2,
      explanation: 'Carbon in CO₂ forms 2 sigma bonds and has 0 lone pairs, giving a steric number of 2. Thus, it is sp hybridized with 0 lone pairs.'
    }
  },
  {
    id: 'bf3',
    name: 'Boron Trifluoride',
    formula: 'BF₃',
    axeNotation: 'AX₃E₀',
    stericNumber: 3,
    hybridization: 'sp²',
    molecularShape: 'Trigonal Planar',
    electronGeometry: 'Trigonal Planar',
    idealAngle: '120°',
    realAngle: '120°',
    description: 'Boron forms three single bonds with Fluorine. With a steric number of 3 and no lone pairs, the molecule adopts a symmetrical trigonal planar structure in a single plane.',
    centralAtom: { element: 'B', color: '#f59e0b', radius: 0.45 },
    ligands: [
      { id: 'l1', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 1.6, 0], realPos: [0, 1.6, 0], label: 'Fluorine 1' },
      { id: 'l2', element: 'F', color: '#10b981', radius: 0.35, idealPos: [1.386, -0.8, 0], realPos: [1.386, -0.8, 0], label: 'Fluorine 2' },
      { id: 'l3', element: 'F', color: '#10b981', radius: 0.35, idealPos: [-1.386, -0.8, 0], realPos: [-1.386, -0.8, 0], label: 'Fluorine 3' }
    ],
    lonePairs: [],
    repulsions: [],
    examNotes: 'BF₃ is an electron-deficient molecule (hypovalent) with only 6 electrons in Boron\'s valence shell. Symmetrical repulsions keep the angles at exactly 120° in a single plane.',
    examQuestion: {
      question: 'Which of the following molecules has a net dipole moment of zero due to its symmetrical Trigonal Planar shape?',
      options: [
        'NH₃',
        'BF₃',
        'NF₃',
        'SO₂'
      ],
      answer: 1,
      explanation: 'BF₃ is perfectly symmetrical and trigonal planar, so its individual B-F dipole moments cancel out completely, resulting in a net dipole moment of zero.'
    }
  },
  {
    id: 'so2',
    name: 'Sulfur Dioxide',
    formula: 'SO₂',
    axeNotation: 'AX₂E₁',
    stericNumber: 3,
    hybridization: 'sp²',
    molecularShape: 'Bent',
    electronGeometry: 'Trigonal Planar',
    idealAngle: '120°',
    realAngle: '119.5°',
    description: 'Sulfur has one lone pair and two double bonds in its valence shell, adopting a bent shape. The lone pair-bond pair (lp-bp) repulsion compresses the O-S-O angle slightly below the ideal 120°.',
    centralAtom: { element: 'S', color: '#eab308', radius: 0.5 },
    ligands: [
      { id: 'l1', element: 'O', color: '#ef4444', radius: 0.38, idealPos: [1.386, -0.8, 0], realPos: [1.378, -0.812, 0], label: 'Oxygen 1' },
      { id: 'l2', element: 'O', color: '#ef4444', radius: 0.38, idealPos: [-1.386, -0.8, 0], realPos: [-1.378, -0.812, 0], label: 'Oxygen 2' }
    ],
    lonePairs: [
      { id: 'lp1', idealVector: [0, 1.6, 0], realVector: [0, 1.7, 0], label: 'Lone Pair' }
    ],
    repulsions: [
      { id: 'r1', type: 'lp-bp', description: 'Lone Pair repelling Oxygen 1 bond', fromVector: [0, 1.2, 0], toVector: [0.7, -0.4, 0] },
      { id: 'r2', type: 'lp-bp', description: 'Lone Pair repelling Oxygen 2 bond', fromVector: [0, 1.2, 0], toVector: [-0.7, -0.4, 0] }
    ],
    examNotes: 'Even though SO₂ has a steric number of 3 (suggesting 120°), the lone pair on the sulfur atom exerts strong lp-bp repulsion, squeezing the bond angle down to 119.5°.',
    examQuestion: {
      question: 'Why is the bond angle in SO₂ (119.5°) smaller than the ideal 120° angle of sp² hybridization?',
      options: [
        'Lone pair - Lone pair repulsion',
        'Lone pair - Bond pair repulsion',
        'Bond pair - Bond pair repulsion',
        'Electronegativity of Oxygen atoms'
      ],
      answer: 1,
      explanation: 'The lone pair on sulfur exerts greater repulsion on the bonding pairs (lp-bp repulsion) than the bonding pairs exert on each other, compressing the angle.'
    }
  },
  {
    id: 'ch4',
    name: 'Methane',
    formula: 'CH₄',
    axeNotation: 'AX₄E₀',
    stericNumber: 4,
    hybridization: 'sp³',
    molecularShape: 'Tetrahedral',
    electronGeometry: 'Tetrahedral',
    idealAngle: '109.5°',
    realAngle: '109.5°',
    description: 'The prototypical tetrahedral molecule. Carbon shares four valence electrons with four Hydrogen atoms. Due to symmetry, the four identical bond pairs repel each other equally, resulting in perfect 109.47° angles.',
    centralAtom: { element: 'C', color: '#6b7280', radius: 0.45 },
    ligands: [
      { id: 'l1', element: 'H', color: '#ffffff', radius: 0.28, idealPos: [0.924, 0.924, 0.924], realPos: [0.924, 0.924, 0.924], label: 'Hydrogen 1' },
      { id: 'l2', element: 'H', color: '#ffffff', radius: 0.28, idealPos: [-0.924, -0.924, 0.924], realPos: [-0.924, -0.924, 0.924], label: 'Hydrogen 2' },
      { id: 'l3', element: 'H', color: '#ffffff', radius: 0.28, idealPos: [-0.924, 0.924, -0.924], realPos: [-0.924, 0.924, -0.924], label: 'Hydrogen 3' },
      { id: 'l4', element: 'H', color: '#ffffff', radius: 0.28, idealPos: [0.924, -0.924, -0.924], realPos: [0.924, -0.924, -0.924], label: 'Hydrogen 4' }
    ],
    lonePairs: [],
    repulsions: [],
    examNotes: 'All bonds are equivalent, and there are no lone pairs. The geometry is perfectly tetrahedral. The C-H bond length is equal in all directions.',
    examQuestion: {
      question: 'What is the exact ideal tetrahedral bond angle observed in Methane?',
      options: [
        '90°',
        '107°',
        '109° 28\' (or 109.5°)',
        '120°'
      ],
      answer: 2,
      explanation: 'The ideal tetrahedral bond angle is mathematically calculated as arccos(-1/3) which is approximately 109.47° or 109° 28\'.'
    }
  },
  {
    id: 'nh3',
    name: 'Ammonia',
    formula: 'NH₃',
    axeNotation: 'AX₃E₁',
    stericNumber: 4,
    hybridization: 'sp³',
    molecularShape: 'Trigonal Pyramidal',
    electronGeometry: 'Tetrahedral',
    idealAngle: '109.5°',
    realAngle: '107°',
    description: 'Nitrogen has 5 valence electrons. It forms three bonds with Hydrogen, leaving one lone pair. The lone pair is housed in an sp³ hybrid orbital at the apex, repelling the three N-H bonds and compressing the bond angles to 107°.',
    centralAtom: { element: 'N', color: '#3b82f6', radius: 0.45 },
    ligands: [
      { id: 'l1', element: 'H', color: '#ffffff', radius: 0.28, idealPos: [1.508, 0, -0.533], realPos: [1.485, 0, -0.595], label: 'Hydrogen 1' },
      { id: 'l2', element: 'H', color: '#ffffff', radius: 0.28, idealPos: [-0.754, 1.306, -0.533], realPos: [-0.743, 1.286, -0.595], label: 'Hydrogen 2' },
      { id: 'l3', element: 'H', color: '#ffffff', radius: 0.28, idealPos: [-0.754, -1.306, -0.533], realPos: [-0.743, -1.286, -0.595], label: 'Hydrogen 3' }
    ],
    lonePairs: [
      { id: 'lp1', idealVector: [0, 0, 1.6], realVector: [0, 0, 1.7], label: 'Lone Pair' }
    ],
    repulsions: [
      { id: 'r1', type: 'lp-bp', description: 'Lone pair repelling H1 bond', fromVector: [0, 0, 1.1], toVector: [0.75, 0, -0.3] },
      { id: 'r2', type: 'lp-bp', description: 'Lone pair repelling H2 bond', fromVector: [0, 0, 1.1], toVector: [-0.37, 0.64, -0.3] },
      { id: 'r3', type: 'lp-bp', description: 'Lone pair repelling H3 bond', fromVector: [0, 0, 1.1], toVector: [-0.37, -0.64, -0.3] }
    ],
    examNotes: 'In NH₃, the lone pair occupies more space than the bonding pairs. Under the lp-bp > bp-bp repulsion hierarchy, the three N-H bonds are squeezed closer, reducing the angle from 109.5° to 107°.',
    examQuestion: {
      question: 'Which of the following correctly describes the electron geometry and molecular shape of Ammonia (NH₃)?',
      options: [
        'Tetrahedral, Tetrahedral',
        'Trigonal Pyramidal, Tetrahedral',
        'Tetrahedral, Trigonal Pyramidal',
        'Trigonal Planar, Bent'
      ],
      answer: 2,
      explanation: 'Ammonia has a steric number of 4, so its electron domain arrangement (geometry) is tetrahedral, but its molecular shape (atoms only) is trigonal pyramidal.'
    }
  },
  {
    id: 'h2o',
    name: 'Water',
    formula: 'H₂O',
    axeNotation: 'AX₂E₂',
    stericNumber: 4,
    hybridization: 'sp³',
    molecularShape: 'Bent',
    electronGeometry: 'Tetrahedral',
    idealAngle: '109.5°',
    realAngle: '104.5°',
    description: 'Oxygen forms two single bonds with Hydrogen and has two lone pairs. The intense repulsion between the two lone pairs (lp-lp), as well as lone pair-bond pair (lp-bp) repulsions, compress the H-O-H angle significantly to 104.5°.',
    centralAtom: { element: 'O', color: '#ef4444', radius: 0.45 },
    ligands: [
      { id: 'l1', element: 'H', color: '#ffffff', radius: 0.28, idealPos: [1.306, 0, 0.924], realPos: [1.265, 0, 0.979], label: 'Hydrogen 1' },
      { id: 'l2', element: 'H', color: '#ffffff', radius: 0.28, idealPos: [-1.306, 0, 0.924], realPos: [-1.265, 0, 0.979], label: 'Hydrogen 2' }
    ],
    lonePairs: [
      { id: 'lp1', idealVector: [0, 1.306, -0.924], realVector: [0, 1.349, -0.860], label: 'Lone Pair 1' },
      { id: 'lp2', idealVector: [0, -1.306, -0.924], realVector: [0, -1.349, -0.860], label: 'Lone Pair 2' }
    ],
    repulsions: [
      { id: 'r1', type: 'lp-lp', description: 'Intense lone pair - lone pair repulsion', fromVector: [0, 1.0, -0.6], toVector: [0, -1.0, -0.6] },
      { id: 'r2', type: 'lp-bp', description: 'Lone Pair 1 repelling Hydrogen bonds', fromVector: [0, 1.0, -0.6], toVector: [0.6, 0, 0.5] },
      { id: 'r3', type: 'lp-bp', description: 'Lone Pair 2 repelling Hydrogen bonds', fromVector: [0, -1.0, -0.6], toVector: [-0.6, 0, 0.5] }
    ],
    examNotes: 'Water exhibits the maximum angle distortion among simple hydride exceptions because it has TWO lone pairs. According to VSEPR: lp-lp (115°) > lp-bp > bp-bp (104.5°).',
    examQuestion: {
      question: 'Why is the bond angle in Water (104.5°) smaller than that in Ammonia (107°)?',
      options: [
        'Oxygen is less electronegative than Nitrogen',
        'Water has two lone pairs causing strong lp-lp repulsion, whereas Ammonia has only one',
        'Ammonia has stronger hydrogen bonding',
        'Water is linear, not bent'
      ],
      answer: 1,
      explanation: 'Water has two lone pairs on the central oxygen atom. The strong repulsion between these two lone pairs (lp-lp repulsion) squeezes the H-O-H bond pairs even closer together than the single lone pair in ammonia.'
    }
  },
  {
    id: 'pcl5',
    name: 'Phosphorus Pentachloride',
    formula: 'PCl₅',
    axeNotation: 'AX₅E₀',
    stericNumber: 5,
    hybridization: 'sp³d',
    molecularShape: 'Trigonal Bipyramidal',
    electronGeometry: 'Trigonal Bipyramidal',
    idealAngle: '90° / 120°',
    realAngle: '90° / 120°',
    description: 'An sp³d hybridized molecule with two distinct types of bonds. The three equatorial P-Cl bonds lie in a plane at 120° angles, while the two axial P-Cl bonds are collinear at 180°, perpendicular (90°) to the equatorial plane.',
    centralAtom: { element: 'P', color: '#a855f7', radius: 0.52 },
    ligands: [
      { id: 'l1', element: 'Cl', color: '#22c55e', radius: 0.42, idealPos: [0, 0, 2.2], realPos: [0, 0, 2.2], label: 'Chlorine (Axial 1)' },
      { id: 'l2', element: 'Cl', color: '#22c55e', radius: 0.42, idealPos: [0, 0, -2.2], realPos: [0, 0, -2.2], label: 'Chlorine (Axial 2)' },
      { id: 'l3', element: 'Cl', color: '#22c55e', radius: 0.42, idealPos: [2.0, 0, 0], realPos: [2.0, 0, 0], label: 'Chlorine (Equatorial 1)' },
      { id: 'l4', element: 'Cl', color: '#22c55e', radius: 0.42, idealPos: [-1.0, 1.732, 0], realPos: [-1.0, 1.732, 0], label: 'Chlorine (Equatorial 2)' },
      { id: 'l5', element: 'Cl', color: '#22c55e', radius: 0.42, idealPos: [-1.0, -1.732, 0], realPos: [-1.0, -1.732, 0], label: 'Chlorine (Equatorial 3)' }
    ],
    lonePairs: [],
    repulsions: [],
    examNotes: 'Critical Exam Concept: Axial P-Cl bonds (2.19 Å) are LONGER than equatorial P-Cl bonds (2.02 Å) because axial bond pairs experience three 90° repulsions from equatorial bond pairs, whereas equatorial pairs experience only two 90° repulsions. This makes axial bonds weaker and PCl5 highly reactive.',
    examQuestion: {
      question: 'Which of the following statements about PCl₅ is correct?',
      options: [
        'All P-Cl bonds are identical in length',
        'Axial P-Cl bonds are shorter than equatorial ones',
        'Axial P-Cl bonds are longer than equatorial ones because they suffer more repulsion',
        'The molecule has a square planar geometry'
      ],
      answer: 2,
      explanation: 'Axial bonds feel three 90° repulsions from equatorial bonds, which pushes them further away, making them longer (2.19 Å) and weaker than equatorial bonds (2.02 Å).'
    }
  },
  {
    id: 'sf4',
    name: 'Sulfur Tetrafluoride',
    formula: 'SF₄',
    axeNotation: 'AX₄E₁',
    stericNumber: 5,
    hybridization: 'sp³d',
    molecularShape: 'Seesaw',
    electronGeometry: 'Trigonal Bipyramidal',
    idealAngle: '90° / 120° / 180°',
    realAngle: '102° Eq / 173° Ax',
    description: 'An sp³d hybridized exception. According to Bent\'s Rule, the lone pair occupies an equatorial position to minimize 90° repulsions. This equatorial lone pair repels both axial and equatorial bonds, squeezing them to 173° and 102° respectively.',
    centralAtom: { element: 'S', color: '#eab308', radius: 0.5 },
    ligands: [
      { id: 'l1', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 0, 1.8], realPos: [-0.110, 0, 1.797], label: 'Fluorine (Axial 1)' },
      { id: 'l2', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 0, -1.8], realPos: [-0.110, 0, -1.797], label: 'Fluorine (Axial 2)' },
      { id: 'l3', element: 'F', color: '#10b981', radius: 0.35, idealPos: [-0.8, 1.386, 0], realPos: [-1.007, 1.243, 0], label: 'Fluorine (Equatorial 1)' },
      { id: 'l4', element: 'F', color: '#10b981', radius: 0.35, idealPos: [-0.8, -1.386, 0], realPos: [-1.007, -1.243, 0], label: 'Fluorine (Equatorial 2)' }
    ],
    lonePairs: [
      { id: 'lp1', idealVector: [1.7, 0, 0], realVector: [1.7, 0, 0], label: 'Equatorial Lone Pair' }
    ],
    repulsions: [
      { id: 'r1', type: 'lp-bp', description: 'Equatorial lone pair repelling Axial 1', fromVector: [1.2, 0, 0], toVector: [-0.08, 0, 1.2] },
      { id: 'r2', type: 'lp-bp', description: 'Equatorial lone pair repelling Axial 2', fromVector: [1.2, 0, 0], toVector: [-0.08, 0, -1.2] },
      { id: 'r3', type: 'lp-bp', description: 'Equatorial lone pair repelling Equatorial ligands', fromVector: [1.2, 0, 0], toVector: [-0.7, 0.9, 0] }
    ],
    examNotes: 'Bent\'s Rule & Repulsion Trap: In sp³d, the lone pair occupies an equatorial site because it experiences only two 90° repulsions (with axial bonds). If it were axial, it would experience three 90° repulsions (with equatorial bonds). Minimizing 90° repulsions is crucial.',
    examQuestion: {
      question: 'Why does the lone pair in SF₄ prefer an equatorial position over an axial position?',
      options: [
        'Equatorial positions have less space available',
        'An equatorial lone pair experiences only two 90° repulsions, whereas an axial lone pair would experience three 90° repulsions',
        'Axial positions are preferred by electropositive elements only',
        'Equatorial positions contain more s-character'
      ],
      answer: 1,
      explanation: 'In the equatorial position, the lone pair is at 90° to only the two axial bonds. In the axial position, it would be at 90° to all three equatorial bonds. Minimizing 90° repulsions minimizes the energy.'
    }
  },
  {
    id: 'clf3',
    name: 'Chlorine Trifluoride',
    formula: 'ClF₃',
    axeNotation: 'AX₃E₂',
    stericNumber: 5,
    hybridization: 'sp³d',
    molecularShape: 'T-Shape',
    electronGeometry: 'Trigonal Bipyramidal',
    idealAngle: '90° / 180°',
    realAngle: '87.5° Ax-Eq / 175° Ax-Ax',
    description: 'An sp³d system with two lone pairs. Both lone pairs occupy equatorial positions, leaving three Fluorine atoms to form a T-shape. The two lone pairs repel the axial bonds, bending them slightly towards the equatorial Fluorine.',
    centralAtom: { element: 'Cl', color: '#22c55e', radius: 0.5 },
    ligands: [
      { id: 'l1', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 0, 1.8], realPos: [-0.079, 0, 1.798], label: 'Fluorine (Axial 1)' },
      { id: 'l2', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 0, -1.8], realPos: [-0.079, 0, -1.798], label: 'Fluorine (Axial 2)' },
      { id: 'l3', element: 'F', color: '#10b981', radius: 0.35, idealPos: [-1.6, 0, 0], realPos: [-1.6, 0, 0], label: 'Fluorine (Equatorial)' }
    ],
    lonePairs: [
      { id: 'lp1', idealVector: [0.85, 1.472, 0], realVector: [0.581, 1.597, 0], label: 'Equatorial Lone Pair 1' },
      { id: 'lp2', idealVector: [0.85, -1.472, 0], realVector: [0.581, -1.597, 0], label: 'Equatorial Lone Pair 2' }
    ],
    repulsions: [
      { id: 'r1', type: 'lp-lp', description: 'Repulsion between equatorial lone pairs', fromVector: [0.5, 1.0, 0], toVector: [0.5, -1.0, 0] },
      { id: 'r2', type: 'lp-bp', description: 'Lone pairs repelling axial fluorine atoms', fromVector: [0.5, 1.2, 0], toVector: [-0.05, 0, 1.2] }
    ],
    examNotes: 'The axial bond pairs are repelled by the two equatorial lone pairs, causing them to bend away, compressing the F(axial)-Cl-F(equatorial) bond angle to 87.5° (less than 90°).',
    examQuestion: {
      question: 'What is the actual F(axial)-Cl-F(equatorial) bond angle in ClF₃, and what causes this value?',
      options: [
        '90°, perfect trigonal symmetry',
        '87.5°, compressed due to equatorial lone pair repulsions',
        '109.5°, tetrahedral hybridization',
        '120°, planar hexagonal symmetry'
      ],
      answer: 1,
      explanation: 'The two lone pairs occupy the equatorial positions and push the axial bonds towards the equatorial fluorine, compressing the 90° angle to 87.5°.'
    }
  },
  {
    id: 'xef2',
    name: 'Xenon Difluoride',
    formula: 'XeF₂',
    axeNotation: 'AX₂E₃',
    stericNumber: 5,
    hybridization: 'sp³d',
    molecularShape: 'Linear',
    electronGeometry: 'Trigonal Bipyramidal',
    idealAngle: '180°',
    realAngle: '180°',
    description: 'Xenon has 8 valence electrons, forming two single bonds and retaining three lone pairs. Symmetrically, all three lone pairs occupy the equatorial positions at 120° from each other. Their repulsions cancel out, keeping the F-Xe-F angle perfectly linear (180°).',
    centralAtom: { element: 'Xe', color: '#06b6d4', radius: 0.55 },
    ligands: [
      { id: 'l1', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 0, 2.0], realPos: [0, 0, 2.0], label: 'Fluorine 1' },
      { id: 'l2', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 0, -2.0], realPos: [0, 0, -2.0], label: 'Fluorine 2' }
    ],
    lonePairs: [
      { id: 'lp1', idealVector: [1.7, 0, 0], realVector: [1.7, 0, 0], label: 'Equatorial Lone Pair 1' },
      { id: 'lp2', idealVector: [-0.85, 1.472, 0], realVector: [-0.85, 1.472, 0], label: 'Equatorial Lone Pair 2' },
      { id: 'lp3', idealVector: [-0.85, -1.472, 0], realVector: [-0.85, -1.472, 0], label: 'Equatorial Lone Pair 3' }
    ],
    repulsions: [
      { id: 'r1', type: 'lp-lp', description: 'Equally balanced equatorial lone pair repulsions', fromVector: [1.2, 0, 0], toVector: [-0.6, 1.0, 0] }
    ],
    examNotes: 'Highly symmetric linear molecule despite having three lone pairs. The 3 equatorial lone pairs form a planar triangle, and their repulsions cancel out symmetrically, leaving the axial F-Xe-F bond perfectly straight (180°).',
    examQuestion: {
      question: 'Which of the following describes the placement of the three lone pairs in XeF₂?',
      options: [
        'Two axial, one equatorial',
        'Three axial',
        'Three equatorial',
        'Distributed randomly'
      ],
      answer: 2,
      explanation: 'To minimize repulsions, all 3 lone pairs sit in the equatorial plane (separated by 120°), forcing the 2 fluorine atoms into the axial positions.'
    }
  },
  {
    id: 'sf6',
    name: 'Sulfur Hexafluoride',
    formula: 'SF₆',
    axeNotation: 'AX₆E₀',
    stericNumber: 6,
    hybridization: 'sp³d²',
    molecularShape: 'Octahedral',
    electronGeometry: 'Octahedral',
    idealAngle: '90° / 180°',
    realAngle: '90° / 180°',
    description: 'An sp³d² hybridized octahedral molecule. With six identical fluorine ligands and no lone pairs, all bonds are identical and form 90° angles with adjacent bonds and 180° with opposite bonds.',
    centralAtom: { element: 'S', color: '#eab308', radius: 0.5 },
    ligands: [
      { id: 'l1', element: 'F', color: '#10b981', radius: 0.35, idealPos: [1.7, 0, 0], realPos: [1.7, 0, 0], label: 'Fluorine 1' },
      { id: 'l2', element: 'F', color: '#10b981', radius: 0.35, idealPos: [-1.7, 0, 0], realPos: [-1.7, 0, 0], label: 'Fluorine 2' },
      { id: 'l3', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 1.7, 0], realPos: [0, 1.7, 0], label: 'Fluorine 3' },
      { id: 'l4', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, -1.7, 0], realPos: [0, -1.7, 0], label: 'Fluorine 4' },
      { id: 'l5', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 0, 1.7], realPos: [0, 0, 1.7], label: 'Fluorine 5' },
      { id: 'l6', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 0, -1.7], realPos: [0, 0, -1.7], label: 'Fluorine 6' }
    ],
    lonePairs: [],
    repulsions: [],
    examNotes: 'A perfectly symmetrical octahedral molecule. All six S-F bonds are chemically equivalent, and the bond dipole moments cancel out perfectly to give a net dipole moment of zero.',
    examQuestion: {
      question: 'What are the bond angles in a perfect octahedral molecule like SF₆?',
      options: [
        '109.5°',
        '120° and 90°',
        '90° and 180°',
        '90° and 120°'
      ],
      answer: 2,
      explanation: 'In an octahedral geometry, adjacent ligands are at 90° to one another, while opposite ligands are at 180°.'
    }
  },
  {
    id: 'brf5',
    name: 'Bromine Pentafluoride',
    formula: 'BrF₅',
    axeNotation: 'AX₅E₁',
    stericNumber: 6,
    hybridization: 'sp³d²',
    molecularShape: 'Square Pyramidal',
    electronGeometry: 'Octahedral',
    idealAngle: '90° / 180°',
    realAngle: '84.8°',
    description: 'An octahedral system with one lone pair. The lone pair sits in an axial position at the bottom. This lone pair repels the four equatorial bonds, pushing them slightly upwards towards the axial Fluorine atom, compressing the F(axial)-Br-F(eq) angle to 84.8°.',
    centralAtom: { element: 'Br', color: '#f97316', radius: 0.52 },
    ligands: [
      { id: 'l1', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 0, 1.7], realPos: [0, 0, 1.7], label: 'Fluorine (Axial)' },
      { id: 'l2', element: 'F', color: '#10b981', radius: 0.35, idealPos: [1.7, 0, 0], realPos: [1.693, 0, 0.154], label: 'Fluorine (Equatorial 1)' },
      { id: 'l3', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 1.7, 0], realPos: [0, 1.693, 0.154], label: 'Fluorine (Equatorial 2)' },
      { id: 'l4', element: 'F', color: '#10b981', radius: 0.35, idealPos: [-1.7, 0, 0], realPos: [-1.693, 0, 0.154], label: 'Fluorine (Equatorial 3)' },
      { id: 'l5', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, -1.7, 0], realPos: [0, -1.693, 0.154], label: 'Fluorine (Equatorial 4)' }
    ],
    lonePairs: [
      { id: 'lp1', idealVector: [0, 0, -1.7], realVector: [0, 0, -1.7], label: 'Axial Lone Pair' }
    ],
    repulsions: [
      { id: 'r1', type: 'lp-bp', description: 'Axial lone pair repelling all equatorial bonds upwards', fromVector: [0, 0, -1.2], toVector: [1.2, 0, 0.1] }
    ],
    examNotes: 'The lone pair at the bottom exerts strong lp-bp repulsion on the four equatorial fluorine bonds. As a result, they bend upwards from the equatorial plane. The angle between the axial F and the equatorial F atoms becomes 84.8°.',
    examQuestion: {
      question: 'In BrF₅, the equatorial fluorine atoms lie slightly above the bromine atom (tilted towards axial F). Why?',
      options: [
        'Due to sterics with neighboring molecules',
        'The axial lone pair repels the equatorial bond pairs upwards, away from itself',
        'Due to electronegativity of the axial fluorine',
        'Because Br is sp³ hybridized'
      ],
      answer: 1,
      explanation: 'The lone pair resides at the bottom axial position. Its strong lp-bp repulsion pushes the equatorial bonds upwards (away from the lone pair), compressing the angle with the top axial fluorine to 84.8°.'
    }
  },
  {
    id: 'xef4',
    name: 'Xenon Tetrafluoride',
    formula: 'XeF₄',
    axeNotation: 'AX₄E₂',
    stericNumber: 6,
    hybridization: 'sp³d²',
    molecularShape: 'Square Planar',
    electronGeometry: 'Octahedral',
    idealAngle: '90° / 180°',
    realAngle: '90° / 180°',
    description: 'Xenon has 8 valence electrons, forming four bonds and retaining two lone pairs. To minimize repulsions, the two lone pairs occupy trans-axial positions (180° apart) at the poles, forcing the four Fluorine atoms into a flat square planar arrangement in the equatorial plane with perfect 90° angles.',
    centralAtom: { element: 'Xe', color: '#06b6d4', radius: 0.55 },
    ligands: [
      { id: 'l1', element: 'F', color: '#10b981', radius: 0.35, idealPos: [1.8, 0, 0], realPos: [1.8, 0, 0], label: 'Fluorine 1' },
      { id: 'l2', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 1.8, 0], realPos: [0, 1.8, 0], label: 'Fluorine 2' },
      { id: 'l3', element: 'F', color: '#10b981', radius: 0.35, idealPos: [-1.8, 0, 0], realPos: [-1.8, 0, 0], label: 'Fluorine 3' },
      { id: 'l4', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, -1.8, 0], realPos: [0, -1.8, 0], label: 'Fluorine 4' }
    ],
    lonePairs: [
      { id: 'lp1', idealVector: [0, 0, 1.8], realVector: [0, 0, 1.8], label: 'Axial Lone Pair 1' },
      { id: 'lp2', idealVector: [0, 0, -1.8], realVector: [0, 0, -1.8], label: 'Axial Lone Pair 2' }
    ],
    repulsions: [
      { id: 'r1', type: 'lp-lp', description: 'Trans-axial lone pair repulsions cancel out', fromVector: [0, 0, 1.2], toVector: [0, 0, -1.2] }
    ],
    examNotes: 'Exam Note: Despite having two lone pairs, XeF₄ has a net dipole moment of zero. This is because both the polar C-F (or Xe-F) dipoles and the lone pair dipoles lie 180° apart, canceling each other out completely.',
    examQuestion: {
      question: 'Why is the molecular shape of XeF₄ square planar even though its steric number is 6?',
      options: [
        'Because the lone pairs are forced into trans-axial positions (180° apart) to minimize lp-lp repulsion',
        'Because Xe forms double bonds with Fluorine',
        'Due to planar d-orbital hybridization',
        'Xenon is too small to fit more atoms'
      ],
      answer: 0,
      explanation: 'The two lone pairs sit at the axial poles (180° apart). This maximizes their distance and minimizes lp-lp repulsion, leaving the 4 fluorines in a symmetrical square planar equatorial ring.'
    }
  },
  {
    id: 'if7',
    name: 'Iodine Heptafluoride',
    formula: 'IF₇',
    axeNotation: 'AX₇E₀',
    stericNumber: 7,
    hybridization: 'sp³d³',
    molecularShape: 'Pentagonal Bipyramidal',
    electronGeometry: 'Pentagonal Bipyramidal',
    idealAngle: '72° / 90°',
    realAngle: '72° / 90°',
    description: 'An sp³d³ hybridized system. Seven fluorine atoms surround the central Iodine. Five fluorine atoms lie in the equatorial plane (separated by 72° angles), while the remaining two fluorine atoms sit at the axial poles (90° to the plane).',
    centralAtom: { element: 'I', color: '#ec4899', radius: 0.55 },
    ligands: [
      { id: 'l1', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 0, 1.8], realPos: [0, 0, 1.8], label: 'Fluorine (Axial 1)' },
      { id: 'l2', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 0, -1.8], realPos: [0, 0, -1.8], label: 'Fluorine (Axial 2)' },
      { id: 'l3', element: 'F', color: '#10b981', radius: 0.35, idealPos: [1.6, 0, 0], realPos: [1.6, 0, 0], label: 'Fluorine (Equatorial 1)' },
      { id: 'l4', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0.494, 1.522, 0], realPos: [0.494, 1.522, 0], label: 'Fluorine (Equatorial 2)' },
      { id: 'l5', element: 'F', color: '#10b981', radius: 0.35, idealPos: [-1.294, 0.940, 0], realPos: [-1.294, 0.940, 0], label: 'Fluorine (Equatorial 3)' },
      { id: 'l6', element: 'F', color: '#10b981', radius: 0.35, idealPos: [-1.294, -0.940, 0], realPos: [-1.294, -0.940, 0], label: 'Fluorine (Equatorial 4)' },
      { id: 'l7', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0.494, -1.522, 0], realPos: [0.494, -1.522, 0], label: 'Fluorine (Equatorial 5)' }
    ],
    lonePairs: [],
    repulsions: [],
    examNotes: 'IF₇ represents the maximum steric number (7) commonly taught. The equatorial bond angles are 72°, which makes the equatorial atoms relatively crowded compared to the axial ones.',
    examQuestion: {
      question: 'What are the two different bond angles present in a pentagonal bipyramidal molecule like IF₇?',
      options: [
        '90° and 120°',
        '72° and 90°',
        '109.5° and 180°',
        '90° and 180°'
      ],
      answer: 1,
      explanation: 'The equatorial bonds lie at 72° to each other in the pentagon, while the axial bonds are perpendicular (90°) to the equatorial plane.'
    }
  },
  {
    id: 'xef6',
    name: 'Xenon Hexafluoride',
    formula: 'XeF₆',
    axeNotation: 'AX₆E₁',
    stericNumber: 7,
    hybridization: 'sp³d³',
    molecularShape: 'Distorted Octahedral',
    electronGeometry: 'Pentagonal Bipyramidal',
    idealAngle: '90° / 180°',
    realAngle: 'Distorted (Asymmetric)',
    description: 'An sp³d³ hybridized exception with 6 ligands and 1 lone pair. The lone pair is stereochemically active and protrudes out of one of the eight triangular faces of the octahedron. This causes a local distortion, pushing the adjacent Fluorines apart and reducing the symmetry.',
    centralAtom: { element: 'Xe', color: '#06b6d4', radius: 0.55 },
    ligands: [
      { id: 'l1', element: 'F', color: '#10b981', radius: 0.35, idealPos: [1.7, 0, 0], realPos: [1.7, -0.2, -0.2], label: 'Fluorine 1 (Adjacent)' },
      { id: 'l2', element: 'F', color: '#10b981', radius: 0.35, idealPos: [-1.7, 0, 0], realPos: [-1.6, 0.15, 0.15], label: 'Fluorine 2 (Opposite)' },
      { id: 'l3', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 1.7, 0], realPos: [-0.2, 1.7, -0.2], label: 'Fluorine 3 (Adjacent)' },
      { id: 'l4', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, -1.7, 0], realPos: [0.15, -1.6, 0.15], label: 'Fluorine 4 (Opposite)' },
      { id: 'l5', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 0, 1.7], realPos: [-0.2, -0.2, 1.7], label: 'Fluorine 5 (Adjacent)' },
      { id: 'l6', element: 'F', color: '#10b981', radius: 0.35, idealPos: [0, 0, -1.7], realPos: [0.15, 0.15, -1.6], label: 'Fluorine 6 (Opposite)' }
    ],
    lonePairs: [
      { id: 'lp1', idealVector: [0.98, 0.98, 0.98], realVector: [1.08, 1.08, 1.08], label: 'Stereochemical Lone Pair' }
    ],
    repulsions: [
      { id: 'r1', type: 'lp-bp', description: 'Lone pair protruding from triangular face repelling adjacent F atoms', fromVector: [0.7, 0.7, 0.7], toVector: [1.2, 0, 0] }
    ],
    examNotes: 'XeF₆ is a very famous exception. Its gas-phase structure is a distorted octahedron because the lone pair is stereochemically active and occupies a position pointing out of a face of the octahedron. It is often questioned in JEE and NEET exams.',
    examQuestion: {
      question: 'Which of the following describes the molecular shape of Xenon Hexafluoride (XeF₆) in the gas phase?',
      options: [
        'Perfect Octahedral',
        'Distorted Octahedral',
        'Pentagonal Bipyramidal',
        'Square Pyramidal'
      ],
      answer: 1,
      explanation: 'Due to the presence of one stereochemically active lone pair (steric number 7), the octahedral cage of XeF₆ is distorted, resulting in a Distorted Octahedral molecular shape.'
    }
  }
];
