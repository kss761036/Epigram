import { HTMLAttributes } from 'react';

export interface RadioProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  isChecked: boolean;
  id: string;
  onChange?: (checked: boolean) => void;
  label?: string;
  name?: string;
}

export default function Radio({
  isChecked = false,
  label = undefined,
  onChange,
  id = '',
  name = '',
}: RadioProps) {
  return (
    <div className='group'>
      <input
        className='peer sr-only'
        type='radio'
        name={name}
        id={id}
        checked={isChecked}
        onChange={() => onChange?.(!isChecked)}
      />
      <label className='flex cursor-pointer items-center gap-2' htmlFor={id}>
        <span className='relative block h-5 w-5 rounded-full border-2 border-blue-300'>
          <span className='absolute top-1/2 left-1/2 block h-2 w-2 -translate-1/2 scale-0 rounded-full bg-blue-800 transition-transform duration-100 group-has-[:checked]:scale-100'></span>
        </span>
        {label && <span className='leading-none'>{label}</span>}
      </label>
    </div>
  );
}
