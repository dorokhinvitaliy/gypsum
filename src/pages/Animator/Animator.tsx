import { Button, Flex, Text, Centered, Col, Icon, Link } from '@/components';

import CaretRightOutline from '@/components/Icons/CaretRightOutline';
import { useEffect, useState } from 'react';

const Animator = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const percentX = (e.clientX / window.innerWidth) * 100;
      const percentY = (e.clientY / window.innerHeight) * 100;

      setCursor({ x: percentX, y: percentY });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  return (
    <Centered>
      <Flex
        wrap="nowrap"
        alignItems="center"
        style={{
          maxWidth: 900,
          transform: `translate(-${cursor.x / 2}px, -${cursor.y / 2}px)`,
          transition: 'all .3s ease',
        }}
      >
        <img src="/Developer.svg" width={500} height={500} alt="developer" />
        <Col gap={16}>
          <Text variant="heading-1">Анимации и переходы в Gypsum</Text>
          <Text variant="body-0d5">
            Сейчас ты можешь посмотреть, как работают Animation и Transition в Gypsum UI на главной.
            Направимся туда?
          </Text>
          <Flex gap={8}>
            <Link to="/">
              <Button theme="primary">
                На главную <Icon size={25} data={CaretRightOutline}></Icon>
              </Button>
            </Link>
            <Link to="/#scroll">
              <Button theme="secondary">Сразу к анимациям</Button>
            </Link>
          </Flex>
        </Col>
      </Flex>
    </Centered>
  );
};

export default Animator;
