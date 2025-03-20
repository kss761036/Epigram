import { z } from 'zod';

export type User = {
  image: string | null;
  updatedAt: string;
  createdAt: string;
  teamId: string;
  nickname: string;
  id: number;
};

const ACCEPT_FILE_TYPE = ['image/jpeg', 'image/jpg', 'image/png'];
const FILE_LIMIT_MB = 2;

export const updateUserFormSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임은 필수 입력입니다.')
    .max(20, '닉네임은 최대 20자까지 가능합니다.'),

  image: z
    .union([
      z.string().url(),
      z
        .instanceof(File)
        .refine((file) => ACCEPT_FILE_TYPE.includes(file.type), {
          message: '지원되지 않는 이미지 파일입니다',
        })
        .refine((file) => file.size < FILE_LIMIT_MB * 1024 * 1024, {
          message: `${FILE_LIMIT_MB}MB 이하로 올려주세요`,
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
