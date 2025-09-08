import classNames from 'classnames';
import { Highlight, themes } from 'prism-react-renderer';

import styles from './Code.module.scss';
import CopyOutline from '../Icons/Copy';
import Icon from '../Icons/Icon/Icon';
import Button from '../Button';

const Code = ({ code, lang }: { code: string; lang?: string }) => (
  <div className={styles.codeBlock_wrapper}>
    <Button size="s" theme="normal-flat" className={styles.copy}>
      <Icon data={CopyOutline} />
      Копировать
    </Button>

    <Highlight code={code.trim()} language={lang ?? 'tsx'} theme={themes.gruvboxMaterialLight}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={classNames(className, styles.codeBlock)}
          style={{ ...style, padding: '2rem', borderRadius: '1rem', margin: 0 }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  </div>
);

export default Code;
