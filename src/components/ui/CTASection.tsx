import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, X } from 'lucide-react';
import type { WatchMaterialTheme, WatchThemeConfig } from '../../types/watch';
import { WATCH_THEMES } from '../../constants/theme';

interface CTASectionProps {
  progress: number;
  currentTheme: WatchMaterialTheme;
  onThemeChange: (theme: WatchMaterialTheme) => void;
  onOpenOrderModal: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  progress,
  currentTheme,
  onThemeChange,
  onOpenOrderModal,
}) => {
  // Fade in smoothly when progress > 0.80
  const opacity = Math.max(0, Math.min(1, (progress - 0.80) / 0.12));

  if (opacity <= 0.01) return null;

  const currentThemeData = WATCH_THEMES[currentTheme];

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-end px-4 sm:px-12 py-16 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Right-aligned Luxury Spec Sheet & Purchase Card */}
      <div className="w-full max-w-lg bg-[#070e1b]/85 border border-[#38bdf8]/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(2,132,199,0.2)] backdrop-blur-2xl pointer-events-auto space-y-6 max-h-[88vh] overflow-y-auto">
        {/* Header Tag */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-ultra text-[#38bdf8]">
              OFFICIALLY CERTIFIED CHRONOMETER
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-light mt-0.5">
              Ora Swiss Submariner 300M
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-mono text-slate-400 block">DEPTH</span>
            <span className="font-serif text-lg text-[#38bdf8]">300m / 1000ft</span>
          </div>
        </div>

        {/* Cerachrom Ceramic Bezel Finish Selector */}
        <div>
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-2">
            Cerachrom Bezel & Dial: <span className="text-[#38bdf8]">{currentThemeData.name}</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(WATCH_THEMES) as WatchMaterialTheme[]).map((themeKey) => {
              const theme = WATCH_THEMES[themeKey];
              const isSelected = currentTheme === themeKey;
              return (
                <button
                  key={themeKey}
                  onClick={() => onThemeChange(themeKey)}
                  className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col gap-1.5 ${
                    isSelected
                      ? 'border-[#38bdf8] bg-[#38bdf8]/15 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/30"
                    style={{ backgroundColor: theme.bezelColor }}
                  />
                  <span className="text-xs text-white font-medium leading-tight">
                    {themeKey === 'oceanDiver'
                      ? 'Ocean Blue'
                      : themeKey === 'stealthBlack'
                      ? 'Nocturne Black'
                      : 'Emerald Green'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master Specifications Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-slate-400 text-[10px] uppercase">Case Material</div>
            <div className="text-white font-medium mt-0.5">904L Oystersteel</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-slate-400 text-[10px] uppercase">Calibre</div>
            <div className="text-white font-medium mt-0.5">Manufacture 3235</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-slate-400 text-[10px] uppercase">Diameter & Bezel</div>
            <div className="text-white font-medium mt-0.5">41mm Unidirectional</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-slate-400 text-[10px] uppercase">Water Resistance</div>
            <div className="text-white font-medium mt-0.5">300m Triplock</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-slate-400 text-[10px] uppercase">Power Reserve</div>
            <div className="text-white font-medium mt-0.5">70 Hours</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-slate-400 text-[10px] uppercase">Luminescence</div>
            <div className="text-white font-medium mt-0.5">Chromalight Blue</div>
          </div>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="pt-2 border-t border-white/10 space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 block uppercase">
                Acquisition Value
              </span>
              <div className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
                $14,800 <span className="text-xs font-mono text-slate-400">USD</span>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Geneva Superlative Certified
              </span>
            </div>
          </div>

          <button
            onClick={onOpenOrderModal}
            className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-black font-semibold text-xs tracking-widest uppercase shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Inquire & Reserve Allocation</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Luxury Reservation Modal
export const ReservationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  theme: WatchThemeConfig;
}> = ({ isOpen, onClose, theme }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0a1120] border border-[#38bdf8]/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8] flex items-center justify-center mx-auto text-[#38bdf8]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-white">Allocation Confirmed</h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Thank you, {name || 'Collector'}. Our Geneva Horology Concierge has received your allocation request for the{' '}
              <strong className="text-[#38bdf8]">{theme.name}</strong>. A dedicated specialist will reach out shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#38bdf8] text-black font-semibold text-xs tracking-wider uppercase hover:brightness-110"
            >
              Return to Showcase
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-ultra text-[#38bdf8]">
                GENEVA ATELIER ALLOCATION
              </span>
              <h3 className="font-serif text-2xl text-white font-light mt-0.5">
                Reserve Ora Swiss Submariner
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Selected Edition: <span className="text-[#38bdf8]">{theme.name}</span>
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Collector Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="collector@luxury.ch"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-black font-semibold text-xs tracking-widest uppercase shadow-glow-gold hover:brightness-110 active:scale-95 transition-all"
              >
                Submit Allocation Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
