import type { HTMLAttributes } from 'react';
import styles from './Text.module.css';
import classNames from 'classnames';
import type { TextColor, TextVariant } from './Text.types';

export default function Text({
  children,
  variant = 'body-1',
  color = 'primary',
  className,
  ...rest
}: {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  className?: string;
} & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={classNames(
        styles['text-variant-' + variant],
        styles['text-color-' + color],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
