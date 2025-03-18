import axios from 'axios';
import {
  AuthResponse,
  googleTokenRepsone,
  LoginFormType,
  RefreshResponse,
  SignupFormType,
} from './auth.type';

export const signUp = async (data: SignupFormType) => {
  const response = await axios.post<AuthResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signUp`,
    data,
  );
  return response.data;
};

export const signIn = async (data: LoginFormType) => {
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
      redirectUri: process.env.KAKAO_REDIRECT_URI,
      token: code,
    },
  );

  return response.data;
};

export const googleSignIn = async (code: string) => {
  const tokenResponse = await axios.post<googleTokenRepsone>(
    'https://oauth2.googleapis.com/token',
    {
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: 'authorization_code',
      code,
    },
  );

  const { id_token } = tokenResponse.data;

  const response = await axios.post<AuthResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/GOOGLE`,
    {
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
      token: id_token,
    },
  );

  return response.data;
};
