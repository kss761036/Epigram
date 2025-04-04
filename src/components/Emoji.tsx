import { SVGProps } from 'react';
import { Emotion } from '@/types/common';
import { cn } from '@/utils/helper';
import { iconPaths } from './Emoji.path';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  disabled?: boolean;
  name: Emotion;
}

export default function Emoji({
  size = 32,
  name,
  disabled = false,
  className,
  ...props
}: IconProps) {
  if (!(name in iconPaths)) {
    console.warn(`${name}은 존재하지 않는 아이콘입니다.`);
    return null;
  }

  const path = iconPaths[name];
  const svgClassName = cn('aspect-square', disabled && 'grayscale opacity-40', className);

  return (
    <svg width={size} viewBox='0 0 32 32' className={svgClassName} {...props}>
      {path}
    </svg>
  );
}
