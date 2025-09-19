import type { CSSProperties, HTMLAttributes } from 'react';
import styles from './Text.module.scss';
import classNames from 'classnames';
import { baseColors, type NamedTextColor, type TextColor, type TextVariant } from './Text.types';

export default function Text({
  children,
  variant = 'body-1',
  color = 'primary',
  weight,
  size,
  highlighted,
  className,
  style,
  ...rest
}: {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  weight?: CSSProperties['fontWeight'];
  size?: CSSProperties['fontSize'];
  highlighted?: boolean;
  className?: string;
} & HTMLAttributes<HTMLSpanElement>) {
  const isCustom = () => {
    return !baseColors.has(color as NamedTextColor);
  };
  return (
    <span
      className={classNames(
        styles.text,
        styles['text-variant-' + variant],
        styles['text-color-' + color],
        { [styles.highlighted]: highlighted },
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
