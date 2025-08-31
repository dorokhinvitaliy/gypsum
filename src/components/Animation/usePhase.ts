import { useContext } from 'react';
import SlideContext, { type SlideContextType } from './slideContext';

const usePhase = (): SlideContextType => {
  const ctx = useContext(SlideContext);
  if (!ctx) {
    throw new Error('usePhase must be used inside <Slide>');
  }
  return ctx;
};

export { usePhase };
