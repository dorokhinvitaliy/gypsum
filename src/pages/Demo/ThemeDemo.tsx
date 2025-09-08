import { Anchor, Article, Code, Text } from '@/components';

export const ThemeDemo = () => {
  return (
    <Article>
      <Anchor>Темизация</Anchor>
      <Text>
        Всё начинается здесь. Для раскраски компонентов мы используем всего один цвет - брендовый.
        Вы можете поменять цвет и перекрасите весь сайт. Остальные цвета генерируются из него.
      </Text>
      <Code
        lang="css"
        code={`:root {
    --gy-color-brand: #0a45ceff;
}`}
      ></Code>
    </Article>
  );
};
