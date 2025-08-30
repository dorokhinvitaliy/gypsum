import type { HTMLAttributes, ReactNode, CSSProperties } from 'react';
import styles from './Flex.module.css';
import classNames from 'classnames';

type FlexProps = {
  direction?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  gap?: string | number;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Flex({
  direction,
  justifyContent,
  alignItems,
  gap,
  children,
  style,
  className,
  ...rest
}: FlexProps) {
  return (
    <div
      className={classNames(styles.flex, className)}
      style={{
        flexDirection: direction,
        justifyContent,
        alignItems,
        gap,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
