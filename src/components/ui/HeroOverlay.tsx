import React from 'react';
import { Sparkles, ArrowRight, Play, Compass, ChevronDown } from 'lucide-react';

interface HeroOverlayProps {
  progress: number;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({ progress }) => {
  // Fade out smoothly between progress 0.05 and 0.18
  const opacity = Math.max(0, Math.min(1, 1 - (progress - 0.04) / 0.14));

  if (opacity <= 0.01) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-12 md:p-16 transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Top spacer (Navbar occupies top) */}
      <div className="h-10" />

      {/* Main Left-Aligned Hero Section (Exact layout from reference image) */}
      <div className="max-w-xl space-y-5 my-auto pointer-events-auto">
        {/* Category Tag */}
        <div className="inline-flex items-center gap-2 text-slate-400 font-mono text-[11px] uppercase tracking-ultra">
          <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>FEATURED TIMEPIECE</span>
        </div>

        {/* Editorial Heading: TIME, REDEFINED. */}
        <div className="space-y-0.5">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight text-white font-light leading-[0.92] drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
            TIME,
          </h1>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight text-slate-300 font-light leading-[0.92] drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
            REDEFINED.
          </h1>
        </div>

        {/* Short Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 font-light max-w-md leading-relaxed">
          Crafted from corrosion-resistant 904L aerospace Oystersteel, fitted with an ocean-blue Cerachrom diver bezel and Calibre 3235.
        </p>

        {/* Buttons & Links */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Glass CTA Button */}
          <button
            onClick={() => {
              window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white text-xs font-mono tracking-widest uppercase backdrop-blur-xl transition-all flex items-center gap-2 group shadow-2xl"
          >
            <span>Explore Disassembly</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#38bdf8]" />
          </button>

          {/* Secondary Link */}
          <button
            onClick={() => {
              window.scrollTo({ top: window.innerHeight * 5.2, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white uppercase tracking-widest transition-colors py-2"
          >
            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            </div>
            <span>Inside the Atelier</span>
          </button>
        </div>

        {/* 3D Interaction Cue */}
        <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-[#38bdf8]/90">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          <span>3D Free Rotation Always Active • Click & Drag Watch Anytime</span>
        </div>
      </div>

      {/* Bottom Section: Pagination and Scroll cue */}
      <div className="flex items-end justify-between border-t border-white/10 pt-4">
        {/* Pagination Indicator: 01 ─────── 04 */}
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="text-white font-bold">01</span>
          <div className="w-16 sm:w-24 h-[2px] bg-white/20 overflow-hidden rounded-full">
            <div className="w-1/4 h-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
          </div>
          <span>04</span>
          <span className="hidden sm:inline text-slate-500 uppercase tracking-widest pl-2">
            • ORA SWISS ATELIER
          </span>
        </div>

        {/* Scroll cue */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 uppercase tracking-wider animate-bounce">
          <span>Scroll to disassemble</span>
          <ChevronDown className="w-4 h-4 text-[#38bdf8]" />
        </div>
      </div>
    </div>
  );
};
