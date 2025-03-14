import clsx from 'clsx';
import { ChartData } from './Chart';

interface ChartLegendProps {
  data: ChartData[];
  onLegendClick: (id: ChartData['id']) => void;
}

export default function ChartLegend({ data, onLegendClick }: ChartLegendProps) {
  return (
    <ul className='grid gap-2 lg:gap-2'>
      {data.map(({ id, label, color, customLabel, selected }) => (
        <li
          key={id}
          className='flex cursor-pointer items-center gap-2 lg:gap-4'
          onClick={() => onLegendClick(id)}
        >
          <span className='h-2 w-2 rounded-xs lg:h-4 lg:w-4' style={{ background: color }} />
          <span className={clsx('opacity-40', selected && 'opacity-100')}>
            {customLabel ?? label}
          </span>
        </li>
      ))}
    </ul>
  );
}
