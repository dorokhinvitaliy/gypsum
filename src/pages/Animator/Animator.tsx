import { Button, Flex, Text, Centered, Col, Icon, Link, Slide } from '@/components';

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
    <Slide style={{ overflow: 'hidden' }}>
      <Centered>
        <svg
          id="visual"
          viewBox="0 0 960 540"
          width="960"
          height="540"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
            width: '100%',
            height: '100%',
            transform: `scale(1.4) translate(-${cursor.x}px, -${cursor.y}px)`,
            transition: 'all 3s ease',
          }}
          version="1.1"
        >
          <rect x="0" y="0" width="960" height="540" fill="#FFFFFF"></rect>
          <defs>
            <linearGradient id="grad1_0" x1="43.8%" y1="0%" x2="100%" y2="100%">
              <stop offset="14.444444444444446%" stop-color="#ffffff" stop-opacity="1"></stop>
              <stop offset="85.55555555555554%" stop-color="#ffffff" stop-opacity="1"></stop>
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="grad2_0" x1="0%" y1="0%" x2="56.3%" y2="100%">
              <stop offset="14.444444444444446%" stop-color="#ffffff" stop-opacity="1"></stop>
              <stop offset="85.55555555555554%" stop-color="#ffffff" stop-opacity="1"></stop>
            </linearGradient>
          </defs>
          <g transform="translate(960, 0)">
            <path
              d="M0 270C-34.3 241 -68.6 212 -111.5 193.1C-154.4 174.2 -206 165.5 -233.8 135C-261.7 104.5 -265.8 52.3 -270 0L0 0Z"
              fill="#0066ff2e"
            ></path>
          </g>
          <g transform="translate(0, 540)">
            <path
              d="M0 -270C29.8 -233.1 59.5 -196.3 103 -178.4C146.5 -160.5 203.7 -161.6 233.8 -135C263.9 -108.4 267 -54.2 270 0L0 0Z"
              fill="#0066ff2a"
            ></path>
          </g>
        </svg>
        <Flex
          wrap="nowrap"
          alignItems="center"
          style={{
            maxWidth: 900,
            /*  transform: `translate(-${cursor.x / 2}px, -${cursor.y / 2}px)`,
          transition: 'all .3s ease', */
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}Developer.svg`}
            width={500}
            height={500}
            alt="developer"
          />
          <Col gap={16}>
            <Text variant="heading-1">
              Анимации и переходы в{' '}
              <Text color="brand" variant="heading-1">
                Gypsum UI
              </Text>
            </Text>
            <Text variant="body-0d5">
              Сейчас ты можешь посмотреть, как работают Animation и Transition в Gypsum UI на
              главной. Направимся туда?
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
    </Slide>
  );
};

export default Animator;
