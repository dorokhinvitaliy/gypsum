import type { SVGProps } from 'react';

export type IconProps = {
  data: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  size?: number | string;
} & SVGProps<SVGSVGElement>;

const Icon = ({ data: SVGIcon, size = '1.2em', ...props }: IconProps) => {
  return <SVGIcon width={size} height={size} {...props} />;
};

Icon.displayName = 'Icon';

export default Icon;
