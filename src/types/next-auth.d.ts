// NOTE: 타입 선언 확장을 위해 반드시 import 필요 (실제 사용 X)
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

  interface Session {
    error?: 'RefreshTokenError';
    user: {
      id: string;
      email: string;
      nickname: string;
      image: string;
      accessToken: string;
      refreshToken: string;
      accessTokenExpires: number;
    } & DefaultSession['user'];
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    nickname: string;
    image: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: 'RefreshTokenError';
  }
}
