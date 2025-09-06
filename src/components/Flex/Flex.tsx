import type { HTMLAttributes, ReactNode, CSSProperties } from 'react';
import styles from './Flex.module.css';
import classNames from 'classnames';

export type FlexProps = {
  direction?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  gap?: string | number;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const Flex = ({
  direction,
  justifyContent,
  alignItems,
  gap,
  children,
  style,
  className,
  ...rest
}: FlexProps) => {
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
};

export default Flex;

const Col = ({ children, ...props }: { children: React.ReactNode } & FlexProps) => {
  return (
    <Flex direction="column" {...props}>
      {children}
    </Flex>
  );
};

export { Col };
