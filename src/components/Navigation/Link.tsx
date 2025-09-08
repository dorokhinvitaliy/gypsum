import type { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import Helper from '../Helper/Helper';
import classNames from 'classnames';

import styles from './Navigation.module.scss';

const Link = ({
  children,
  to,
  onClick,
  className,
  tooltip,
  ...props
}: {
  children?: React.ReactNode;
  to?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  tooltip?: React.ReactNode;
} & HTMLAttributes<HTMLAnchorElement>) => {
  const navigate = useNavigate();

  const renderLinkAction = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick?.(e);
    }
    if (to) navigate(to);
  };

  const LinkNode = (
    <a
      href={to ?? '#'}
      onClick={renderLinkAction}
      className={classNames(styles.link, className)}
      {...props}
    >
      {children}
    </a>
  );
  return tooltip ? <Helper data={tooltip}>{LinkNode}</Helper> : LinkNode;
};

export default Link;
