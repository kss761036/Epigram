import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: '인가 코드가 없습니다.' }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/KAKAO`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
        token: code,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: '로그인 실패' }, { status: 400 });
    }

    const { accessToken, refreshToken, user } = await response.json();

    const responseHeaders = new Headers();
    responseHeaders.append('Set-Cookie', `accessToken=${accessToken}; Path=/; SameSite=Lax`);
    responseHeaders.append('Set-Cookie', `refreshToken=${refreshToken}; Path=/; SameSite=Lax`);

    return NextResponse.json({ user }, { status: 200, headers: responseHeaders });
  } catch (error) {
    console.error('카카오 로그인 요청 실패:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
