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

export type WatchMaterialTheme = 
  | 'stealthBlack' 
  | 'oceanDiver' 
  | 'emeraldMarine' 
  | 'pepsiGmt' 
  | 'presidentGold';

export interface WatchThemeConfig {
  id: WatchMaterialTheme;
  name: string;
  subName: string;
  tagline: string;
  refNumber: string;
  price: string;
  metalColor: string;
  roughness: number;
  metalness: number;
  bezelColor: string;
  dialColor: string;
  dialSubColor: string;
  accentColor: string;
  isTwoToneBezel?: boolean;
  bezelSecondaryColor?: string;
  accentBadge: string;
}

export interface PartCallout {
  id: string;
  name: string;
  category: string;
  spec: string;
  description: string;
  scrollRange: [number, number];
  screenPosition: { x: number; y: number };
  blueprintType: 'bezel' | 'crystal' | 'hands' | 'dial' | 'movement' | 'case';
  technicalSpecs: { label: string; value: string }[];
  materialDetail: string;
}
