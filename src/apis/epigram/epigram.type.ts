import { z } from 'zod';
import { User } from '../user/user.type';

const EPIGRAM_CONTENT_MAX_LENGTH = 500;
const EPIGRAM_TAG_MAX_LENGTH = 10;
const EPIGRAM_TAG_MAX_COUNT = 3;
const EPIGRAM_AUTHOR_MAX_LENGTH = 30;
const EPIGRAM_REFERENCE_TITLE_MAX_LENGTH = 100;

export const EPIGRAM_VALIDATION = {
  CONTENT: {
    REQUIRED_MESSAGE: '내용을 작성해주세요.',
    MAX_LENGTH: EPIGRAM_CONTENT_MAX_LENGTH,
    MAX_MESSAGE: `내용은 최대 ${EPIGRAM_CONTENT_MAX_LENGTH}자까지 작성할 수 있어요.`,
  },
  TAG: {
    REQUIRED_MESSAGE: '태그를 작성해주세요.',
    MAX_LENGTH: EPIGRAM_TAG_MAX_LENGTH,
    MAX_COUNT: EPIGRAM_TAG_MAX_COUNT,
    MAX_MESSAGE: `태그는 최대 ${EPIGRAM_TAG_MAX_LENGTH}자까지 입력할 수 있어요.`,
    COUNT_MESSAGE: `태그는 최대 ${EPIGRAM_TAG_MAX_COUNT}개까지만 등록할 수 있어요.`,
    DUPLICATE_MESSAGE: '중복된 태그는 사용할 수 없어요.',
  },
  AUTHOR: {
    REQUIRED_MESSAGE: '저자를 입력해주세요.',
    SELECT_REQUIRED: '저자를 선택해주세요.',
    MAX_LENGTH: EPIGRAM_AUTHOR_MAX_LENGTH,
    MAX_MESSAGE: `저자는 최대 ${EPIGRAM_AUTHOR_MAX_LENGTH}자까지 작성할 수 있어요.`,
  },
  REFERENCE: {
    URL_MESSAGE: '유효한 URL 형식으로 입력해주세요.',
    TITLE_MAX_LENGTH: EPIGRAM_REFERENCE_TITLE_MAX_LENGTH,
    TITLE_MAX_MESSAGE: `참고 제목은 최대 ${EPIGRAM_REFERENCE_TITLE_MAX_LENGTH}자까지 작성할 수 있어요.`,
  },
};

const COMMENT_CONTENT_MAX_LENGTH = 100;

export const COMMENT_VALIDATION = {
  CONTENT: {
    REQUIRED_MESSAGE: '댓글을 입력해주세요.',
    MAX_LENGTH: COMMENT_CONTENT_MAX_LENGTH,
    MAX_MESSAGE: `댓글은 최대 ${COMMENT_CONTENT_MAX_LENGTH}자까지 작성할 수 있어요.`,
  },
};

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
    .nonempty({ message: EPIGRAM_VALIDATION.CONTENT.REQUIRED_MESSAGE })
    .max(EPIGRAM_VALIDATION.CONTENT.MAX_LENGTH, {
      message: EPIGRAM_VALIDATION.CONTENT.MAX_MESSAGE,
    }),

  tags: z
    .array(
      z
        .string()
        .trim()
        .nonempty({ message: EPIGRAM_VALIDATION.TAG.REQUIRED_MESSAGE })
        .max(EPIGRAM_VALIDATION.TAG.MAX_LENGTH, { message: EPIGRAM_VALIDATION.TAG.MAX_MESSAGE }),
    )
    .max(EPIGRAM_VALIDATION.TAG.MAX_COUNT, { message: EPIGRAM_VALIDATION.TAG.COUNT_MESSAGE })
    .refine((tags) => new Set(tags).size === tags.length, {
      message: EPIGRAM_VALIDATION.TAG.DUPLICATE_MESSAGE,
    }),

  selectedAuthor: z
    .enum(AUTHOR_RADIO, {
      required_error: EPIGRAM_VALIDATION.AUTHOR.SELECT_REQUIRED,
    })
    .optional(),

  author: z
    .string()
    .trim()
    .max(EPIGRAM_VALIDATION.AUTHOR.MAX_LENGTH, { message: EPIGRAM_VALIDATION.AUTHOR.MAX_MESSAGE })
    .optional()
    .nullable(),

  referenceUrl: z
    .string()
    .trim()
    .transform((v) => (v === '' ? null : v))
    .nullable()
    .optional()
    .refine((val) => !val || /^https?:\/\//.test(val), {
      message: EPIGRAM_VALIDATION.REFERENCE.URL_MESSAGE,
    }),

  referenceTitle: z
    .string()
    .trim()
    .max(EPIGRAM_VALIDATION.REFERENCE.TITLE_MAX_LENGTH, {
      message: EPIGRAM_VALIDATION.REFERENCE.TITLE_MAX_MESSAGE,
    })
    .optional()
    .nullable(),
});

export const createEpigramFormSchema = baseEpigramSchema.superRefine((data, ctx) => {
  if (data.selectedAuthor === '직접 입력' && !data.author?.trim()) {
    ctx.addIssue({
      path: ['author'],
      code: z.ZodIssueCode.custom,
      message: EPIGRAM_VALIDATION.AUTHOR.REQUIRED_MESSAGE,
    });
  }
});

export const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, COMMENT_VALIDATION.CONTENT.REQUIRED_MESSAGE)
    .max(COMMENT_VALIDATION.CONTENT.MAX_LENGTH, COMMENT_VALIDATION.CONTENT.MAX_MESSAGE),
  isPrivate: z.boolean(),
});

export type CreateEpigramFormType = z.infer<typeof createEpigramFormSchema>;
export type UpdateEpigramFormType = Partial<CreateEpigramFormType>;
export type DeleteEpigramResponse = Pick<Epigram, 'id'>;
export type LikeEpigramResponse = Epigram & { isLiked: boolean };
export type CommentFormValues = z.infer<typeof commentSchema>;
