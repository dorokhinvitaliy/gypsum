import { Slide, Slides, Transition } from '../../components/Animation/Animation';

import { usePhase } from '../../components/Animation/usePhase';

const Animator = () => {
  return (
    <Slides>
      <Slide duration={2}>
        <Transition
          transitions={{
            marginLeft: {
              from: -30,
              to: 150,
              phase: {
                start: 0,
                stop: 0.3,
              },
              pattern: '{}px', //необязательное свойство для нетривиальных css-свойств
            },
            rotate: {
              from: 0,
              to: 360,
              phase: { start: 0.5, stop: 1 },
              pattern: '{}deg',
            },
          }}
        >
          <b className="red">Привет{usePhase().phase}!</b>
        </Transition>
      </Slide>
      <Slide duration={2}>
        <Transition
          transitions={{
            scale: {
              from: 0,
              to: 1,
              phase: { start: 0.5, stop: 1 },
            },
          }}
        >
          <div className="red">Второй слайд!</div>
        </Transition>
      </Slide>
    </Slides>
  );
};

export default Animator;
