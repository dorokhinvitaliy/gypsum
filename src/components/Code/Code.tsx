import classNames from 'classnames';
import { Highlight, themes, type PrismTheme } from 'prism-react-renderer';

import styles from './Code.module.scss';

import { type CSSProperties } from 'react';

import { Text } from '@/components';
import CopyButton from '../CopyButton/CopyButton';

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
  return (
    <Highlight code={code.trim()} language={lang ?? 'tsx'} theme={theme ?? themes.vsLight}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className={styles.codeBlock_wrapper} style={{ ...style, ...styleAttr }}>
          <div className={styles.header}>
            <Text>{lang}</Text>
            <CopyButton size="s" theme="normal-flat" copyText={code} children={undefined} />
          </div>
          <pre className={classNames(className, styles.codeBlock)}>
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
        </div>
      )}
    </Highlight>
  );
};

export default Code;
