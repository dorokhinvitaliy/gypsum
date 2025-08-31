export type TransitionDef = {
  from: number;
  to: number;
  phase: { start: number; stop: number };
  pattern?: string; // например "{}px" или "scale({})"
};

export type Transitions = Record<string, TransitionDef>;
