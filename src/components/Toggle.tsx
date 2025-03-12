import { HTMLAttributes } from 'react';

export interface ToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  isChecked: boolean;
  id: string;
  onChange: (checked: boolean) => void;
  color?: string;
  label?: string;
  name?: string;
}

export default function Toggle({
  isChecked = false,
  onChange,
  color = 'text-gray-400',
  label = undefined,
  id = '',
  name = '',
}: ToggleProps) {
  return (
    <div>
      <input
        className='sr-only'
        type='checkbox'
        id={id}
        name={name}
        checked={isChecked}
        onChange={() => onChange(!isChecked)}
      />
      <label className='flex cursor-pointer items-center justify-center gap-2' htmlFor={id}>
        {label && <span className={`${color} text-[12px] md:text-lg`}>{label}</span>}
        <div className='block md:hidden'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='16'
            viewBox='0 0 32 16'
            fill='none'
          >
            <rect
              width='32'
              height='16'
              rx='8'
              className={`transition-colors ${isChecked ? 'fill-black-600' : 'fill-gray-300'}`}
            />
            <circle
              cx='8'
              cy='8'
              r='5'
              className={`fill-white transition-transform duration-300`}
              style={{
                transform: isChecked ? 'translateX(16px)' : 'translateX(0px)',
              }}
            />
          </svg>
        </div>
        <div className='hidden md:block'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='42'
            height='24'
            viewBox='0 0 42 24'
            fill='none'
          >
            <rect
              width='42'
              height='24'
              rx='12'
              className={`transition-colors ${isChecked ? 'fill-black-600' : 'fill-gray-300'}`}
            />
            <circle
              cx='12'
              cy='12'
              r='8'
              fill='white'
              className={`fill-white transition-transform duration-300`}
              style={{
                transform: isChecked ? 'translateX(18px)' : 'translateX(0px)',
              }}
            />
          </svg>
        </div>
      </label>
    </div>
  );
}
