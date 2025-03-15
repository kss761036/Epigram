import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
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
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (res.status === 400) {
            throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
          }

          if (!res.ok) {
            throw new Error('로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.');
          }

          const { user, accessToken, refreshToken } = await res.json();

          if (!accessToken || !refreshToken) {
            throw new Error('로그인에 실패했습니다.');
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : '로그인에 실패했습니다.');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // 1. 액세스 토큰 만료 검사 후 갱신
      if (
        token.accessTokenExpires &&
        typeof token.accessTokenExpires === 'number' &&
        Date.now() > token.accessTokenExpires
      ) {
        try {
          if (typeof token.refreshToken === 'string') {
            const refreshedAccessToken = await refreshAccessToken(token.refreshToken);
            if (refreshedAccessToken) {
              return {
                ...token,
                accessToken: refreshedAccessToken,
                accessTokenExpires: Date.now() + 30 * 60 * 1000,
              };
            }
          }
          throw new Error('잘못된 리프레시 토큰입니다.');
        } catch (error) {
          console.error('액세스 토큰 갱신에 실패했습니다:', error);
          return { ...token, accessToken: null, refreshToken: null };
        }
      }

      // 2. 구글 로그인 처리
      if (account?.provider === 'google' && account.access_token) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/GOOGLE`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              redirectUri: 'http://localhost:3000/api/auth/callback/google',
              token: account.id_token,
              //Google 의 경우에는 Google Id 토큰(JWT) 입니다. (스웨거 문서에있음)
            }),
          });

          if (!res.ok) {
            console.log(res);
            throw new Error('구글 로그인 인증 실패');
          }

          const { user, accessToken, refreshToken } = await res.json();

          return {
            ...token,
            id: user.id,
            email: user.email,
            name: user.name,
            accessToken: accessToken,
            refreshToken: refreshToken,
            accessTokenExpires: Date.now() + 30 * 60 * 1000,
          };
        } catch (error) {
          console.error(error);

          return token;
        }
      }

      // 3. Credentials 로그인 처리
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          name: token.name,
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
  },
  secret: process.env.NEXTAUTH_SECRET,
});

async function refreshAccessToken(refreshToken: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      throw new Error('액세스 토큰 갱신에 실패했습니다.');
    }

    const { accessToken } = await res.json();
    return accessToken;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    return null;
  }
}

export { handler as GET, handler as POST };
