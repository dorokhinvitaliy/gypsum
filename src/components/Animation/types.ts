export type TransitionDef = {
  from: number;
  to: number;
  phase: { start: number; stop: number };
  pattern?: string; // например "{}px" или "scale({})"
};

export type Transitions = Record<string, TransitionDef>;

type AnimationDef = {
  from: number | string;
  to: number | string;
  frame?: number; // 0..1
  duration?: number; // ms
  rewindable?: boolean;
  animationCount?: number | 'infinite';
  trigger?: 'in-viewport';
  pattern?: string; // например scale({}) или {}px
};

export type Animations = Record<string, AnimationDef>;
