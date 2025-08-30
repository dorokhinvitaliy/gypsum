import styles from './Loader.module.scss';

const Overlay = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.overlay}>{children}</div>;
};

export default Overlay;
