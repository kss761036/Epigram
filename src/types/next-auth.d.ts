import NextAuth from 'next-auth';
declare module 'next-auth' {
  interface User {
    error?: string;
    id: string;
    email: string;
    nickname: string;
    image: string;
    accessToken: string;
    refreshToken: string;
  }
  interface JWT {
    id: string;
    email: string;
    nickname: string;
    image: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      nickname: string;
      image: string;
      accessToken: string;
      refreshToken: string;
    } & DefaultSession['user'];
  }
}
