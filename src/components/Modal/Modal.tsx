import { createPortal } from 'react-dom';

import styles from './Modal.module.css';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export default function Modal({
  open,
  children,
  onClose,
  useClickOutside,
}: {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  useClickOutside?: boolean;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(open);
  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300); // 300ms = как в CSS
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!isVisible) return null;

  return createPortal(
    <div
      className={classNames(styles.modalContainer, {
        [styles.modalOpen]: open,
        [styles.modalClosed]: !open,
      })}
      onClick={useClickOutside ? onClose : () => false}
    >
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
