import type { CSSProperties, HTMLAttributes } from 'react';
import styles from './Card.module.scss';
import { Col } from '../Flex/Flex';
import type { FlexProps } from '../Flex/Flex';
import classNames from 'classnames';

const Card = ({
  children,
  className,
  style,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
} & HTMLAttributes<HTMLElement> &
  FlexProps) => {
  return (
    <Col className={classNames(styles.card, className)} style={{ ...style }} {...rest}>
      {children}
    </Col>
  );
};
export default Card;
