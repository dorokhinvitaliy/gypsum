import classNames from 'classnames';
import Button from '../Button';
import Flex from '../Flex/Flex';

import styles from './Switcher.module.scss';
import { useEffect, useRef, useState, type HTMLAttributes } from 'react';

export type ListItem = { value: string; label: string };

const Switcher = ({
  list,
  selected,
  onChange,
  ...props
}: {
  list: ListItem[];
  selected: ListItem | null;
  onChange: (arg0: ListItem) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>) => {
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const sw = (item: ListItem) => {
    const index = list.findIndex(l => l.value === item.value);
    if (refs.current[index]) {
      setLeft(refs.current[index].offsetLeft);
      setWidth(refs.current[index].offsetWidth);
    }
  };
  useEffect(() => {
    if (selected) sw(selected);
  }, [selected]);
  return (
    <Flex className={styles.switcher} gap={5} {...props}>
      <div className={styles.selectorTrace}>
        <div className={styles.selector} style={{ width: width, marginLeft: left }}></div>
      </div>
      {list.map((item, index) => (
        <Button
          theme="normal-flat"
          ref={(el: HTMLButtonElement | null) => {
            refs.current[index] = el;
          }}
          className={classNames(styles.switchButton, {
            [styles.selected]: selected?.value === item.value,
          })}
          key={item.value}
          onClick={() => onChange(item)}
        >
          {item.label}
        </Button>
      ))}
    </Flex>
  );
};

export default Switcher;
