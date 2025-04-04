'use client';

import { HTMLAttributes, useState } from 'react';
import Image from 'next/image';
import { EMOTION } from '@/types/common';
import { cn } from '@/utils/helper';
import Emoji from './Emoji';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

export default function Avatar({ src, alt, className }: AvatarProps) {
  const [error, setError] = useState(false);

  let renderImage;

  if (error || !src) {
    renderImage = alt ? <CharacterAvatar name={alt} /> : <DefaultAvatar />;
  } else {
    renderImage = (
      <Image
        src={src}
        alt={alt || 'avatar'}
        onError={() => setError(true)}
        fill
        className='object-cover'
      />
    );
  }

  return (
    <div
      className={cn(
        'relative flex aspect-square w-12 items-center justify-center overflow-hidden rounded-full bg-blue-200',
        className,
      )}
    >
      {renderImage}
    </div>
  );
}

function CharacterAvatar({ name }: { name: string }) {
  return (
    <span className='font-semibold text-blue-800 uppercase' data-character-avatar>
      {name.slice(0, 1)}
    </span>
  );
}

function DefaultAvatar() {
  return <Emoji name={EMOTION.HAPPY} className='w-full opacity-20 grayscale' data-default-avatar />;
}
