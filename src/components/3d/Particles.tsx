import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  isReducedMotion?: boolean;
}

export const Particles: React.FC<ParticlesProps> = ({
  count = 90,
  isReducedMotion = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const blueColor = new THREE.Color('#38bdf8');
    const silverColor = new THREE.Color('#e2e8f0');
    const deepBlue = new THREE.Color('#0284c7');

    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 5.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 8;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      const rand = Math.random();
      const c = rand > 0.6 ? blueColor : rand > 0.3 ? silverColor : deepBlue;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || isReducedMotion) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.03;
    pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
