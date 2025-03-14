'use client';

import { cn } from '@/utils/helper';
import Link from 'next/link';

interface SearchCardProps {
  content: string;
  referenceUrl: string;
  author?: string;
  tags?: { id: number; name: string }[];
  className?: string;
  contentClassName?: string;
  keyword?: string;
}

export default function SearchCard({
  content,
  author,
  tags,
  className,
  referenceUrl,
  contentClassName,
  keyword,
}: SearchCardProps) {
  // 키워드가 존재하면 공백을 제거하여 정규표현식 생성
  keyword = keyword ? keyword.replace(/\s+/g, '') : '';

  if (keyword) {
    // 키워드를 공백으로 구분하여 정규표현식 생성
    const regex = new RegExp(keyword.split('').join('\\s*'), 'gi');

    content = content.replace(regex, `<span class="text-illust-blue">$&</span>`);
    author = author?.replace(regex, `<span class="text-illust-blue">$&</span>`);
    tags = tags?.map((tag) => ({
      ...tag,
      name: tag.name.replace(regex, `<span class="text-illust-blue">$&</span>`),
    }));
  }

  const classes = {
    cardWrapper: cn(
      'block font-iropke bg-white text-left py-4 md:p-x-6 lg:py-6 border-b border-gray-100',
      className,
    ),
    cardContent: cn('text-[16px] leading-relaxed break-keep lg:text-[20px]', contentClassName),
    cardAuthor: 'mt-1 text-[16px] leading-relaxed text-blue-400 md:mt-2 lg:mt-6 lg:text-[20px]',
    cardTag:
      'mt-2 flex flex-wrap justify-end gap-x-2 text-right text-[16px] leading-relaxed text-blue-400 lg:gap-x-3 lg:mt-4 lg:text-[20px]',
  };

  return (
    <Link href={referenceUrl} className={classes.cardWrapper}>
      <div className={classes.cardContent} dangerouslySetInnerHTML={{ __html: content }} />
      {author && (
        <div className={classes.cardAuthor} dangerouslySetInnerHTML={{ __html: `- ${author} -` }} />
      )}
      {tags && (
        <ul className={classes.cardTag}>
          {tags.map((tag) => (
            <li key={tag.id} dangerouslySetInnerHTML={{ __html: `#${tag.name}` }} />
          ))}
        </ul>
      )}
    </Link>
  );
}
