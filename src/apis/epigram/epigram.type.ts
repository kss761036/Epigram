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

export type EpigramDetail = Epigram & {
  isLiked: boolean;
};

export const AUTHOR_RADIO = ['직접 입력', '본인', '알 수 없음'] as const;
export const baseEpigramSchema = z.object({
  content: z
    .string()
    .trim()
    .nonempty({ message: '내용을 작성해주세요.' })
    .max(500, { message: '500자 이하로 작성해주세요.' }),
  tags: z
    .array(
      z
        .string()
        .trim()
        .nonempty({ message: '태그를 작성해주세요.' })
        .max(10, { message: '10자 이하로 작성해주세요.' }),
    )
    .max(3, { message: '최대 3개까지만 등록가능해요.' })
    .refine(
      (tags) => {
        const set = new Set(tags);
        return set.size === tags.length;
      },
      { message: '중복된 태그는 사용할 수 없어요.' },
    ),
  selectedAuthor: z
    .enum(AUTHOR_RADIO, {
      required_error: '저자를 선택해주세요.',
    })
    .optional(),
  author: z.string().trim().max(30, { message: '30자 이내로 입력해주세요.' }).optional().nullable(),

  referenceUrl: z
    .string()
    .trim()
    .transform((v) => (v === '' ? null : v))
    .nullable()
    .optional()
    .refine((val) => !val || /^https?:\/\//.test(val), {
      message: '유효한 URL을 입력해주세요.',
    }),
  referenceTitle: z
    .string()
    .trim()
    .max(100, { message: '100자 이하로 입력해주세요.' })
    .optional()
    .nullable(),
});

export const createEpigramFormSchema = baseEpigramSchema.superRefine((data, ctx) => {
  if (data.selectedAuthor === '직접 입력' && !data.author?.trim()) {
    ctx.addIssue({
      path: ['author'],
      code: z.ZodIssueCode.custom,
      message: '저자를 작성해주세요.',
    });
  }
});

export type CreateEpigramFormType = z.infer<typeof createEpigramFormSchema>;
export type UpdateEpigramFormType = Partial<CreateEpigramFormType>;
export type DeleteEpigramResponse = Pick<Epigram, 'id'>;
export type LikeEpigramResponse = Epigram & { isLiked: boolean };
