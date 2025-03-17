import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from './utils/auth';

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('next-auth.session-token')?.value;

  const kakaoToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (kakaoToken && refreshToken) {
    const currentTime = Date.now();
    const tokenExpiry = Number(req.cookies.get('accessTokenExpires')?.value) || 0;

    if (currentTime > tokenExpiry) {
      const newAccessToken = await refreshAccessToken(refreshToken);

      if (newAccessToken) {
        const response = NextResponse.next();
        response.cookies.set('accessToken', newAccessToken);
        response.cookies.set('accessTokenExpires', (currentTime + 30 * 60 * 1000).toString());

        return response;
      } else {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
  }

  const protectedRoutes = ['/addepigram', '/epigrams', '/epigrams/[id]', '/mypage', '/search'];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!sessionToken && !kakaoToken) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/addepigram/:path*',
    '/epigrams/:path*',
    '/epigrams/[id]/:path*',
    '/mypage/:path*',
    '/search/:path*',
  ],
};
