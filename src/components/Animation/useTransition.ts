import { useMemo } from 'react';
import type { Transitions } from './types';

const transformProps = new Set([
  'translateX',
  'translateY',
  'translateZ',
  'scale',
  'scaleX',
  'scaleY',
  'rotate',
]);

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export function useTransition({ transitions, phase }: { transitions: Transitions; phase: number }) {
  return useMemo(() => {
    const result: Record<string, string | number> = {};
    const transforms: string[] = [];

    for (const [prop, { from, to, phase: ph, pattern }] of Object.entries(transitions)) {
      // нормализованный прогресс для конкретного свойства
      const localPhase = clamp01((phase - ph.start) / (ph.stop - ph.start));
      const value = lerp(from, to, localPhase);

      if (transformProps.has(prop)) {
        // если это трансформация
        const patt = pattern ? `${prop}(${pattern})` : `${prop}({})`;
        transforms.push(patt.replace('{}', value.toString()));
      } else {
        // обычное свойство
        const patt = pattern ?? '{}';
        result[prop] = patt.replace('{}', value.toString());
      }
    }

    if (transforms.length > 0) {
      result.transform = transforms.join(' ');
    }

    return result;
  }, [transitions, phase]);
}
