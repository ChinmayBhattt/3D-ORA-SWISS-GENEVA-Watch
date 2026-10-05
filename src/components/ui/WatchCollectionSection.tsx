import React from 'react';
import { WATCH_THEMES } from '../../constants/theme';
import type { WatchMaterialTheme } from '../../types/watch';
import { Check, Sparkles, ArrowUpRight, Clock, Droplets, Zap } from 'lucide-react';

interface WatchCollectionSectionProps {
  currentTheme: WatchMaterialTheme;
  onThemeSelect: (theme: WatchMaterialTheme) => void;
  onOpenOrderModal: () => void;
}

export const WatchCollectionSection: React.FC<WatchCollectionSectionProps> = ({
  currentTheme,
  onThemeSelect,
  onOpenOrderModal,
}) => {
  const themesList = Object.keys(WATCH_THEMES) as WatchMaterialTheme[];

  return (
    <div className="w-full bg-[#030712] py-20 px-6 sm:px-12 border-t border-white/10 relative z-20">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#38bdf8] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Atelier Masterpieces</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-wide mb-4">
          THE HOROLOGICAL COLLECTION
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-light">
          Each reference is sculpted in Geneva ateliers from aerospace-grade 904L Oystersteel and 18k noble gold, powered by the in-house Superlative Chronometer Calibre 3235.
        </p>
      </div>

      {/* 5 Iconic Timepieces Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {themesList.map((key) => {
          const watch = WATCH_THEMES[key];
          const isSelected = currentTheme === key;

          return (
            <div
              key={key}
              className={`group relative rounded-2xl p-6 transition-all duration-300 border flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-[#0f172a] to-[#070b14] border-[#38bdf8] shadow-[0_0_30px_rgba(56,189,248,0.25)] ring-1 ring-[#38bdf8]'
                  : 'bg-[#060a12]/80 hover:bg-[#0b1120] border-white/10 hover:border-white/20'
              }`}
            >
              {/* Top Row: Ref number & Badge */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono text-slate-400">
                    {watch.refNumber}
                  </span>
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: `${watch.accentColor}40`,
                      color: watch.accentColor,
                      backgroundColor: `${watch.accentColor}15`,
                    }}
                  >
                    {watch.accentBadge}
                  </span>
                </div>

                {/* Color Swatch & Title */}
                <div className="flex items-start gap-3.5 mb-3">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-white/20 shadow-md shrink-0 flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: watch.bezelColor }}
                  >
                    {watch.isTwoToneBezel && watch.bezelSecondaryColor && (
                      <div className="w-1/2 h-full self-end" style={{ backgroundColor: watch.bezelSecondaryColor }} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-white font-medium group-hover:text-[#38bdf8] transition-colors">
                      {watch.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-400">
                      {watch.tagline}
                    </p>
                  </div>
                </div>

                {/* Specs Pill List */}
                <div className="grid grid-cols-3 gap-2 py-4 my-2 border-y border-white/5 text-center font-mono">
                  <div className="bg-white/[0.02] p-2 rounded-lg">
                    <Clock className="w-3.5 h-3.5 mx-auto text-slate-400 mb-1" />
                    <span className="text-[9px] text-slate-400 block">POWER</span>
                    <span className="text-xs text-white font-medium">70 Hours</span>
                  </div>
                  <div className="bg-white/[0.02] p-2 rounded-lg">
                    <Droplets className="w-3.5 h-3.5 mx-auto text-sky-400 mb-1" />
                    <span className="text-[9px] text-slate-400 block">DEPTH</span>
                    <span className="text-xs text-white font-medium">300m</span>
                  </div>
                  <div className="bg-white/[0.02] p-2 rounded-lg">
                    <Zap className="w-3.5 h-3.5 mx-auto text-amber-400 mb-1" />
                    <span className="text-[9px] text-slate-400 block">RATE</span>
                    <span className="text-xs text-white font-medium">4 Hz</span>
                  </div>
                </div>
              </div>

              {/* Bottom Price & Action Buttons */}
              <div className="pt-4">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs font-mono text-slate-400">RETAIL VALUATION</span>
                  <span className="font-serif text-2xl text-white font-semibold tracking-wide">
                    {watch.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onThemeSelect(key);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#38bdf8] text-black font-semibold shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Active in 3D</span>
                      </>
                    ) : (
                      <span>View in 3D</span>
                    )}
                  </button>

                  <button
                    onClick={onOpenOrderModal}
                    className="p-2.5 rounded-xl border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-colors"
                    title="Reserve Allocation"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Atelier Engineering Standards Banner */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#070d19] via-[#0f172a] to-[#070d19] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl font-serif text-white mb-2">904L</div>
            <div className="text-xs font-mono uppercase text-[#38bdf8] tracking-widest mb-1">
              Aerospace Superalloy
            </div>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Provides supreme resistance to corrosion in extreme marine saltwater environments.
            </p>
          </div>

          <div>
            <div className="text-3xl font-serif text-white mb-2">1,500 HV</div>
            <div className="text-xs font-mono uppercase text-[#38bdf8] tracking-widest mb-1">
              Cerachrom Hardness
            </div>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Diamond-hard ceramic insert is virtually impossible to scratch and impervious to UV fading.
            </p>
          </div>

          <div>
            <div className="text-3xl font-serif text-white mb-2">300 M</div>
            <div className="text-xs font-mono uppercase text-[#38bdf8] tracking-widest mb-1">
              Oceanic Hydro-Tested
            </div>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Fitted with the Triplock triple waterproofness system and tested beyond saturation diving limits.
            </p>
          </div>

          <div>
            <div className="text-3xl font-serif text-white mb-2">±2 SEC</div>
            <div className="text-xs font-mono uppercase text-[#38bdf8] tracking-widest mb-1">
              Superlative Chronometer
            </div>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Tested after casing to guarantee chronometric precision twice that of standard official COSC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
