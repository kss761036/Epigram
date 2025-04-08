import { EpigramDetail } from '@/apis/epigram/epigram.type';
import { useUserByNicknameQuery } from '@/apis/user/user.queries';

type DetailContent = Pick<EpigramDetail, 'content' | 'author' | 'writerId'>;

export function DetailContent({ content, author, writerId }: DetailContent) {
  const userNickname = useUserByNicknameQuery({ userId: writerId })?.data?.nickname;
  const authorName = author === '본인' ? userNickname : author;

  return (
    <>
      <h2 className='font-iropke mb-4 text-2xl leading-relaxed break-keep whitespace-pre-wrap md:mb-6 lg:mb-8 lg:text-3xl'>
        {content}
      </h2>
      <div className='mb-8 flex justify-end lg:mb-9'>
        <span className='text-blue-400 md:text-xl lg:text-2xl'>- {authorName} -</span>
      </div>
    </>
  );
}
