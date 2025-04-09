import { EpigramDetail } from '@/apis/epigram/epigram.type';

type DetailContent = Pick<EpigramDetail, 'content' | 'author'>;

export function DetailContent({ content, author }: DetailContent) {
  return (
    <>
      <h2 className='font-iropke mb-4 text-2xl leading-relaxed break-words break-keep whitespace-pre-wrap md:mb-6 lg:mb-8 lg:text-3xl'>
        {content}
      </h2>
      <div className='mb-8 flex justify-end lg:mb-9'>
        <span className='text-blue-400 md:text-xl lg:text-2xl'>- {author} -</span>
      </div>
    </>
  );
}
