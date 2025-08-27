'use client';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './Input.module.css';

import type { Option } from './Select.type.ts';

import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { useClickOutside } from './useClickOutside.ts';

export default function Select({
  options,
  selected,
  placeholder,
  floatingOptions,
  onChange,
  closeAfterSelect = true,
}: {
  options: Option[];
  selected?: Option | null;
  placeholder: string;
  floatingOptions?: boolean;
  onChange: (arg0: Option) => void;
  closeAfterSelect: boolean;
}) {
  const [focused, updateFocused] = useState(false);
  const [empty, updateEmpty] = useState(selected == null);

  const optionsRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('0px');

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => updateFocused(false));

  useEffect(() => {
    if (focused && optionsRef.current) {
      const scrollHeight = optionsRef.current.scrollHeight;
      setHeight(`${scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [focused, options]);

  return (
    <div
      ref={ref}
      className={classNames(styles.selectBox_container, { [styles.floating]: floatingOptions })}
    >
      <div
        onClick={() => updateFocused(!focused)}
        className={classNames(styles.inputBox, styles.selectBox, {
          [styles.active]: focused,
          [styles.empty]: empty,
        })}
      >
        <div className={styles.inputWrapper}>
          <div className={styles.inputBoxLabel}>
            <span>{placeholder}</span>
          </div>
          <div className={styles.inputBoxField}>{selected?.text}</div>
        </div>
        <ChevronDownIcon className={styles.inputBoxIcon} />
      </div>
      <div className={styles.selectBox_options} style={{ height: height }} ref={optionsRef}>
        <div className={styles.optionsGroup}>
          {options.map(option => (
            <div
              key={'option_' + option.id}
              className={classNames(styles.selectBox_option, {
                [styles.selected]: option.id == selected?.id,
              })}
              onClick={() => {
                onChange(option);
                updateEmpty(false);
                updateFocused(!closeAfterSelect);
              }}
            >
              <div>{option.text}</div>
              <CheckIcon className={styles.optionIcon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
