import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  requset: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) => {
  const { provider } = await params;
  let url = null;

  if (provider === 'kakao') {
    const baseURL = 'https://kauth.kakao.com/oauth/authorize';
    const query = new URLSearchParams({
      client_id: process.env.KAKAO_REST_API_KEY!,
      redirect_uri: process.env.KAKAO_REDIRECT_URI!,
      response_type: 'code',
      scope: 'account_email,profile_image,profile_image',
      prompt: 'login',
    }).toString();

    url = `${baseURL}?${query}`;
  }

  if (provider === 'google') {
    const baseURL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const query = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      response_type: 'code',
      scope: 'openid email profile',
      prompt: 'consent',
    }).toString();

    url = `${baseURL}?${query}`;
  }

  if (!url) {
    redirect('/login?error=공급자를 선택해주세요');
  }

  return NextResponse.redirect(url);
};
