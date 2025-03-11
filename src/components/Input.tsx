'use client';

import React from 'react';
import { useState, useId } from 'react';
import { cn } from '@/utils/helper';
import Icon from './Icon';

type input = 'text' | 'email' | 'password' | 'search';

interface InputProps {
  placeholder?: string;
  className?: string;
  error?: string;
  type: input;
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
  type,
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

  const emailClassName = 'bg-blue-200  rounded-[12px]';
  const passwordClassName = 'bg-blue-200  rounded-[12px]';
  const textClassName = 'bg-blue-100 border border-blue-300 rounded-[12px]';
  const searchClassName = 'bg-blue-100 border-b-2 border-blue-800 p-0 outline-none';

  const typeClassName =
    type === 'email'
      ? emailClassName
      : type === 'password'
        ? passwordClassName
        : type === 'text'
          ? textClassName
          : searchClassName;

  return (
    <div className='flex flex-col'>
      {label && (
        <label className={'text-md mb-4 text-blue-900 lg:mb-4 lg:text-xl'} htmlFor={id}>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          className={cn(
            'text-black-950 outline-black-600 h-[44px] w-full pl-4 text-lg placeholder:text-blue-400 lg:h-[64px] lg:text-xl',
            typeClassName,
            error && 'border-red outline-red border',
            className,
          )}
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
      {error && <span className='text-red ml-2'>{error}</span>}
    </div>
  );
}
