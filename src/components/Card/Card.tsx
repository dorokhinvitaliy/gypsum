import type { CSSProperties, HTMLAttributes } from 'react';
import styles from './Card.module.scss';
import { Col } from '../Flex/Flex';
import type { FlexProps } from '../Flex/Flex';
import classNames from 'classnames';

type CSSWithVars = React.CSSProperties & {
  [key: `--${string}`]: string | number | undefined;
};

const Card = ({
  children,
  className,
  theme = 'normal',
  outlined,
  style,
  brandColor,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  theme?: 'normal' | 'normal-branded' | 'filled';
  outlined?: boolean;
  style?: CSSProperties;
  brandColor?: string;
} & HTMLAttributes<HTMLElement> &
  FlexProps) => {
  return (
    <Col
      className={classNames(
        styles.card,
        styles['card-theme-' + theme],
        { [styles.outlined]: outlined },
        className,
      )}
      style={{ '--gy-color-brand': brandColor, ...style } as CSSWithVars}
      {...rest}
    >
      {children}
    </Col>
  );
};
export default Card;
