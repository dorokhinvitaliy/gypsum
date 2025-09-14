import { Slides } from '@/components';

import AnimationSlide from './AnimationSlide';
import GreetingSlide from './GreetingSlide';
import TransitionSlide from './TransitionSlide';
import MainComponents from './MainComponents';
import OverviewSlide from './OverviewSlide';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <Slides>
      <GreetingSlide></GreetingSlide>
      {/* <Slide style={{ background: 'rgb(13, 37, 93)', padding: '1rem' }}>
        <Flex gap={16} style={{ maxWidth: '100%' }} wrap="nowrap">
          <Col wrap="nowrap" gap={16} style={{ width: '120%' }}>
            <Animation
              animations={{
                translateX: { from: -30, to: 0, pattern: '{}px', frame: 0.3 },
                opacity: { from: 0, to: 1, frame: 0.3 },
              }}
            >
              <Card theme="white" size="xl">
                <Anchor id="aside">Aside</Anchor>
                <Text variant="body-0d5">
                  Тсс, пока выключим свет и разберем первые UI - элементы, которые нам попались.
                </Text>
                <Text variant="body-0d5">
                  Слева ты видишь <code>Aside</code> меню. Очень удобная штука для проекта.
                </Text>
              </Card>
            </Animation>
            <Animation
              animations={{
                translateX: { from: -30, to: 0, pattern: '{}px', frame: 0.4 },
                opacity: { from: 0, to: 1, frame: 0.4 },
              }}
            >
              <Card theme="filled" size="xl">
                <Anchor id="anchor">Якорь</Anchor>
                <Text variant="body-0d5">
                  Якорь - это удобная ссылка, обозначающая заголовок, к которому можно вернуться. Ты
                  можешь навести курсор на заголовок данной карточки и проверить, как это работает.
                </Text>
                <Text variant="body-0d5">
                  Слева ты видишь <code>Aside</code> меню. Очень удобная штука для проекта.
                </Text>
              </Card>
            </Animation>
          </Col>
          <Col wrap="nowrap" gap={16} style={{ width: '100%' }}>
            <Animation
              animations={{
                translateX: {
                  from: -30,
                  to: 0,
                  pattern: '{}px',
                  frame: 0.4,
                  timingFunction: 'ease-in-out',
                },
                opacity: { from: 0, to: 1, frame: 0.4 },
              }}
            >
              <Card theme="white" size="xl">
                <Anchor id="aside">Animation</Anchor>
                <Text variant="body-0d5">
                  Эта штука делает красивые css-анимации, в зависимотси от скролла страницы.
                </Text>
              </Card>
            </Animation>
            <Animation
              animations={{
                translateX: { from: -30, to: 0, pattern: '{}px', frame: 0.4 },
                opacity: { from: 0, to: 1, frame: 0.4 },
              }}
            >
              <Card theme="filled" size="xl" brandColor="#9009eaff">
                <Anchor id="anchor">Якорь</Anchor>
                <Text variant="body-0d5">
                  Тсс, пока выключим свет и разберем первые UI - элементы, которые нам попались.
                </Text>
                <Text variant="body-0d5">
                  Слева ты видишь <code>Aside</code> меню. Очень удобная штука для проекта.
                </Text>
              </Card>
            </Animation>
          </Col>
        </Flex>
      </Slide> */}
      <AnimationSlide></AnimationSlide>
      <TransitionSlide></TransitionSlide>
      <OverviewSlide></OverviewSlide>
      <MainComponents></MainComponents>
      <Footer></Footer>
    </Slides>
  );
}
