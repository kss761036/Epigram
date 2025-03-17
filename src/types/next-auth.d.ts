import NextAuth from 'next-auth';
declare module 'next-auth' {
  interface User {
    error?: string;
    nickname: User;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: User;
  }
}
