import { useContext, useRef, useState, type HTMLAttributes } from 'react';

import styles from './Animation.module.scss';
import React from 'react';
import { useTransition } from './useTransition';
import SlideContext from './slideContext';
import type { Animations, Transitions } from './types';
import { useScroll } from './useScroll';
import classNames from 'classnames';
import { useAnimation } from './useAnimation';

const Slides = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.slides}>{children}</div>;
};

export { Slides };

const Slide = ({
  children,
  duration = 1,
  className = '',
  visibleBounds = false,
  style,
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  visibleBounds?: boolean;
} & HTMLAttributes<HTMLDivElement>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  if (duration === 1) visibleBounds = true;
  useScroll({ containerRef, slideRef, setPhase, useVisiblePhase: visibleBounds });

  return (
    <div
      ref={containerRef}
      data-phase={phase}
      className={styles.slideArea}
      style={{ height: `${duration * 100}vh` }}
    >
      <div ref={slideRef} className={classNames(styles.slide, className)} style={{ ...style }}>
        <SlideContext value={{ phase: phase }}>{children}</SlideContext>
      </div>
    </div>
  );
};

export { Slide };

const Transition = ({
  children,
  transitions,
}: {
  children: React.ReactNode;
  transitions: Transitions;
}) => {
  const { phase } = useContext(SlideContext);
  const styles = useTransition({ phase, transitions });
  if (phase === -1)
    return 'You cannot use Transition separately from Slide component because it uses the phase of scrolling.';
  return React.cloneElement(children, {
    style: {
      ...(children?.props.style || {}),
      ...styles,
    },
  });
};

export { Transition };

type AnimationProps = {
  animations: Animations;
  children: React.ReactNode;
};

const Animation = ({ animations, children }: AnimationProps) => {
  const { phase } = useContext(SlideContext);
  const { ref, styles } = useAnimation(animations, phase);

  return React.cloneElement(children, {
    style: {
      ...(children?.props.style || {}),
      ...styles,
    },
    ref: ref,
  });
};

export { Animation };
