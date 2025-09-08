import classNames from 'classnames';
import { Col, type FlexProps } from '../Flex/Flex';
import styles from './Article.module.scss';

const Article = ({
  children,
  className,
  ...props
}: { children: React.ReactNode; className?: string } & FlexProps) => {
  return (
    <Col gap={8} className={classNames(styles.article, className)} {...props}>
      {children}
    </Col>
  );
};

export default Article;
