import { useState, useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import type { WatchPartRefs, WatchMaterialTheme } from './types/watch';
import { WATCH_THEMES } from './constants/theme';
import { Scene } from './components/3d/Scene';
import { Navbar } from './components/ui/Navbar';
import { HeroOverlay } from './components/ui/HeroOverlay';
import { CalloutOverlay } from './components/ui/CalloutOverlay';
import { CTASection, ReservationModal } from './components/ui/CTASection';
import { Loader } from './components/ui/Loader';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { horologyAudio } from './audio/watchSound';

export function App() {
  // Theme state: defaults to 'oceanDiver' (Deep oceanic blue Cerachrom & 904L Steel)
  const [currentTheme, setCurrentTheme] = useState<WatchMaterialTheme>('oceanDiver');
  const [isMuted, setIsMuted] = useState(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // 3D Scene refs
  const partRefs = useRef<WatchPartRefs>({
    crystal: null,
    bezel: null,
    hands: null,
    dial: null,
    movement: null,
    caseBack: null,
    crown: null,
    strapTop: null,
    strapBottom: null,
    rotor: null,
    balanceWheel: null,
    gearTrain: null,
  });

  const rootGroupRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll animation sync
  const { scrollState } = useScrollAnimation({
    containerRef,
  });

  // Audio Escapement Toggle
  const handleToggleAudio = () => {
    const active = horologyAudio.toggle();
    setIsMuted(!active);
  };

  return (
    <div className="relative bg-[#030712] text-[#e2e8f0] selection:bg-[#38bdf8]/30">
      {/* Luxury Loading Screen with Drei useProgress */}
      <Loader />

      {/* Persistent Navigation (Ora Swiss Geneva style) */}
      <Navbar
        progress={scrollState.progress}
        currentTheme={currentTheme}
        onThemeChange={(theme) => setCurrentTheme(theme)}
        isMuted={isMuted}
        onToggleAudio={handleToggleAudio}
        onReserveClick={() => setIsOrderModalOpen(true)}
      />

      {/* 600vh Total Scroll Track for GSAP Pinned Scrubbing */}
      <div ref={containerRef} className="relative w-full" style={{ height: '600vh' }}>
        {/* Fixed 100vh Canvas Viewport - Guaranteed to stay in view at every scroll step */}
        <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none">
          {/* Deep Cinematic Oceanic Glow & Water Atmosphere (Matches reference image) */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_62%_45%,rgba(2,132,199,0.22)_0%,rgba(6,19,38,0.75)_50%,#030712_100%)]" />

          {/* 3D WebGL Canvas - 3D Rotation Always On & Parts Explode On Scroll */}
          <div className="w-full h-full relative z-10 pointer-events-auto">
            <Suspense fallback={null}>
              <Scene
                progress={scrollState.progress}
                theme={WATCH_THEMES[currentTheme]}
                partRefs={partRefs}
                rootGroupRef={rootGroupRef}
                cameraRef={cameraRef}
                isReducedMotion={isReducedMotion}
              />
            </Suspense>
          </div>

          {/* Stage 1: Hero Overlay (0 - 15%) - Editorial TIME, REDEFINED. */}
          <HeroOverlay progress={scrollState.progress} />

          {/* Stage 2 & 3: Detail Callouts (15 - 72%) */}
          <CalloutOverlay
            progress={scrollState.progress}
            activeCalloutId={scrollState.activeCalloutId}
          />

          {/* Stage 4 & 5: Final CTA Section & Specs (80 - 100%) */}
          <CTASection
            progress={scrollState.progress}
            currentTheme={currentTheme}
            onThemeChange={(theme) => setCurrentTheme(theme)}
            onOpenOrderModal={() => setIsOrderModalOpen(true)}
          />

          {/* Bottom Stage Progress Indicator */}
          <div className="fixed bottom-4 right-8 z-40 hidden sm:flex items-center gap-3 text-[11px] font-mono text-slate-500">
            <span className="text-[#38bdf8] uppercase tracking-wider">
              {scrollState.stage === 'hero'
                ? '01 / ASSEMBLED SHOWCASE'
                : scrollState.stage === 'disassembly'
                ? '02 / EXPLODED ANATOMY'
                : scrollState.stage === 'reassembly'
                ? '03 / REASSEMBLING'
                : '04 / SPECIFICATIONS'}
            </span>
            <span className="text-slate-600">•</span>
            <span>{Math.round(scrollState.progress * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Private Allocation Modal */}
      <ReservationModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        theme={WATCH_THEMES[currentTheme]}
      />
    </div>
  );
}

export default App;
