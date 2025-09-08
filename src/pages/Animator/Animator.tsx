import { Button, Card, Flex, Text, Slide, Slides, Transition, Animation } from '@/components';

import { usePhase } from '@/components/Animation/usePhase';

const Helper = () => {
  const phase = usePhase();
  return (
    <div>
      <Transition
        transitions={{
          letterSpacing: {
            from: 0,
            to: 10,
            phase: {
              start: 0,
              stop: 0.5,
            },
            pattern: '{}px',
          },
        }}
      >
        <span>Привет</span>
      </Transition>
      , а фаза такая: {phase}
      <Button>Кнопка</Button>
    </div>
  );
};

const Phase = () => {
  const phase = usePhase();
  return <>{(phase * 100).toFixed(2)}</>;
};

const Animator = () => {
  return (
    <Slides>
      <Slide duration={4}>
        <Transition
          transitions={{
            scale: {
              from: 1,
              to: 3,
              phase: {
                start: 0.8,
                stop: 1,
              },
            },
          }}
        >
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ height: '100%' }}
          >
            <Transition
              transitions={{
                opacity: {
                  from: 0,
                  to: 1,
                  phase: {
                    start: 0.1,
                    stop: 0.3,
                  },
                },
              }}
            >
              <Text variant="display-4" style={{ display: 'block', zIndex: 1 }}>
                Привет
              </Text>
            </Transition>
            <Transition
              transitions={{
                opacity: {
                  from: 0,
                  to: 1,
                  phase: {
                    start: 0,
                    stop: 0.1,
                  },
                },
                filter: {
                  from: 0,
                  to: 10,
                  phase: {
                    start: 0.1,
                    stop: 0.3,
                  },
                  pattern: 'blur({}px)',
                },
              }}
            >
              <Text
                variant="subheading-1"
                style={{ display: 'block', transform: `translateY(${-50}px)` }}
              >
                Начнем знакомство?
              </Text>
            </Transition>
            <Transition
              transitions={{
                translateY: {
                  from: -50,
                  to: 0,
                  pattern: '{}px',
                  phase: {
                    start: 0.6,
                    stop: 0.7,
                  },
                },
                opacity: {
                  from: 0,
                  to: 1,
                  phase: {
                    start: 0.6,
                    stop: 0.7,
                  },
                },
              }}
            >
              <Text variant="subheading-1" style={{ display: 'block' }}>
                Это Gypsum, с нами анимировать просто!
              </Text>
            </Transition>
          </Flex>
        </Transition>
      </Slide>
      <Slide>
        <Transition
          transitions={{
            opacity: {
              from: 0,
              to: 1,
              phase: {
                start: 0.3,
                stop: 0.4,
              },
            },
            translateX: {
              from: -20,
              to: 0,
              phase: {
                start: 0.3,
                stop: 0.4,
              },
              pattern: '{}px',
            },
          }}
        >
          <Card>ghbdtn</Card>
        </Transition>
      </Slide>
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
              pattern: '{}px',
            },
            rotate: {
              from: 0,
              to: 360,
              phase: { start: 0.5, stop: 1 },
              pattern: '{}deg',
            },
          }}
        >
          <div style={{ width: 'fit-content' }}>
            <Helper></Helper>
          </div>
        </Transition>
      </Slide>
      <Slide duration={2} visibleBounds style={{ background: 'red' }}>
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
      <Slide duration={2}>
        <Animation
          animations={{
            scale: { from: 0, to: 1, duration: 1500, frame: 0.3, rewindable: false },
            /*  opacity: { from: 0, to: 1, trigger: 'in-viewport', duration: 300, rewindable: true },
            rotate: { from: 0, to: 360, duration: 1000, animationCount: 'infinite' }, */
          }}
        >
          <div>Привет, мир!</div>
        </Animation>
      </Slide>
      <Slide>
        <Flex alignItems="center" justifyContent="center" direction="column" gap="1rem">
          <div style={{ fontSize: '3rem' }}>Большой текст</div>
          <div>
            Фаза такова <Phase />
          </div>
        </Flex>
      </Slide>
    </Slides>
  );
};

export default Animator;
