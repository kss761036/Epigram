import { z } from 'zod';
import { User } from '../user/user.type';

export type Tag = {
  id: number;
  name: string;
};

export type Epigram = {
  id: number;
  likeCount: number;
  writerId: User['id'];
  referenceUrl: string | null;
  referenceTitle: string | null;
  author: string;
  content: string;
  tags: Tag[];
};

export const createEpigramFormSchema = z.object({
  content: z.string().trim().max(500, { message: '500자 이하로 입력해주세요' }),
  tags: z
    .array(z.string().trim().max(10, { message: '10자 이하로 작성해주세요' }))
    .max(3, { message: '최대 3개까지 등록가능해요' }),
  referenceUrl: z.string().url().optional().nullable(),
  referenceTitle: z
    .string()
    .max(100, { message: '100자 이하로 입력해주세요' })
    .optional()
    .nullable(),
  author: z
    .string()
    .min(1, { message: '저자를 입력해주세요' })
    .max(30, { message: '30자 이내로 입력해주세요' }),
});

export type CreateEpigramFormType = z.infer<typeof createEpigramFormSchema>;
export type UpdateEpigramFormType = Partial<CreateEpigramFormType>;
export type DeleteEpigramResponse = Pick<Epigram, 'id'>;
export type LikeEpigramResponse = Epigram & { isLiked: boolean };
