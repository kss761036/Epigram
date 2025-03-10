import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/helper';
import { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren } from 'react';

const sampleVariants = cva('p-4 flex items-center justify-center rounded-md', {
  variants: {
    color: {
      primary: 'bg-blue-900 text-white',
      secondary: 'bg-blue-200',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

interface SampleProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof sampleVariants> {
  color?: 'primary' | 'secondary';
}

export default function Sample({ color = 'primary', className, ...props }: SampleProps) {
  return <div className={cn(sampleVariants({ color, className }))} {...props} />;
}
