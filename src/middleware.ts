export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/epigrams', '/epigrams/create', '/epigrams/:id/edit', '/mypage/:path*'],
};
