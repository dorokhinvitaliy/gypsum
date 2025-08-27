import { useState } from 'react';
import Input from '../../components/Input';
import Select from '../../components/Input/Select';
import Button from '../../components/Button';
import Flex from '../../components/Flex/Flex';
import type { Option } from '../../components/Input/Select.type';
import Modal from '../../components/Modal/Modal';
import Text from '../../components/Text/Text';
import Tooltip from '../../components/Tooltip/Tooltip';

export default function Home() {
  const options: Option[] = [
    { id: 1, text: 'lol' },
    { id: 2, text: 'kilol' },
  ];
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState<Option>();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Flex direction="column" alignItems="center" gap="1rem" style={{ padding: '1rem' }}>
      <Input
        type={'text'}
        value={value}
        onChange={e => {
          setValue(e);
        }}
        placeholder={'house'}
      />
      <Select
        options={options}
        placeholder="Выбери меня!"
        selected={selected}
        onChange={option => setSelected(option)}
        closeAfterSelect={false}
        floatingOptions
      ></Select>
      <Flex gap={10}>
        <Button onClick={() => setOpen(true)}>Text</Button>
        <Button secondary>Text</Button>
      </Flex>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Flex gap={10} direction="column">
          <Flex justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
            <Text variant="heading">Заголовок модалки</Text>
            <Button flat onClick={() => setOpen(false)}>
              X
            </Button>
          </Flex>
          <Text>Main content</Text>
          <Flex>
            <Button>Привет!</Button>
          </Flex>
        </Flex>
      </Modal>
      <Tooltip content="Это подсказка">
        <button>Наведи на меня</button>
      </Tooltip>
    </Flex>
  );
}
