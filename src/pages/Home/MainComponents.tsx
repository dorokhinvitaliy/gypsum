import { Centered, Col, Slide, Anchor } from '@/components';
import InputDemo from '@/components/Input/InputDemo';
import SelectDemo from '@/components/Input/SelectDemo';
import TextareaDemo from '@/components/Input/TextareaDemo';
import Switcher from '@/components/Switcher/Switcher';
import SwitcherDemo from '@/components/Switcher/SwitcherDemo';
import { Tabs } from '@/components/Tabs/TabsController';
import { useState } from 'react';
import asideStyles from '@/components/Navigation/Navigation.module.scss';

const MainComponents = () => {
  const checkScroll = (phase: number, isActive: boolean | undefined) => {
    if (isActive) {
      if (phase >= 0.01) {
        document.querySelector(`.${asideStyles.aside}`)?.classList.remove('dark');
      } else {
        document.querySelector(`.${asideStyles.aside}`)?.classList.add('dark');
      }
    }
  };
  const list = [
    { value: 'input', label: 'Поле ввода' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'select', label: 'Select' },
    { value: 'switch', label: 'Switch' },
    { value: 'button', label: 'Button' },
  ];
  const [selectedTab, setSelectedTab] = useState(list[0]);

  return (
    <Slide onSlideScroll={checkScroll}>
      <Centered direction="column" style={{ margin: '2rem' }}>
        <Col gap={16} style={{ width: '100%', maxWidth: '1000px' }}>
          <Anchor id="forms">Элементы форм</Anchor>
          <Switcher
            list={list}
            selected={selectedTab}
            onChange={l => setSelectedTab(l)}
            style={{ margin: '0 auto' }}
          ></Switcher>
          <Tabs selected={selectedTab.value}>
            <Tabs.Tab id="input">
              <InputDemo></InputDemo>
            </Tabs.Tab>
            <Tabs.Tab id="textarea">
              <TextareaDemo></TextareaDemo>
            </Tabs.Tab>
            <Tabs.Tab id="select">
              <SelectDemo></SelectDemo>
            </Tabs.Tab>
            <Tabs.Tab id="switch">
              <SwitcherDemo></SwitcherDemo>
            </Tabs.Tab>
            <Tabs.Tab id="Flex">Flex component</Tabs.Tab>
          </Tabs>
        </Col>
      </Centered>
    </Slide>
  );
};

export default MainComponents;
