'use client';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

export default function Textarea({
  value,
  onChange,
  placeholder = 'Поле ввода',
  helperText,
  width = 'auto',
  disabled,
  invalid,
}: {
  value: string;
  onChange: (arg0: string) => void;
  placeholder: string;
  helperText?: string;
  width?: 'max' | 'auto';
  disabled?: boolean;
  invalid?: boolean;
}) {
  const [focused, updateFocused] = useState(false);
  const [empty, updateEmpty] = useState(value == '');
  const tipRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [tipHeight, setTipHeight] = useState('0px');
  const [textareaHeight, setTextareaHeight] = useState('0px');

  const onResize = () => {
    if (textareaRef.current) {
      const scrollHeight = textareaRef?.current?.scrollHeight;
      setTextareaHeight(`${scrollHeight}px`);
    }
  };

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
        [styles.disabled]: disabled,
        [styles.invalid]: invalid,
      })}
    >
      <div
        className={classNames(styles.inputBox, styles.autoHeight, {
          [styles.active]: focused,
          [styles.empty]: empty,
        })}
      >
        <label className={styles.inputBoxLabel}>
          <span>{placeholder}</span>
          <textarea
            style={{ height: textareaHeight }}
            ref={textareaRef}
            value={value}
            onChange={e => {
              onChange(e.target.value);
              updateEmpty(e.target.value == '');
              onResize();
            }}
            onFocus={() => updateFocused(true)}
            onBlur={() => updateFocused(false)}
            className={classNames(styles.inputBoxField, styles.textareaField)}
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
