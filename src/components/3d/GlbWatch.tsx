import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { WatchPartRefs } from '../../types/watch';

interface GlbWatchProps {
  url: string;
  partRefs: React.MutableRefObject<WatchPartRefs>;
  onLoadSuccess?: () => void;
  onLoadError?: () => void;
}

export const GlbWatch: React.FC<GlbWatchProps> = ({
  url,
  partRefs,
  onLoadSuccess,
}) => {
  const gltf = useGLTF(url);
  const clonedScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useEffect(() => {
    if (!clonedScene) return;

    // Traverse and categorize named nodes into our WatchPartRefs structure
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh || child instanceof THREE.Group) {
        const name = child.name.toLowerCase();

        // Enable shadows and physical properties
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.envMapIntensity = 1.5;
          }
        }

        // Map to part refs based on standard naming conventions
        if (name.includes('glass') || name.includes('crystal') || name.includes('sapphire')) {
          partRefs.current.crystal = child as THREE.Group;
        } else if (name.includes('bezel')) {
          partRefs.current.bezel = child as THREE.Group;
        } else if (name.includes('hand') || name.includes('pointer') || name.includes('needle')) {
          partRefs.current.hands = child as THREE.Group;
        } else if (name.includes('dial') || name.includes('face')) {
          partRefs.current.dial = child as THREE.Group;
        } else if (name.includes('movement') || name.includes('gear') || name.includes('engine') || name.includes('calibre')) {
          partRefs.current.movement = child as THREE.Group;
        } else if (name.includes('back') || name.includes('caseback') || name.includes('case_back')) {
          partRefs.current.caseBack = child as THREE.Group;
        } else if (name.includes('crown') || name.includes('winder')) {
          partRefs.current.crown = child as THREE.Group;
        } else if (name.includes('strap') || name.includes('band') || name.includes('bracelet')) {
          if (name.includes('top') || name.includes('upper') || name.includes('1')) {
            partRefs.current.strapTop = child as THREE.Group;
          } else {
            partRefs.current.strapBottom = child as THREE.Group;
          }
        } else if (name.includes('rotor') || name.includes('weight')) {
          partRefs.current.rotor = child as THREE.Group;
        } else if (name.includes('balance') || name.includes('tourbillon')) {
          partRefs.current.balanceWheel = child as THREE.Group;
        }
      }
    });

    onLoadSuccess?.();
  }, [clonedScene, partRefs, onLoadSuccess]);

  return <primitive object={clonedScene} />;
};

// Note: Preload only when /models/watch.glb is actually present in public/models
