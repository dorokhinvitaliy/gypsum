import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

interface UseScrollArgs {
  containerRef: RefObject<HTMLElement | null>;
  slideRef: RefObject<HTMLElement | null>;
  useVisiblePhase?: boolean;
  callback?: (phase: number, isActive?: boolean) => void;
}

const isInViewport = (rect: { top: number; left: number; bottom: number; right: number }) => {
  if (!rect) return false;

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
};

const isPartiallyInViewport = (rect: {
  top: number;
  bottom: number;
  left: number;
  right: number;
}) => {
  if (!rect) return false;

  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  );
};

export const useScroll = ({
  containerRef,
  slideRef,
  useVisiblePhase = false,
  callback,
}: UseScrollArgs) => {
  const [phase, setPhase] = useState(0);
  const [isActive, setIsActive] = useState(false);
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
              setIsActive(isInViewport(slideRect));
              const totalScrollable = slideRect.height - containerRect.height;
              const offsetTop = slideRect.top - containerRect.top;
              const scrolled = -offsetTop;
              phaseCalc = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
            } else {
              // новый режим: top слайда коснулся bottom контейнера → 0
              // bottom слайда ушёл за top контейнера → 1
              setIsActive(isPartiallyInViewport(slideRect));
              const totalScrollable = containerRect.height + slideRect.height;
              const offsetTop = containerRect.top - slideRect.height;
              const scrolled = -offsetTop;
              phaseCalc = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
            }
            callback?.(phaseCalc, isActive);
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
  }, [containerRef, slideRef, useVisiblePhase, callback, isActive]);
  return { phase, isActive };
};
