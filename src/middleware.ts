import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedRoutes = ['/addepigram', '/epigrams', '/epigrams/[id]', '/mypage', '/search'];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
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
