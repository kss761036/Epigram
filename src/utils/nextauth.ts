import { isAxiosError } from 'axios';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { googleSignIn, kakaoSignIn, signIn } from '@/apis/auth/auth.services';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: '이메일', type: 'email' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        try {
          const { user, accessToken, refreshToken } = await signIn({
            email: credentials.email,
            password: credentials.password,
          });

          return {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
        } catch (error) {
          const errorMessage = isAxiosError(error)
            ? error.response?.data.message
            : '로그인에 실패했습니다.';

          throw new Error(errorMessage);
        }
      },
    }),
    CredentialsProvider({
      id: 'Kakao',
      name: 'Kakao',
      credentials: {
        code: { label: 'code', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.code) return null;

        try {
          const { user, accessToken, refreshToken } = await kakaoSignIn(credentials?.code);

          return {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
        } catch (error) {
          const errorMessage = isAxiosError(error)
            ? error.response?.data.message
            : '카카오 로그인에 실패했습니다.';

          throw new Error(errorMessage);
        }
      },
    }),
    CredentialsProvider({
      id: 'Google',
      name: 'Google',
      credentials: {
        code: { label: 'code', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.code) return null;

        try {
          const { user, accessToken, refreshToken } = await googleSignIn(credentials?.code);

          return {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
        } catch (error) {
          const errorMessage = isAxiosError(error)
            ? error.response?.data.message
            : '구글 로그인에 실패했습니다.';

          throw new Error(errorMessage);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.nickname = user.nickname;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          nickname: token.nickname,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
      };
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 10 * 60, // 10분 (테스트용으로 짧게)
  },
  secret: process.env.NEXTAUTH_SECRET,
};
