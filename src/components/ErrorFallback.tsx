import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
import Logo from '@/assets/img/common/logo.svg';

interface ErrorFallbackProps {
  title: string;
  content: string;
}

export default function ErrorFallback({ title, content }: ErrorFallbackProps) {
  return (
    <div className='bg-bg flex min-h-dvh items-center justify-center text-center'>
      <div className='w-full max-w-xs rounded-3xl bg-white p-12'>
        <div className='mb-16'>
          <Image src={Logo} alt='epigram' className='mx-auto mb-6 h-8 w-auto' />
        </div>
        <div className='mb-16'>
          <h2 className='text-2lg mb-[0.5em] font-semibold tracking-tight'>{title}</h2>
          <div className='text-md tracking-tight text-gray-300'>{content}</div>
        </div>
        <div>
          <Link href='/' replace className=''>
            <Button size='xs' className='w-full whitespace-nowrap md:w-full lg:w-full'>
              처음으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
