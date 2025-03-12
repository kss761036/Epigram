import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

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

          const user = await res.json();

          if (!user.accessToken || !user.refreshToken) {
            throw new Error('로그인에 실패했습니다.');
          }

          return {
            id: user.id,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          };
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : '로그인에 실패했습니다.');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 30 * 60 * 1000,
        };
      }

      if (
        token.accessTokenExpires &&
        typeof token.accessTokenExpires === 'number' &&
        Date.now() > token.accessTokenExpires
      ) {
        try {
          if (typeof token.refreshToken === 'string') {
            const refreshedAccessToken = await refreshAccessToken(token.refreshToken);
            if (refreshedAccessToken) {
              token.accessToken = refreshedAccessToken;
              token.accessTokenExpires = Date.now() + 30 * 60 * 1000;
            }
          } else {
            throw new Error('잘못된 리프레시 토큰입니다.');
          }
        } catch (error) {
          console.error('액세스 토큰 갱신에 실패했습니다:', error);
          return { ...token, accessToken: null, refreshToken: null };
        }
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
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
