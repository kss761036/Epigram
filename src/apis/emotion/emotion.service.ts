import axios from 'axios';
import {
  CreateEmotionLogFormType,
  EmotionLog,
  GetEmotionLogParams,
  GetEmotionLogsMonthlyParams,
} from './emotion.type';

/**
 * 오늘의 감정 저장
 * https://fe-project-epigram-api.vercel.app/docs/#/EmotionLog/UpsertEmotionLog
 */
export const createEmotionLogToday = async (data: CreateEmotionLogFormType) => {
  const response = await axios.post<EmotionLog>('/api/emotionLogs/today', data);
  return response.data;
};

/**
 * 오늘의 감정 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/EmotionLog/GetTodayEmotionLog
 */
export const getEmotionLogToday = async (params: GetEmotionLogParams) => {
  const response = await axios.get<EmotionLog>('/api/emotionLogs/today', {
    params,
  });
  return response.data;
};

/**
 * 월별 감정 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/EmotionLog/GetMonthlyEmotionLog
 */
export const getEmotionLogsMonthly = async (params: GetEmotionLogsMonthlyParams) => {
  const response = await axios.get<EmotionLog[]>(`/api/emotionLogs/monthly`, {
    params,
  });
  return response.data;
};
