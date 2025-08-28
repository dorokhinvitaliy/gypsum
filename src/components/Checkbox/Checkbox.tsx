import styles from './Checkbox.module.scss';
import classNames from 'classnames';
import type { SVGProps } from 'react';

type CheckboxProps = {
  label?: string;
  checked?: boolean;
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

export default function Checkbox({ label, checked = false, onChange }: CheckboxProps) {
  const toggle = () => {
    onChange?.(!checked);
  };

  return (
    <label className={styles['checkbox-container']}>
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
