import { Button, Centered, Checkbox, Col, Flex, Icon, Text } from '@/components';

import styles from './LiveDemo.module.scss';
import { useEffect, useRef, useState } from 'react';
import CrossSolid from '../Icons/CrossSolid';
import CaretRightOutline from '../Icons/CaretRightOutline';
import classNames from 'classnames';

type PropBase = {
  name: string;
  case?: boolean;
};

type PropBool = {
  type: 'checkbox';
  variable: boolean;
  onChange: (arg0: boolean) => void;
};

type PropText = {
  type: 'text';
  variable: string;
  onChange: (arg0: string) => void;
};

type PropNumber = {
  type: 'number';
  variable: number;
  onChange: (arg0: number) => void;
};

type PropComputed = PropBase & (PropBool | PropText | PropNumber);

const LiveDemo = ({
  children,
  props,
  floatingProps = true,
}: {
  children: React.ReactNode;
  props: PropComputed[];
  floatingProps?: boolean;
}) => {
  const [opened, setOpened] = useState(false);
  const [width, setWidth] = useState(0);
  const wrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (wrapper.current) {
      if (opened) {
        setWidth(wrapper.current.scrollWidth);
      } else {
        setWidth(0);
      }
    }
  }, [opened]);
  return (
    <Flex
      className={classNames(styles.container, { [styles.floatingProps]: floatingProps })}
      wrap="nowrap"
    >
      <div ref={wrapper} className={styles.optionsMenuWrapper} style={{ width }}>
        {props.length && (
          <div className={styles.optionsMenu}>
            <Col gap={16}>
              <Flex alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
                <Text variant="heading-3">Опции</Text>{' '}
                <Button size="m" theme="normal-flat" onClick={() => setOpened(false)}>
                  <Icon size={30} data={CrossSolid}></Icon>
                </Button>
              </Flex>
              {props.map(prop => (
                <Prop key={prop.name} {...prop} />
              ))}
            </Col>
          </div>
        )}
      </div>
      <div
        className={styles.liveArea}
        style={{ width: opened && !floatingProps ? `calc(100% - ${width}px)` : '100%' }}
      >
        {props.length ? (
          <Button
            className={classNames(styles.floating, { [styles.hidden]: opened })}
            size="xs"
            theme="normal-flat"
            onClick={() => setOpened(true)}
          >
            <Icon size={30} data={CaretRightOutline}></Icon>
          </Button>
        ) : (
          ''
        )}
        <Centered style={{ minHeight: '400px' }}>{children}</Centered>
      </div>
    </Flex>
  );
};

const Prop = ({ name, variable, type, onChange }: PropComputed) => {
  if (type === 'checkbox')
    return (
      <Flex gap={8}>
        <Text variant="body-1" color="secondary">
          {name}
        </Text>
        <Checkbox
          label={''}
          checked={variable}
          onChange={onChange}
          style={{ width: 'fit-content' }}
        />
      </Flex>
    );
  if (type === 'text')
    return (
      <Flex gap={8}>
        <Text variant="body-1" color="secondary">
          {name}:{' '}
        </Text>
        <input
          className={styles.simpleInput}
          type="text"
          value={variable}
          onChange={e => onChange(e.target.value)}
        />
      </Flex>
    );
  if (type === 'number') {
    return (
      <Flex gap={8}>
        <Text variant="body-1" color="secondary">
          {name}:{' '}
        </Text>
        <input
          className={styles.simpleInput}
          type="number"
          value={Number(variable)}
          onChange={e => onChange(Number(e.target.value))}
        />
      </Flex>
    );
  }
};

export default LiveDemo;
