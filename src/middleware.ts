export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/epigrams/:path*', '/mypage/:path*', '/search/:path*', '/feeds/:path*'],
};
