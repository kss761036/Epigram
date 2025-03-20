'use client';

import React, { InputHTMLAttributes, useState, useId, RefAttributes } from 'react';
import { cn } from '@/utils/helper';
import Icon from './Icon';
import { cva, VariantProps } from 'class-variance-authority';

type input = 'text' | 'email' | 'password' | 'search';

const inputVariants = cva(
  'text-black-950 outline-black-600 h-[44px] w-full pl-4 text-lg placeholder:text-blue-400 lg:h-[64px] lg:text-xl',
  {
    variants: {
      variant: {
        filled: 'bg-blue-200  rounded-[12px]',
        outlined: 'bg-blue-100 border border-blue-300 rounded-[12px]',
        underlined: 'bg-blue-100 border-b-2 border-blue-800 p-0 outline-none',
      },
      hasError: {
        true: 'border-red outline-red border',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      hasError: false,
    },
  },
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    RefAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  placeholder?: string;
  className?: string;
  error?: string;
  errorClassName?: string;
  type: input;
  variant?: 'filled' | 'outlined' | 'underlined';
  label?: string;
  labelClassName?: string;
  onSearch?: () => void;
}
interface PasswordState {
  type: 'password' | 'text';
}

export default function Input({
  placeholder = '',
  className,
  error,
  errorClassName,
  type,
  variant,
  label,
  labelClassName,
  onSearch,
  ...props
}: InputProps) {
  const [passwordState, setPasswordState] = useState<PasswordState>({
    type: 'password',
  });

  const togglePasswordVisibility = () => {
    setPasswordState((prev) => ({
      type: prev.type === 'password' ? 'text' : 'password',
    }));
  };

  const inputType = type === 'password' ? passwordState.type : type;

  const id = useId();

  const styleVariant =
    variant ??
    (type === 'email' || type === 'password'
      ? 'filled'
      : type === 'search'
        ? 'underlined'
        : 'outlined');

  const variantClassName = inputVariants({
    variant: styleVariant,
    hasError: Boolean(error),
  });

  return (
    <div className='flex flex-col'>
      {label && (
        <label className={'text-md mb-4 text-blue-900 md:mb-5 md:text-lg lg:text-xl'} htmlFor={id}>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          className={cn(variantClassName, className)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && type === 'search' && onSearch) {
              onSearch();
            }
          }}
          {...props}
        />
        {type === 'password' && (
          <Icon
            name={passwordState.type === 'password' ? 'eyeOff' : 'eyeOn'}
            size={24}
            onClick={togglePasswordVisibility}
            className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-200'
          />
        )}
        {type === 'search' && (
          <Icon
            name='search'
            size={20}
            className='absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer lg:w-[36px]'
            onClick={onSearch}
          />
        )}
      </div>
      {error && (
        <span className={cn('text-red md:text-md mt-2 ml-2 text-xs lg:text-lg', errorClassName)}>
          {error}
        </span>
      )}
    </div>
  );
}
