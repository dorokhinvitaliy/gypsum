import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import styles from './Tooltip.module.css';

type TooltipProps = {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  delay?: number; // debounce open delay
  hasArrow?: boolean;
};

export default function Tooltip({
  children,
  content,
  position = 'top',
  delay = 500,
  hasArrow = true,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [showing, setShowing] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState(position);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<number | null>(null);

  const calculatePosition = useCallback(() => {
    if (!wrapperRef.current || !tooltipRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft || 0;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

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
        top = wrapperRect.top + scrollY - tooltipRect.height - 8;
        left = wrapperRect.left + scrollX + wrapperRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = wrapperRect.bottom + scrollY + 8;
        left = wrapperRect.left + scrollX + wrapperRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = wrapperRect.top + scrollY + wrapperRect.height / 2 - tooltipRect.height / 2;
        left = wrapperRect.left + scrollX - tooltipRect.width - 8;
        break;
      case 'right':
        top = wrapperRect.top + scrollY + wrapperRect.height / 2 - tooltipRect.height / 2;
        left = wrapperRect.right + scrollX + 8;
        break;
    }

    setPlacement(newPlacement);
    setCoords({ top, left });
  }, [position]);

  const handleShow = () => {
    setVisible(true);
    // micro delay to allow mount transitions
    window.setTimeout(() => setShowing(true), 10);
  };

  const handleHide = () => {
    // cancel pending open
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    setShowing(false);
    setTimeout(() => setVisible(false), 200);
  };

  // Debounced open on hover
  const onMouseEnter = () => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    openTimerRef.current = window.setTimeout(
      () => {
        handleShow();
        openTimerRef.current = null;
      },
      Math.max(0, delay),
    );
  };

  const onMouseLeave = () => {
    handleHide();
  };

  useEffect(() => {
    if (!visible) return;

    const recalc = () => {
      // rAF to avoid layout thrash on rapid scroll
      window.requestAnimationFrame(() => calculatePosition());
    };

    calculatePosition();
    window.addEventListener('resize', recalc, { passive: true } as AddEventListenerOptions);
    window.addEventListener('scroll', recalc, { passive: true } as AddEventListenerOptions);

    return () => {
      window.removeEventListener('resize', recalc as EventListener);
      window.removeEventListener('scroll', recalc as EventListener);
    };
  }, [visible, content, calculatePosition]);

  useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={classNames(styles.tooltipWrapper)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
