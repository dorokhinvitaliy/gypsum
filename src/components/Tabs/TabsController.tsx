import { createContext, useContext } from 'react';

const TabContext = createContext<{ selectedId: string }>({ selectedId: '' });

const Tabs = ({ children, selected }: { children: React.ReactNode; selected: string }) => {
  return <TabContext value={{ selectedId: selected }}>{children}</TabContext>;
};

const Tab = ({ children, id }: { children: React.ReactNode; id: string }) => {
  const { selectedId } = useContext(TabContext);
  return selectedId === id && <>{children}</>;
};

Tabs.Tab = Tab;

export { Tabs };

/* 
<Tabs value={activeTab} onUpdate={setActiveTab}>
    <Tabs.List>
        <Tab value="first">First Tab</Tab>
        <Tab value="second">Active Tab</Tab>
        <Tab value="third" disabled>Disabled Tab</Tab>
    </Tabs.List>
    <Tabs.Switcher>
        <TabPanel value="first">First Panel</TabPanel>
        <TabPanel value="second">Second Panel</TabPanel>
        <TabPanel value="third">Third Panel</TabPanel>
    </div>
</Tabs>

*/
