import { createContext } from 'react';

export type SlideContextType = { phase: number };

const SlideContext = createContext<SlideContextType>({ phase: 0 });
export default SlideContext;
