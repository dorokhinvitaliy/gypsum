import styles from './Loader.module.scss';
import Overlay from './Overlay';

const LoaderBars = () => (
  <div className={styles['loading-wave']}>
    <div className={styles['loading-bar']}></div>
    <div className={styles['loading-bar']}></div>
    <div className={styles['loading-bar']}></div>
    <div className={styles['loading-bar']}></div>
    <div className={styles['loading-bar']}></div>
  </div>
);

const Loader = ({ withOverlay = false }: { withOverlay?: boolean }) => {
  if (withOverlay) {
    return (
      <Overlay>
        <LoaderBars />
      </Overlay>
    );
  } else {
    return <LoaderBars />;
  }
};

export default Loader;
