import { Flex, Text } from '@/components';
import { useRef, type RefObject } from 'react';

import styles from './Navigation.module.scss';
import { useNavigate } from 'react-router-dom';

const Anchor = ({ children, id }: { children: React.ReactNode; id?: string }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const navigate = useNavigate();
  const scrollTo = (ref: RefObject<HTMLAnchorElement | null>) => {
    if (ref && ref.current) {
      ref.current?.scrollIntoView({
        behavior: 'smooth', // плавно
        block: 'start', // можно "center" или "end"
      });
    }
  };
  return (
    <Flex alignItems="center" className={styles.anchor}>
      <a
        ref={linkRef}
        id={id ?? undefined}
        onClick={e => {
          e.preventDefault();
          if (id) navigate('#' + id);
          scrollTo(linkRef);
        }}
        href={`#${id}`}
      >
        #
      </a>
      <Text variant="heading-1">{children}</Text>
    </Flex>
  );
};

export default Anchor;
