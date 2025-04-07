import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Emotion } from '@/types/common';
import {
  getEmotionLogToday,
  createEmotionLogToday,
  getEmotionLogsMonthly,
} from './emotion.service';
import { EmotionLog } from './emotion.type';

export const useEmotionLogToday = (userId: number | null) => {
  return useQuery({
    queryKey: ['emotion', 'today', userId],
    queryFn: () => getEmotionLogToday({ userId: userId! }),
    enabled: userId !== null,
    retryOnMount: false,
  });
};

export const useCreateEmotionLog = (userId: number | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { emotion: Emotion }) => createEmotionLogToday(data),
    onMutate: async (data: { emotion: Emotion }) => {
      if (userId === null) return;

      await queryClient.cancelQueries({ queryKey: ['emotion', 'today', userId] });
      const previousData = queryClient.getQueryData<EmotionLog>(['emotion', 'today', userId]);

      if (previousData) {
        queryClient.setQueryData<EmotionLog>(['emotion', 'today', userId], {
          ...previousData,
          emotion: data.emotion,
        });
      }

      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<EmotionLog>(['emotion', 'today', userId], context.previousData);
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['emotion'] });
    },
  });
};

export const useEmotionLogsMonthly = (userId: number | null) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const queryClient = useQueryClient();

  const { data = {} } = useQuery({
    queryKey: ['emotion', 'monthly', userId, currentMonth],
    queryFn: async () => {
      if (!userId) return {};

      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth() + 1;
      const data = await getEmotionLogsMonthly({ userId, year, month });

      return data.reduce((acc: Record<string, Emotion>, log) => {
        const dateKey = format(new Date(log.createdAt), 'yyyy-MM-dd');
        acc[dateKey] = log.emotion;
        return acc;
      }, {});
    },
    enabled: !!userId,
  });

  const refetchLogs = () => {
    if (userId) {
      queryClient.invalidateQueries({ queryKey: ['emotion', 'monthly', userId, currentMonth] });
    }
  };

  return { data, currentMonth, setCurrentMonth, refetchLogs };
};
