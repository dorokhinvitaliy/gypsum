import styles from './Checkbox.module.scss';
import classNames from 'classnames';
import type { SVGProps } from 'react';
import Flex from '../Flex/Flex';
import type { Option } from '../Input/Select.type';

type CheckboxProps = {
  label?: string;
  checked?: boolean;
  filled?: boolean;
  onChange?: (checked: boolean) => void;
};

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="m4 12l6 6L20 6"
      ></path>
    </svg>
  );
}

export default function Checkbox({
  label,
  checked = false,
  filled = false,
  onChange,
}: CheckboxProps) {
  const toggle = () => {
    onChange?.(!checked);
  };

  return (
    <label className={classNames(styles['checkbox-container'], { [styles.filled]: filled })}>
      <div className={classNames(styles.checkbox, { [styles.checked]: checked })}>
        <div className={styles['checkbox-icon']}>
          <CheckIcon />
        </div>
      </div>
      <input type="checkbox" checked={checked} onChange={toggle} />
      {label && <span className={styles['checkbox-label']}>{label}</span>}
    </label>
  );
}

export function CheckboxGroup({
  options,
  selected = [],
  onChange,
  style,
}: {
  options: Option[];
  selected: Option[] | null | undefined;
  style?: React.CSSProperties;
  onChange: (arg0: Option[]) => void;
}) {
  return (
    <Flex direction="column" gap={5} style={{ width: '100%', ...style }}>
      {options.map(option => (
        <Checkbox
          key={option.id}
          label={option.text}
          checked={selected?.some(o => o.id === option.id)}
          filled
          onChange={v =>
            v
              ? onChange([...selected, option])
              : onChange(selected?.filter(s => s.id !== option.id))
          }
        />
      ))}
    </Flex>
  );
}
