import { Aside, Text } from '@/components';
import { Logo, HomeSolid, FlaskSolid, ExploreSolid } from '@/components/Icons';
import styles from './Layout.module.scss';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Aside renderContent={<div className={styles.main}>{children}</div>}>
      <Aside.Item icon={Logo} iconSize={32} style={{ margin: '0 auto', color: '#747bff' }}>
        <Text variant="body-1" color="inherit">
          GypsumUI
        </Text>
      </Aside.Item>
      <Aside.Divider stroke={1} />
      <Aside.Link to="/" icon={HomeSolid} tooltip="Главная">
        Главная
      </Aside.Link>

      <Aside.Link to="/demo" icon={FlaskSolid} tooltip="Демо">
        Демонстрация
      </Aside.Link>
      <Aside.Link to="/animator" icon={ExploreSolid} tooltip="Аниматор">
        Аниматор
      </Aside.Link>
    </Aside>
  );
}
