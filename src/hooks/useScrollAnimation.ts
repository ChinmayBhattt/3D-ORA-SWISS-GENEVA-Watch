import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export interface ScrollState {
  progress: number;
  stage: 'hero' | 'disassembly' | 'callouts' | 'reassembly' | 'cta';
  activeCalloutId: string | null;
}

export const useScrollAnimation = ({
  containerRef,
}: UseScrollAnimationProps) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    stage: 'hero',
    activeCalloutId: null,
  });

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;

          let stage: ScrollState['stage'] = 'hero';
          if (p < 0.15) stage = 'hero';
          else if (p < 0.70) stage = 'disassembly';
          else if (p < 0.88) stage = 'reassembly';
          else stage = 'cta';

          let activeCalloutId: string | null = null;
          if (p >= 0.18 && p < 0.30) activeCalloutId = 'crystal';
          else if (p >= 0.28 && p < 0.38) activeCalloutId = 'bezel';
          else if (p >= 0.36 && p < 0.46) activeCalloutId = 'hands';
          else if (p >= 0.44 && p < 0.54) activeCalloutId = 'dial';
          else if (p >= 0.52 && p < 0.62) activeCalloutId = 'movement';
          else if (p >= 0.60 && p < 0.72) activeCalloutId = 'caseBack';

          setScrollState({
            progress: p,
            stage,
            activeCalloutId,
          });
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef]);

  return {
    scrollState,
    lenis: lenisRef.current,
  };
};
