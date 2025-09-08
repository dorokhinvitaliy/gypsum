import { Text, Anchor, Code, Article, Card, Flex } from '@/components';

export default function TextDemo() {
  const code = `
<Col><Flex></Flex></Col>`;
  const propsCode = `
interface CardProps = {
  className?: string;
  theme?: 'normal' | 'normal-branded' | 'filled';
  outlined?: boolean;
  style?: CSSProperties;
  brandColor?: string;
} & HTMLAttributes<HTMLElement> & FlexProps;

  `;
  return (
    <Article>
      <Anchor id={'TextBlock'}>Карточки</Anchor>
      <Text variant="body-1">
        Удобные карточки для вашего контента. Компонент основан на <code>Col</code>. Довольно вольно
        стилизуемый компонент
      </Text>
      <Code code={code}></Code>
      <Text variant="body-1">Подробнее про пропсы для карточки</Text>
      <Code code={propsCode}></Code>
      <Flex gap=".5rem" style={{ width: '100%' }}>
        <Card outlined theme="normal-branded" brandColor="#747bff">
          <Text variant="heading-2">Заголовок карточки</Text>
          <Text>Основной текст карточки</Text>
        </Card>
        <Card outlined theme="normal" brandColor="#747bff">
          <Text variant="heading-2">Заголовок карточки</Text>
          <Text>Основной текст карточки</Text>
        </Card>
        <Card theme="filled" brandColor="#747bff">
          <Text variant="heading-2">Заголовок карточки</Text>
          <Text>Основной текст карточки</Text>
        </Card>
        <Card theme="filled" brandColor="#0e7db0ff">
          <Text variant="heading-2">Заголовок карточки</Text>
          <Text>Основной текст карточки</Text>
        </Card>
        <Card theme="normal-branded" brandColor="#0e7db0ff">
          <Text variant="heading-2">Заголовок карточки</Text>
          <Text>Основной текст карточки</Text>
        </Card>
      </Flex>
    </Article>
  );
}
