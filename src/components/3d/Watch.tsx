import React from 'react';
import * as THREE from 'three';
import type { WatchPartRefs, WatchThemeConfig } from '../../types/watch';
import { ProceduralWatch } from './ProceduralWatch';

interface WatchProps {
  theme: WatchThemeConfig;
  partRefs: React.MutableRefObject<WatchPartRefs>;
  rootGroupRef: React.RefObject<THREE.Group | null>;
  isReducedMotion?: boolean;
}

export const Watch: React.FC<WatchProps> = ({
  theme,
  partRefs,
  rootGroupRef,
  isReducedMotion = false,
}) => {
  return (
    <group ref={rootGroupRef} position={[0, 0, 0]}>
      <ProceduralWatch
        theme={theme}
        partRefs={partRefs}
        isReducedMotion={isReducedMotion}
      />
    </group>
  );
};
