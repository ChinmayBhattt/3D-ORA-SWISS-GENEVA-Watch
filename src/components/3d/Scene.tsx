import React, { useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import type { WatchPartRefs, WatchThemeConfig } from '../../types/watch';
import { Watch } from './Watch';
import { Particles } from './Particles';

interface SceneProps {
  progress: number;
  theme: WatchThemeConfig;
  partRefs: React.MutableRefObject<WatchPartRefs>;
  rootGroupRef: React.RefObject<THREE.Group | null>;
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  isReducedMotion?: boolean;
}

// 3D Disassembly Animator synced with Scroll
const ExplosionAnimator: React.FC<{
  progress: number;
  partRefs: React.MutableRefObject<WatchPartRefs>;
  rootGroupRef: React.RefObject<THREE.Group | null>;
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  isReducedMotion: boolean;
}> = ({ progress, partRefs, rootGroupRef, cameraRef, isReducedMotion }) => {
  const { camera } = useThree();
  cameraRef.current = camera as THREE.PerspectiveCamera;
  const currentProgress = useRef(progress);

  useFrame((_, delta) => {
    // Smooth spring dampening towards target scroll progress
    currentProgress.current = THREE.MathUtils.damp(
      currentProgress.current,
      progress,
      7,
      delta
    );
    const p = currentProgress.current;

    // Normalized explosion factor (0 = assembled, 1 = fully exploded)
    let explosionFactor = 0;
    if (p < 0.12) {
      explosionFactor = 0;
    } else if (p >= 0.12 && p < 0.72) {
      explosionFactor = (p - 0.12) / 0.60;
    } else if (p >= 0.72 && p < 0.88) {
      explosionFactor = 1 - (p - 0.72) / 0.16;
    } else {
      explosionFactor = 0;
    }
    explosionFactor = Math.max(0, Math.min(1, explosionFactor));

    const t = isReducedMotion ? 0 : explosionFactor;

    // Separate Watch Parts along outward trajectories
    const refs = partRefs.current;

    // 1. Ceramic Diver Bezel (lifts and hovers outward in the air)
    if (refs.bezel) {
      refs.bezel.position.y = THREE.MathUtils.lerp(0.20, 1.6, t);
      refs.bezel.rotation.y = THREE.MathUtils.lerp(0, -0.2, t);
    }

    // 2. Double-domed Sapphire Crystal (lifts above bezel)
    if (refs.crystal) {
      refs.crystal.position.y = THREE.MathUtils.lerp(0.28, 2.35, t);
      refs.crystal.rotation.y = THREE.MathUtils.lerp(0, 0.15, t);
    }

    // 3. Chromalight Hands (lifts up)
    if (refs.hands) {
      refs.hands.position.y = THREE.MathUtils.lerp(0.14, 1.05, t);
      refs.hands.rotation.y = THREE.MathUtils.lerp(0, 0.25, t);
    }

    // 4. Maxi Oceanic Dial (separates)
    if (refs.dial) {
      refs.dial.position.y = THREE.MathUtils.lerp(0.06, 0.5, t);
      refs.dial.rotation.y = THREE.MathUtils.lerp(0, -0.1, t);
    }

    // 5. Calibre 3235 Movement (moves forward/downward)
    if (refs.movement) {
      refs.movement.position.y = THREE.MathUtils.lerp(-0.05, -0.22, t);
      refs.movement.rotation.y = THREE.MathUtils.lerp(0, 0.2, t);
    }

    // 6. Screw-down Case Back (drops downward along -Y)
    if (refs.caseBack) {
      refs.caseBack.position.y = THREE.MathUtils.lerp(-0.16, -1.6, t);
      refs.caseBack.rotation.y = THREE.MathUtils.lerp(0, -0.25, t);
    }

    // 7. Triplock Crown (slides outward along +X)
    if (refs.crown) {
      refs.crown.position.x = THREE.MathUtils.lerp(2.04, 3.25, t);
    }

    // 8. 3-link Oystersteel Bracelet (slides outward along ±Z)
    if (refs.strapTop) {
      refs.strapTop.position.z = THREE.MathUtils.lerp(-2.1, -3.7, t);
    }
    if (refs.strapBottom) {
      refs.strapBottom.position.z = THREE.MathUtils.lerp(2.1, 3.7, t);
    }

    // Watch base orientation: front-facing tilted towards camera
    if (rootGroupRef.current) {
      // In Hero (p < 0.12): position on right side at x=0.75, tilted so dial is directly visible
      // In Explosion (0.12 - 0.72): centered at x=0
      // In CTA (> 0.88): shift to x=-1.2 to give room to spec sheet on the right
      let targetX = 0.75;
      let targetY = -0.15;
      let targetRotX = 1.05; // ~60 degrees pitch towards camera!
      let targetRotY = -0.32;
      let targetRotZ = 0.18;

      if (t > 0) {
        targetX = THREE.MathUtils.lerp(0.75, 0, t);
        targetRotX = THREE.MathUtils.lerp(1.05, 1.18, t);
        targetRotY = THREE.MathUtils.lerp(-0.32, -0.42, t);
      } else if (p >= 0.88) {
        const ctaFactor = Math.min(1, (p - 0.88) / 0.12);
        targetX = THREE.MathUtils.lerp(0.75, -1.2, ctaFactor);
        targetRotX = THREE.MathUtils.lerp(1.05, 0.45, ctaFactor);
        targetRotY = THREE.MathUtils.lerp(-0.32, 0.35, ctaFactor);
      }

      rootGroupRef.current.position.x = targetX;
      rootGroupRef.current.position.y = targetY;
      rootGroupRef.current.rotation.x = targetRotX;
      rootGroupRef.current.rotation.y = targetRotY;
      rootGroupRef.current.rotation.z = targetRotZ;
    }
  });

  return null;
};

export const Scene: React.FC<SceneProps> = ({
  progress,
  theme,
  partRefs,
  rootGroupRef,
  cameraRef,
  isReducedMotion = false,
}) => {
  const controlsRef = useRef<any>(null);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      shadows
      className="w-full h-full cursor-grab active:cursor-grabbing"
    >
      {/* 3D Disassembly/Reassembly Animation synced with scroll */}
      <ExplosionAnimator
        progress={progress}
        partRefs={partRefs}
        rootGroupRef={rootGroupRef}
        cameraRef={cameraRef}
        isReducedMotion={isReducedMotion}
      />

      {/* Luxury Studio Softbox Environment for Metallic Highlights */}
      <Environment background={false}>
        {/* Overhead softbox */}
        <mesh position={[0, 8, 0]} scale={[14, 1, 14]}>
          <boxGeometry />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Cyan/Blue rim light panel */}
        <mesh position={[-7, 2, 0]} scale={[1, 8, 12]}>
          <boxGeometry />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* Warm fill light panel */}
        <mesh position={[7, 2, 0]} scale={[1, 8, 12]}>
          <boxGeometry />
          <meshBasicMaterial color="#fffbeb" />
        </mesh>
        {/* Front reflection panel */}
        <mesh position={[0, -4, 4]} scale={[10, 2, 4]}>
          <boxGeometry />
          <meshBasicMaterial color="#e2e8f0" />
        </mesh>
      </Environment>

      {/* Atmospheric High-Key Lighting Rig ensuring Dial & Steel are brilliantly visible */}
      <ambientLight intensity={1.2} color="#f0f9ff" />

      {/* Direct front spotlight focused on the dial and bezel */}
      <spotLight
        position={[0, 6, 7]}
        angle={0.7}
        penumbra={0.6}
        intensity={3.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Key warm metallic light */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={2.2}
        color="#ffffff"
      />

      {/* Cool Oceanic Blue rim light (creates moody edge sheen like reference image) */}
      <directionalLight
        position={[-6, 4, -4]}
        intensity={2.5}
        color="#0284c7"
      />

      {/* Front fill light */}
      <directionalLight
        position={[0, -2, 6]}
        intensity={1.2}
        color="#bae6fd"
      />

      {/* Underwater Caustic / Floating Light Dust Particles */}
      <Particles count={75} isReducedMotion={isReducedMotion} />

      {/* The 3D Diver Timepiece */}
      <group scale={[0.74, 0.74, 0.74]}>
        <Watch
          theme={theme}
          partRefs={partRefs}
          rootGroupRef={rootGroupRef}
          isReducedMotion={isReducedMotion}
        />
      </group>

      {/* Ground contact shadow */}
      <ContactShadows
        position={[0, -2.1, 0]}
        opacity={0.6}
        scale={9}
        blur={2.4}
        far={4.5}
        color="#020617"
      />

      {/* ALWAYS-ON 3D Orbit Controls:
          User can drag & rotate the watch in 360° at ANY time!
          enableZoom is false so scroll gestures drive page disassembly naturally! */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.8}
        dampingFactor={0.06}
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.9}
      />
    </Canvas>
  );
};
