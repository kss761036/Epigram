import React from 'react';

export interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  primary?: boolean;
  label: string;
  onClick?: () => void;
}

export const ButtonTest = ({ size, primary = true, label, onClick }: ButtonProps) => {
  const baseClass = 'font-bold py-2 px-4 focus:outline-none focus:shadow-outline';

  const colorClass = primary
    ? 'bg-red-500 hover:bg-red-700 text-white'
    : 'bg-gray-500 hover:bg-gray-700 text-white';

  const sizeClass =
    size === 'large'
      ? 'py-3 px-6 text-lg'
      : size === 'small'
        ? 'py-1 px-2 text-sm'
        : 'py-2 px-4 text-base';

  return (
    <button type='button' className={`${sizeClass} ${baseClass} ${colorClass}`} onClick={onClick}>
      {label}
    </button>
  );
};
