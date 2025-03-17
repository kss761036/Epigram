import axios from 'axios';
import { getCsrfToken } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) => {
  const { provider } = await params;
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const csrfToken = await getCsrfToken();

  if (!code || !csrfToken) {
    return redirect('/login?error=google login error');
  }

  try {
    const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/auth/callback/${provider}`, {
      redirect: false,
      code,
      csrfToken,
      json: true,
    });
  } catch {
    redirect('/login?error=kakao login error');
  } finally {
    redirect('/');
  }
};
