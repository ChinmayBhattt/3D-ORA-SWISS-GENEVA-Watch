import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

export const Loader: React.FC = () => {
  const { active, progress } = useProgress();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // If not active or progress reaches 100, dismiss smoothly
    if (!active || progress >= 100) {
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    }
    // Safety max timeout so user is never locked out
    const safetyTimer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(safetyTimer);
  }, [active, progress]);

  if (!visible) return null;

  const displayProgress = Math.round(progress);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050507] text-[#e2e8f0] transition-opacity duration-700">
      {/* Brand Monogram & Tourbillon Spin Ring */}
      <div className="relative w-24 h-24 flex items-center justify-center mb-8">
        {/* Outer pulsing gold halo */}
        <div className="absolute inset-0 rounded-full border border-[#cfab48]/20 animate-ping opacity-30" />
        
        {/* Rotating gear teeth border */}
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed border-[#cfab48]/60 animate-spin"
          style={{ animationDuration: '8s' }}
        />
        
        {/* Counter-rotating balance ring */}
        <div
          className="absolute inset-2 rounded-full border border-[#dfc476]/40 animate-spin"
          style={{ animationDuration: '4s', animationDirection: 'reverse' }}
        />

        {/* Center Crest */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#cfab48] to-[#695018] p-[1px] shadow-glow-gold flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#08080c] flex items-center justify-center">
            <span className="font-serif text-[#fbf7ee] text-xl font-bold tracking-widest">A</span>
          </div>
        </div>
      </div>

      {/* Brand & Loading Status */}
      <div className="text-center space-y-2 max-w-xs">
        <h2 className="font-serif text-2xl tracking-widest text-gold-gradient font-light">
          AURA HOROLOGY
        </h2>
        <p className="text-[11px] font-mono uppercase tracking-ultra text-slate-400">
          Calibrating Escapement & Optics
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto mt-4">
          <div
            className="h-full bg-gradient-to-r from-[#cfab48] to-[#fbf7ee] transition-all duration-200 ease-out shadow-[0_0_8px_#cfab48]"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
        <div className="text-[10px] font-mono text-[#dfc476] pt-1">
          {displayProgress}%
        </div>
      </div>
    </div>
  );
};
