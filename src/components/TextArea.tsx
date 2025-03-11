import { cn } from '@/utils/helper';
import React from 'react';
import { useId } from 'react';

interface TextAreaProps {
  error?: string;
  className?: string;
  placeholder?: string;
  label?: string;
  labelClassName?: string;
}

export default function TextArea({
  error,
  className,
  placeholder,
  label,
  labelClassName,
  ...props
}: TextAreaProps) {
  const id = useId();
  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label htmlFor={id} className={`${labelClassName}`}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        className={cn(
          'text-black-950 outline-black-600 h-[132px] w-full resize-none rounded-[12px] border border-blue-300 bg-blue-100 p-4 pt-2.5 text-lg placeholder:text-blue-400 lg:h-[148px] lg:text-xl',
          error && 'border-red outline-red',
          className,
        )}
        {...props}
      />
      {error && <span className='text-red text-right'>{error}</span>}
    </div>
  );
}
