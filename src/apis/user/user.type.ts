import { z } from 'zod';

export type User = {
  image: string | null;
  updatedAt: string;
  createdAt: string;
  teamId: string;
  nickname: string;
  id: number;
};

const NICKNAME_MAX_LENGTH = 20;
const ACCEPT_FILE_TYPE = ['image/jpeg', 'image/jpg', 'image/png'];
const FILE_LIMIT_MB = 2;

export const USER_VALIDATION = {
  NICKNAME: {
    REQUIRED_MESSAGE: '닉네임은 필수 입력입니다.',
    MAX_LENGTH: NICKNAME_MAX_LENGTH,
    MAX_MESSAGE: `닉네임은 최대 ${NICKNAME_MAX_LENGTH}자까지 가능합니다.`,
  },
  IMAGE: {
    INVALID_TYPE_MESSAGE: '지원되지 않는 이미지 파일입니다',
    FILE_LIMIT_MB,
    MAX_SIZE_MESSAGE: `${FILE_LIMIT_MB}MB 이하로 올려주세요`,
  },
};

export const updateUserFormSchema = z.object({
  nickname: z
    .string()
    .min(1, USER_VALIDATION.NICKNAME.REQUIRED_MESSAGE)
    .max(NICKNAME_MAX_LENGTH, USER_VALIDATION.NICKNAME.MAX_MESSAGE),

  image: z
    .union([
      z.string().url(),
      z
        .instanceof(File)
        .refine((file) => ACCEPT_FILE_TYPE.includes(file.type), {
          message: USER_VALIDATION.IMAGE.INVALID_TYPE_MESSAGE,
        })
        .refine((file) => file.size < FILE_LIMIT_MB * 1024 * 1024, {
          message: USER_VALIDATION.IMAGE.MAX_SIZE_MESSAGE,
        }),
    ])
    .optional()
    .nullable(),
});

export type UpdateUserForm = z.infer<typeof updateUserFormSchema>;

export type UploadImageForm = {
  image: File;
};

export type UploadImageReponse = {
  url: string;
};
