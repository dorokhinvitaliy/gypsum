import { useState } from 'react';
import {
  Input,
  Select,
  Button,
  Modal,
  Text,
  Tooltip,
  Loader,
  Textarea,
  Disclosure,
  Code,
  Icon,
} from '@/components';
import Flex, { Col } from '@/components/Flex/Flex';
import type { Option } from '@/components/Input/Select.type';
import { textVariants } from '@/components/Text/Text.types';
import Card from '@/components/Card/Card';
import Checkbox, { CheckboxGroup } from '@/components/Checkbox/Checkbox';
import CopyOutline from '@/components/Icons/Copy';

export default function Home() {
  const [value, setValue] = useState('');
  const [longValue, setLongValue] = useState('');
  const [selected, setSelected] = useState<Option | null>(null);
  const [selectedM, setSelectedM] = useState<Option[]>([]);
  const [checked, setChecked] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const codeBlock = `
<Flex gap=".5rem">
  <Button size="xl">Большая - XL</Button>
  <Button size="l">Стандартная - L</Button>
  <Button size="m">Средняя - M</Button>
  <Button size="s">Маленькая - S</Button>
  <Button size="xs">Крошечная - XS</Button>
  <Button size="l">
    <Icon data={CopyOutline} />
  </Button>
</Flex>
`;
  const options: Option[] = [
    { id: 1, text: 'Элемент 1 списка' },
    { id: 2, text: 'Второй элемент списка' },
    { id: 3, text: 'Третий элемент списка' },
  ];

  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        gap="1rem"
        style={{ padding: '1rem', margin: '0 auto', maxWidth: '600px', position: 'relative' }}
      >
        <Disclosure summary="Нажми, чтобы развернуть содержимое">
          <CheckboxGroup
            options={options}
            selected={selectedM}
            onChange={val => setSelectedM(val)}
          />
        </Disclosure>
        <Disclosure filled width="max" summary="Компонент Кнопка">
          <Flex gap=".5rem">
            <Button>Основная</Button>
            <Button theme="secondary">Второстепенная</Button>
            <Button theme="normal">Нормальная</Button>
            <Button theme="flat">Без фона</Button>
            <Button theme="normal-flat">Без фона</Button>
          </Flex>
          <Flex gap=".5rem">
            <Button size="xl">Большая - XL</Button>
            <Button size="l">Стандартная - L</Button>
            <Button size="m">Средняя - M</Button>
            <Button size="s">Маленькая - S</Button>
            <Button size="xs">Крошечная - XS</Button>
            <Button size="l">
              <Icon data={CopyOutline} />
            </Button>
          </Flex>
        </Disclosure>
        <Code code={codeBlock} />
        <Disclosure summary="Компонент Текста">
          <Col gap=".5rem">
            {textVariants.map(variant => (
              <Text key={variant} variant={variant}>
                Текст варианта {variant}
              </Text>
            ))}
          </Col>
        </Disclosure>
        <Disclosure summary="компонент Cards">
          <Flex gap={16}>
            <Card gap={16} style={{ width: '300px', backgroundColor: '#18a4ef10' }}>
              <Text variant="subheading-1">Назавние карточки</Text>
              <Text>Тело карточки</Text>
              <Flex gap={8}>
                <Button>В корзину</Button>
                <Button normal>Удалить</Button>
              </Flex>
            </Card>{' '}
            <Card gap={16} style={{ width: '400px', backgroundColor: '#18a4ef10' }}>
              <Text variant="subheading-1">Назавние карточки</Text>
              <Text>Тело карточки</Text>
              <Flex gap={8}>
                <Button>В корзину</Button>
                <Button normal>Удалить</Button>
              </Flex>
            </Card>{' '}
            <Card gap={16} style={{ width: '400px', backgroundColor: '#18a4ef10' }}>
              <Text variant="subheading-1">Назавние карточки</Text>
              <Text>Тело карточки</Text>
              <Flex gap={8}>
                <Button>В корзину</Button>
                <Button normal>Удалить</Button>
              </Flex>
            </Card>{' '}
          </Flex>
        </Disclosure>
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
        {isLoading && <Loader withOverlay />}

        {/* <Select placeholder="role">
        <Select.Option>Привет!</Select.Option>
      </Select> */}
        <Flex gap={10}>
          <Button onClick={() => setOpen(true)}>Открой окно</Button>
          <Tooltip
            hasArrow
            position="right"
            content={
              <Flex direction="column">
                <Text variant="heading-3">Важное сообщение!</Text>
                <Text variant="body-1">Уже всё...</Text>
                <Button theme="flat">Ознакомлен</Button>
              </Flex>
            }
          >
            <Button
              theme="secondary"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                }, 10000);
              }}
            >
              Text
            </Button>
          </Tooltip>
        </Flex>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Col gap={10} direction="column">
            <Flex justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
              <Text variant="heading-3">Заголовок модалки</Text>
              <Button theme="flat" onClick={() => setOpen(false)}>
                X
              </Button>
            </Flex>
            <Text>Main content</Text>
            <Flex>
              <Button>Привет!</Button>
            </Flex>
          </Col>
        </Modal>
        <Tooltip hasArrow content={<>Треш</>} position="right">
          <Button theme="normal">Наведи на меня</Button>
        </Tooltip>
      </Flex>
      <Button
        style={{ margin: '0 auto', display: 'block' }}
        onClick={() => {
          setIsLoading(!isLoading);
        }}
      >
        Переключить загрузку
      </Button>
    </>
  );
}
