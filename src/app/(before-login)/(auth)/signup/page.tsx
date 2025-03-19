import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/nextauth';
import AuthWrapper from '../_components/AuthWrapper';
import SignupForm from '../_components/SignupForm';

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
