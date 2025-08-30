import { useState } from 'react';
import Input from '../../components/Input';
import Select from '../../components/Input/Select';
import Button from '../../components/Button';
import Flex from '../../components/Flex/Flex';
import type { Option } from '../../components/Input/Select.type';
import Modal from '../../components/Modal/Modal';
import Text from '../../components/Text/Text';
import Tooltip from '../../components/Tooltip/Tooltip';
import Checkbox, { CheckboxGroup } from '../../components/Checkbox/Checkbox';
import Loader from '../../components/Loader/Loader';
import Textarea from '../../components/Input/Textarea';

export default function Home() {
  const [value, setValue] = useState('');
  const [longValue, setLongValue] = useState('');
  const [selected, setSelected] = useState<Option>();
  const [selectedM, setSelectedM] = useState<Option[]>();
  const [checked, setChecked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const options: Option[] = [
    { id: 1, text: 'value' },
    { id: 2, text: 'Второй элемент списка' },
    { id: 3, text: 'Третий элемент списка' },
  ];
  return (
    <Flex
      direction="column"
      alignItems="center"
      gap="1rem"
      style={{ padding: '1rem', margin: '0 auto', maxWidth: '400px', position: 'relative' }}
    >
      <Input
        type={'text'}
        value={value}
        onChange={e => {
          setValue(e);
        }}
        placeholder={'house'}
        width="max"
      />
      <Textarea
        width="max"
        value={longValue}
        onChange={val => setLongValue(val)}
        placeholder="Здесь будет много текста"
      ></Textarea>
      <Checkbox
        label="Включить плавающее меню"
        checked={checked}
        onChange={v => setChecked(v)}
      ></Checkbox>
      <Select
        options={options}
        placeholder="Выбери меня!"
        selected={selected}
        onChange={option => setSelected(option)}
        closeAfterSelect={true}
        floatingOptions={checked}
        width="max"
      ></Select>
      {isLoading && <Loader withOverlay />}
      <Select
        options={options}
        placeholder="Выбери меня!"
        selected={selectedM}
        onChange={options => setSelectedM(options)}
        floatingOptions={checked}
        closeAfterSelect={false}
        multiple
        width="max"
      ></Select>
      <CheckboxGroup options={options} selected={selectedM} onChange={val => setSelectedM(val)} />
      {/* <Select placeholder="role">
        <Select.Option>Привет!</Select.Option>
      </Select> */}
      <Flex gap={10}>
        <Button onClick={() => setOpen(true)}>Открой окно</Button>
        <Tooltip
          position="bottom"
          content={
            <Flex direction="column">
              <Text variant="heading">Важное сообщение!</Text>
              <Text variant="body">Уже всё...</Text>
              <Button flat>Ознакомлен</Button>
            </Flex>
          }
        >
          <Button
            secondary
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 3000);
            }}
          >
            Text
          </Button>
        </Tooltip>
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
      <Tooltip hasArrow content={<>Треш</>} position="right">
        <button>Наведи на меня</button>
      </Tooltip>
    </Flex>
  );
}
