import classNames from 'classnames';
import { Highlight, themes, type PrismTheme } from 'prism-react-renderer';

import styles from './Code.module.scss';
import CopyOutline from '../Icons/Copy';
import Icon from '../Icons/Icon/Icon';
import Button from '../Button';
import { useState, type CSSProperties } from 'react';
import Checked from '../Icons/Checked';
import { Col } from '../Flex/Flex';

const Code = ({
  code,
  lang,
  theme,
  hideLines,
  highlightedLines,
  style: styleAttr,
}: {
  code: string;
  lang?: string;
  theme?: PrismTheme;
  hideLines?: number[];
  highlightedLines?: number[];
  style?: CSSProperties;
}) => {
  const [successedCopy, setSuccessedCopy] = useState(false);
  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setSuccessedCopy(true);
      setTimeout(() => {
        setSuccessedCopy(false);
      }, 2000);
    } catch (err) {
      console.error('Не удалось скопировать: ', err);
    }
  };
  return (
    <div className={styles.codeBlock_wrapper}>
      <Button
        size="s"
        theme="normal-flat"
        className={classNames(styles.copy, { [styles.successed]: successedCopy })}
        onClick={() => copyToClipboard(code)}
      >
        <Col>
          <Icon data={CopyOutline} className={styles.copyIcon} />
          <Icon data={Checked} stroke-width={2} className={styles.checkedIcon} />
        </Col>{' '}
        Копировать
      </Button>

      <Highlight
        code={code.trim()}
        language={lang ?? 'tsx'}
        theme={theme ?? themes.gruvboxMaterialLight}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={classNames(className, styles.codeBlock)}
            style={{ ...style, padding: '2rem', borderRadius: '1rem', margin: 0, ...styleAttr }}
          >
            {tokens.map((line, i) => {
              const isLineCollapsed = hideLines?.some(v => v === i);
              const isLineHighlighted = highlightedLines?.some(v => v === i);
              return (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className={classNames(styles.line, {
                    [styles.collapsed]: isLineCollapsed,
                    [styles.highlighted]: isLineHighlighted,
                  })}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default Code;
