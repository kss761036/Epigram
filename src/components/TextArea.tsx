import { cn } from '@/utils/helper';
import React from 'react';
import { useId } from 'react';

interface TextAreaProps {
  error?: string;
  errorClassName?: string;
  className?: string;
  placeholder?: string;
  label?: string;
  labelClassName?: string;
  required?: boolean;
}

export default function TextArea({
  error,
  errorClassName,
  className,
  placeholder,
  label,
  labelClassName,
  required,
  ...props
}: TextAreaProps) {
  const id = useId();
  return (
    <div className='flex flex-col'>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'text-black-600 mb-[9px] text-lg font-semibold md:mb-2.5 md:text-lg lg:mb-[27px] lg:text-xl',
            labelClassName,
          )}
        >
          {label}
          {required && (
            <span className='text-red ml-1 text-lg md:text-lg lg:ml-1.5 lg:text-xl'>*</span>
          )}
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
      {error && (
        <span
          className={cn(
            'text-red md:text-md mt-2 text-right text-xs lg:mt-4 lg:text-lg',
            errorClassName,
          )}
        >
          {error}
        </span>
      )}
    </div>
  );
}
