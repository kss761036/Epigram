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
