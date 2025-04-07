import { User } from 'next-auth';
import { z } from 'zod';

const NICKNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_PATTERN = /^[a-zA-Z0-9!@#$%^&*()_+]+$/;

export const AUTH_VALIDATION = {
  EMAIL: {
    REQUIRED_MESSAGE: '이메일은 필수 입력입니다.',
    INVALID_MESSAGE: '이메일 형식으로 작성해 주세요.',
  },
  NICKNAME: {
    REQUIRED_MESSAGE: '닉네임은 필수 입력입니다.',
    MAX_LENGTH: NICKNAME_MAX_LENGTH,
    MAX_MESSAGE: `닉네임은 최대 ${NICKNAME_MAX_LENGTH}자까지 가능합니다.`,
  },
  PASSWORD: {
    REQUIRED_MESSAGE: '비밀번호는 필수 입력입니다.',
    MIN_LENGTH: PASSWORD_MIN_LENGTH,
    MIN_MESSAGE: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상입니다.`,
    PATTERN: PASSWORD_PATTERN,
    PATTERN_MESSAGE: '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.',
  },
  PASSWORD_CONFIRMATION: {
    REQUIRED_MESSAGE: '비밀번호 확인을 입력해 주세요.',
    MISMATCH_MESSAGE: '비밀번호가 일치하지 않습니다.',
  },
};

export const signupFormSchema = z
  .object({
    email: z
      .string()
      .min(1, AUTH_VALIDATION.EMAIL.REQUIRED_MESSAGE)
      .email(AUTH_VALIDATION.EMAIL.INVALID_MESSAGE),

    nickname: z
      .string()
      .min(1, AUTH_VALIDATION.NICKNAME.REQUIRED_MESSAGE)
      .max(AUTH_VALIDATION.NICKNAME.MAX_LENGTH, AUTH_VALIDATION.NICKNAME.MAX_MESSAGE),

    password: z.preprocess(
      (value) => (value === '' ? undefined : value),
      z
        .string({ required_error: AUTH_VALIDATION.PASSWORD.REQUIRED_MESSAGE })
        .min(AUTH_VALIDATION.PASSWORD.MIN_LENGTH, AUTH_VALIDATION.PASSWORD.MIN_MESSAGE)
        .regex(AUTH_VALIDATION.PASSWORD.PATTERN, AUTH_VALIDATION.PASSWORD.PATTERN_MESSAGE),
    ),

    passwordConfirmation: z.string().min(1, AUTH_VALIDATION.PASSWORD_CONFIRMATION.REQUIRED_MESSAGE),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: AUTH_VALIDATION.PASSWORD_CONFIRMATION.MISMATCH_MESSAGE,
    path: ['passwordConfirmation'],
  });

export type SignupFormType = z.infer<typeof signupFormSchema>;

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, AUTH_VALIDATION.EMAIL.REQUIRED_MESSAGE)
    .email(AUTH_VALIDATION.EMAIL.INVALID_MESSAGE),

  password: z.string().min(1, AUTH_VALIDATION.PASSWORD.REQUIRED_MESSAGE),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export type AuthResponse = {
  refreshToken: string;
  accessToken: string;
  user: User;
};

export type RefreshResponse = Pick<AuthResponse, 'accessToken'>;

export type googleTokenRepsone = {
  id_token: string;
};
