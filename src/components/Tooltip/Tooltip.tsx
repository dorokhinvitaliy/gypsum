import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import styles from './Tooltip.module.css';

type TooltipProps = {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  delay?: number;
  hasArrow?: boolean;
};

export default function Tooltip({
  children,
  content,
  position = 'top',
  delay = 100,
  hasArrow = true,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [showing, setShowing] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState(position);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!wrapperRef.current || !tooltipRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newPlacement = position;
    let top = 0;
    let left = 0;

    const space = {
      top: wrapperRect.top,
      bottom: viewportHeight - wrapperRect.bottom,
      left: wrapperRect.left,
      right: viewportWidth - wrapperRect.right,
    };

    // Автоподбор позиции, если выбранная не помещается
    if (
      position === 'top' &&
      space.top < tooltipRect.height &&
      space.bottom >= tooltipRect.height
    ) {
      newPlacement = 'bottom';
    } else if (
      position === 'bottom' &&
      space.bottom < tooltipRect.height &&
      space.top >= tooltipRect.height
    ) {
      newPlacement = 'top';
    } else if (
      position === 'left' &&
      space.left < tooltipRect.width &&
      space.right >= tooltipRect.width
    ) {
      newPlacement = 'right';
    } else if (
      position === 'right' &&
      space.right < tooltipRect.width &&
      space.left >= tooltipRect.width
    ) {
      newPlacement = 'left';
    }

    // Вычисляем координаты
    switch (newPlacement) {
      case 'top':
        top = wrapperRect.top - tooltipRect.height - 8;
        left = wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = wrapperRect.bottom + 8;
        left = wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2;
        left = wrapperRect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2;
        left = wrapperRect.right + 8;
        break;
    }

    setPlacement(newPlacement);
    setCoords({ top, left });
  };

  const handleShow = () => {
    setVisible(true);
    setTimeout(() => setShowing(true), 10);
  };

  const handleHide = () => {
    setShowing(false);
    setTimeout(() => setVisible(false), 200);
  };

  useEffect(() => {
    if (visible) calculatePosition();
    window.addEventListener('resize', calculatePosition);
    return () => window.removeEventListener('resize', calculatePosition);
  }, [visible, content]);

  return (
    <div
      ref={wrapperRef}
      className={classNames(styles.tooltipWrapper)}
      onMouseEnter={() => setTimeout(handleShow, delay)}
      onMouseLeave={handleHide}
    >
      {children}

      {visible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={classNames(styles.tooltip, styles[placement], {
              [styles.showing]: showing,
              [styles.withArrow]: hasArrow,
            })}
            style={{ top: coords.top, left: coords.left }}
          >
            {content}
          </div>,
          document.body,
        )}
    </div>
  );
}
