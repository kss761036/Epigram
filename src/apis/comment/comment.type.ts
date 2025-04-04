import { z } from 'zod';
import { Epigram } from '../epigram/epigram.type';
import { User } from 'next-auth';

export type Comment = {
  id: number;
  epigramId: Epigram['id'];
  writer: Pick<User, 'id' | 'image' | 'nickname'>;
  updatedAt: string;
  createdAt: string;
  isPrivate: boolean;
  content: string;
};

export const createCommentFormSchema = z.object({
  epigramId: z.number(),
  isPrivate: z.boolean(),
  content: z
    .string()
    .trim()
    .min(1, { message: '댓글을 입력해주세요' })
    .max(100, { message: '100자 이내로 작성해주세요' }),
});

export type CreateCommentFormType = z.infer<typeof createCommentFormSchema>;
export type UpdateCommentFormType = Partial<CreateCommentFormType>;
export type DeleteCommentResponse = Pick<Comment, 'id'>;
