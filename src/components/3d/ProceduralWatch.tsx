import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { WatchPartRefs, WatchThemeConfig } from '../../types/watch';
import { createDialTexture, createBezelTexture } from '../../utils/watchTextures';

interface ProceduralWatchProps {
  theme: WatchThemeConfig;
  partRefs: React.MutableRefObject<WatchPartRefs>;
  isReducedMotion?: boolean;
}

export const ProceduralWatch: React.FC<ProceduralWatchProps> = ({
  theme,
  partRefs,
  isReducedMotion = false,
}) => {
  // Mechanical animation refs
  const balanceWheelRef = useRef<THREE.Group>(null);
  const secondHandRef = useRef<THREE.Group>(null);
  const minuteHandRef = useRef<THREE.Group>(null);
  const hourHandRef = useRef<THREE.Group>(null);
  const rotorRef = useRef<THREE.Group>(null);

  // Procedural dial & bezel textures
  const dialTexture = useMemo(() => createDialTexture(theme), [theme]);
  const bezelTexture = useMemo(() => createBezelTexture(theme), [theme]);

  // High-performance PBR materials
  const materials = useMemo(() => {
    // 904L Oystersteel - Mirror-polished chamfers & bezel ring
    const polishedSteel = new THREE.MeshStandardMaterial({
      color: theme.metalColor || '#f8fafc',
      roughness: 0.1,
      metalness: 0.95,
      envMapIntensity: 2.2,
    });

    // 904L Oystersteel - Satin-brushed case flanks & outer bracelet links
    const brushedSteel = new THREE.MeshStandardMaterial({
      color: theme.metalColor || '#e2e8f0',
      roughness: 0.25,
      metalness: 0.9,
      envMapIntensity: 1.6,
    });

    // Cerachrom Ceramic Bezel Insert (Deep oceanic blue / black / green)
    const ceramicBezel = new THREE.MeshStandardMaterial({
      map: bezelTexture,
      roughness: 0.12,
      metalness: 0.35,
      emissive: theme.bezelColor,
      emissiveIntensity: 0.1,
      envMapIntensity: 2.0,
    });

    // Chromalight Lume (glowing mint-cyan phosphor under blue oceanic atmosphere)
    const lumeMaterial = new THREE.MeshStandardMaterial({
      color: '#e0f7fa',
      roughness: 0.18,
      metalness: 0.1,
      emissive: '#38bdf8',
      emissiveIntensity: 0.9,
    });

    // Deep Sunburst Oceanic Dial
    const dialMaterial = new THREE.MeshStandardMaterial({
      map: dialTexture,
      roughness: 0.22,
      metalness: 0.3,
      emissive: theme.dialColor,
      emissiveIntensity: 0.15,
      envMapIntensity: 1.8,
    });

    // Ultra-clear Sapphire Crystal
    const sapphireCrystal = new THREE.MeshStandardMaterial({
      color: '#e0f2fe',
      roughness: 0.04,
      metalness: 0.1,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    });

    // Brass and Movement parts
    const brassGold = new THREE.MeshStandardMaterial({
      color: '#e5b342',
      roughness: 0.18,
      metalness: 0.88,
      envMapIntensity: 2.2,
    });

    const rubyJewel = new THREE.MeshStandardMaterial({
      color: '#e11d48',
      roughness: 0.05,
      metalness: 0.2,
      emissive: '#be123c',
      emissiveIntensity: 0.8,
    });

    // Paramagnetic Blue Parachrom Hairspring alloy
    const parachromBlue = new THREE.MeshStandardMaterial({
      color: '#0284c7',
      roughness: 0.12,
      metalness: 0.95,
      emissive: '#0369a1',
      emissiveIntensity: 0.4,
      envMapIntensity: 2.5,
    });

    // Blued horological steel screws
    const bluedScrew = new THREE.MeshStandardMaterial({
      color: '#1d4ed8',
      roughness: 0.15,
      metalness: 0.9,
      envMapIntensity: 2.0,
    });

    // Gold chaton collar
    const goldChaton = new THREE.MeshStandardMaterial({
      color: '#f59e0b',
      roughness: 0.15,
      metalness: 0.95,
      envMapIntensity: 2.2,
    });

    // Dark perlage recessed plate
    const perlageRecess = new THREE.MeshStandardMaterial({
      color: '#1e293b',
      roughness: 0.35,
      metalness: 0.85,
      envMapIntensity: 1.5,
    });

    return {
      polishedSteel,
      brushedSteel,
      ceramicBezel,
      lumeMaterial,
      dialMaterial,
      sapphireCrystal,
      brassGold,
      rubyJewel,
      parachromBlue,
      bluedScrew,
      goldChaton,
      perlageRecess,
    };
  }, [theme, dialTexture, bezelTexture]);

  // Gear animation refs
  const escapeWheelRef = useRef<THREE.Group>(null);
  const fourthWheelRef = useRef<THREE.Group>(null);
  const thirdWheelRef = useRef<THREE.Group>(null);
  const centerWheelRef = useRef<THREE.Group>(null);

  // Procedural Hour Plots: Maxi Dial (Round Dots, Batons at 3,6,9, and 12-o'clock Triangle)
  // Coordinates: 12 o'clock is -Z, 3 o'clock is +X, 6 o'clock is +Z, 9 o'clock is -X
  const hourPlots = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      // theta: 0 is 12 o'clock (-Z), increasing clockwise
      const theta = (i * Math.PI) / 6;
      const x = Math.sin(theta) * 1.34;
      const z = -Math.cos(theta) * 1.34;

      if (i === 0) {
        return { type: 'triangle', key: i, angle: theta, x, z };
      } else if (i === 3) {
        return { type: 'date', key: i, angle: theta, x, z };
      } else if (i === 6 || i === 9) {
        return { type: 'baton', key: i, angle: theta, x, z };
      } else {
        return { type: 'circle', key: i, angle: theta, x, z };
      }
    });
  }, []);

  // Coin-edge fluting teeth around the bezel outer rim (~64 serrations)
  const coinEdgeTeeth = useMemo(() => {
    const teethCount = 64;
    return Array.from({ length: teethCount }, (_, i) => {
      const angle = (i * 2 * Math.PI) / teethCount;
      return {
        key: i,
        angle,
        x: Math.sin(angle) * 1.94,
        z: Math.cos(angle) * 1.94,
      };
    });
  }, []);

  // Mainspring Barrel Ratchet Wheel teeth (36 fine teeth)
  const ratchetTeeth = useMemo(() => {
    const count = 36;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i * 2 * Math.PI) / count;
      return {
        key: i,
        angle,
        x: Math.sin(angle) * 0.38,
        z: Math.cos(angle) * 0.38,
      };
    });
  }, []);

  // Center Grand Wheel teeth (32 teeth)
  const centerWheelTeeth = useMemo(() => {
    const count = 32;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i * 2 * Math.PI) / count;
      return {
        key: i,
        angle,
        x: Math.sin(angle) * 0.34,
        z: Math.cos(angle) * 0.34,
      };
    });
  }, []);

  // Third Wheel teeth (24 teeth)
  const thirdWheelTeeth = useMemo(() => {
    const count = 24;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i * 2 * Math.PI) / count;
      return {
        key: i,
        angle,
        x: Math.sin(angle) * 0.24,
        z: Math.cos(angle) * 0.24,
      };
    });
  }, []);

  // Chronergy Escape Wheel star teeth (15 teeth)
  const escapeWheelTeeth = useMemo(() => {
    const count = 15;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i * 2 * Math.PI) / count;
      return {
        key: i,
        angle,
        x: Math.sin(angle) * 0.18,
        z: Math.cos(angle) * 0.18,
      };
    });
  }, []);

  // Case Back Rolex coin-edge fluting teeth (60 teeth)
  const caseBackTeeth = useMemo(() => {
    const count = 60;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i * 2 * Math.PI) / count;
      return {
        key: i,
        angle,
        x: Math.sin(angle) * 1.76,
        z: Math.cos(angle) * 1.76,
      };
    });
  }, []);

  // Continuous mechanical sweep, balance oscillation & gear train rotation
  useFrame((state, delta) => {
    if (isReducedMotion) return;

    const t = state.clock.getElapsedTime();

    // 4Hz (28,800 vph) Glucydur balance wheel oscillation
    if (balanceWheelRef.current) {
      balanceWheelRef.current.rotation.y = Math.sin(t * 25.13) * 0.75;
    }

    // Dynamic rotor sway with natural pendulum inertia
    if (rotorRef.current) {
      rotorRef.current.rotation.y = Math.sin(t * 1.1) * 1.3 + Math.sin(t * 2.5) * 0.3;
    }

    // Gear train kinematics in action
    if (escapeWheelRef.current) {
      escapeWheelRef.current.rotation.y = Math.floor(t * 8) * (Math.PI / 15);
    }
    if (fourthWheelRef.current) {
      fourthWheelRef.current.rotation.y -= delta * 0.8;
    }
    if (thirdWheelRef.current) {
      thirdWheelRef.current.rotation.y += delta * 0.18;
    }
    if (centerWheelRef.current) {
      centerWheelRef.current.rotation.y -= (delta / 60) * (Math.PI / 30);
    }

    // Classic 10:10 display with continuous mechanical sweep for seconds hand
    if (hourHandRef.current) {
      hourHandRef.current.rotation.y = (Math.PI / 3.1) - (t / 720) * (Math.PI / 30);
    }

    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.y = -(Math.PI / 3.05) - (t / 60) * (Math.PI / 30);
    }

    if (secondHandRef.current) {
      secondHandRef.current.rotation.y -= delta * 0.8;
    }
  });

  // Planar UV geometries for dial plate and hollow bezel ring
  const dialGeometry = useMemo(() => {
    const geom = new THREE.CircleGeometry(1.68, 64);
    const pos = geom.attributes.position;
    const uvs = geom.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      uvs.setXY(i, (x / 1.68 + 1) / 2, (y / 1.68 + 1) / 2);
    }
    uvs.needsUpdate = true;
    return geom;
  }, []);

  const bezelRingGeometry = useMemo(() => {
    const geom = new THREE.RingGeometry(1.68, 1.93, 64);
    const pos = geom.attributes.position;
    const uvs = geom.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      uvs.setXY(i, (x / 1.93 + 1) / 2, (y / 1.93 + 1) / 2);
    }
    uvs.needsUpdate = true;
    return geom;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================== */}
      {/* 1. SAPPHIRE CRYSTAL GROUP (Layer 1 - uppermost)               */}
      {/* ============================================================== */}
      <group
        ref={(el) => {
          partRefs.current.crystal = el;
        }}
        position={[0, 0.28, 0]}
      >
        {/* Crystal dome disc */}
        <mesh material={materials.sapphireCrystal} renderOrder={2}>
          <cylinderGeometry args={[1.72, 1.74, 0.04, 64]} />
        </mesh>
        {/* Cyclops date magnifier bubble at 3 o'clock (+X: 1.25) */}
        <mesh position={[1.25, 0.03, 0]} material={materials.sapphireCrystal} renderOrder={2}>
          <boxGeometry args={[0.32, 0.03, 0.26]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 2. DIVER BEZEL WITH COIN-EDGE SERRATIONS (Layer 2 - HOLLOW)    */}
      {/* ============================================================== */}
      <group
        ref={(el) => {
          partRefs.current.bezel = el;
        }}
        position={[0, 0.20, 0]}
      >
        {/* Steel bezel outer rim collar (open-ended cylinder) */}
        <mesh material={materials.polishedSteel} castShadow receiveShadow>
          <cylinderGeometry args={[1.94, 1.96, 0.11, 64, 1, true]} />
        </mesh>

        {/* Steel bezel inner seat (open-ended cylinder) */}
        <mesh material={materials.polishedSteel}>
          <cylinderGeometry args={[1.68, 1.68, 0.11, 64, 1, true]} />
        </mesh>

        {/* Coin-edge fluting teeth around bezel perimeter */}
        {coinEdgeTeeth.map((tooth) => (
          <mesh
            key={tooth.key}
            position={[tooth.x, 0, tooth.z]}
            rotation={[0, tooth.angle, 0]}
            material={materials.polishedSteel}
          >
            <boxGeometry args={[0.038, 0.1, 0.05]} />
          </mesh>
        ))}

        {/* Cerachrom Ceramic Bezel Insert Ring (Hollow in center, perfectly frames dial!) */}
        <mesh position={[0, 0.056, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.ceramicBezel} geometry={bezelRingGeometry} />

        {/* Inner stainless steel flange ring */}
        <mesh position={[0, 0.062, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.polishedSteel}>
          <ringGeometry args={[1.67, 1.70, 64]} />
        </mesh>

        {/* Luminous Pearl / Pip at 12 o'clock (-Z: 1.8) */}
        <group position={[0, 0.075, -1.8]}>
          <mesh material={materials.polishedSteel}>
            <cylinderGeometry args={[0.065, 0.065, 0.025, 16]} />
          </mesh>
          <mesh position={[0, 0.015, 0]} material={materials.lumeMaterial}>
            <sphereGeometry args={[0.048, 12, 12]} />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 3. CHROMALIGHT HANDS (Layer 3)                                 */}
      {/* ============================================================== */}
      <group
        ref={(el) => {
          partRefs.current.hands = el;
        }}
        position={[0, 0.14, 0]}
      >
        {/* Center arbor pinion */}
        <mesh position={[0, 0.03, 0]} material={materials.polishedSteel}>
          <cylinderGeometry args={[0.09, 0.11, 0.09, 24]} />
        </mesh>

        {/* Mercedes Hour Hand (Pointing initially towards -Z 12 o'clock, rotated by useFrame to 10:10) */}
        <group ref={hourHandRef} position={[0, 0.022, 0]}>
          <mesh position={[0, 0, -0.32]} material={materials.polishedSteel}>
            <boxGeometry args={[0.075, 0.018, 0.64]} />
          </mesh>
          {/* Mercedes Circle with 3-spoke divider */}
          <group position={[0, 0, -0.65]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.polishedSteel}>
              <torusGeometry args={[0.13, 0.024, 12, 24]} />
            </mesh>
            <mesh material={materials.polishedSteel}>
              <boxGeometry args={[0.02, 0.018, 0.22]} />
            </mesh>
            <mesh rotation={[0, Math.PI / 3, 0]} material={materials.polishedSteel}>
              <boxGeometry args={[0.02, 0.018, 0.22]} />
            </mesh>
            <mesh material={materials.lumeMaterial}>
              <cylinderGeometry args={[0.11, 0.11, 0.014, 16]} />
            </mesh>
          </group>
          {/* Hour hand tip pointer */}
          <mesh position={[0, 0, -0.82]} rotation={[-Math.PI / 2, 0, 0]} material={materials.polishedSteel}>
            <coneGeometry args={[0.065, 0.14, 4]} />
          </mesh>
        </group>

        {/* Bold Sword Minute Hand (Pointing towards -Z 12 o'clock, rotated by useFrame to 10:10) */}
        <group ref={minuteHandRef} position={[0, 0.038, 0]}>
          <mesh position={[0, 0, -0.6]} material={materials.polishedSteel}>
            <boxGeometry args={[0.075, 0.018, 1.2]} />
          </mesh>
          {/* Inlaid luminous strip */}
          <mesh position={[0, 0.005, -0.58]} material={materials.lumeMaterial}>
            <boxGeometry args={[0.045, 0.014, 1.0]} />
          </mesh>
          {/* Minute hand arrow tip */}
          <mesh position={[0, 0, -1.25]} rotation={[-Math.PI / 2, 0, 0]} material={materials.polishedSteel}>
            <coneGeometry args={[0.07, 0.15, 4]} />
          </mesh>
        </group>

        {/* Slender Lollipop Seconds Hand */}
        <group ref={secondHandRef} position={[0, 0.054, 0]}>
          {/* Main needle */}
          <mesh position={[0, 0, -0.68]} material={materials.polishedSteel}>
            <boxGeometry args={[0.018, 0.014, 1.5]} />
          </mesh>
          {/* Luminous circular lollipop dot */}
          <group position={[0, 0, -1.1]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.polishedSteel}>
              <torusGeometry args={[0.07, 0.014, 12, 24]} />
            </mesh>
            <mesh material={materials.lumeMaterial}>
              <cylinderGeometry args={[0.06, 0.06, 0.012, 16]} />
            </mesh>
          </group>
          {/* Counterweight tail */}
          <mesh position={[0, 0, 0.28]} material={materials.polishedSteel}>
            <boxGeometry args={[0.035, 0.016, 0.4]} />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 4. MAXI OCEANIC SUNBURST DIAL (Layer 4)                         */}
      {/* ============================================================== */}
      <group
        ref={(el) => {
          partRefs.current.dial = el;
        }}
        position={[0, 0.06, 0]}
      >
        {/* Main Sunburst Dial Plate with ORA SWISS branding texture */}
        <mesh position={[0, 0.021, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.dialMaterial} geometry={dialGeometry} receiveShadow />
        <mesh position={[0, 0, 0]} material={materials.polishedSteel}>
          <cylinderGeometry args={[1.68, 1.68, 0.04, 64]} />
        </mesh>

        {/* Polished Stainless Steel Inner Rehaut Flange */}
        <mesh position={[0, 0.035, 0]} material={materials.polishedSteel}>
          <cylinderGeometry args={[1.7, 1.68, 0.065, 64, 1, true]} />
        </mesh>

        {/* Applied 3D Chromalight Maxi Hour Plots with 18k white gold surrounds */}
        {hourPlots.map((plot) => {
          if (plot.type === 'triangle') {
            return (
              <group key={plot.key} position={[plot.x, 0.024, plot.z]} rotation={[0, plot.angle, 0]}>
                {/* 12 o'clock Inverted Triangle with chrome frame & glowing lume */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.polishedSteel}>
                  <coneGeometry args={[0.13, 0.24, 3]} />
                </mesh>
                <mesh position={[0, 0.007, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.lumeMaterial}>
                  <coneGeometry args={[0.095, 0.19, 3]} />
                </mesh>
              </group>
            );
          } else if (plot.type === 'baton') {
            return (
              <group key={plot.key} position={[plot.x, 0.024, plot.z]} rotation={[0, plot.angle, 0]}>
                <mesh material={materials.polishedSteel}>
                  <boxGeometry args={[0.12, 0.016, 0.28]} />
                </mesh>
                <mesh position={[0, 0.007, 0]} material={materials.lumeMaterial}>
                  <boxGeometry args={[0.08, 0.012, 0.24]} />
                </mesh>
              </group>
            );
          } else if (plot.type === 'date') {
            // 3 o'clock Date Window frame
            return (
              <group key={plot.key} position={[plot.x, 0.024, plot.z]}>
                <mesh material={materials.polishedSteel}>
                  <boxGeometry args={[0.32, 0.016, 0.26]} />
                </mesh>
              </group>
            );
          } else {
            // Round Maxi Lume Dots with chrome surround
            return (
              <group key={plot.key} position={[plot.x, 0.024, plot.z]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.polishedSteel}>
                  <torusGeometry args={[0.1, 0.022, 12, 24]} />
                </mesh>
                <mesh material={materials.lumeMaterial}>
                  <cylinderGeometry args={[0.088, 0.088, 0.015, 16]} />
                </mesh>
              </group>
            );
          }
        })}
      </group>

      {/* ============================================================== */}
      {/* 5. CALIBRE 3235 AUTOMATIC MOVEMENT (Layer 5)                   */}
      {/* ============================================================== */}
      <group
        ref={(el) => {
          partRefs.current.movement = el;
        }}
        position={[0, -0.05, 0]}
      >
        {/* Rhodium-Plated Stepped Mainplate */}
        <mesh material={materials.brushedSteel} receiveShadow castShadow>
          <cylinderGeometry args={[1.68, 1.68, 0.08, 64]} />
        </mesh>
        {/* Polished Mainplate outer bevel ring */}
        <mesh position={[0, 0.041, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.polishedSteel}>
          <ringGeometry args={[1.62, 1.68, 64]} />
        </mesh>

        {/* Recessed Perlage Wells (Machined circular graining cavities) */}
        {/* Barrel well (top-left) */}
        <mesh position={[-0.45, 0.042, -0.45]} material={materials.perlageRecess}>
          <cylinderGeometry args={[0.48, 0.48, 0.01, 32]} />
        </mesh>
        {/* Gear train well (center-right) */}
        <mesh position={[0.18, 0.042, 0.02]} material={materials.perlageRecess}>
          <cylinderGeometry args={[0.66, 0.66, 0.01, 32]} />
        </mesh>
        {/* Balance wheel well (bottom-center) */}
        <mesh position={[0, 0.042, 0.65]} material={materials.perlageRecess}>
          <cylinderGeometry args={[0.42, 0.42, 0.01, 32]} />
        </mesh>

        {/* Perimeter Watchmaker Casing Clamps (3 clamps securing movement to case) */}
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => (
          <group key={idx} position={[Math.sin(angle) * 1.62, 0.046, Math.cos(angle) * 1.62]} rotation={[0, angle, 0]}>
            <mesh material={materials.polishedSteel}>
              <boxGeometry args={[0.12, 0.018, 0.08]} />
            </mesh>
            <mesh position={[0, 0.012, 0]} material={materials.bluedScrew}>
              <cylinderGeometry args={[0.032, 0.032, 0.012, 12]} />
            </mesh>
          </group>
        ))}

        {/* ------------------------------------------------------------ */}
        {/* A. MAINSPRING BARREL & RATCHET ASSEMBLY (Top-Left)           */}
        {/* ------------------------------------------------------------ */}
        <group position={[-0.45, 0.052, -0.45]}>
          {/* Mainspring Barrel Drum (stores 70 hours autonomy) */}
          <mesh material={materials.brassGold}>
            <cylinderGeometry args={[0.42, 0.42, 0.038, 36]} />
          </mesh>
          {/* Sunburst Ratchet Wheel Disc */}
          <mesh position={[0, 0.022, 0]} material={materials.brassGold}>
            <cylinderGeometry args={[0.39, 0.39, 0.014, 36]} />
          </mesh>
          {/* Perimeter 36 Teeth for Ratchet Wheel */}
          {ratchetTeeth.map((tooth) => (
            <mesh
              key={tooth.key}
              position={[tooth.x, 0.022, tooth.z]}
              rotation={[0, tooth.angle, 0]}
              material={materials.brassGold}
            >
              <boxGeometry args={[0.024, 0.014, 0.04]} />
            </mesh>
          ))}
          {/* Central Arbor Pinion with Blued Screws */}
          <mesh position={[0, 0.032, 0]} material={materials.polishedSteel}>
            <cylinderGeometry args={[0.12, 0.12, 0.016, 20]} />
          </mesh>
          <mesh position={[0, 0.042, 0]} material={materials.bluedScrew}>
            <cylinderGeometry args={[0.05, 0.05, 0.012, 12]} />
          </mesh>

          {/* Interlocking Crown Wheel */}
          <group position={[0.34, 0, -0.26]}>
            <mesh material={materials.polishedSteel}>
              <cylinderGeometry args={[0.22, 0.22, 0.028, 24]} />
            </mesh>
            <mesh position={[0, 0.016, 0]} material={materials.bluedScrew}>
              <cylinderGeometry args={[0.05, 0.05, 0.012, 12]} />
            </mesh>
          </group>
          {/* Click Spring Detent (maintains mainspring tension) */}
          <mesh position={[-0.24, 0.024, 0.28]} rotation={[0, 0.4, 0]} material={materials.polishedSteel}>
            <boxGeometry args={[0.22, 0.014, 0.04]} />
          </mesh>
        </group>

        {/* ------------------------------------------------------------ */}
        {/* B. HIGH-PRECISION GOLDEN GEAR TRAIN CLUSTER                  */}
        {/* ------------------------------------------------------------ */}
        {/* 1. Center Wheel (Grand Wheel at movement center) */}
        <group ref={centerWheelRef} position={[0, 0.054, 0]}>
          <mesh material={materials.brassGold}>
            <cylinderGeometry args={[0.35, 0.35, 0.016, 32]} />
          </mesh>
          {/* 5 Openwork Spoke Cutouts */}
          {Array.from({ length: 5 }, (_, i) => {
            const a = (i * 2 * Math.PI) / 5;
            return (
              <mesh key={i} position={[Math.sin(a) * 0.2, 0, Math.cos(a) * 0.2]} rotation={[0, a, 0]} material={materials.brassGold}>
                <boxGeometry args={[0.035, 0.018, 0.24]} />
              </mesh>
            );
          })}
          {/* Center Wheel 32 Teeth */}
          {centerWheelTeeth.map((tooth) => (
            <mesh
              key={tooth.key}
              position={[tooth.x, 0, tooth.z]}
              rotation={[0, tooth.angle, 0]}
              material={materials.brassGold}
            >
              <boxGeometry args={[0.02, 0.016, 0.03]} />
            </mesh>
          ))}
          {/* Steel Arbor Cannon Pinion */}
          <mesh position={[0, 0.02, 0]} material={materials.polishedSteel}>
            <cylinderGeometry args={[0.08, 0.08, 0.035, 16]} />
          </mesh>
        </group>

        {/* 2. Third Wheel */}
        <group ref={thirdWheelRef} position={[0.38, 0.058, -0.18]}>
          <mesh material={materials.brassGold}>
            <cylinderGeometry args={[0.25, 0.25, 0.015, 24]} />
          </mesh>
          {thirdWheelTeeth.map((tooth) => (
            <mesh
              key={tooth.key}
              position={[tooth.x, 0, tooth.z]}
              rotation={[0, tooth.angle, 0]}
              material={materials.brassGold}
            >
              <boxGeometry args={[0.018, 0.015, 0.028]} />
            </mesh>
          ))}
          {/* Steel Pinion */}
          <mesh position={[0, 0.015, 0]} material={materials.polishedSteel}>
            <cylinderGeometry args={[0.06, 0.06, 0.024, 12]} />
          </mesh>
        </group>

        {/* 3. Fourth Wheel (Drives continuous sweep seconds) */}
        <group ref={fourthWheelRef} position={[0.22, 0.064, 0.22]}>
          <mesh material={materials.brassGold}>
            <cylinderGeometry args={[0.22, 0.22, 0.014, 24]} />
          </mesh>
          {Array.from({ length: 20 }, (_, i) => {
            const a = (i * 2 * Math.PI) / 20;
            return (
              <mesh
                key={i}
                position={[Math.sin(a) * 0.22, 0, Math.cos(a) * 0.22]}
                rotation={[0, a, 0]}
                material={materials.brassGold}
              >
                <boxGeometry args={[0.018, 0.014, 0.024]} />
              </mesh>
            );
          })}
          {/* Ruby Jewel Pivot in Gold Chaton */}
          <mesh position={[0, 0.015, 0]} material={materials.goldChaton}>
            <cylinderGeometry args={[0.065, 0.065, 0.014, 16]} />
          </mesh>
          <mesh position={[0, 0.018, 0]} material={materials.rubyJewel}>
            <cylinderGeometry args={[0.045, 0.045, 0.014, 16]} />
          </mesh>
        </group>

        {/* 4. Chronergy High-Efficiency Escape Wheel */}
        <group ref={escapeWheelRef} position={[-0.26, 0.066, 0.35]}>
          <mesh material={materials.brassGold}>
            <cylinderGeometry args={[0.18, 0.18, 0.012, 16]} />
          </mesh>
          {escapeWheelTeeth.map((tooth) => (
            <mesh
              key={tooth.key}
              position={[tooth.x, 0, tooth.z]}
              rotation={[0, tooth.angle + 0.35, 0]}
              material={materials.brassGold}
            >
              <boxGeometry args={[0.016, 0.012, 0.038]} />
            </mesh>
          ))}
          {/* Escape pinion */}
          <mesh position={[0, 0.012, 0]} material={materials.polishedSteel}>
            <cylinderGeometry args={[0.04, 0.04, 0.018, 12]} />
          </mesh>
        </group>

        {/* 5. Swiss Pallet Fork Anchor Escapement */}
        <group position={[-0.12, 0.068, 0.48]}>
          <mesh material={materials.polishedSteel}>
            <boxGeometry args={[0.14, 0.016, 0.035]} />
          </mesh>
          {/* Synthetic Ruby Pallet Stones (Interacting with escape wheel) */}
          <mesh position={[-0.06, 0.005, -0.04]} material={materials.rubyJewel}>
            <boxGeometry args={[0.03, 0.02, 0.045]} />
          </mesh>
          <mesh position={[0.06, 0.005, -0.04]} material={materials.rubyJewel}>
            <boxGeometry args={[0.03, 0.02, 0.045]} />
          </mesh>
        </group>

        {/* ------------------------------------------------------------ */}
        {/* C. GLUCYDUR BALANCE WHEEL & BLUE PARACHROM HAIRSPRING (4Hz)  */}
        {/* ------------------------------------------------------------ */}
        <group
          ref={(el) => {
            partRefs.current.balanceWheel = el;
            (balanceWheelRef as React.MutableRefObject<THREE.Group | null>).current = el;
          }}
          position={[0, 0.072, 0.65]}
        >
          {/* Outer Glucydur 18k Yellow Gold Balance Rim */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.brassGold}>
            <torusGeometry args={[0.33, 0.024, 12, 48]} />
          </mesh>

          {/* 4 Microstella adjustment nuts for precision regulation */}
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
            <mesh
              key={idx}
              position={[Math.sin(angle) * 0.33, 0, Math.cos(angle) * 0.33]}
              rotation={[0, angle, 0]}
              material={materials.brassGold}
            >
              <boxGeometry args={[0.03, 0.022, 0.04]} />
            </mesh>
          ))}

          {/* 4-spoke Balance Crossbar */}
          <mesh material={materials.brassGold}>
            <boxGeometry args={[0.64, 0.014, 0.025]} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]} material={materials.brassGold}>
            <boxGeometry args={[0.64, 0.014, 0.025]} />
          </mesh>

          {/* Paramagnetic Blue Parachrom Hairspring Coils (Concentric spirals) */}
          {[0.08, 0.13, 0.18, 0.23].map((rad, idx) => (
            <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]} material={materials.parachromBlue}>
              <torusGeometry args={[rad, 0.007, 8, 36]} />
            </mesh>
          ))}

          {/* Center Collet Hub */}
          <mesh material={materials.polishedSteel}>
            <cylinderGeometry args={[0.05, 0.05, 0.028, 16]} />
          </mesh>
        </group>

        {/* Traversing Balance Bridge (Spanning over the balance wheel) */}
        <group position={[0, 0.108, 0.65]}>
          <mesh material={materials.brushedSteel}>
            <boxGeometry args={[0.68, 0.022, 0.22]} />
          </mesh>
          {/* Bevelled chamfers on balance bridge */}
          <mesh position={[-0.34, -0.018, 0]} material={materials.polishedSteel}>
            <boxGeometry args={[0.08, 0.038, 0.2]} />
          </mesh>
          <mesh position={[0.34, -0.018, 0]} material={materials.polishedSteel}>
            <boxGeometry args={[0.08, 0.038, 0.2]} />
          </mesh>
          {/* Two heat-blued bridge screws */}
          <mesh position={[-0.26, 0.016, 0]} material={materials.bluedScrew}>
            <cylinderGeometry args={[0.036, 0.036, 0.014, 12]} />
          </mesh>
          <mesh position={[0.26, 0.016, 0]} material={materials.bluedScrew}>
            <cylinderGeometry args={[0.036, 0.036, 0.014, 12]} />
          </mesh>
          {/* Paraflex Shock Absorber: Gold Chaton + Red Ruby Cap Jewel */}
          <mesh position={[0, 0.015, 0]} material={materials.goldChaton}>
            <cylinderGeometry args={[0.08, 0.08, 0.014, 20]} />
          </mesh>
          <mesh position={[0, 0.022, 0]} material={materials.rubyJewel}>
            <cylinderGeometry args={[0.055, 0.055, 0.014, 16]} />
          </mesh>
        </group>

        {/* ------------------------------------------------------------ */}
        {/* D. RHODIUM BRIDGES (Côtes de Genève) & RUBY BEARINGS         */}
        {/* ------------------------------------------------------------ */}
        {/* Barrel Bridge (covering top half) */}
        <group position={[-0.25, 0.084, -0.25]}>
          <mesh material={materials.brushedSteel}>
            <boxGeometry args={[0.95, 0.022, 0.58]} />
          </mesh>
          <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.polishedSteel}>
            <ringGeometry args={[0.35, 0.44, 32, 1, 0, Math.PI]} />
          </mesh>
          {/* Screws holding barrel bridge */}
          <mesh position={[-0.38, 0.014, 0.18]} material={materials.bluedScrew}>
            <cylinderGeometry args={[0.034, 0.034, 0.012, 12]} />
          </mesh>
          <mesh position={[0.38, 0.014, -0.18]} material={materials.bluedScrew}>
            <cylinderGeometry args={[0.034, 0.034, 0.012, 12]} />
          </mesh>
          {/* Ruby Jewel in Gold Chaton */}
          <mesh position={[0.15, 0.014, -0.05]} material={materials.goldChaton}>
            <cylinderGeometry args={[0.065, 0.065, 0.012, 16]} />
          </mesh>
          <mesh position={[0.15, 0.018, -0.05]} material={materials.rubyJewel}>
            <cylinderGeometry args={[0.045, 0.045, 0.012, 16]} />
          </mesh>
        </group>

        {/* Gear Train Bridge (covering center-right) */}
        <group position={[0.36, 0.084, 0.08]}>
          <mesh material={materials.brushedSteel}>
            <cylinderGeometry args={[0.48, 0.48, 0.022, 32]} />
          </mesh>
          {/* Two Ruby Jewels in Gold Chatons */}
          <mesh position={[-0.12, 0.014, -0.16]} material={materials.goldChaton}>
            <cylinderGeometry args={[0.06, 0.06, 0.012, 16]} />
          </mesh>
          <mesh position={[-0.12, 0.018, -0.16]} material={materials.rubyJewel}>
            <cylinderGeometry args={[0.04, 0.04, 0.012, 16]} />
          </mesh>
          <mesh position={[0.14, 0.014, 0.14]} material={materials.goldChaton}>
            <cylinderGeometry args={[0.06, 0.06, 0.012, 16]} />
          </mesh>
          <mesh position={[0.14, 0.018, 0.14]} material={materials.rubyJewel}>
            <cylinderGeometry args={[0.04, 0.04, 0.012, 16]} />
          </mesh>
          <mesh position={[0.18, 0.014, -0.18]} material={materials.bluedScrew}>
            <cylinderGeometry args={[0.034, 0.034, 0.012, 12]} />
          </mesh>
        </group>

        {/* ------------------------------------------------------------ */}
        {/* E. WINDING STEM & KEYLESS MECHANISM (leading to crown)       */}
        {/* ------------------------------------------------------------ */}
        <group position={[1.42, 0.025, 0]}>
          {/* Steel Winding Stem Shaft */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.polishedSteel}>
            <cylinderGeometry args={[0.035, 0.035, 0.55, 16]} />
          </mesh>
          {/* Sliding Pinion Gear */}
          <mesh position={[-0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.polishedSteel}>
            <cylinderGeometry args={[0.08, 0.08, 0.07, 16]} />
          </mesh>
          {/* Winding Pinion Gear */}
          <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.brassGold}>
            <cylinderGeometry args={[0.07, 0.07, 0.05, 16]} />
          </mesh>
        </group>

        {/* ------------------------------------------------------------ */}
        {/* F. PERPETUAL WINDING ROTOR (Oscillating weight on underside)  */}
        {/* ------------------------------------------------------------ */}
        <group
          ref={(el) => {
            partRefs.current.rotor = el;
            (rotorRef as React.MutableRefObject<THREE.Group | null>).current = el;
          }}
          position={[0, -0.058, 0]}
        >
          {/* Central Ball Bearing Hub */}
          <mesh material={materials.polishedSteel}>
            <cylinderGeometry args={[0.26, 0.26, 0.038, 24]} />
          </mesh>
          {/* Miniature ball bearings ring */}
          {Array.from({ length: 7 }, (_, i) => {
            const a = (i * 2 * Math.PI) / 7;
            return (
              <mesh key={i} position={[Math.sin(a) * 0.16, 0.015, Math.cos(a) * 0.16]} material={materials.polishedSteel}>
                <sphereGeometry args={[0.028, 12, 12]} />
              </mesh>
            );
          })}
          {/* Half-Moon Oscillating Weight with Skeleton Windows */}
          <mesh position={[0, 0, 0.64]} rotation={[-Math.PI / 2, 0, 0]} material={materials.brushedSteel}>
            <ringGeometry args={[0.78, 1.58, 36, 1, 0, Math.PI]} />
          </mesh>
          {/* Outer Heavy 18k Gold Mass Rim */}
          <mesh position={[0, 0, 0.64]} rotation={[-Math.PI / 2, 0, 0]} material={materials.brassGold}>
            <ringGeometry args={[1.50, 1.64, 36, 1, 0, Math.PI]} />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 6. 904L OYSTERSTEEL SCULPTED MIDDLE CASE (Layer 6)             */}
      {/* ============================================================== */}
      <group
        ref={(el) => {
          partRefs.current.caseMiddle = el;
        }}
        position={[0, -0.14, 0]}
      >
        {/* Hollow Movement Well - Recessed inner cavity where movement sits */}
        <mesh material={materials.polishedSteel}>
          <cylinderGeometry args={[1.72, 1.72, 0.18, 64, 1, true]} />
        </mesh>
        <mesh position={[0, -0.08, 0]} material={materials.brushedSteel}>
          <cylinderGeometry args={[1.72, 1.72, 0.02, 64]} />
        </mesh>

        {/* Outer Sculpted Barrel with Satin-Brushed Flanks */}
        <mesh material={materials.brushedSteel} castShadow receiveShadow>
          <cylinderGeometry args={[2.02, 2.02, 0.18, 64]} />
        </mesh>

        {/* Polished Mirror Bevels along top and bottom perimeter */}
        <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.polishedSteel}>
          <torusGeometry args={[2.0, 0.025, 12, 64]} />
        </mesh>
        <mesh position={[0, -0.09, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.polishedSteel}>
          <torusGeometry args={[2.0, 0.025, 12, 64]} />
        </mesh>

        {/* 4 Sculpted Ergonomic 904L Lugs (Tapered, satin top, polished mirror flanks) */}
        {[-1, 1].map((xSide) =>
          [-1, 1].map((zSide) => (
            <group key={`${xSide}-${zSide}`} position={[xSide * 1.18, 0, zSide * 1.86]}>
              {/* Main Lug Body */}
              <mesh material={materials.polishedSteel} castShadow>
                <boxGeometry args={[0.34, 0.22, 0.62]} />
              </mesh>
              {/* Satin-Brushed Top Facet */}
              <mesh position={[0, 0.112, 0]} material={materials.brushedSteel}>
                <boxGeometry args={[0.32, 0.005, 0.6]} />
              </mesh>
              {/* Spring-bar Lug Hole on inner face */}
              <mesh position={[-xSide * 0.165, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.perlageRecess}>
                <cylinderGeometry args={[0.035, 0.035, 0.02, 12]} />
              </mesh>
            </group>
          ))
        )}

        {/* Sculpted Triplock Crown Guards at 3 o'clock (+X: 1.90) */}
        <group position={[1.90, 0.01, 0]}>
          <mesh position={[0, 0, -0.32]} material={materials.polishedSteel}>
            <boxGeometry args={[0.32, 0.20, 0.26]} />
          </mesh>
          <mesh position={[0, 0, 0.32]} material={materials.polishedSteel}>
            <boxGeometry args={[0.32, 0.20, 0.26]} />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 7. SCREW-DOWN FLUTED CASE BACK (Layer 7 - drops down below)    */}
      {/* ============================================================== */}
      <group
        ref={(el) => {
          partRefs.current.caseBack = el;
        }}
        position={[0, -0.24, 0]}
      >
        {/* Raised Central Satin-Brushed Dome */}
        <mesh material={materials.brushedSteel} castShadow receiveShadow>
          <cylinderGeometry args={[1.82, 1.76, 0.08, 64]} />
        </mesh>
        <mesh position={[0, -0.045, 0]} material={materials.brushedSteel}>
          <cylinderGeometry args={[1.62, 1.62, 0.04, 64]} />
        </mesh>

        {/* Polished Caseback Screw Rim */}
        <mesh position={[0, 0.02, 0]} material={materials.polishedSteel}>
          <cylinderGeometry args={[1.88, 1.84, 0.04, 64]} />
        </mesh>

        {/* Rolex-Style 60 Triangular Serration Fluting Teeth */}
        {caseBackTeeth.map((tooth) => (
          <mesh
            key={tooth.key}
            position={[tooth.x, 0.02, tooth.z]}
            rotation={[0, tooth.angle, 0]}
            material={materials.polishedSteel}
          >
            <boxGeometry args={[0.028, 0.04, 0.035]} />
          </mesh>
        ))}

        {/* Circular horological engraving ring on case back */}
        <mesh position={[0, -0.066, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.polishedSteel}>
          <ringGeometry args={[1.1, 1.45, 48]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 7. TRIPLOCK SCREW-DOWN CROWN (Layer 7)                         */}
      {/* ============================================================== */}
      <group
        ref={(el) => {
          partRefs.current.crown = el;
        }}
        position={[2.04, 0.02, 0]}
      >
        <mesh position={[-0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.brushedSteel}>
          <cylinderGeometry args={[0.075, 0.075, 0.32, 16]} />
        </mesh>
        <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.polishedSteel}>
          <cylinderGeometry args={[0.28, 0.26, 0.22, 32]} />
        </mesh>
        {/* Crown knurl ridges */}
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i * 2 * Math.PI) / 16;
          return (
            <mesh
              key={i}
              position={[0.12, Math.sin(a) * 0.27, Math.cos(a) * 0.27]}
              material={materials.polishedSteel}
            >
              <boxGeometry args={[0.2, 0.025, 0.018]} />
            </mesh>
          );
        })}
        <mesh position={[0.24, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.polishedSteel}>
          <cylinderGeometry args={[0.25, 0.25, 0.03, 24]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 8. 3-LINK SOLID OYSTERSTEEL BRACELET                           */}
      {/* ============================================================== */}
      {/* Top Bracelet Section (-Z) */}
      <group
        ref={(el) => {
          partRefs.current.strapTop = el;
        }}
        position={[0, -0.04, -2.1]}
      >
        {Array.from({ length: 7 }, (_, i) => {
          const zOffset = -i * 0.38;
          const curveY = -Math.pow(i * 0.14, 1.8) * 0.4;
          const rotX = -i * 0.06;
          return (
            <group key={i} position={[0, curveY, zOffset]} rotation={[rotX, 0, 0]}>
              <mesh position={[-0.6, 0, 0]} material={materials.brushedSteel}>
                <boxGeometry args={[0.42, 0.12, 0.35]} />
              </mesh>
              <mesh position={[0.6, 0, 0]} material={materials.brushedSteel}>
                <boxGeometry args={[0.42, 0.12, 0.35]} />
              </mesh>
              <mesh position={[0, 0.01, 0]} material={materials.polishedSteel}>
                <boxGeometry args={[0.68, 0.13, 0.35]} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Bottom Bracelet Section (+Z) */}
      <group
        ref={(el) => {
          partRefs.current.strapBottom = el;
        }}
        position={[0, -0.04, 2.1]}
      >
        {Array.from({ length: 7 }, (_, i) => {
          const zOffset = i * 0.38;
          const curveY = -Math.pow(i * 0.14, 1.8) * 0.4;
          const rotX = i * 0.06;
          return (
            <group key={i} position={[0, curveY, zOffset]} rotation={[rotX, 0, 0]}>
              <mesh position={[-0.6, 0, 0]} material={materials.brushedSteel}>
                <boxGeometry args={[0.42, 0.12, 0.35]} />
              </mesh>
              <mesh position={[0.6, 0, 0]} material={materials.brushedSteel}>
                <boxGeometry args={[0.42, 0.12, 0.35]} />
              </mesh>
              <mesh position={[0, 0.01, 0]} material={materials.polishedSteel}>
                <boxGeometry args={[0.68, 0.13, 0.35]} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};
