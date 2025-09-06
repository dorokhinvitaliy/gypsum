'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

import type { Option } from './Select.type.ts';

import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { useClickOutside } from './useClickOutside.ts';

const SelectContext = createContext<{
  selected: Option | Option[] | null;
  closeAfterSelect: boolean;
  multiple?: boolean;
  selectLimit?: number;
  onChange: (option: Option | Option[]) => void;
  updateFocused: (arg0: boolean) => void;
}>({
  selected: null,
  closeAfterSelect: false,
  onChange: () => {},
  updateFocused: () => {},
});

const Select = ({
  options,
  selected,
  placeholder,
  floatingOptions,
  onChange,
  closeAfterSelect = true,
  multiple = false,
  children,
  width = 'auto',
  selectLimit,
}: {
  options: Option[];
  selected: Option | Option[] | null;
  placeholder: string;
  floatingOptions?: boolean;
  onChange: (arg0: Option | Option[]) => void;
  closeAfterSelect: boolean;
  multiple?: boolean;
  children?: React.ReactNode;
  width?: 'auto' | 'max';
  selectLimit?: number;
}) => {
  const [focused, updateFocused] = useState(false);
  const [empty, updateEmpty] = useState(selected == null);

  const optionsRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState('0px');

  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, () => updateFocused(false));

  const renderSelected = (selected: Option | Option[] | null | undefined) => {
    if (multiple) {
      return (
        selected && Array.isArray(selected) && selected.map((item: Option) => item.text).join(', ')
      );
    } else {
      return selected && 'text' in selected && selected.text;
    }
  };

  useEffect(() => {
    if (focused && optionsRef.current) {
      const scrollHeight = optionsRef.current.scrollHeight;
      setHeight(`${scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [focused, options]);

  useEffect(() => {
    if (multiple) {
      updateEmpty(!(selected && Array.isArray(selected) && selected?.length));
    } else {
      updateEmpty(!selected);
    }
  }, [selected, multiple]);

  return (
    <div
      ref={ref}
      className={classNames(styles.selectBox_container, {
        [styles.floating]: floatingOptions,
        [styles.maxContainer]: width === 'max',
      })}
    >
      <div
        tabIndex={0}
        role="button"
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
          <div className={styles.inputBoxField}>{renderSelected(selected)}</div>
        </div>
        <ChevronDownIcon className={styles.inputBoxIcon} />
      </div>
      <div className={styles.selectBox_options} style={{ height: height }} ref={optionsRef}>
        <div className={styles.optionsGroup}>
          <SelectContext.Provider
            value={{
              selected,
              closeAfterSelect,
              multiple,
              selectLimit,
              onChange,
              updateFocused,
            }}
          >
            {options && options?.map(option => <Option key={'option_' + option.id} {...option} />)}
            {children}
          </SelectContext.Provider>
        </div>
      </div>
    </div>
  );
};

const Option = ({ id, text }: Option) => {
  const { selected, closeAfterSelect, multiple, selectLimit, onChange, updateFocused } =
    useContext(SelectContext);

  const renderChange = ({ id, text }: Option) => {
    if (multiple) {
      if (!Array.isArray(selected)) return false;
      const filtered = selected.filter((s: Option) => s.id != id) || [];
      if (!selected?.some((s: Option) => s.id === id))
        if (filtered.length < (selectLimit || Infinity)) filtered.push({ id, text });
      onChange(filtered);
    } else {
      onChange({ id, text });
    }
  };

  const isSelected = () => {
    return multiple
      ? Array.isArray(selected) && selected.some(s => id === s.id)
      : selected && 'id' in selected && id == selected.id;
  };

  return (
    <div
      tabIndex={0}
      className={classNames(styles.selectBox_option, {
        [styles.selected]: isSelected(),
      })}
      onClick={() => {
        renderChange({ id, text });
        updateFocused(!closeAfterSelect);
      }}
    >
      <div>{text}</div>
      <CheckIcon className={styles.optionIcon} />
    </div>
  );
};

Select.Option = Option;

export default Select;
