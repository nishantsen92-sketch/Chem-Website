import { useMemo } from 'react';
import * as THREE from 'three';
import { Line, Html } from '@react-three/drei';
import type { PresetMolecule, VisualSettings, Position3D } from '../types';

interface MoleculeMeshProps {
  molecule: PresetMolecule;
  settings: VisualSettings;
}

// Interpolation helper
const interpolatePosition = (
  ideal: Position3D,
  real: Position3D,
  factor: number
): [number, number, number] => {
  return [
    ideal[0] + (real[0] - ideal[0]) * factor,
    ideal[1] + (real[1] - ideal[1]) * factor,
    ideal[2] + (real[2] - ideal[2]) * factor,
  ];
};

// Generates points for a circular arc between two vectors A and B at a given radius
const getArcPoints = (
  posA: [number, number, number],
  posB: [number, number, number],
  radius: number = 0.6,
  segments: number = 20
): { points: [number, number, number][]; center: [number, number, number] } => {
  const vecA = new THREE.Vector3(...posA).normalize();
  const vecB = new THREE.Vector3(...posB).normalize();
  
  const dot = vecA.dot(vecB);
  const angle = Math.acos(Math.max(-1, Math.min(1, dot)));
  
  const points: [number, number, number][] = [];
  
  // Handle collinear (180 deg) case
  if (Math.abs(angle - Math.PI) < 0.01) {
    // Generate a semi-circle in a perpendicular plane (say, XZ if collinear along Y, or XY if collinear along Z)
    // Find an arbitrary perpendicular vector
    let perp = new THREE.Vector3(1, 0, 0);
    if (Math.abs(vecA.x) > 0.9) {
      perp.set(0, 1, 0);
    }
    perp.cross(vecA).normalize();
    
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI;
      const point = vecA.clone().multiplyScalar(Math.cos(theta))
        .add(perp.clone().multiplyScalar(Math.sin(theta)))
        .multiplyScalar(radius);
      points.push([point.x, point.y, point.z]);
    }
    
    // Center label in the middle of the arc
    const midPoint = vecA.clone().multiplyScalar(Math.cos(Math.PI / 2))
      .add(perp.clone().multiplyScalar(Math.sin(Math.PI / 2)))
      .multiplyScalar(radius + 0.15);
    
    return { points, center: [midPoint.x, midPoint.y, midPoint.z] };
  }
  
  // Generate points using spherical linear interpolation (SLERP)
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const sinTheta = Math.sin(angle);
    const weightA = Math.sin((1 - t) * angle) / sinTheta;
    const weightB = Math.sin(t * angle) / sinTheta;
    
    const point = vecA.clone().multiplyScalar(weightA)
      .add(vecB.clone().multiplyScalar(weightB))
      .multiplyScalar(radius);
    
    points.push([point.x, point.y, point.z]);
  }
  
  // Angle label placement (center of the arc slightly offset outwards)
  const midPoint = vecA.clone().multiplyScalar(Math.sin(0.5 * angle) / Math.sin(angle))
    .add(vecB.clone().multiplyScalar(Math.sin(0.5 * angle) / Math.sin(angle)))
    .normalize()
    .multiplyScalar(radius + 0.2);
    
  return { points, center: [midPoint.x, midPoint.y, midPoint.z] };
};

export default function MoleculeMesh({ molecule, settings }: MoleculeMeshProps) {
  const factor = settings.idealToRealSlider;
  
  // 1. Calculate current interpolated positions for ligands
  const currentLigands = useMemo(() => {
    return molecule.ligands.map(l => ({
      ...l,
      pos: interpolatePosition(l.idealPos, l.realPos, factor),
    }));
  }, [molecule.ligands, factor]);

  // 2. Calculate current interpolated positions for lone pairs
  const currentLonePairs = useMemo(() => {
    return molecule.lonePairs.map(lp => ({
      ...lp,
      dir: interpolatePosition(lp.idealVector, lp.realVector, factor),
    }));
  }, [molecule.lonePairs, factor]);

  // 3. Determine which angles to display in 3D to keep layout clean & educational
  const anglePairs = useMemo(() => {
    const pairs: { aIdx: number; bIdx: number; labelText: string }[] = [];
    const count = currentLigands.length;
    const id = molecule.id;
    
    if (count < 2) return pairs;

    if (id === 'co2' || id === 'xef2') {
      // Linear
      pairs.push({ aIdx: 0, bIdx: 1, labelText: factor > 0.5 ? molecule.realAngle : molecule.idealAngle });
    } else if (id === 'so2') {
      // Bent sp2
      pairs.push({ aIdx: 0, bIdx: 1, labelText: factor > 0.5 ? '119.5°' : '120°' });
    } else if (id === 'h2o') {
      // Bent sp3
      pairs.push({ aIdx: 0, bIdx: 1, labelText: factor > 0.5 ? '104.5°' : '109.5°' });
    } else if (id === 'nh3') {
      // Trigonal Pyramidal
      pairs.push({ aIdx: 0, bIdx: 1, labelText: factor > 0.5 ? '107°' : '109.5°' });
      pairs.push({ aIdx: 1, bIdx: 2, labelText: factor > 0.5 ? '107°' : '109.5°' });
    } else if (id === 'ch4') {
      // Tetrahedral
      pairs.push({ aIdx: 0, bIdx: 1, labelText: '109.5°' });
      pairs.push({ aIdx: 2, bIdx: 3, labelText: '109.5°' });
    } else if (id === 'pcl5') {
      // Trigonal Bipyramidal
      pairs.push({ aIdx: 0, bIdx: 2, labelText: '90°' }); // Axial-Equatorial
      pairs.push({ aIdx: 2, bIdx: 3, labelText: '120°' }); // Equatorial-Equatorial
      pairs.push({ aIdx: 0, bIdx: 1, labelText: '180°' }); // Axial-Axial
    } else if (id === 'sf4') {
      // Seesaw
      pairs.push({ aIdx: 0, bIdx: 1, labelText: factor > 0.5 ? '173°' : '180°' }); // Axial-Axial
      pairs.push({ aIdx: 2, bIdx: 3, labelText: factor > 0.5 ? '102°' : '120°' }); // Equatorial-Equatorial
    } else if (id === 'clf3') {
      // T-Shape
      pairs.push({ aIdx: 0, bIdx: 2, labelText: factor > 0.5 ? '87.5°' : '90°' }); // Axial-Equatorial
      pairs.push({ aIdx: 0, bIdx: 1, labelText: factor > 0.5 ? '175°' : '180°' }); // Axial-Axial
    } else if (id === 'sf6') {
      // Octahedral
      pairs.push({ aIdx: 0, bIdx: 2, labelText: '90°' });
      pairs.push({ aIdx: 0, bIdx: 1, labelText: '180°' });
    } else if (id === 'brf5') {
      // Square Pyramidal
      pairs.push({ aIdx: 0, bIdx: 1, labelText: factor > 0.5 ? '84.8°' : '90°' }); // Axial-Equatorial
    } else if (id === 'xef4') {
      // Square Planar
      pairs.push({ aIdx: 0, bIdx: 1, labelText: '90°' });
      pairs.push({ aIdx: 0, bIdx: 2, labelText: '180°' });
    } else if (id === 'if7') {
      // Pentagonal Bipyramidal
      pairs.push({ aIdx: 0, bIdx: 2, labelText: '90°' }); // Axial-Equatorial
      pairs.push({ aIdx: 2, bIdx: 3, labelText: '72°' }); // Equatorial-Equatorial
    } else if (id === 'xef6') {
      // Distorted Octahedral
      pairs.push({ aIdx: 0, bIdx: 2, labelText: factor > 0.5 ? '< 90°' : '90°' });
    }
    
    return pairs;
  }, [currentLigands, molecule.id, factor, molecule.realAngle, molecule.idealAngle]);

  return (
    <group>
      {/* A. Central Atom */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <sphereGeometry args={[molecule.centralAtom.radius, 64, 64]} />
        <meshPhysicalMaterial
          color={molecule.centralAtom.color}
          roughness={0.15}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Central Atom Label */}
      {settings.showLabels && (
        <Html position={[0, molecule.centralAtom.radius + 0.15, 0]} center>
          <div className="px-2 py-0.5 text-xs font-bold text-slate-800 bg-white/95 border border-slate-200 rounded-md select-none pointer-events-none whitespace-nowrap shadow-sm">
            {molecule.centralAtom.element} (Central)
          </div>
        </Html>
      )}

      {/* B. Ligands and Bonds */}
      {currentLigands.map((ligand) => {
        const pos = ligand.pos;
        
        // Calculate rotation quaternion for bond cylinder (which points along Y by default)
        const bondQuaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(...pos).normalize()
        );
        const distance = new THREE.Vector3(...pos).length();
        const midPoint: [number, number, number] = [pos[0] / 2, pos[1] / 2, pos[2] / 2];

        return (
          <group key={ligand.id}>
            {/* 1. Bond Connector (Cylinder) */}
            <mesh position={midPoint} quaternion={bondQuaternion}>
              <cylinderGeometry args={[0.07, 0.07, distance, 16]} />
              <meshStandardMaterial
                color="#cbd5e1" // Slate-300
                roughness={0.4}
                metalness={0.8}
              />
            </mesh>

            {/* 2. Ligand Atom (Sphere) */}
            <mesh castShadow receiveShadow position={pos}>
              <sphereGeometry args={[ligand.radius, 32, 32]} />
              <meshPhysicalMaterial
                color={ligand.color}
                roughness={0.2}
                metalness={0.05}
                clearcoat={0.8}
              />
            </mesh>

            {/* Ligand Label */}
            {settings.showLabels && (
              <Html position={[pos[0], pos[1] + ligand.radius + 0.15, pos[2]]} center>
                <div className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 bg-white/95 border border-slate-200 rounded select-none pointer-events-none whitespace-nowrap shadow-sm">
                  {ligand.element}
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* C. Lone Pairs (Teardrop lobes) */}
      {settings.showLonePairs &&
        currentLonePairs.map((lp) => {
          const dir = lp.dir;
          const distance = new THREE.Vector3(...dir).length();
          
          // Lobe is stretched along Z. Calculate rotation quaternion from Z axis to direction vector
          const lobeQuaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(...dir).normalize()
          );
          
          // Center of the orbital lobe (placed near the end of the vector)
          const lobePos = new THREE.Vector3(...dir).normalize().multiplyScalar(distance * 0.7);

          return (
            <group key={lp.id} position={[lobePos.x, lobePos.y, lobePos.z]} quaternion={lobeQuaternion}>
              {/* Teardrop orbital lobe (represented as a stretched sphere) */}
              <mesh>
                <sphereGeometry args={[0.36, 32, 32]} />
                <meshBasicMaterial
                  color="#22d3ee" // Glowing cyan
                  transparent
                  opacity={0.55}
                  wireframe={false}
                />
              </mesh>
              
              {/* Optional wireframe overlay for scientific orbital appearance */}
              <mesh scale={[1.02, 1.02, 1.02]}>
                <sphereGeometry args={[0.36, 16, 16]} />
                <meshBasicMaterial
                  color="#0891b2" // Darker cyan
                  wireframe
                  transparent
                  opacity={0.2}
                />
              </mesh>

              {/* Lone pair electron dots inside the lobe */}
              <group position={[0, 0, 0.1]}>
                <mesh position={[-0.1, 0, 0]}>
                  <sphereGeometry args={[0.04, 8, 8]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0.1, 0, 0]}>
                  <sphereGeometry args={[0.04, 8, 8]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>

              {/* Lone pair text label */}
              {settings.showLabels && (
                <Html position={[0, 0.45, 0]} center>
                  <div className="px-1 py-0.5 text-[9px] font-medium text-teal-800 bg-teal-50/95 border border-teal-200 rounded select-none pointer-events-none whitespace-nowrap shadow-sm">
                    Lone Pair
                  </div>
                </Html>
              )}
            </group>
          );
        })}

      {/* D. Angle Indicators (3D Arcs + Labels) */}
      {settings.showAngles &&
        anglePairs.map((pair, index) => {
          const posA = currentLigands[pair.aIdx].pos;
          const posB = currentLigands[pair.bIdx].pos;
          
          // Generate curve points for arc
          const { points, center } = getArcPoints(posA, posB, 0.7);

          return (
            <group key={`angle-${index}`}>
              {/* Arc Line */}
              <Line
                points={points}
                color="#94a3b8" // Slate 400
                lineWidth={1.5}
                dashed={false}
              />
              
              {/* Angle Label */}
              <Html position={center} center>
                <div className="px-1.5 py-0.5 text-[10px] font-bold text-amber-800 bg-amber-50/95 border border-amber-300 rounded shadow-sm whitespace-nowrap select-none pointer-events-none">
                  {pair.labelText}
                </div>
              </Html>
            </group>
          );
        })}

      {/* E. Repulsion Vectors */}
      {settings.showRepulsionVectors &&
        molecule.repulsions.map((rep) => {
          const from = rep.fromVector;
          const to = rep.toVector;
          
          const fromVec = new THREE.Vector3(...from);
          const toVec = new THREE.Vector3(...to);
          const direction = toVec.clone().sub(fromVec);
          const length = direction.length();
          direction.normalize();
          
          // Position arrow at the origin of repulsion
          const arrowQuaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction
          );
          
          // Midpoint for label
          const mid = fromVec.clone().add(direction.clone().multiplyScalar(length * 0.5));

          return (
            <group key={rep.id}>
              {/* Force arrow (rendered as glowing neon pink/orange cylinder + cone) */}
              <group position={[from[0], from[1], from[2]]} quaternion={arrowQuaternion}>
                {/* Arrow stem */}
                <mesh position={[0, length / 2, 0]}>
                  <cylinderGeometry args={[0.02, 0.02, length, 8]} />
                  <meshBasicMaterial color="#f43f5e" /> {/* Neon rose */}
                </mesh>
                {/* Arrow cone tip */}
                <mesh position={[0, length, 0]}>
                  <coneGeometry args={[0.07, 0.15, 8]} />
                  <meshBasicMaterial color="#f43f5e" />
                </mesh>
              </group>

              {/* Force tag */}
              <Html position={[mid.x, mid.y + 0.15, mid.z]} center>
                <div className="px-1 py-0.5 text-[8px] font-semibold tracking-wide uppercase text-rose-800 bg-rose-50/95 border border-rose-200 rounded select-none pointer-events-none whitespace-nowrap shadow-sm">
                  Repulsion
                </div>
              </Html>
            </group>
          );
        })}
    </group>
  );
}
