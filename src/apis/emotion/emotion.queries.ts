import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEmotionLogToday, createEmotionLogToday } from './emotion.service';
import { Emotion } from '@/types/common';

export const useEmotionLogToday = (userId: number | null) => {
  return useQuery({
    queryKey: ['emotionLogToday', userId],
    queryFn: () => (userId ? getEmotionLogToday({ userId }) : Promise.resolve(null)),
    enabled: userId !== null,
  });
};

export const useCreateEmotionLog = (userId: number | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { emotion: Emotion }) => createEmotionLogToday(data),
    onSuccess: () => {
      if (userId !== null) {
        queryClient.invalidateQueries({ queryKey: ['emotionLogToday', userId] });
      }
    },
  });
};
