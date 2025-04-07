import { User } from 'next-auth';
import { z } from 'zod';
import { Epigram } from '../epigram/epigram.type';

const MAX_LENGTH = 100;

export const COMMENT_VALIDATION = {
  CONTENT: {
    REQUIRED_MESSAGE: '댓글을 입력해주세요',
    MAX_LENGTH,
    MAX_MESSAGE: `댓글은 최대 ${MAX_LENGTH}자까지 가능합니다.`,
  },
};

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
    .min(1, { message: COMMENT_VALIDATION.CONTENT.REQUIRED_MESSAGE })
    .max(COMMENT_VALIDATION.CONTENT.MAX_LENGTH, {
      message: COMMENT_VALIDATION.CONTENT.MAX_MESSAGE,
    }),
});

export type CreateCommentFormType = z.infer<typeof createCommentFormSchema>;
export type UpdateCommentFormType = Partial<CreateCommentFormType>;
export type DeleteCommentResponse = Pick<Comment, 'id'>;
