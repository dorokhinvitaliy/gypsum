import { useEffect, useRef, useState } from 'react';

type AnimationDef = {
  from: number;
  to: number;
  frame?: number; // момент старта (0..1)
  duration?: number; // ms
  rewindable?: boolean;
  animationCount?: number | 'infinite';
  pattern?: string;
};

type Animations = Record<string, AnimationDef>;

type AnimationState = {
  triggered: boolean;
  isAnimating: boolean;
};

export function useAnimation(animations: Animations, phase: number) {
  const [styles, setStyles] = useState<Record<string, string | number>>({});
  const ref = useRef<HTMLElement>(null);
  const animationStates = useRef<Record<string, AnimationState>>({});

  useEffect(() => {
    const newStyles: Record<string, string | number> = {};
    const transformValues: Record<string, string> = {};
    const transitionProperties: string[] = [];

    Object.entries(animations).forEach(([prop, anim]) => {
      const startFrame = anim.frame ?? 0;

      // Инициализируем состояние анимации если его нет
      if (!animationStates.current[prop]) {
        animationStates.current[prop] = {
          triggered: false,
          isAnimating: false,
        };
      }

      const state = animationStates.current[prop];
      const duration = anim.duration ?? 200;

      if (['scale', 'translateX', 'translateY', 'rotate'].includes(prop)) {
        transitionProperties.push(`transform ${duration}ms ease`);
      } else {
        transitionProperties.push(`${prop} ${duration}ms ease`);
      }

      // Логика запуска анимации вперед - срабатывает при достижении frame
      if (phase >= startFrame && !state.triggered) {
        state.triggered = true;
        state.isAnimating = true;

        // Добавляем transition для плавности
        /* if (['scale', 'translateX', 'translateY', 'rotate'].includes(prop)) {
          transitionProperties.push(`transform ${duration}ms ease`);
        } else {
          transitionProperties.push(`${prop} ${duration}ms ease`);
        } */

        // Устанавливаем конечное значение - CSS transition сделает плавную анимацию
        const value = anim.to;
        if (['scale', 'translateX', 'translateY', 'rotate'].includes(prop)) {
          const pattern = anim.pattern ?? `${prop}({})`;
          transformValues[prop] = pattern.replace('{}', value.toString());
        } else {
          const pattern = anim.pattern ?? '{}';
          newStyles[prop] = pattern.replace('{}', value.toString());
        }

        // Убираем флаг анимации после завершения
        setTimeout(() => {
          if (animationStates.current[prop]) {
            animationStates.current[prop].isAnimating = false;
          }
        }, duration);
      }

      // Логика обратного проигрывания - срабатывает при уходе назад за frame
      else if (anim.rewindable && phase < startFrame && state.triggered) {
        state.triggered = false;
        state.isAnimating = true;

        // Добавляем transition для плавного возврата
        /* if (['scale', 'translateX', 'translateY', 'rotate'].includes(prop)) {
          transitionProperties.push(`transform ${duration}ms ease`);
        } else {
          transitionProperties.push(`${prop} ${duration}ms ease`);
        } */

        // Возвращаем к начальному значению с анимацией
        const value = anim.from;
        if (['scale', 'translateX', 'translateY', 'rotate'].includes(prop)) {
          const pattern = anim.pattern ?? `${prop}({})`;
          transformValues[prop] = pattern.replace('{}', value.toString());
        } else {
          const pattern = anim.pattern ?? '{}';
          newStyles[prop] = pattern.replace('{}', value.toString());
        }

        setTimeout(() => {
          if (animationStates.current[prop]) {
            animationStates.current[prop].isAnimating = false;
          }
        }, duration);
      }

      // Если анимация не rewindable и мы ушли назад за frame - мгновенный сброс
      else if (!anim.rewindable && phase < startFrame && state.triggered) {
        state.triggered = false;
        state.isAnimating = false;

        // Мгновенно возвращаем к начальному значению (без transition)
        const value = anim.from;
        if (['scale', 'translateX', 'translateY', 'rotate'].includes(prop)) {
          const pattern = anim.pattern ?? `${prop}({})`;
          transformValues[prop] = pattern.replace('{}', value.toString());
        } else {
          const pattern = anim.pattern ?? '{}';
          newStyles[prop] = pattern.replace('{}', value.toString());
        }
      }

      // Если анимация не сработала - показываем начальное значение
      else if (!state.triggered) {
        const value = anim.from;
        if (['scale', 'translateX', 'translateY', 'rotate'].includes(prop)) {
          const pattern = anim.pattern ?? `${prop}({})`;
          transformValues[prop] = pattern.replace('{}', value.toString());
        } else {
          const pattern = anim.pattern ?? '{}';
          newStyles[prop] = pattern.replace('{}', value.toString());
        }
      }

      // Если анимация уже сработала и завершена - показываем конечное значение
      else if (state.triggered && !state.isAnimating) {
        const value = anim.to;
        if (['scale', 'translateX', 'translateY', 'rotate'].includes(prop)) {
          const pattern = anim.pattern ?? `${prop}({})`;
          transformValues[prop] = pattern.replace('{}', value.toString());
        } else {
          const pattern = anim.pattern ?? '{}';
          newStyles[prop] = pattern.replace('{}', value.toString());
        }
      }
    });

    // Собираем transform
    if (Object.keys(transformValues).length > 0) {
      newStyles.transform = Object.values(transformValues).join(' ');
    }

    // Добавляем transition только если сейчас происходит анимация
    // if (transitionProperties.length > 0) {
    newStyles.transition = transitionProperties.join(', ');
    // }

    setStyles(newStyles);
  }, [phase, animations]);

  return { ref, styles };
}
