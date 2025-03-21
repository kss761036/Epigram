import axios from 'axios';
import { getServerSession } from 'next-auth';
import { encode } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { authOptions } from './nextauth';
import { refreshAccessToken } from '@/apis/auth/auth.service';

export const axiosServerInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosServerInstance.interceptors.request.use(
  async (config) => {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosServerInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response?.status === 401 && !error.config._retry) {
      try {
        error.config._retry = true;

        const session = await getServerSession(authOptions);
        const refreshToken = session?.user.refreshToken;

        if (refreshToken) {
          const { accessToken } = await refreshAccessToken(refreshToken);

          // nextauth4에는 서버사이드에서 세션 업데이트 함수가 없어서
          // 강제로 cookie 설정
          const newSession = await encode({
            secret: process.env.NEXTAUTH_SECRET!,
            token: {
              ...session.user,
              accessToken: accessToken,
              accessTokenExpires: Date.now() + 30 * 60 * 1000,
            },
            maxAge: 10 * 24 * 60 * 60,
          });
          const cookieStore = await cookies();
          cookieStore.set('next-auth.session-token', newSession);

          error.config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return axiosServerInstance(error.config);
      } catch (refreshError) {
        console.error('refresh error', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
