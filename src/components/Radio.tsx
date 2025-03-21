import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from 'react';
import { cn } from '@/utils/helper';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLDivElement>, 'onChange'> {
  id: string;
  label: string;
  labelColor?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export default function Radio({
  id,
  label,
  labelColor = 'text-black-600',
  checked,
  onChange,
  className,
  ...props
}: RadioProps) {
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
    container: cn('group', className),
    input: 'peer sr-only',
    label: 'flex cursor-pointer items-center gap-2',
    radioBorder: 'relative block h-5 w-5 rounded-full border-2 border-blue-300 md:h-6 md:w-6',
    radioCircle:
      'absolute top-1/2 left-1/2 block h-2.5 w-2.5 -translate-1/2 scale-0 rounded-full bg-blue-800 transition-transform duration-100 group-has-[:checked]:scale-100 md:h-3 md:w-3',
    labelText: cn(labelColor, 'text-[16px] leading-none font-medium md:text-[20px]'),
  };

  return (
    <div className={classes.container}>
      <input
        className={classes.input}
        type='radio'
        id={id}
        checked={isChecked}
        onChange={handleChange}
        {...props}
      />
      <label className={classes.label} htmlFor={id}>
        <span className={classes.radioBorder}>
          <span className={classes.radioCircle}></span>
        </span>
        {label && <span className={classes.labelText}>{label}</span>}
      </label>
    </div>
  );
}
