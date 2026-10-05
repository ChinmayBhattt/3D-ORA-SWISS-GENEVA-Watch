import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, Volume2, VolumeX, X, ShieldCheck } from 'lucide-react';
import type { WatchMaterialTheme } from '../../types/watch';
import { WATCH_THEMES } from '../../constants/theme';

interface NavbarProps {
  progress: number;
  currentTheme: WatchMaterialTheme;
  onThemeChange: (theme: WatchMaterialTheme) => void;
  isMuted: boolean;
  onToggleAudio: () => void;
  onReserveClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  currentTheme,
  onThemeChange,
  isMuted,
  onToggleAudio,
  onReserveClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Scroll Progress Bar at the very top */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-white/10 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#38bdf8] via-[#e0f2fe] to-[#38bdf8] transition-all duration-75 ease-out shadow-[0_0_12px_#38bdf8]"
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>

      {/* Luxury Nav Header (Matches reference image) */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-black/80 via-black/30 to-transparent backdrop-blur-[2px]">
        {/* Left: Menu Burger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 -ml-2 rounded-full text-slate-300 hover:text-white transition-colors"
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Theme Selector Pills - Luxury Horological Swatch Dock (Compact, Zero Overlap) */}
          <div className="flex items-center bg-black/50 border border-white/15 hover:border-white/30 rounded-full p-1 backdrop-blur-xl shadow-lg transition-all">
            {(Object.keys(WATCH_THEMES) as WatchMaterialTheme[]).map((key) => {
              const t = WATCH_THEMES[key];
              const isActive = currentTheme === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onThemeChange(key);
                  }}
                  title={`${t.name} • ${t.subName} (${t.price})`}
                  className={`group relative rounded-full transition-all duration-300 flex items-center cursor-pointer ${
                    isActive
                      ? 'bg-[#38bdf8] text-black font-semibold shadow-[0_0_16px_rgba(56,189,248,0.55)] px-3 py-1 text-xs'
                      : 'p-1.5 hover:bg-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  {/* Ceramic Bezel / Gold Color Swatch */}
                  <span
                    className={`rounded-full border border-black/30 overflow-hidden shrink-0 flex shadow-sm transition-transform ${
                      isActive ? 'w-2.5 h-2.5 mr-1.5' : 'w-4 h-4 group-hover:scale-110'
                    }`}
                    style={{ backgroundColor: t.bezelColor }}
                  >
                    {t.isTwoToneBezel && t.bezelSecondaryColor && (
                      <span className="w-1/2 h-full" style={{ backgroundColor: t.bezelSecondaryColor }} />
                    )}
                  </span>

                  {/* Active Edition Label */}
                  {isActive && (
                    <span className="whitespace-nowrap font-mono text-[11px] tracking-wider uppercase font-semibold">
                      {key === 'stealthBlack'
                        ? 'Nocturne'
                        : key === 'oceanDiver'
                        ? 'Royal Blue'
                        : key === 'emeraldMarine'
                        ? 'Emerald'
                        : key === 'pepsiGmt'
                        ? 'Pepsi GMT'
                        : 'President Gold'}
                    </span>
                  )}

                  {/* Hover Tooltip for inactive swatches */}
                  {!isActive && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-black/95 text-white border border-white/15 px-2 py-0.5 rounded text-[10px] font-mono shadow-2xl z-50">
                      {key === 'stealthBlack'
                        ? 'Nocturne'
                        : key === 'oceanDiver'
                        ? 'Royal Blue'
                        : key === 'emeraldMarine'
                        ? 'Emerald'
                        : key === 'pepsiGmt'
                        ? 'Pepsi GMT'
                        : 'President Gold'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Brand Title (Exact from Reference Image: "ORA SWISS • GENEVA") */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-auto cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="font-serif text-lg sm:text-xl tracking-[0.25em] text-white font-medium block leading-none">
            ORA SWISS
          </span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-slate-400 font-mono block mt-1">
            GENEVA
          </span>
        </div>

        {/* Right: Audio Toggle, Search, Cart & Reserve CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mechanical Escapement Sound */}
          <button
            onClick={onToggleAudio}
            title={isMuted ? 'Unmute mechanical ticking' : 'Mute ticking'}
            className="p-2 rounded-full text-slate-300 hover:text-white transition-colors flex items-center gap-1"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#38bdf8] animate-pulse" />
            )}
            <span className="hidden xl:inline text-[11px] font-mono text-slate-400">
              {isMuted ? 'Sound Off' : '4Hz Calibre'}
            </span>
          </button>

          {/* Search icon */}
          <button className="p-2 text-slate-300 hover:text-white transition-colors hidden sm:block">
            <Search className="w-4 h-4" />
          </button>

          {/* Cart with 0 badge */}
          <button
            onClick={onReserveClick}
            className="p-2 text-slate-300 hover:text-white transition-colors relative"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute top-1 right-1 text-[9px] font-mono text-slate-300 leading-none">0</span>
          </button>

          {/* Acquire / Reserve CTA */}
          <button
            onClick={onReserveClick}
            className="hidden sm:flex px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Acquire</span>
          </button>
        </div>
      </header>

      {/* Side Slide-out Menu Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex justify-start animate-fade-in">
          <div className="w-full max-w-sm h-full bg-[#070b14] border-r border-white/10 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-8 border-b border-white/10">
                <span className="font-serif text-lg tracking-widest text-white">ORA SWISS</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-6 pt-8 font-serif text-2xl text-slate-300">
                <div>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    01. Timepiece Overview
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    02. Exploded Anatomy
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: window.innerHeight * 5.2, behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    03. Calibre 3235 Specs
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      onReserveClick();
                      setIsMenuOpen(false);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    04. Reserve Timepiece
                  </button>
                </div>
              </nav>
            </div>

            <div className="text-xs font-mono text-slate-400 border-t border-white/10 pt-4">
              <span>MANUFACTURE D'HORLOGERIE GENÈVE</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
