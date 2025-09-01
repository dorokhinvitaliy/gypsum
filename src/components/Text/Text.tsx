export type TextVariant =
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'subheading-1'
  | 'subheading-2'
  | 'body-1'
  | 'body-2'
  | 'caption'
  | 'overline'
  | 'hint-1'
  | 'hint-2';

import type { HTMLAttributes } from 'react';
import styles from './Text.module.css';
import classNames from 'classnames';

export default function Text({
  children,
  variant = 'body-1',
  className,
  ...rest
}: {
  children: React.ReactNode;
  variant?: TextVariant;
  className?: string;
} & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={classNames(styles['text-variant-' + variant], className)} {...rest}>
      {children}
    </span>
  );
}
