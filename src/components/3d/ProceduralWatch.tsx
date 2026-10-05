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
      color: '#e5c07b',
      roughness: 0.22,
      metalness: 0.88,
      envMapIntensity: 2.0,
    });

    const rubyJewel = new THREE.MeshStandardMaterial({
      color: '#e11d48',
      roughness: 0.1,
      metalness: 0.2,
      emissive: '#be123c',
      emissiveIntensity: 0.6,
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
    };
  }, [theme, dialTexture, bezelTexture]);

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

  // Continuous mechanical sweep & balance oscillation
  useFrame((state, delta) => {
    if (isReducedMotion) return;

    const t = state.clock.getElapsedTime();

    // 4Hz balance wheel oscillation
    if (balanceWheelRef.current) {
      balanceWheelRef.current.rotation.y = Math.sin(t * 25.13) * 0.75;
    }

    // Dynamic rotor sway
    if (rotorRef.current) {
      rotorRef.current.rotation.y = Math.sin(t * 1.1) * 1.3 + Math.sin(t * 2.5) * 0.3;
    }

    // Classic 10:10 display with continuous mechanical sweep for seconds hand
    // 10:10 positioning:
    // Hour hand at 10 o'clock: angle = +Math.PI / 3 (from 12 o'clock -Z)
    // Minute hand at 2 o'clock (10 min): angle = -Math.PI / 3
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
        {/* Rhodium-plated Mainplate */}
        <mesh material={materials.brushedSteel} receiveShadow castShadow>
          <cylinderGeometry args={[1.66, 1.66, 0.08, 64]} />
        </mesh>

        {/* Bridges & Cocks */}
        <mesh position={[-0.25, 0.045, -0.15]} material={materials.brushedSteel}>
          <boxGeometry args={[1.05, 0.035, 0.5]} />
        </mesh>
        <mesh position={[0.35, 0.045, 0.25]} material={materials.brushedSteel}>
          <cylinderGeometry args={[0.52, 0.52, 0.035, 32]} />
        </mesh>

        {/* Synthetic Ruby Jewels */}
        <mesh position={[-0.35, 0.068, -0.15]} material={materials.rubyJewel}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
        </mesh>
        <mesh position={[0.28, 0.068, 0.18]} material={materials.rubyJewel}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
        </mesh>
        <mesh position={[0, 0.068, 0.65]} material={materials.rubyJewel}>
          <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
        </mesh>

        {/* Glucydur Balance Wheel with Parachrom Hairspring */}
        <group
          ref={(el) => {
            partRefs.current.balanceWheel = el;
            (balanceWheelRef as React.MutableRefObject<THREE.Group | null>).current = el;
          }}
          position={[0, 0.06, 0.65]}
        >
          <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.brassGold}>
            <torusGeometry args={[0.3, 0.022, 12, 36]} />
          </mesh>
          <mesh material={materials.brassGold}>
            <boxGeometry args={[0.58, 0.015, 0.03]} />
          </mesh>
        </group>

        {/* Perpetual Winding Rotor */}
        <group
          ref={(el) => {
            partRefs.current.rotor = el;
            (rotorRef as React.MutableRefObject<THREE.Group | null>).current = el;
          }}
          position={[0, -0.055, 0]}
        >
          <mesh material={materials.polishedSteel}>
            <cylinderGeometry args={[0.22, 0.22, 0.04, 24]} />
          </mesh>
          <mesh position={[0, 0, 0.62]} rotation={[-Math.PI / 2, 0, 0]} material={materials.brushedSteel}>
            <ringGeometry args={[0.82, 1.58, 32, 1, 0, Math.PI]} />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 6. 904L STEEL MIDDLE CASE & CASE BACK (Layer 6)                */}
      {/* ============================================================== */}
      <group
        ref={(el) => {
          partRefs.current.caseBack = el;
        }}
        position={[0, -0.16, 0]}
      >
        <mesh material={materials.brushedSteel} castShadow receiveShadow>
          <cylinderGeometry args={[2.0, 1.95, 0.16, 64]} />
        </mesh>

        <mesh position={[0, -0.06, 0]} material={materials.polishedSteel}>
          <cylinderGeometry args={[1.82, 1.78, 0.08, 64]} />
        </mesh>

        {/* Lugs for bracelet connection */}
        {[-1, 1].map((xSide) =>
          [-1, 1].map((zSide) => (
            <mesh
              key={`${xSide}-${zSide}`}
              position={[xSide * 1.15, 0.02, zSide * 1.85]}
              material={materials.polishedSteel}
            >
              <boxGeometry args={[0.34, 0.26, 0.65]} />
            </mesh>
          ))
        )}

        {/* Crown Guards at 3 o'clock (+X: 1.88) */}
        <group position={[1.88, 0.02, 0]}>
          <mesh position={[0, 0, -0.32]} material={materials.polishedSteel}>
            <boxGeometry args={[0.32, 0.22, 0.28]} />
          </mesh>
          <mesh position={[0, 0, 0.32]} material={materials.polishedSteel}>
            <boxGeometry args={[0.32, 0.22, 0.28]} />
          </mesh>
        </group>
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
