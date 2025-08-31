'use client';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './Input.module.css';

export default function Input({
  type = 'text',
  value,
  onChange,
  placeholder = 'Поле ввода',
  helperText,
  width = 'auto',
}: {
  type: string;
  value: string;
  onChange: (arg0: string) => void;
  placeholder: string;
  helperText?: string;
  width?: 'max' | 'auto';
}) {
  const [focused, updateFocused] = useState(false);
  const [empty, updateEmpty] = useState(value == '');
  const tipRef = useRef<HTMLDivElement>(null);
  const [tipHeight, setTipHeight] = useState('0px');

  useEffect(() => {
    if (focused && tipRef.current) {
      const scrollHeight = tipRef.current.scrollHeight;
      setTipHeight(`${scrollHeight}px`);
    } else {
      setTipHeight('0px');
    }
  }, [focused]);

  return (
    <div
      className={classNames(styles.inputBox_container, {
        [styles.tipActive]: helperText && focused,
        [styles.maxContainer]: width === 'max',
      })}
    >
      <div
        className={classNames(styles.inputBox, { [styles.active]: focused, [styles.empty]: empty })}
      >
        <label className={styles.inputBoxLabel}>
          <span>{placeholder}</span>
          <input
            type={type}
            value={value}
            onChange={e => {
              onChange(e.target.value);
              updateEmpty(e.target.value == '');
            }}
            onFocus={() => updateFocused(true)}
            onBlur={() => updateFocused(false)}
            className={styles.inputBoxField}
          />
        </label>
      </div>
      {helperText && (
        <div ref={tipRef} style={{ height: tipHeight }} className={styles.inputBox_tip}>
          <div>{helperText}</div>
        </div>
      )}
    </div>
  );
}
