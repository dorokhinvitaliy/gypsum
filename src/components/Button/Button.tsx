import classNames from 'classnames';
import React, { forwardRef, type HTMLAttributes } from 'react';
import styles from './Button.module.scss';

type ButtonTheme =
  | 'primary'
  | 'secondary'
  | 'normal'
  | 'normal-flat'
  | 'flat'
  | 'outlined'
  | 'reverted'
  | 'reverted-secondary';

export type ButtonProps = {
  children: React.ReactNode;
  theme?: ButtonTheme;
  size?: 'xl' | 'l' | 'm' | 's' | 'xs';
  width?: 'auto' | 'max';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
} & HTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    theme = 'primary',
    size = 'l',
    width,
    disabled = false,
    className = '',
    loading = false,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      className={classNames(
        styles.button,
        styles['theme-' + theme],
        styles['size-' + size],
        { [styles.disabled]: disabled },
        { [styles.loading]: loading },
        {
          [styles.iconOnly]:
            React.isValidElement(children) &&
            ((children.type as { displayName?: string; name?: string }).displayName === 'Icon' ||
              (children.type as { displayName?: string; name?: string }).name === 'Icon'),
        },
        { [styles.long]: width === 'max' },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
