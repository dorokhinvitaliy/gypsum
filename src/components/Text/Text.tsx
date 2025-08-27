export type variant = 'heading' | 'subheading' | 'body' | 'hint';

import styles from './Text.module.css';

export default function Text({
  children,
  variant = 'body',
}: {
  children: React.ReactNode;
  variant?: variant;
}) {
  return <span className={styles['text-variant-' + variant]}>{children}</span>;
}
