import clsx from 'clsx';
import { ReactNode } from 'react';

interface ChartLegendProps {
  data: {
    label: ReactNode | string;
    color: string;
    displayValue: string;
  }[];
  currentIndex: number;
  onClick: (index: number) => void;
}

export default function ChartLegend({ data, currentIndex, onClick }: ChartLegendProps) {
  return (
    <ul className='grid gap-2 lg:gap-2'>
      {data.map(({ label, color, displayValue }, index) => (
        <li
          key={index}
          className='flex cursor-pointer items-center gap-2 lg:gap-4'
          onClick={() => onClick(index)}
        >
          <span className='h-2 w-2 rounded-xs lg:h-4 lg:w-4' style={{ background: color }} />
          <span>{label}</span>
          <span
            className={clsx(
              'text-xs font-semibold opacity-35 lg:text-xl',
              currentIndex === index && 'opacity-100',
            )}
          >
            {displayValue}
          </span>
        </li>
      ))}
    </ul>
  );
}
