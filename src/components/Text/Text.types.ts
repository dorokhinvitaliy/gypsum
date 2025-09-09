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
  | 'body-0d5'
  | 'body-1'
  | 'body-2'
  | 'caption'
  | 'overline'
  | 'hint-1'
  | 'hint-2';

export const textVariants = [
  'display-1',
  'display-2',
  'display-3',
  'display-4',
  'heading-1',
  'heading-2',
  'heading-3',
  'subheading-1',
  'subheading-2',
  'body-0d5',
  'body-1',
  'body-2',
  'caption',
  'overline',
  'hint-1',
  'hint-2',
] as const;

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'inherit'
  | 'primary-reverted'
  | 'secondary-reverted'
  | 'brand';

export const textColors = ['primary', 'secondary', 'tertiary', 'disabled', 'inherit'] as const;
