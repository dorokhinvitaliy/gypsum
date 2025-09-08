import type { RefObject } from 'react';
import { useEffect } from 'react';

interface UseScrollArgs {
  containerRef: RefObject<HTMLElement | null>;
  slideRef: RefObject<HTMLElement | null>;
  setPhase: (phase: number) => void;
  useVisiblePhase?: boolean;
}

export const useScroll = ({
  containerRef,
  slideRef,
  setPhase,
  useVisiblePhase = false,
}: UseScrollArgs) => {
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const container = containerRef.current;
          const slide = slideRef.current;

          if (container && slide) {
            const containerRect = container.getBoundingClientRect();
            const slideRect = slide.getBoundingClientRect();

            let phaseCalc = 0;

            if (!useVisiblePhase) {
              // старая логика: top→top, bottom→bottom
              const totalScrollable = slideRect.height - containerRect.height;
              const offsetTop = slideRect.top - containerRect.top;
              const scrolled = -offsetTop;
              phaseCalc = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
            } else {
              // новый режим: top слайда коснулся bottom контейнера → 0
              // bottom слайда ушёл за top контейнера → 1
              const totalScrollable = containerRect.height + slideRect.height;
              const offsetTop = containerRect.top - slideRect.height;
              const scrolled = -offsetTop;
              phaseCalc = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
            }

            setPhase(phaseCalc);
          }

          ticking = false;
        });
      }
    };

    const container = document.querySelector('main') ?? window;

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // начальное вычисление

    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef, slideRef, setPhase, useVisiblePhase]);
};
