import {
  Button,
  Card,
  Checkbox,
  Code,
  Disclosure,
  Icon,
  Input,
  Select,
  Text,
  Textarea,
} from '@/components';
import Flex, { Col } from '@/components/Flex/Flex';
import { type Option } from '@/components/Input/Select.type';

import CaretRightOutline from '@/components/Icons/CaretRightOutline';
import { useState } from 'react';

import { ScrollToId } from '@/components/Navigation/ScrollToId';
import Article from '@/components/Article/Article';
import TextDemo from './TextDemo';
import { ThemeDemo } from './ThemeDemo';
import CardDemo from './CardDemo';
import Link from '@/components/Navigation/Link';

export default function Demo() {
  const formCode = `
  const [value, setValue] = useState('');
  const [longValue, setLongValue] = useState('');
  const [selected, setSelected] = useState<Option | null>(null);
  const [selectedM, setSelectedM] = useState<Option[]>([]);
  const [checked, setChecked] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const options: Option[] = [
    { id: 1, text: 'Элемент 1 списка' },
    { id: 2, text: 'Второй элемент списка' },
    { id: 3, text: 'Третий элемент списка' },
  ];
<Input
          type={'text'}
          value={value}
          onChange={e => {
            setValue(e);
          }}
          placeholder={'Введите ваше имя'}
          width="max"
          helperText="Пишите имя на русском"
        />
        <Textarea
          width="max"
          value={longValue}
          onChange={val => setLongValue(val)}
          placeholder="Здесь будет много текста"
          helperText="Здесь можно написать много строк"
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
          onChange={(option: Option | Option[]) => setSelected(option as Option)}
          closeAfterSelect={true}
          floatingOptions={checked}
          width="max"
        ></Select>
        <Select
          options={options}
          placeholder="Выбери меня!"
          selected={selectedM}
          onChange={(options: Option | Option[]) => setSelectedM(options as Option[])}
          floatingOptions={checked}
          closeAfterSelect={false}
          multiple
          width="max"
        ></Select>
  `;
  const formPropsCode = `
interface Text = {
    variant?: TextVariant;
    color?: TextColor;
}

export type TextVariant =
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'subheading-1'
  | 'subheading-2'
  | 'body-1'
  | 'body-2'
  | 'caption'
  | 'overline'
  | 'hint-1'
  | 'hint-2';

export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'inherit';

  `;
  const [value, setValue] = useState('');
  const [longValue, setLongValue] = useState('');
  const [selected, setSelected] = useState<Option | null>(null);
  const [selectedM, setSelectedM] = useState<Option[]>([]);
  const [checked, setChecked] = useState<boolean>(true);
  const options: Option[] = [
    { id: 1, text: 'Элемент 1 списка' },
    { id: 2, text: 'Второй элемент списка' },
    { id: 3, text: 'Третий элемент списка' },
  ];
  return (
    <Col gap={16} alignItems="center" style={{ maxWidth: '800px', margin: '1rem auto' }}>
      <Card gap={16} outlined theme="filled">
        <Text variant="heading-2">Начнем без лишних слов</Text>
        <Text>
          На этой странице представлены практически все компоненты UI Kit Gypsum. Можешь быстро их
          посмотреть, а затем изучить каждый подробнее.
        </Text>
        <Flex gap={8}>
          <Button theme="reverted" onClick={() => ScrollToId('TextBlock')}>
            Начать знакомство <Icon size={25} data={CaretRightOutline}></Icon>
          </Button>
          <Link to="/">
            <Button theme="reverted-secondary">На главную</Button>
          </Link>
        </Flex>
      </Card>
      <ThemeDemo />
      <TextDemo />
      <CardDemo />

      <Article>
        <Text variant="heading-1">Компоненты форм</Text>
        <Text variant="body-1">Мы предоставляем красивые поля ввода для ваших форм</Text>
        <Code code={formCode}></Code>
        <Text variant="body-1">Подробнее про пропсы для текста</Text>
        <Code code={formPropsCode}></Code>
        <Disclosure summary="Примеры элементов форм">
          <Col gap=".5rem">
            <Input
              type={'text'}
              value={value}
              onChange={e => {
                setValue(e);
              }}
              placeholder={'Введите ваше имя'}
              width="max"
              helperText="Пишите имя на русском"
            />
            <Textarea
              width="max"
              value={longValue}
              onChange={val => setLongValue(val)}
              placeholder="Здесь будет много текста"
              helperText="Здесь можно написать много строк"
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
              onChange={(option: Option | Option[]) => setSelected(option as Option)}
              closeAfterSelect={true}
              floatingOptions={checked}
              width="max"
            ></Select>
            <Select
              options={options}
              placeholder="Выбери меня!"
              selected={selectedM}
              onChange={(options: Option | Option[]) => setSelectedM(options as Option[])}
              floatingOptions={checked}
              closeAfterSelect={false}
              multiple
              width="max"
            ></Select>
          </Col>
        </Disclosure>
      </Article>
    </Col>
  );
}
