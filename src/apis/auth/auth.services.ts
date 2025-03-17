import axios from 'axios';
import {
  LoginFormValues,
  SignupFormValues,
  AuthResponse,
  googleTokenRepsone,
  RefreshResponse,
} from './auth.type';

export const signUp = async (data: SignupFormValues) => {
  const response = await axios.post<AuthResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signUp`,
    data,
  );
  return response.data;
};

export const signIn = async (data: LoginFormValues) => {
  const response = await axios.post<AuthResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn`,
    data,
  );
  return response.data;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await axios.post<RefreshResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
    {
      refreshToken,
    },
  );

  return response.data;
};

export const kakaoSignIn = async (code: string) => {
  const response = await axios.post<AuthResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/KAKAO`,
    {
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      token: code,
    },
  );

  return response.data;
};

export const googleSignIn = async (code: string) => {
  const tokenResponse = await axios.post<googleTokenRepsone>(
    'https://oauth2.googleapis.com/token',
    {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
      grant_type: 'authorization_code',
      code,
    },
  );

  const { id_token } = tokenResponse.data;

  const response = await axios.post<AuthResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/GOOGLE`,
    {
      redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
      token: id_token,
    },
  );

  return response.data;
};
