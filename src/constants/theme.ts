import type { WatchMaterialTheme, WatchThemeConfig, PartCallout } from '../types/watch';

export const WATCH_THEMES: Record<WatchMaterialTheme, WatchThemeConfig> = {
  stealthBlack: {
    id: 'stealthBlack',
    name: 'SUBMARINER ONYX',
    subName: 'NOCTURNE BLACK',
    tagline: '904L Oystersteel & Obsidian Cerachrom',
    refNumber: 'Ref. 126610LN',
    price: '$14,300',
    metalColor: '#f1f5f9',
    roughness: 0.14,
    metalness: 0.94,
    bezelColor: '#111827', // Jet Black Ceramic
    dialColor: '#0a0f1d',  // Deep Midnight Black Dial
    dialSubColor: '#1e293b',
    accentColor: '#38bdf8', // Luminous Cyan Chromalight
    accentBadge: 'CLASSIC DIVER',
  },
  oceanDiver: {
    id: 'oceanDiver',
    name: 'SUBMARINER ROYAL BLUE',
    subName: 'OCEANIC SUNBURST',
    tagline: '18k White Gold & Royal Cerachrom',
    refNumber: 'Ref. 126619LB',
    price: '$42,500',
    metalColor: '#f8fafc',
    roughness: 0.12,
    metalness: 0.95,
    bezelColor: '#1d4ed8', // Royal Blue Ceramic
    dialColor: '#1e3a8a',  // Rich Sunburst Royal Ocean Dial
    dialSubColor: '#2563eb',
    accentColor: '#60a5fa',
    accentBadge: 'SMURF EDITION',
  },
  emeraldMarine: {
    id: 'emeraldMarine',
    name: 'SUBMARINER KERMIT',
    subName: 'EMERALD GREEN',
    tagline: '904L Oystersteel & Kermit Cerachrom',
    refNumber: 'Ref. 126610LV',
    price: '$16,800',
    metalColor: '#f1f5f9',
    roughness: 0.14,
    metalness: 0.94,
    bezelColor: '#047857', // Kermit Green Ceramic
    dialColor: '#052e16',  // Deep Sunburst Forest Green Dial
    dialSubColor: '#065f46',
    accentColor: '#34d399',
    accentBadge: 'ANNIVERSARY',
  },
  pepsiGmt: {
    id: 'pepsiGmt',
    name: 'GMT-MASTER II PEPSI',
    subName: 'DUAL CERACHROM',
    tagline: 'Oystersteel & Dual Red/Blue Cerachrom',
    refNumber: 'Ref. 126710BLRO',
    price: '$21,500',
    metalColor: '#f8fafc',
    roughness: 0.13,
    metalness: 0.95,
    bezelColor: '#1e3a8a', // Blue/Red two-tone ceramic
    isTwoToneBezel: true,
    bezelSecondaryColor: '#991b1b', // Deep Crimson
    dialColor: '#090d16',
    dialSubColor: '#1e293b',
    accentColor: '#ef4444',
    accentBadge: 'PILOT DUAL-TIME',
  },
  presidentGold: {
    id: 'presidentGold',
    name: 'DAY-DATE 40 PRESIDENT',
    subName: 'CHAMPAGNE GOLD',
    tagline: '18k Yellow Gold & Champagne Sunburst',
    refNumber: 'Ref. 228238',
    price: '$46,200',
    metalColor: '#f5d061', // 18k Polished Yellow Gold
    roughness: 0.16,
    metalness: 0.92,
    bezelColor: '#d97706', // Fluted Yellow Gold Bezel
    dialColor: '#78350f',  // Sunburst Champagne Gold Dial
    dialSubColor: '#b45309',
    accentColor: '#fbbf24',
    accentBadge: '18K YELLOW GOLD',
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
    blueprintType: 'bezel',
    technicalSpecs: [
      { label: 'MATERIAL', value: 'High-Tech Cerachrom Ceramic' },
      { label: 'HARDNESS', value: '1,500 Vickers (Diamond-hard)' },
      { label: 'GRADUATION', value: 'PVD Platinum Numerals 10-50' },
      { label: 'MECHANISM', value: '72-Click Unidirectional Ratchet' },
    ],
    materialDetail: 'Virtually scratchproof, impervious to UV discoloration and seawater erosion.',
  },
  {
    id: 'crystal',
    name: 'Double-Domed Sapphire Crystal',
    category: 'OPTICAL ARCHITECTURE',
    spec: 'Synthetic Corundum • Dual Anti-Reflective',
    description: 'Ultra-clear scratch-resistant synthetic corundum with 7-layer anti-reflective treatment for zero optical distortion.',
    scrollRange: [0.26, 0.40],
    screenPosition: { x: 24, y: 36 },
    blueprintType: 'crystal',
    technicalSpecs: [
      { label: 'CRYSTAL', value: 'Synthetic Sapphire Corundum' },
      { label: 'MOHS SCALE', value: '9.0 (Second only to diamond)' },
      { label: 'CYCLOPS LENS', value: '2.5x Date Magnification' },
      { label: 'COATING', value: 'Double Dual-Side AR Coating' },
    ],
    materialDetail: 'Crystallized at 2,050°C and diamond-cut for optical purity at depths up to 300m.',
  },
  {
    id: 'hands',
    name: 'Chromalight Luminous Hands',
    category: 'INDICATORS',
    spec: 'Mercedes Hour Hand • Lollipop Seconds',
    description: 'Diamond-polished 904L steel hands filled with high-intensity blue Chromalight luminescence.',
    scrollRange: [0.34, 0.48],
    screenPosition: { x: 76, y: 46 },
    blueprintType: 'hands',
    technicalSpecs: [
      { label: 'HOUR HAND', value: 'Iconic Mercedes 3-Spoke Crest' },
      { label: 'MINUTE HAND', value: 'Diamond-Cut Sword Profile' },
      { label: 'SECONDS HAND', value: 'Continuous Sweep Lollipop' },
      { label: 'GLOW LIFE', value: 'Up to 8 Hours Blue Phosphor' },
    ],
    materialDetail: 'Emits a uniform 490nm oceanic blue glow in extreme oceanic darkness.',
  },
  {
    id: 'dial',
    name: 'Maxi Sunburst Oceanic Dial',
    category: 'HOROLOGICAL FACE',
    spec: 'Applied Chromalight Hour Plots',
    description: 'Deep royal sunburst finish with hand-applied 18k white gold surrounds and date aperture at 3 o’clock.',
    scrollRange: [0.42, 0.56],
    screenPosition: { x: 22, y: 56 },
    blueprintType: 'dial',
    technicalSpecs: [
      { label: 'DIAL FINISH', value: 'Radial Sunburst Horological Brushing' },
      { label: 'APPLIQUÉS', value: '18k White Gold Hour Plot Surrounds' },
      { label: 'DATE DISC', value: 'Instantaneous Midnight Jump Mechanism' },
      { label: 'PRECISION', value: 'Superlative Chronometer Certified' },
    ],
    materialDetail: 'Hand-assembled in Geneva ateliers with micro-printed Swiss designations.',
  },
  {
    id: 'movement',
    name: 'Manufacture Calibre 3235',
    category: 'MECHANICAL CALIBRE',
    spec: '31 Jewels • 70-Hour Power Reserve • 4Hz',
    description: 'Chronergy escapement with blue Parachrom hairspring, offering superlative resistance to magnetic fields.',
    scrollRange: [0.50, 0.64],
    screenPosition: { x: 74, y: 64 },
    blueprintType: 'movement',
    technicalSpecs: [
      { label: 'FREQUENCY', value: '28,800 beats/hour (4 Hz)' },
      { label: 'POWER RESERVE', value: '70 Hours Autonomy' },
      { label: 'HAIRSPRING', value: 'Paramagnetic Blue Parachrom' },
      { label: 'TOLERANCE', value: '-2 / +2 seconds per day' },
    ],
    materialDetail: 'Bi-directional self-winding via Perpetual rotor with high-efficiency Chronergy escapement.',
  },
  {
    id: 'caseBack',
    name: '904L Oystersteel Chassis & Bracelet',
    category: 'CASE & ERGONOMICS',
    spec: '300m / 1000ft Water Resistance • Triplock',
    description: 'Corrosion-resistant aerospace superalloy middle case with screw-down caseback and solid 3-link Oyster bracelet.',
    scrollRange: [0.58, 0.72],
    screenPosition: { x: 24, y: 72 },
    blueprintType: 'case',
    technicalSpecs: [
      { label: 'ALLOY', value: 'Aerospace-Grade 904L Oystersteel' },
      { label: 'WATERPROOF', value: '300 Meters / 1,000 Feet' },
      { label: 'CROWN', value: 'Triplock Triple Waterproofness System' },
      { label: 'CLASP', value: 'Oysterlock with Glidelock Extension' },
    ],
    materialDetail: 'Milled from a solid monobloc block of steel, resistant to aggressive marine saltwater.',
  }
];
