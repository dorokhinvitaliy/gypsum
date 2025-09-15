![Изображение](./public/LogoLarge.svg 'Логотип')

## Gypsum UI — набор компонентов для React

Gypsum — это легкий UI Kit на TypeScript для React, ориентированный на простоту интеграции, понятную типизацию и приятный внешний вид из коробки. Библиотека включает базовые элементы (кнопки, текст, поля ввода), навигацию (aside-меню), вспомогательные виджеты (Tooltip, Modal, Loader) и модуль анимаций для скролл-зависимых эффектов.

![Изображение](./public/MainComponents.png 'Основные компоненты')
![Изображение](./public/RestComponents.png 'Остальные компоненты')

### Возможности

- Компоненты с аккуратной типизацией и предсказуемым API
- Готовые стили и вариации (темы, размеры)
- Навигация с коллапсом и тултипами
- Подсветка кода, цветоподборщик, disclosure, checkbox и др.
- Модуль анимаций: Slides/Slide, Transition и Animation с декларативными правилами

---

## Запуск проекта локально

Требования: Node.js 18+.

1. Установка зависимостей:

```bash
npm install
```

2. Запуск в режиме разработки:

```bash
npm run dev
```

Проект на Vite. Точка входа: `src/main.tsx`, демо-страницы в `src/pages`, компоненты — в `src/components`.

---

## Темизация и стили

- Глобальные CSS‑переменные и базовые стили находятся в `src/styles`.
- Многие компоненты поддерживают управление цветами через CSS‑переменные (например, `--gy-color-brand`).
- SCSS/CSS‑модули инкапсулируют стили каждого компонента.

---

## Компоненты и использование

Ниже краткий обзор основных компонентов и их пропсов с примерами использования.

### Text

Отображение типографики с предустановленными вариантами и цветами.

Пропсы:

- `variant?: TextVariant`

```tsx
type TextVariant =
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
```

- `color?: TextColor` — цвет: `'primary' | 'brand' | 'secondary' | 'tertiary' | 'disabled' | 'inherit'`.

Пример:

```tsx
import { Text } from '@/components';

<Text variant="heading-2" color="secondary">
  Заголовок
</Text>;
```

### Button

Кнопка с темами, размерами и состояниями.

Пропсы:

- `theme?: 'primary' | 'secondary' | 'normal' | 'normal-flat' | 'flat' | 'outlined' | 'reverted' | 'reverted-secondary'`
- `size?: 'xl' | 'l' | 'm' | 's' | 'xs'`
- `width?: 'auto' | 'max'`
- `disabled?: boolean`, `loading?: boolean`, а также стандартные атрибуты кнопки

Пример:

```tsx
import { Button, Icon } from '@/components';
import { HomeSolid } from '@/components/Icons';

<Button theme="primary" size="l" onClick={() => console.log('click')}>
  Нажми меня
</Button>

<Button theme="flat">
  <Icon data={HomeSolid} />
</Button>
```

### Flex, Col, Centered

Удобные контейнеры для верстки на Flexbox.

Пропсы (основные):

- `direction`, `justifyContent`, `alignItems`, `gap`, `wrap`, `className`, `style` и стандартные HTML-атрибуты.

Пример:

```tsx
import { Flex } from '@/components';

<Flex gap={12} alignItems="center">
  <div>A</div>
  <div>B</div>
</Flex>;
```

### Card

Карточка с темами и опциональной обводкой.

Пропсы:

- `theme?: 'normal' | 'normal-branded' | 'filled'`
- `outlined?: boolean`
- `brandColor?: string` — можно задать брендовый цвет

Пример:

```tsx
import { Card } from '@/components';

<Card theme="filled" outlined brandColor="#747bff">
  Контент карточки
</Card>;
```

### Input

Поле ввода с плавающей подсказкой и состояниями.

Пропсы:

- `type: string`, `value: string`, `valid: boolean`, `disabled: boolean`, `onChange: (value: string) => void`
- `placeholder: string`, `helperText?: string`, `width?: 'max' | 'auto'`

Пример:

```tsx
import { Input } from '@/components';

<Input
  type="text"
  value={value}
  onChange={setValue}
  placeholder="Ваше имя"
  helperText="Подсказка"
/>;
```

### Select

Кастомный селект с одиночным и множественным выбором.

Тип `Option`:

```ts
type Option = { id: string | number; text: string };
```

Пропсы (основные):

- `options: Option[]`
- `selected: Option | Option[] | null`
- `onChange: (option: Option | Option[]) => void`
- `placeholder: string`, `multiple?: boolean`, `closeAfterSelect?: boolean`, `width?: 'auto' | 'max'`, `selectLimit?: number`

Пример:

```tsx
import { Select } from '@/components';

<Select
  options={[
    { id: 1, text: 'One' },
    { id: 2, text: 'Two' },
  ]}
  selected={selected}
  onChange={setSelected}
  placeholder="Выберите"
/>;
```

### Textarea

Текстовое поле с автоизменением высоты и подсказкой.

Пропсы:

- `value: string`, `onChange: (value: string) => void`
- `placeholder: string`, `helperText?: string`, `width?: 'max' | 'auto'`

Пример:

```tsx
import { Textarea } from '@/components';

<Textarea value={bio} onChange={setBio} placeholder="О себе" />;
```

### Checkbox и CheckboxGroup

Обычный чекбокс и группа.

Checkbox пропсы:

- `label?: string`, `checked?: boolean`, `filled?: boolean`, `onChange?: (checked: boolean) => void`

Пример:

```tsx
import { Checkbox } from '@/components';

<Checkbox label="Согласен" checked={checked} onChange={setChecked} />;
```

### Tooltip

Тултип с автоподбором позиции и задержкой открытия.

Пропсы:

- `content: React.ReactNode`
- `position?: 'top' | 'bottom' | 'left' | 'right'`
- `delay?: number`, `hasArrow?: boolean`

Пример:

```tsx
import { Tooltip, Button } from '@/components';

<Tooltip content="Подсказка" position="top">
  <Button theme="normal">Наведи</Button>
</Tooltip>;
```

### Modal

Портальная модалка с плавным появлением/скрытием.

Пропсы:

- `open: boolean`, `onClose: () => void`, `useClickOutside?: boolean`

Пример:

```tsx
import { Modal, Button } from '@/components';

<>
  <Button onClick={() => setOpen(true)}>Открыть</Button>
  <Modal open={open} onClose={() => setOpen(false)} useClickOutside>
    Контент модалки
  </Modal>
</>;
```

### Loader

Индикатор загрузки, опционально с оверлеем.

Пропсы: `withOverlay?: boolean`.

```tsx
import { Loader } from '@/components';

<Loader withOverlay />;
```

### Layout / Aside / Navigation

Левая панель навигации с коллапсом, группами и ссылками. Экспортируется как `Aside` из `@/components`.

Ключевые части:

- `Aside` — контейнер; пропсы: `renderContent`, `hasToggleButton?`, `collapsed?`, `closeOnClickOutside?` и т.д.
- `Aside.Link` — пункт-линк с иконкой
- `Aside.Item` — произвольный элемент с иконкой
- `Aside.Divider` — разделитель, `stroke?: number`
- `Aside.Group` — группа элементов

Пример:

```tsx
import { Aside, Text } from '@/components';
import { HomeSolid } from '@/components/Icons';

<Aside renderContent={<div>Контент</div>}>
  <Aside.Item icon={HomeSolid}>GypsumUI</Aside.Item>
  <Aside.Divider stroke={1} />
  <Aside.Link to="/" icon={HomeSolid}>
    Главная
  </Aside.Link>
</Aside>;
```

### Helper

Обертка для всплывающих подсказок рядом с элементами (используется в `Aside`).

Пропсы: `data: React.ReactNode`, `hidden?: boolean`.

### Article

Контейнер-колонка для текстового контента.

```tsx
import { Article } from '@/components';

<Article>Текст статьи</Article>;
```

### Code

Подсветка кода с кнопкой копирования (декоративно).

Пропсы: `code: string`, `lang?: string`, `theme?: Theme`.

```tsx
import { Code } from '@/components';

<Code code={`console.log('Hello')`} lang="ts" theme={...} />;
```

### Disclosure

Сворачиваемый блок с заголовком и контентом.

Пропсы:

- `summary: React.ReactNode`, `filled?: boolean`, `width?: 'max' | 'auto' | number`

```tsx
import { Disclosure } from '@/components';

<Disclosure summary="Подробнее" filled>
  Содержимое
</Disclosure>;
```

### Icons и Icon

`Icon` — универсальная обертка для SVG-иконок. Есть готовые иконки в `src/components/Icons`.

```tsx
import { Icon } from '@/components';
import { HomeSolid } from '@/components/Icons';

<Icon data={HomeSolid} size={20} />;
```

### Модуль анимаций

Состоит из:

- `Slides` — контейнер для набора слайдов
- `Slide` — область с фиксированной высотой (вьюпорты), измеряет фазу скролла
- `Transition` — интерполирует стили по фазе слайдов
- `Animation` — проигрывает анимации по правилам (триггеры, rewind и т.д.)

Типы: см. `src/components/Animation/types.ts`.

Пример использования `Slide` и `Transition`:

```tsx
import { Slides, Slide, Transition } from '@/components';

<Slides>
  <Slide duration={2} onSlideScroll={(phase, isActive) => console.log(phase, isActive)}>
    <Transition
      transitions={{
        opacity: { from: 0, to: 1, phase: { start: 0, stop: 1 } },
        translateY: { from: 50, to: 0, phase: { start: 0.2, stop: 0.8 }, pattern: '{}' },
      }}
    >
      <div>Содержимое</div>
    </Transition>
  </Slide>
</Slides>;
```

Пример использования `Animation`:

```tsx
import { Slides, Slide, Animation } from '@/components';

<Slides>
  <Slide>
    <Animation
      animations={{
        opacity: { from: 0, to: 1, frame: 0.1, duration: 300 },
        translateX: { from: 0, to: 100, frame: 0.3, duration: 200, pattern: '{}px' },
        scale: { from: 0, to: 1, frame: 0.2, duration: 200, timingFunction: 'ease-in-out' },
      }}
    >
      <div>Анимируемый блок</div>
    </Animation>
  </Slide>
</Slides>;
```

---

## Структура проекта (ключевое)

- `src/components` — все компоненты UI
- `src/pages` — демо-страницы
- `src/styles` — переменные и глобальные стили
- `src/components/Animation` — модуль анимаций

---

## Скрипты NPM

- `dev` — запуск dev-сервера
- `build` — сборка
- `preview` — локальный предпросмотр бандла
