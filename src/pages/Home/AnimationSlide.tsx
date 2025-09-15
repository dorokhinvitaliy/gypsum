import { Centered, Flex, Col, Anchor, Code, Text, Animation, Slide, Card } from '@/components';
import { usePhase } from '@/components/Animation/usePhase';
import { themes } from 'prism-react-renderer';
import { useState } from 'react';

import styles from './Home.module.scss';
import classNames from 'classnames';

export default function AnimationSlide() {
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

  const keys = [0.2, 0.4, 0.7, 0.9];

  const lines = [range(2, 8), range(9, 14), range(15, 20), range(21, 26)];
  const allLines = range(2, 26);

  const codeAnimationController = (phase: number) => {
    for (let i = 0; i < keys.length; i++) {
      if (phase <= keys[i] + 0.05 && (i > 0 ? phase > keys[i - 1] : true)) {
        setHiddenLines(avoid(allLines, lines[i]));
        if (Math.abs(phase - keys[i]) <= 0.05) {
          setHighlightedLines(lines[i]);
        } else {
          setHighlightedLines([]);
        }

        break;
      }
    }
  };
  const animationCode = `
  <Animation
    animations={{
      opacity: {
        from: 0,
        to: 1,
        frame: ${keys[0]},
        timingFunction: 'ease-in-out',
        duration: 1000,
      },
      rotate: {
        from: 0,
        to: 90,
        pattern: '{}deg',
        frame: ${keys[1]},
      },
      scale: {
        from: 1,
        to: 3,
        frame: ${keys[2]},
        duration: 1000,
      },
      offsetDistance: {
        from: 0,
        to: 100,
        frame: ${keys[3]},
        pattern: '{}%',
      },
    }}
  >
    {children}
  </Animation>`;

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
      <Animation
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
      </Animation>
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
            <Animation
              animations={{
                opacity: {
                  from: 0,
                  to: 1,
                  frame: keys[0],
                  timingFunction: 'ease-in-out',
                  duration: 600,
                },
                rotate: {
                  from: 0,
                  to: 90,
                  pattern: '{}deg',
                  frame: keys[1],
                },
                scale: {
                  from: 1,
                  to: 1.5,
                  frame: keys[2],
                },
                ['offset-distance']: {
                  from: 0,
                  to: 100,
                  frame: keys[3],
                  pattern: '{}%',
                  duration: 1000,
                  timingFunction: 'ease-in-out',
                },
              }}
            >
              <img
                src="/prettyRocket.svg"
                width={300}
                height={300}
                alt=""
                style={{
                  offsetPath:
                    'path("M 150 150 C 160 150 1488 149 900 -1582 C -582 -1211 -1086 139 150 150")',
                }}
              />
            </Animation>
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
                <Card fill="rgb(53 51 115 / 32%)" className={styles.withHighlight}>
                  <div
                    className={styles.fire}
                    style={{ top: '60%', left: '60%', transform: 'none', width: 120, height: 120 }}
                  ></div>
                  <Anchor id="scroll">
                    <Text variant="heading-1" color="#A9A6FF">
                      Анимации
                    </Text>{' '}
                  </Anchor>
                  <Text color="#A9A6FF">
                    Animation позволяет делать красивые анимации на основе CSS.
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
                <Card fill="#A9A6FF" style={{ width: '70%', borderRadius: '1.5rem' }}>
                  <Text variant="heading-1" color="#353373">
                    Фаза:
                  </Text>
                  <Text color="rgb(1, 0, 20, 54%)" variant="display-1">
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
