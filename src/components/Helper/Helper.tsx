import classNames from 'classnames';
import styles from './Helper.module.scss';
import type { HTMLAttributes } from 'react';
export default function Helper({
  children,
  data,
  hidden = false,
  wrapperClassName,
  className,
  ...props
}: {
  children: React.ReactNode;
  data: React.ReactNode;
  hidden?: boolean;
  wrapperClassName?: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames(styles.wrapper, wrapperClassName)} {...props}>
      {children}
      <div className={classNames(styles.helperTooltip, { [styles.hidden]: hidden }, className)}>
        {data}
      </div>
    </div>
  );
}
