import type { HTMLAttributes, ReactNode, CSSProperties } from 'react';
import styles from './Flex.module.css';
import classNames from 'classnames';

export type FlexProps = {
  direction?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  gap?: string | number;
  wrap?: CSSProperties['flexWrap'];
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const Flex = ({
  direction,
  justifyContent,
  alignItems,
  gap,
  wrap,
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
        flexWrap: wrap,
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
    <Flex wrap="nowrap" {...props} direction="column">
      {children}
    </Flex>
  );
};

export { Col };

const Centered = ({ children, ...props }: { children: React.ReactNode } & FlexProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      style={{ width: '100%', height: '100%' }}
      {...props}
    >
      {children}
    </Flex>
  );
};

export { Centered };
