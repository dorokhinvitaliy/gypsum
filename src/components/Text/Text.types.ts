import type { CSSProperties } from 'react';

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

export type NamedTextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'inherit'
  | 'primary-reverted'
  | 'secondary-reverted'
  | 'brand';

export type TextColor = NamedTextColor | CSSProperties['color'];

export const textColors = [
  'primary',
  'secondary',
  'tertiary',
  'disabled',
  'inherit',
  'primary-reverted',
  'secondary-reverted',
  'brand',
] as const;

export const baseColors: Set<NamedTextColor> = new Set([
  'primary',
  'secondary',
  'tertiary',
  'disabled',
  'inherit',
  'primary-reverted',
  'secondary-reverted',
  'brand',
]);
