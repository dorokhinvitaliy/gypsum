import classNames from 'classnames';
import React from 'react';
import styles from './Button.module.css';

export type ButtonProps = {
  children: React.ReactNode;
  secondary?: boolean;
  flat?: boolean;
  long?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  secondary = false,
  flat = false,
  long = false,
  disabled = false,
  className = '',
  loading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        { [styles.disabled]: disabled },
        { [styles.loading]: loading },
        { [styles.secondary]: secondary },
        { [styles.flat]: flat },
        { [styles.long]: long },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
