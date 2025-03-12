'use client';

import { ChangeEvent, InputHTMLAttributes, useEffect, useId, useState } from 'react';
import { cn } from '@/utils/helper';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  type?: 'checkbox' | 'radio';
  label?: string;
  labelColor?: string;
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Toggle({
  type = 'checkbox',
  checked,
  labelColor = 'text-gray-400',
  label,
  className,
  onChange,
  ...props
}: ToggleProps) {
  const id = useId();
  const [isChecked, setIsChecked] = useState(checked ?? false);

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  const classes = {
    container: cn(className),
    input: 'sr-only',
    label: 'flex cursor-pointer items-center justify-center gap-2',
    labelText: cn(labelColor, 'text-[12px] md:text-lg'),
    toggleBorder: cn('transition-colors', isChecked ? 'fill-black-600' : 'fill-gray-300'),
    toggleCircle: 'fill-white transition-transform duration-300',
  };

  return (
    <div className={classes.container}>
      <input
        id={id}
        className={classes.input}
        type={type}
        checked={isChecked}
        onChange={handleChange}
        {...props}
      />
      <label className={classes.label} htmlFor={id}>
        {label && <span className={classes.labelText}>{label}</span>}
        <div className='block md:hidden'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='16'
            viewBox='0 0 32 16'
            fill='none'
          >
            <rect width='32' height='16' rx='8' className={classes.toggleBorder} />
            <circle
              cx='8'
              cy='8'
              r='5'
              className={classes.toggleCircle}
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
            <rect width='42' height='24' rx='12' className={classes.toggleBorder} />
            <circle
              cx='12'
              cy='12'
              r='8'
              fill='white'
              className={classes.toggleCircle}
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
