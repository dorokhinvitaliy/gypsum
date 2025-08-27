import type { HTMLAttributes, ReactNode, CSSProperties } from 'react';
import styles from './Flex.module.css';

type FlexProps = {
  direction?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  gap?: string | number;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function Flex({
  direction,
  justifyContent,
  alignItems,
  gap,
  children,
  style,
  ...rest
}: FlexProps) {
  return (
    <div
      className={styles.flex}
      style={{
        flexDirection: direction,
        justifyContent,
        alignItems,
        gap,
        ...style, // объединяем с внешним style
      }}
      {...rest} // сюда попадают className, id, onClick и другие стандартные пропсы div
    >
      {children}
    </div>
  );
}
