import { useEffect, useRef, useState, type HTMLAttributes } from 'react';
import Button from '../Button';
import classNames from 'classnames';

import styles from './CopyButton.module.scss';
import Flex, { Col } from '../Flex/Flex';
import Icon from '../Icons/Icon/Icon';
import CopyOutline from '../Icons/Copy';
import Checked from '../Icons/Checked';
import type { ButtonProps } from '../Button/Button';

export default function CopyButton({
  className,
  copyText,
  onClick,
  ...props
}: {
  copyText: string;
} & HTMLAttributes<HTMLButtonElement> &
  ButtonProps) {
  const [successedCopy, setSuccessedCopy] = useState(false);
  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setSuccessedCopy(true);
      setTimeout(() => {
        setSuccessedCopy(false);
      }, 6000);
    } catch (err) {
      console.error('Не удалось скопировать: ', err);
    }
  };
  const [copyTextHeight, setCopyTextHeight] = useState(0);
  const copyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (copyRef.current) {
      setCopyTextHeight(copyRef.current.scrollHeight);
    }
  }, [successedCopy]);
  return (
    <Button
      className={classNames(styles.copy, { [styles.successed]: successedCopy }, className)}
      onClick={event => {
        copyToClipboard(copyText);
        onClick?.(event);
      }}
      {...props}
    >
      <Flex gap={4} alignItems="center">
        <Col>
          <Icon data={CopyOutline} className={styles.copyIcon} />
          <Icon data={Checked} strokeWidth={2} className={styles.checkedIcon} />
        </Col>{' '}
        <Col>
          <div
            className={styles.copyText}
            ref={copyRef}
            style={{ height: successedCopy ? 0 : copyTextHeight }}
          >
            Копировать
          </div>
          <div
            className={styles.checkedText}
            style={{ height: successedCopy ? copyTextHeight : 0 }}
          >
            Скопировано
          </div>
        </Col>
      </Flex>
    </Button>
  );
}
