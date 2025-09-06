import { Aside, Text } from '@/components';
import ExploreSolid from '@/components/Icons/ExploreSolid';
import FlaskSolid from '@/components/Icons/FlaskSolid';
import HomeSolid from '@/components/Icons/HomeSolid';
import Logo from '@/components/Icons/Logo';

export default function Demo() {
  return (
    <Aside
      renderContent={<div>Содержимое</div>}
      justifyContent="space-between"
      style={{ height: '100%' }}
    >
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
