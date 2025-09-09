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
  size = 'l',
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  theme?: 'normal' | 'normal-branded' | 'filled' | 'white';
  outlined?: boolean;
  style?: CSSProperties;
  brandColor?: string;
  size?: 's' | 'm' | 'l' | 'xl';
} & HTMLAttributes<HTMLElement> &
  FlexProps) => {
  return (
    <Col
      className={classNames(
        styles.card,
        styles['card-theme-' + theme],
        styles['card-size-' + size],
        { [styles.outlined]: outlined, light: theme === 'white' },
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
