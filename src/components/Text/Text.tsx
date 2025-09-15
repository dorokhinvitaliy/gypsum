import type { CSSProperties, HTMLAttributes } from 'react';
import styles from './Text.module.scss';
import classNames from 'classnames';
import { textColors, type TextColor, type TextVariant } from './Text.types';

export default function Text({
  children,
  variant = 'body-1',
  color = 'primary',
  weight,
  size,
  className,
  style,
  ...rest
}: {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  weight?: CSSProperties['fontWeight'];
  size?: CSSProperties['fontSize'];
  className?: string;
} & HTMLAttributes<HTMLSpanElement>) {
  const isCustom = () => {
    return !textColors.includes(color);
  };
  return (
    <span
      className={classNames(
        styles['text-variant-' + variant],
        styles['text-color-' + color],
        className,
      )}
      style={{
        color: isCustom() ? color : undefined,
        fontWeight: weight,
        fontSize: size,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
