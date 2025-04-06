'use client';

import { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/helper';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from './Dropdown';
import Icon from './Icon';

export function MoreMenu({ children }: PropsWithChildren) {
  return (
    <Dropdown className='relative leading-none'>
      <DropdownTrigger className='rounded-sm hover:bg-blue-200'>
        <Icon name='more' className='w-6 text-blue-400 lg:w-8' />
      </DropdownTrigger>
      <DropdownMenu className='bg-bg absolute top-[calc(100%+10px)] right-0 overflow-hidden rounded-2xl border border-blue-300 p-1 text-center'>
        {children}
      </DropdownMenu>
    </Dropdown>
  );
}

export function MoreMenuItem({
  className,
  children,
  onClick,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLLIElement> & { onClick: () => void }>) {
  const ItemClassName = cn(
    'text-md lg:text-2lg cursor-pointer px-6 py-2 lg:px-8 lg:py-3 whitespace-nowrap hover:bg-blue-200 rounded-xl',
    className,
  );

  return (
    <DropdownItem {...props}>
      <button type='button' onClick={onClick} className={ItemClassName}>
        {children}
      </button>
    </DropdownItem>
  );
}
