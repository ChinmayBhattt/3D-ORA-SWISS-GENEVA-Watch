import React from 'react';
import { WATCH_CALLOUTS } from '../../constants/theme';
import { Sparkles } from 'lucide-react';

interface CalloutOverlayProps {
  progress: number;
  activeCalloutId: string | null;
}

export const CalloutOverlay: React.FC<CalloutOverlayProps> = ({
  progress,
  activeCalloutId,
}) => {
  // Only display during disassembly / explosion phase
  if (progress < 0.15 || progress > 0.72) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {WATCH_CALLOUTS.map((callout) => {
        const isActive = activeCalloutId === callout.id;
        if (!isActive) return null;

        const [start, end] = callout.scrollRange;

        // Smooth bell curve opacity within its range
        let opacity = 0;
        if (progress >= start && progress <= end) {
          const mid = (start + end) / 2;
          const halfSpan = (end - start) / 2;
          const dist = Math.abs(progress - mid);
          opacity = Math.max(0, 1 - Math.pow(dist / halfSpan, 1.6));
        }

        if (opacity <= 0.02) return null;

        const isLeft = callout.screenPosition.x < 50;

        return (
          <div
            key={callout.id}
            className="absolute transition-all duration-300 ease-out"
            style={{
              left: `${callout.screenPosition.x}%`,
              top: `${callout.screenPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity,
            }}
          >
            {/* Callout Card Container */}
            <div className="relative group w-80 sm:w-96">
              {/* Thin connecting guide line */}
              <div
                className={`hidden md:block absolute top-1/2 w-16 h-[1px] bg-gradient-to-r pointer-events-none ${
                  isLeft
                    ? 'from-transparent via-[#cfab48]/60 to-[#cfab48] -right-16'
                    : 'from-[#cfab48] via-[#cfab48]/60 to-transparent -left-16'
                }`}
              >
                {/* Glowing beacon dot */}
                <span
                  className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#cfab48] shadow-[0_0_10px_#cfab48] ${
                    isLeft ? 'right-0' : 'left-0'
                  }`}
                />
              </div>

              {/* Glassmorphic Luxury Detail Card */}
              <div className="bg-glass-card rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl border border-[#cfab48]/40 shadow-glow-gold relative overflow-hidden pointer-events-auto">
                {/* Subtle top gold accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#cfab48] to-transparent opacity-80" />

                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-[#cfab48]">
                    <Sparkles className="w-3 h-3 text-[#cfab48]" />
                    <span>{callout.category}</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 border border-white/10 px-2 py-0.5 rounded-full">
                    {callout.id.toUpperCase()}
                  </span>
                </div>

                {/* Part Name */}
                <h3 className="font-serif text-lg sm:text-xl text-[#fbf7ee] font-normal tracking-wide mb-1">
                  {callout.name}
                </h3>

                {/* Technical Specification Badge */}
                <div className="inline-block text-[10px] sm:text-[11px] font-mono text-[#dfc476] bg-[#cfab48]/15 border border-[#cfab48]/25 px-2 py-0.5 rounded mb-2">
                  {callout.spec}
                </div>

                {/* Craftsmanship Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {callout.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
