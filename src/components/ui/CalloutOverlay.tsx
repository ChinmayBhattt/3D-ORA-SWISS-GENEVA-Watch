import React from 'react';
import { WATCH_CALLOUTS } from '../../constants/theme';
import { HorologyBlueprint } from './HorologyBlueprint';
import { Sparkles, Activity, ShieldCheck } from 'lucide-react';

interface CalloutOverlayProps {
  progress: number;
  activeCalloutId: string | null;
}

export const CalloutOverlay: React.FC<CalloutOverlayProps> = ({
  progress,
  activeCalloutId,
}) => {
  // Only display during disassembly / explosion phase
  if (progress < 0.15 || progress > 0.74) return null;

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
          opacity = Math.max(0, 1 - Math.pow(dist / halfSpan, 1.5));
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
            <div className="relative group w-80 sm:w-[420px]">
              {/* Fiber-Optic Connecting Beam to the 3D Watch Part */}
              <div
                className={`hidden md:block absolute top-1/2 w-20 h-[1.5px] bg-gradient-to-r pointer-events-none ${
                  isLeft
                    ? 'from-transparent via-[#38bdf8]/80 to-[#38bdf8] -right-20'
                    : 'from-[#38bdf8] via-[#38bdf8]/80 to-transparent -left-20'
                }`}
              >
                {/* Glowing beacon pulse ring */}
                <span
                  className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#38bdf8] shadow-[0_0_15px_#38bdf8] animate-ping opacity-75 ${
                    isLeft ? 'right-0' : 'left-0'
                  }`}
                />
                <span
                  className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] ${
                    isLeft ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </div>

              {/* Luxury Horology Detail Terminal Card */}
              <div className="bg-[#070d19]/90 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-2xl border border-[#38bdf8]/35 shadow-[0_0_40px_rgba(2,132,199,0.25)] relative overflow-hidden pointer-events-auto">
                {/* Top cyan/gold neon accent highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent" />

                {/* Header: Category Badge & Identifier */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-[#38bdf8]">
                    <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>{callout.category}</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Activity className="w-2.5 h-2.5 text-emerald-400" />
                    INSPECT: {callout.id.toUpperCase()}
                  </span>
                </div>

                {/* Part Name */}
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal tracking-wide mb-1.5">
                  {callout.name}
                </h3>

                {/* Technical Sub-spec pill */}
                <div className="inline-block text-[11px] font-mono text-[#7dd3fc] bg-[#0284c7]/20 border border-[#0284c7]/40 px-2.5 py-0.5 rounded mb-3">
                  {callout.spec}
                </div>

                {/* Technical Blueprint SVG Illustration */}
                <div className="bg-[#030712]/80 rounded-xl p-2.5 mb-3.5 border border-white/5 relative overflow-hidden">
                  <div className="text-[9px] font-mono uppercase text-slate-500 mb-1 flex items-center justify-between">
                    <span>ATELIER SCHEMATIC</span>
                    <span className="text-[#38bdf8]">1:1 SCALE</span>
                  </div>
                  <HorologyBlueprint type={callout.blueprintType} />
                </div>

                {/* Technical Metric Chips Grid (4 Specs) */}
                <div className="grid grid-cols-2 gap-2 mb-3.5">
                  {callout.technicalSpecs?.map((specItem, idx) => (
                    <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-lg p-2">
                      <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                        {specItem.label}
                      </div>
                      <div className="text-[11px] font-sans font-medium text-slate-200 truncate mt-0.5">
                        {specItem.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description & Material Detail */}
                <p className="text-xs text-slate-300 leading-relaxed font-light mb-2">
                  {callout.description}
                </p>

                {/* Bottom Assurance Note */}
                <div className="pt-2.5 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{callout.materialDetail}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
