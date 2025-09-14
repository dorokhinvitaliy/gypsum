import { useState } from 'react';
import LiveDemo from '../LiveDemo/LiveDemo';
import Switcher from './Switcher';
import { Code, Col, Flex, Text } from '@/components';

export default function SwitcherDemo() {
  const list = [
    { value: '1', label: 'First' },
    { value: '2', label: 'Second' },
    { value: '3', label: 'Third' },
  ];
  const code = `
  <Switcher
      list={
        [${list.map(l => "\n\t\t{ value: '" + l.value + "' , label: '" + l.label + "'}")}
        ]
      }
      selected={selected}
      onChange={setSelected}
  />
      `;
  const [selected, setSelected] = useState(list[0]);
  return (
    <Flex gap={16} wrap="nowrap" style={{ width: '100%' }}>
      <LiveDemo props={[]}>
        <Col gap={16}>
          <Switcher list={list} selected={selected} onChange={setSelected} />
          <Text>Выбрано: {selected.label}</Text>
        </Col>
      </LiveDemo>
      <Code code={code}></Code>
    </Flex>
  );
}
