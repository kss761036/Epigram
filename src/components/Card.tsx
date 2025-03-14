'use client';

import { cn } from '@/utils/helper';
import Link from 'next/link';

interface CardProps {
  content: string;
  referenceUrl: string;
  author?: string;
  tags?: { id: number; name: string }[];
  className?: string;
  contentClassName?: string;
}

export default function Card({
  content,
  author,
  tags,
  className,
  referenceUrl,
  contentClassName,
}: CardProps) {
  const classes = {
    cardWrapper: cn('font-iropke flex h-full flex-col text-left', className),
    notebookBg: "bg-[url('/notebook-bg.svg')] bg-repeat bg-white",
    cardBox:
      'flex h-full flex-1 flex-col rounded-[16px] border border-[#f2f2f2] p-4 md:p-6 min-h-[120px] shadow-[0px_3px_12px_0px_rgba(0,0,0,0.04)] md:min-h-[140px] lg:min-h-[180px]',
    cardContent: cn(
      'mb-auto line-clamp-3 text-[12px] leading-relaxed break-keep md:line-clamp-4 md:text-[16px] lg:text-[24px]',
      contentClassName,
    ),
    cardAuthor:
      'mt-[6px] text-right text-[12px] leading-relaxed text-blue-400 md:mt-0 md:text-[16px] lg:mt-3 lg:text-[24px]',
    cardTag:
      'mt-2 flex flex-wrap justify-end gap-x-2 text-right text-[12px] leading-relaxed text-blue-400 md:text-[16px] lg:text-[24px]',
  };

  return (
    <div className={classes.cardWrapper}>
      <Link href={referenceUrl} className={`${classes.notebookBg} ${classes.cardBox}`}>
        <div className={classes.cardContent}>{content}</div>
        {author && <div className={classes.cardAuthor}>- {author} -</div>}
      </Link>
      {tags && (
        <ul className={classes.cardTag}>
          {tags.map((tag) => (
            <li key={tag.id}>#{tag.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
