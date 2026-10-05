import type { WatchMaterialTheme, WatchThemeConfig, PartCallout } from '../types/watch';

export const WATCH_THEMES: Record<WatchMaterialTheme, WatchThemeConfig> = {
  oceanDiver: {
    name: 'ORA SWISS ROYAL BLUE',
    tagline: '904L Steel & Royal Ocean Cerachrom',
    metalColor: '#f8fafc',
    roughness: 0.15,
    metalness: 0.92,
    bezelColor: '#1d4ed8', // Vibrant Royal Blue Ceramic
    dialColor: '#1e3a8a',  // Rich Deep Sunburst Ocean Blue Dial
    dialSubColor: '#2563eb',
    accentColor: '#38bdf8',
  },
  stealthBlack: {
    name: 'VELLORA NOCTURNE',
    tagline: '904L Oystersteel & Obsidian Ceramic',
    metalColor: '#e2e8f0',
    roughness: 0.18,
    metalness: 0.95,
    bezelColor: '#18181b', // Pure Ceramic Charcoal Black
    dialColor: '#0f172a',  // Midnight Slate Dial with high contrast white markers
    dialSubColor: '#1e293b',
    accentColor: '#cfab48',
  },
  emeraldMarine: {
    name: 'ORA MARINE EMERALD',
    tagline: '904L Steel & Kermit Emerald Cerachrom',
    metalColor: '#f1f5f9',
    roughness: 0.15,
    metalness: 0.92,
    bezelColor: '#047857', // Vibrant Emerald Ceramic
    dialColor: '#064e3b',  // Rich Sunburst Deep Forest Green Dial
    dialSubColor: '#059669',
    accentColor: '#34d399',
  }
};

export const WATCH_CALLOUTS: PartCallout[] = [
  {
    id: 'bezel',
    name: 'Cerachrom Diver Bezel',
    category: 'SURFACE INSTRUMENTATION',
    spec: 'Unidirectional 60-Min • Coin-Edge Fluting',
    description: 'High-tech ceramic insert with silver-platinum graduations, fitted with 72-click coin-edge fluted steel ring.',
    scrollRange: [0.18, 0.32],
    screenPosition: { x: 74, y: 28 },
  },
  {
    id: 'crystal',
    name: 'Double-Domed Sapphire Crystal',
    category: 'OPTICAL ARCHITECTURE',
    spec: 'Synthetic Corundum • Dual Anti-Reflective',
    description: 'Ultra-clear scratch-resistant synthetic corundum with 7-layer anti-reflective treatment for zero optical distortion.',
    scrollRange: [0.26, 0.40],
    screenPosition: { x: 24, y: 36 },
  },
  {
    id: 'hands',
    name: 'Chromalight Luminous Hands',
    category: 'INDICATORS',
    spec: 'Mercedes Hour Hand • Lollipop Seconds',
    description: 'Diamond-polished 904L steel hands filled with high-intensity blue Chromalight luminescence.',
    scrollRange: [0.34, 0.48],
    screenPosition: { x: 76, y: 46 },
  },
  {
    id: 'dial',
    name: 'Maxi Sunburst Oceanic Dial',
    category: 'HOROLOGICAL FACE',
    spec: 'Applied Chromalight Hour Plots',
    description: 'Deep royal ocean sunburst finish with hand-applied white gold hour surrounds and date aperture at 3 o’clock.',
    scrollRange: [0.42, 0.56],
    screenPosition: { x: 22, y: 56 },
  },
  {
    id: 'movement',
    name: 'Manufacture Calibre 3235',
    category: 'MECHANICAL CALIBRE',
    spec: '31 Jewels • 70-Hour Power Reserve • 4Hz',
    description: 'Chronergy escapement with blue Parachrom hairspring, offering superlative resistance to magnetic fields.',
    scrollRange: [0.50, 0.64],
    screenPosition: { x: 74, y: 64 },
  },
  {
    id: 'caseBack',
    name: '904L Oystersteel Chassis & Bracelet',
    category: 'CASE & ERGONOMICS',
    spec: '300m / 1000ft Water Resistance • Triplock',
    description: 'Corrosion-resistant aerospace superalloy middle case with screw-down caseback and solid 3-link Oyster bracelet.',
    scrollRange: [0.58, 0.72],
    screenPosition: { x: 24, y: 72 },
  }
];
