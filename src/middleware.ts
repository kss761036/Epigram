export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/addepigram/:path*',
    '/epigrams/:path*',
    '/mypage/:path*',
    '/search/:path*',
    '/feeds/:path*',
  ],
};
