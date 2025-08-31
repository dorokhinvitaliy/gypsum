import { useEffect, type RefObject } from 'react';

interface UseScrollArgs {
  containerRef: RefObject<HTMLElement | null>;
  slideRef: RefObject<HTMLElement | null>;
  setPhase: (phase: number) => void;
  duration?: number; // если нужен для расчётов
}

const useScroll = ({ containerRef, slideRef, setPhase, duration }: UseScrollArgs) => {
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

            const totalScrollable = slideRect.height - containerRect.height;
            const offsetTop = slideRect.top - containerRect.top;
            const scrolled = -offsetTop;
            const phaseCalc = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

            setPhase(phaseCalc);
          }

          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerRef, slideRef, setPhase, duration]);
};

export default useScroll;
