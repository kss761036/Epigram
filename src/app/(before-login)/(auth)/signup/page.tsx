import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/utils/nextauth';
import AuthWrapper from '../_components/AuthWrapper';
import SignupForm from '../_components/SignupForm';

export const metadata: Metadata = {
  title: '회원가입 | 에피그램',
};

export default async function SignupPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <AuthWrapper>
      <SignupForm />
    </AuthWrapper>
  );
}
