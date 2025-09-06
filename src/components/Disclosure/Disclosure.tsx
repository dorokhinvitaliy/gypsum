import { createContext, useContext, useEffect, useRef, useState, type HTMLAttributes } from 'react';
import styles from './Disclosure.module.scss';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import Flex from '../Flex/Flex';

const DisclosureContext = createContext<{ opened: boolean; setOpened: (arg0: boolean) => void }>({
  opened: false,
  setOpened: () => {},
});

const Disclosure = ({
  summary,
  filled,
  children,
  width,
  ...rest
}: {
  summary: React.ReactNode;
  filled?: boolean;
  children: React.ReactNode;
  width?: 'max' | 'auto' | number;
} & HTMLAttributes<HTMLDivElement>) => {
  const [opened, setOpened] = useState(false);
  return (
    <DisclosureContext value={{ opened, setOpened }}>
      <Flex
        direction="column"
        className={classNames(styles.disclosure, {
          [styles.opened]: opened,
          [styles.filled]: filled,
          [styles.maxWidth]: width === 'max',
        })}
        {...rest}
      >
        <Summary>{summary}</Summary>
        <Content>{children}</Content>
      </Flex>
    </DisclosureContext>
  );
};

const Summary = ({ children }: { children: React.ReactNode }) => {
  const { opened, setOpened } = useContext(DisclosureContext);
  if (opened === undefined) return 'Cannot use <Summary> apart from <Disclosure>';
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      gap={8}
      className={styles.summary}
      onClick={() => setOpened(!opened)}
    >
      <div className={styles.summaryText}>{children}</div>
      <ChevronDownIcon className={classNames(styles.summaryArrow, { [styles.opened]: opened })} />
    </Flex>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  const { opened } = useContext(DisclosureContext);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (opened && contentRef.current) {
      const realHeight = contentRef?.current?.scrollHeight;
      setContentHeight(realHeight);
    } else {
      setContentHeight(0);
    }
  }, [opened]);
  if (opened === undefined) return 'Cannot use <Content> apart from <Disclosure>';
  return (
    <div className={styles.contentWrapper} ref={contentRef} style={{ height: contentHeight }}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Disclosure;
