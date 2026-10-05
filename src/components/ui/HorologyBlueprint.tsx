import React from 'react';

interface HorologyBlueprintProps {
  type: 'bezel' | 'crystal' | 'hands' | 'dial' | 'movement' | 'case';
  accentColor?: string;
}

export const HorologyBlueprint: React.FC<HorologyBlueprintProps> = ({
  type,
  accentColor = '#38bdf8',
}) => {
  switch (type) {
    case 'bezel':
      return (
        <svg viewBox="0 0 200 120" className="w-full h-24 text-sky-400/90" fill="none">
          {/* Bezel Ring Diagram */}
          <circle cx="100" cy="60" r="48" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" className="animate-spin" style={{ transformOrigin: '100px 60px', animationDuration: '30s' }} />
          <circle cx="100" cy="60" r="38" stroke="currentColor" strokeWidth="2" opacity="0.8" />
          <circle cx="100" cy="60" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
          
          {/* Coin-edge teeth notches */}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * 360) / 24;
            return (
              <line
                key={i}
                x1="100"
                y1="10"
                x2="100"
                y2="14"
                stroke="currentColor"
                strokeWidth="1.5"
                transform={`rotate(${a} 100 60)`}
              />
            );
          })}

          {/* 12 o'clock Inverted Triangle & Pearl Pip */}
          <polygon points="100,16 94,24 106,24" fill={accentColor} />
          <circle cx="100" cy="20" r="1.5" fill="#ffffff" />

          {/* Dimension Callout lines */}
          <path d="M 30,60 L 52,60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
          <text x="12" y="63" fill="#94a3b8" fontSize="8" fontFamily="monospace">Ø 41mm</text>

          <path d="M 148,60 L 170,60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
          <text x="172" y="63" fill="#94a3b8" fontSize="8" fontFamily="monospace">60-MIN</text>
        </svg>
      );

    case 'crystal':
      return (
        <svg viewBox="0 0 200 120" className="w-full h-24 text-sky-400/90" fill="none">
          {/* Double-domed Cross-Section Optics */}
          <path d="M 30,70 Q 100,25 170,70" stroke={accentColor} strokeWidth="2.5" />
          <path d="M 32,74 Q 100,31 168,74" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          
          {/* Cyclops 2.5x Magnifier Bubble at 3 o'clock */}
          <ellipse cx="140" cy="48" rx="14" ry="7" stroke={accentColor} strokeWidth="2" fill="rgba(56,189,248,0.15)" />
          <text x="135" y="51" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">28</text>

          {/* AR Coating Multi-Layers */}
          <path d="M 45,58 L 70,58" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
          <text x="75" y="60" fill="#94a3b8" fontSize="8" fontFamily="monospace">7-LAYER AR</text>

          <line x1="30" y1="70" x2="170" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
        </svg>
      );

    case 'hands':
      return (
        <svg viewBox="0 0 200 120" className="w-full h-24 text-sky-400/90" fill="none">
          {/* Center Pinion Arbor */}
          <circle cx="100" cy="60" r="6" fill="#ffffff" stroke={accentColor} strokeWidth="2" />
          <circle cx="100" cy="60" r="2.5" fill="#0f172a" />

          {/* Mercedes Hour Hand pointing to 10 o'clock */}
          <g transform="rotate(-60 100 60)">
            <line x1="100" y1="60" x2="100" y2="28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="100" cy="30" r="7" stroke="currentColor" strokeWidth="2" fill="rgba(56,189,248,0.3)" />
            {/* 3-spoke star inside circle */}
            <line x1="100" y1="30" x2="100" y2="23" stroke="currentColor" strokeWidth="1.2" />
            <line x1="100" y1="30" x2="94" y2="34" stroke="currentColor" strokeWidth="1.2" />
            <line x1="100" y1="30" x2="106" y2="34" stroke="currentColor" strokeWidth="1.2" />
          </g>

          {/* Sword Minute Hand pointing to 2 o'clock */}
          <g transform="rotate(60 100 60)">
            <line x1="100" y1="60" x2="100" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <rect x="98.5" y="18" width="3" height="32" fill={accentColor} opacity="0.8" />
          </g>

          {/* Sweeping Seconds Hand with Lollipop Eye */}
          <g transform="rotate(145 100 60)">
            <line x1="100" y1="75" x2="100" y2="8" stroke="#f43f5e" strokeWidth="1" />
            <circle cx="100" cy="22" r="3.5" fill={accentColor} stroke="#f43f5e" strokeWidth="1" />
            <line x1="97" y1="72" x2="103" y2="72" stroke="#f43f5e" strokeWidth="2" />
          </g>

          <text x="15" y="30" fill="#94a3b8" fontSize="8" fontFamily="monospace">CHROMALIGHT</text>
          <text x="15" y="42" fill="#38bdf8" fontSize="8" fontFamily="monospace">490nm EMISSION</text>
        </svg>
      );

    case 'dial':
      return (
        <svg viewBox="0 0 200 120" className="w-full h-24 text-sky-400/90" fill="none">
          {/* Dial Circular Perimeter */}
          <circle cx="100" cy="60" r="46" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Sunburst Radial Ray Lines */}
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="60"
              x2="100"
              y2="16"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.3"
              transform={`rotate(${i * 22.5} 100 60)`}
            />
          ))}

          {/* Maxi Applied Hour Plots */}
          {/* 12 o'clock Triangle */}
          <polygon points="100,20 95,28 105,28" fill={accentColor} stroke="currentColor" strokeWidth="1" />
          {/* 3 o'clock Date Window */}
          <rect x="130" y="55" width="10" height="9" fill="#ffffff" stroke="currentColor" strokeWidth="1" />
          {/* 6 & 9 Batons */}
          <rect x="97.5" y="94" width="5" height="8" fill={accentColor} stroke="currentColor" strokeWidth="1" />
          <rect x="58" y="57.5" width="8" height="5" fill={accentColor} stroke="currentColor" strokeWidth="1" />
          {/* Dots */}
          {[30, 60, 120, 150, 210, 240, 300, 330].map((angle, idx) => (
            <circle
              key={idx}
              cx="100"
              cy="23"
              r="3"
              fill={accentColor}
              stroke="currentColor"
              strokeWidth="0.8"
              transform={`rotate(${angle} 100 60)`}
            />
          ))}

          <text x="15" y="105" fill="#94a3b8" fontSize="8" fontFamily="monospace">18K WHITE GOLD PLOTS</text>
        </svg>
      );

    case 'movement':
      return (
        <svg viewBox="0 0 200 120" className="w-full h-24 text-amber-400/90" fill="none">
          {/* Calibre 3235 Mainplate & Gear Train */}
          <circle cx="100" cy="60" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
          
          {/* Oscillating Balance Wheel (4Hz) */}
          <g transform="translate(125, 60)" className="animate-spin" style={{ animationDuration: '4s' }}>
            <circle cx="0" cy="0" r="16" stroke="#fbbf24" strokeWidth="2" fill="rgba(251,191,36,0.1)" />
            <line x1="-16" y1="0" x2="16" y2="0" stroke="#fbbf24" strokeWidth="1.5" />
            <line x1="0" y1="-16" x2="0" y2="16" stroke="#fbbf24" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3" fill="#e11d48" /> {/* Center Ruby Jewel */}
          </g>

          {/* Escape Wheel and Bridge */}
          <circle cx="75" cy="50" r="12" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2 1" />
          <circle cx="75" cy="50" r="2.5" fill="#e11d48" /> {/* Ruby Jewel */}

          {/* Perpetual Winding Rotor Sector */}
          <path d="M 60,60 A 40,40 0 0,1 140,60" stroke="#94a3b8" strokeWidth="5" fill="none" opacity="0.6" />

          <text x="15" y="25" fill="#fbbf24" fontSize="8" fontFamily="monospace">CALIBRE 3235</text>
          <text x="15" y="37" fill="#94a3b8" fontSize="8" fontFamily="monospace">28,800 VPH (4Hz)</text>
          <text x="15" y="49" fill="#94a3b8" fontSize="8" fontFamily="monospace">31 JEWELS</text>
        </svg>
      );

    case 'case':
      return (
        <svg viewBox="0 0 200 120" className="w-full h-24 text-sky-400/90" fill="none">
          {/* 904L Monobloc Middle Case Outline */}
          <path d="M 70,25 L 130,25 L 145,45 L 145,75 L 130,95 L 70,95 L 55,75 L 55,45 Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" />
          
          {/* Lugs profile */}
          <line x1="70" y1="25" x2="60" y2="10" stroke="currentColor" strokeWidth="2" />
          <line x1="130" y1="25" x2="140" y2="10" stroke="currentColor" strokeWidth="2" />
          <line x1="70" y1="95" x2="60" y2="110" stroke="currentColor" strokeWidth="2" />
          <line x1="130" y1="95" x2="140" y2="110" stroke="currentColor" strokeWidth="2" />

          {/* Triplock Crown & Crown Guards at 3 o'clock */}
          <rect x="145" y="48" width="6" height="24" fill="currentColor" opacity="0.5" />
          <rect x="151" y="52" width="12" height="16" stroke="currentColor" strokeWidth="1.5" fill="#f8fafc" />
          <line x1="163" y1="55" x2="163" y2="65" stroke="currentColor" strokeWidth="1.5" />

          <text x="15" y="45" fill="#94a3b8" fontSize="8" fontFamily="monospace">904L OYSTERSTEEL</text>
          <text x="15" y="57" fill="#38bdf8" fontSize="8" fontFamily="monospace">300m / 1000ft WATERPROOF</text>
        </svg>
      );
  }
};
