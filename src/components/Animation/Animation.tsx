import { useContext, useRef, useState } from 'react';

import styles from './Animation.module.scss';
import React from 'react';
import { useTransition } from './useTransition';
import SlideContext from './slideContext';
import type { Transitions } from './types';
import useScroll from './useScroll';

const Animation = () => {
  return;
};

const Slides = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.slides}>{children}</div>;
};

export { Slides };

const Slide = ({ children, duration }: { children: React.ReactNode; duration: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useScroll({ containerRef, slideRef, duration, setPhase });

  return (
    <div
      ref={containerRef}
      data-phase={phase}
      className={styles.slideArea}
      style={{ height: `${duration * 100}vh` }}
    >
      <div ref={slideRef} className={styles.slide}>
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
  return React.cloneElement(children, {
    style: {
      ...(children?.props.style || {}),
      ...styles,
    },
  });
};

export { Transition };

export default Animation;
