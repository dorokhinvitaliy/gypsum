import { Text, Anchor, Code, Disclosure, Col, Article } from '@/components';
import { textVariants } from '@/components/Text/Text.types';

export default function TextDemo() {
  const textCode = `<Text variant="primary" color="secondary">Содержимое текста</Text>`;
  const textPropsCode = `
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
  return (
    <Article>
      <Anchor id={'TextBlock'}>Текст</Anchor>
      <Text variant="body-1">Куда без компонента текста?</Text>
      <Code code={textCode}></Code>
      <Text variant="body-1">Подробнее про пропсы для текста</Text>
      <Code code={textPropsCode}></Code>
      <Disclosure summary="Примеры текста Текста">
        <Col gap=".5rem">
          {textVariants.map(variant => (
            <Text key={variant} variant={variant}>
              Текст варианта {variant}
            </Text>
          ))}
        </Col>
      </Disclosure>
    </Article>
  );
}
