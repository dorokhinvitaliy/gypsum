import {
  Slide,
  Col,
  Transition,
  Animation,
  Flex,
  Card,
  Text,
  Button,
  Icon,
  Link,
} from '@/components';
import CaretRightOutline from '@/components/Icons/CaretRightOutline';
import Stars from './Stars';

import styles from './Home.module.scss';
import asideStyles from '@/components/Navigation/Navigation.module.scss';

export default function GreetingSlide() {
  const checkScroll = (phase: number) => {
    if (phase >= 0.9) {
      document.querySelector(`.${asideStyles.aside_container}`)?.classList.add(asideStyles.dark);
    } else {
      document.querySelector(`.${asideStyles.aside_container}`)?.classList.remove(asideStyles.dark);
    }
  };
  return (
    <Slide duration={5} className={styles.enter} onSlideScroll={pr => checkScroll(pr)}>
      <div className={styles.floatingHint}>
        Просто начни листать
        <div className={styles.scrollBlock}>
          <div className={styles.scroller}></div>
        </div>
      </div>
      <Stars></Stars>
      <Col gap={8} alignItems="center" justifyContent="center" style={{ height: '100%' }}>
        <Transition
          transitions={{
            gap: {
              from: 32,
              to: 0,
              phase: { start: 0.3, stop: 0.4 },
              pattern: '{}px',
            },
          }}
        >
          <Flex alignItems="center">
            <Transition
              transitions={{
                scale: { from: 1, to: 35, phase: { start: 0.6, stop: 0.8 } },
                translateX: {
                  from: 0,
                  to: 10,
                  phase: { start: 0.5, stop: 0.8 },
                  pattern: '{}px',
                },
                rotate: {
                  from: 0,
                  to: 90,
                  phase: { start: 0.5, stop: 0.8 },
                  pattern: '{}deg',
                },
              }}
            >
              <svg
                width="308"
                height="308"
                viewBox="0 0 308 308"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ zIndex: 1 }}
              >
                <Transition
                  transitions={{
                    opacity: {
                      from: 1,
                      to: 0,
                      phase: {
                        start: 0,
                        stop: 0.3,
                      },
                    },
                  }}
                >
                  <rect width="308" height="308" rx="76" fill="#2558CF" />
                </Transition>
                <Transition
                  transitions={{
                    x: {
                      from: 154,
                      to: 600,
                      pattern: '{}px',
                      phase: { start: 0, stop: 0.3 },
                    },
                  }}
                >
                  <rect
                    x="154"
                    y="28.2965"
                    width="178.191"
                    height="178.191"
                    rx="53"
                    transform="rotate(45 154 28.2965)"
                    fill="white"
                  />
                </Transition>
                <Transition
                  transitions={{ scale: { from: 1, to: 2, phase: { start: 0.1, stop: 0.4 } } }}
                >
                  <path
                    d="M153.023 111.855C153.371 109.594 156.629 109.594 156.977 111.855L162.148 145.489C162.28 146.346 162.949 147.02 163.805 147.159L196.846 152.526C199.085 152.89 199.085 156.11 196.846 156.474L163.805 161.841C162.949 161.98 162.28 162.654 162.148 163.511L156.977 197.145C156.629 199.406 153.371 199.406 153.023 197.145L147.852 163.511C147.72 162.654 147.051 161.98 146.195 161.841L113.154 156.474C110.915 156.11 110.915 152.89 113.154 152.526L146.195 147.159C147.051 147.02 147.72 146.346 147.852 145.489L153.023 111.855Z"
                    fill="#2558CF"
                    style={{ transformOrigin: 'center' }}
                  />
                </Transition>
              </svg>
            </Transition>
            <Text variant="display-1" style={{ color: '#2558CF' }}>
              Gypsum
            </Text>
          </Flex>
        </Transition>
        <Transition
          transitions={{
            translateY: {
              from: 50,
              to: 0,
              phase: {
                start: 0.4,
                stop: 0.5,
              },
              pattern: '{}px',
            },
            opacity: {
              from: 0,
              to: 1,
              phase: { start: 0.4, stop: 0.5 },
            },
          }}
        >
          <Text variant="body-1" color="brand" className={styles.logoHint}>
            Прогрессивный UI Kit для ваших решений
          </Text>
        </Transition>
        <Animation
          animations={{
            opacity: {
              from: 0,
              to: 1,
              frame: 0.8,
              duration: 500,
            },
            pointerEvents: {
              from: 'none',
              to: 'all',
              frame: 0.8,
            },
            display: {
              from: 'none',
              to: 'flex',
              frame: 0.5,
            },
          }}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 100,
            }}
          >
            <Animation
              animations={{
                background: { from: 'var(--gy-color-brand)', to: '#0d255d', frame: 0.8 },
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                <svg
                  id="visual"
                  viewBox="0 0 900 600"
                  width="900"
                  height="600"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  className={styles.blobs}
                >
                  <g transform="translate(900, 0)">
                    <path
                      className={styles.floatingL}
                      d="M0 297.5C-39.1 294.1 -78.3 290.8 -113.8 274.8C-149.4 258.8 -181.3 230.1 -197.3 197.3C-213.2 164.5 -213.2 127.7 -227.3 94.1C-241.3 60.6 -269.4 30.3 -297.5 0L0 0Z"
                      fill="#6a71f0"
                    ></path>
                  </g>
                  <g transform="translate(0, 600)">
                    <path
                      className={styles.floating}
                      d="M0 -297.5C28.6 -269.2 57.3 -241 95.7 -231C134.1 -220.9 182.2 -229 210.3 -210.3C238.5 -191.7 246.6 -146.3 257.8 -106.8C268.9 -67.3 283.2 -33.6 297.5 0L0 0Z"
                      fill="#6a71f0"
                    ></path>
                  </g>
                </svg>
              </div>
            </Animation>
            <Animation
              animations={{
                opacity: {
                  from: 0,
                  to: 1,
                  frame: 0.9,
                  duration: 500,
                },
                translateX: {
                  from: -30,
                  to: 0,
                  pattern: '{}px',
                  frame: 0.9,
                  duration: 500,
                },
              }}
            >
              <Card gap={16} wrap="nowrap" className={styles.greetingCard}>
                <Text variant="heading-1" color="primary">
                  Продолжаем знакомство?
                </Text>{' '}
                <Text variant="body-1" color="primary">
                  Интересный факт, это презентация создана с помощью компонентов анимации GypsumUI.
                  Эти анимации, как вы успели заметить, завязаны на скроле страницы.{' '}
                </Text>
                <Flex gap={8}>
                  <Link to="#scroll">
                    <Button size="l">
                      <b>Продолжим</b> <Icon size={25} data={CaretRightOutline}></Icon>
                    </Button>
                  </Link>
                  <Link to="/demo">
                    <Button size="l" theme="secondary">
                      <b>Сразу к демо</b>
                    </Button>
                  </Link>
                </Flex>
              </Card>
            </Animation>
          </Flex>
        </Animation>
      </Col>
    </Slide>
  );
}
