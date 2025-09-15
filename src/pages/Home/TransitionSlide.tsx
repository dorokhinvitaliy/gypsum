import {
  Centered,
  Flex,
  Col,
  Anchor,
  Code,
  Text,
  Animation,
  Slide,
  Card,
  Transition,
} from '@/components';
import { usePhase } from '@/components/Animation/usePhase';
import { themes } from 'prism-react-renderer';
import { useState } from 'react';

import styles from './Home.module.scss';

export default function TransitionSlide() {
  const Phase = () => {
    const phase = usePhase();
    return <>{phase.toFixed(2)}</>;
  };
  const [hiddenLines, setHiddenLines] = useState<number[]>([]);
  const [highlightedLines, setHighlightedLines] = useState<number[]>([]);

  const range = (a: number, b: number) => {
    const result = [];
    for (let i = a; i <= b; i++) {
      result.push(i);
    }
    return result;
  };

  const avoid = (list1: number[], list2: number[]) => {
    const s = new Set(list2);
    return list1.filter(e => !s.has(e));
  };

  const keys = [0, 0.3, 0.5, 0.7, 0.9];

  const lines = [range(2, 7), range(8, 12), range(13, 18), range(19, 23)];
  const allLines = range(2, 23);

  const codeAnimationController = (phase: number) => {
    for (let i = 1; i < keys.length; i++) {
      if (phase <= keys[i] && phase > keys[i - 1]) {
        setHiddenLines(avoid(allLines, lines[i - 1]));

        setHighlightedLines(lines[i - 1]);

        break;
      }
    }
  };
  const animationCode = `
<Transition
  transitions={{
    rotate: {
      from: 0,
      to: 360,
      pattern: '{}deg',
      phase: { start: ${keys[0]}, stop: ${keys[1]} },
    },
    scale: {
      from: 1,
      to: 1.4,
      phase: { start: ${keys[1]}, stop: ${keys[2]} },
    },
    translateX: {
      from: 0,
      to: -80,
      phase: { start: ${keys[2]}, stop: ${keys[3]} },
      pattern: '{}px',
    },
    offsetDistance: {
      from: 0,
      to: 100,
      pattern: "{}%",
      phase: { start: ${keys[3]}, stop: ${keys[4]} },
    },
  }}
>
  {children}
</Transition>`;

  return (
    <Slide
      style={{
        padding: '1rem',
        backgroundColor: '#212632',
      }}
      duration={6}
      className="dark"
      onSlideScroll={codeAnimationController}
    >
      {/*       <Animation
        animations={{
          display: {
            from: 'none',
            to: 'flex',
            frame: 0.02,
          },
        }}
      >
        <div className={classNames(styles.floatingHint, styles.dark)}>
          Постарайся листать плавно
          <div className={styles.scrollBlock}>
            <div className={styles.scroller}></div>
          </div>
        </div>
      </Animation> */}
      <Centered>
        <Flex
          gap={8}
          alignItems="center"
          justifyContent="space-between"
          style={{ width: '100%', maxWidth: '1000px' }}
        >
          <div className={styles.withHighlight}>
            <Animation
              animations={{
                opacity: {
                  from: 0,
                  to: 1,
                  frame: 0.01,
                  timingFunction: 'ease-in-out',
                },
              }}
            >
              <div className={styles.fire}></div>
            </Animation>
            <Transition
              transitions={{
                rotate: {
                  from: 0,
                  to: 360,
                  pattern: '{}deg',
                  phase: { start: keys[0], stop: keys[1] },
                },
                scale: {
                  from: 1,
                  to: 1.4,
                  phase: { start: keys[1], stop: keys[2] },
                },
                translateX: {
                  from: 0,
                  to: -80,
                  phase: { start: keys[2], stop: keys[3] },
                  pattern: '{}px',
                },
                offsetDistance: {
                  from: 0,
                  to: 100,
                  pattern: '{}%',
                  phase: { start: keys[3], stop: keys[4] },
                },
              }}
            >
              <img
                src="/prettyLamp.svg"
                width={300}
                height={300}
                alt=""
                style={{ offsetPath: 'path("M 150 150 C 494 150 584 -125 148 42")' }}
              />
            </Transition>
          </div>
          <Col style={{ width: '600px', height: 'fit-content' }} gap={16}>
            <Flex wrap="nowrap" gap={16}>
              <Animation
                animations={{
                  translateX: {
                    from: -30,
                    to: 0,
                    pattern: '{}px',
                    frame: 0.01,
                    timingFunction: 'ease-in-out',
                  },
                  opacity: {
                    from: 0,
                    to: 1,
                    frame: 0.01,
                    timingFunction: 'ease-in-out',
                  },
                }}
              >
                <Card
                  fill="rgb(53 51 115 / 32%)"
                  style={{ borderRadius: '1.5rem' }}
                  className={styles.withHighlight}
                >
                  <div
                    className={styles.fire}
                    style={{ top: '60%', left: '60%', transform: 'none', width: 120, height: 120 }}
                  ></div>
                  <Anchor id="transition">
                    <Text variant="heading-1" color="#A9A6FF">
                      Переходы
                    </Text>{' '}
                  </Anchor>
                  <Text color="#A9A6FF">
                    Transition позволяют делать красивые анимации, завязанные на скролле страницы.
                  </Text>
                </Card>
              </Animation>
              <Animation
                animations={{
                  translateY: {
                    from: -30,
                    to: 0,
                    pattern: '{}px',
                    frame: 0.01,
                    timingFunction: 'ease-in-out',
                  },
                  opacity: {
                    from: 0,
                    to: 1,
                    frame: 0.01,
                    timingFunction: 'ease-in-out',
                  },
                }}
              >
                <Card
                  fill="#A9A6FF"
                  style={{ width: '100%', borderRadius: '1.5rem' }}
                  justifyContent="space-between"
                >
                  <Text variant="heading-1" color="#353373">
                    Фаза:
                  </Text>
                  <Text variant="display-1" color="rgb(1, 0, 20, 54%)">
                    <Phase></Phase>
                  </Text>
                </Card>
              </Animation>
            </Flex>
            <Animation
              animations={{
                scale: {
                  from: 0.7,
                  to: 0,
                  pattern: '{}px',
                  frame: 0.01,
                  timingFunction: 'ease-in-out',
                },
                opacity: {
                  from: 0,
                  to: 1,
                  frame: 0.01,
                  timingFunction: 'ease-in-out',
                },
              }}
            >
              <Code
                code={animationCode}
                theme={themes.vsDark}
                hideLines={hiddenLines}
                highlightedLines={highlightedLines}
                lang="tsx"
                style={{ borderRadius: '1.5rem' }}
              ></Code>
            </Animation>
          </Col>
        </Flex>
      </Centered>
    </Slide>
  );
}
