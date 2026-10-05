import React from 'react';
import { RotateCw, Compass, Moon, Sun } from 'lucide-react';

interface HorologyControlsProps {
  isAutoRotate: boolean;
  onToggleAutoRotate: () => void;
  isNightMode: boolean;
  onToggleNightMode: () => void;
  onResetView: () => void;
  progress: number;
}

export const HorologyControls: React.FC<HorologyControlsProps> = ({
  isAutoRotate,
  onToggleAutoRotate,
  isNightMode,
  onToggleNightMode,
  onResetView,
  progress,
}) => {
  // Hide in CTA section to avoid clutter
  if (progress > 0.82) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-auto hidden sm:flex items-center gap-2 bg-[#090d16]/85 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl">
      {/* 360° Auto-Rotate Toggle */}
      <button
        onClick={onToggleAutoRotate}
        title={isAutoRotate ? 'Pause 360° Rotation' : 'Start 360° Turntable Rotation'}
        className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
          isAutoRotate
            ? 'bg-[#38bdf8] text-black font-semibold shadow-[0_0_12px_rgba(56,189,248,0.5)]'
            : 'text-slate-300 hover:text-white hover:bg-white/10'
        }`}
      >
        <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        <span>360° Spin</span>
      </button>

      {/* Lume Night Mode Toggle */}
      <button
        onClick={onToggleNightMode}
        title={isNightMode ? 'Switch to Studio Daylight' : 'Switch to Oceanic Lume Night Glow'}
        className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
          isNightMode
            ? 'bg-indigo-500 text-white font-semibold shadow-[0_0_12px_rgba(99,102,241,0.5)]'
            : 'text-slate-300 hover:text-white hover:bg-white/10'
        }`}
      >
        {isNightMode ? <Moon className="w-3.5 h-3.5 text-cyan-300" /> : <Sun className="w-3.5 h-3.5 text-amber-300" />}
        <span>{isNightMode ? 'Lume Glow' : 'Studio Day'}</span>
      </button>

      {/* Reset Camera View */}
      <button
        onClick={onResetView}
        title="Reset 3D Inspection Angle"
        className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
      >
        <Compass className="w-4 h-4" />
      </button>
    </div>
  );
};
