import { EMOTION, Emotion } from '@/types/common';
import { User } from '../user/user.type';
import { z } from 'zod';

export type EmotionLog = {
  createdAt: string;
  emotion: Emotion;
  userId: User['id'];
  id: number;
};
export type GetEmotionLogParams = {
  userId: User['id'];
};

export type GetEmotionLogsMonthlyParams = GetEmotionLogParams & {
  year: number;
  month: number;
};

export const createEmotionLogFormSchema = z.object({
  emotion: z.enum(Object.values(EMOTION) as [(typeof EMOTION)[keyof typeof EMOTION]]),
});

export type CreateEmotionLogFormType = z.infer<typeof createEmotionLogFormSchema>;
