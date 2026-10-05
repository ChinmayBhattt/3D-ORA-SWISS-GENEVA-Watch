import * as THREE from 'three';

export interface WatchPartRefs {
  crystal: THREE.Group | null;
  bezel: THREE.Group | null;
  hands: THREE.Group | null;
  dial: THREE.Group | null;
  movement: THREE.Group | null;
  caseBack: THREE.Group | null;
  crown: THREE.Group | null;
  strapTop: THREE.Group | null;
  strapBottom: THREE.Group | null;
  rotor: THREE.Group | null;
  balanceWheel: THREE.Group | null;
  gearTrain: THREE.Group | null;
}

export type WatchMaterialTheme = 'oceanDiver' | 'stealthBlack' | 'emeraldMarine';

export interface WatchThemeConfig {
  name: string;
  tagline: string;
  metalColor: string;
  roughness: number;
  metalness: number;
  bezelColor: string;
  dialColor: string;
  dialSubColor: string;
  accentColor: string;
}

export interface PartCallout {
  id: string;
  name: string;
  category: string;
  spec: string;
  description: string;
  scrollRange: [number, number];
  screenPosition: { x: number; y: number };
}
