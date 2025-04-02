import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/nextauth';
import AuthWrapper from '../_components/AuthWrapper';
import LoginForm from '../_components/LoginForm';

export const metadata: Metadata = {
  title: '로그인 | 에피그램',
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <AuthWrapper>
      <LoginForm />
      <div className='text-md mt-3 text-right text-blue-400 md:text-lg lg:text-xl'>
        회원이 아니신가요?
        <Link href='/signup' className='text-black-500 pl-[0.5em] underline'>
          가입하기
        </Link>
      </div>
    </AuthWrapper>
  );
}
