import {
  PaginationQueryParams,
  PaginationResponse,
  SearchableQueryParams,
  WriterFilterQueryParams,
} from '@/types/common';
import axios from 'axios';
import {
  CreateEpigramFormType,
  DeleteEpigramResponse,
  Epigram,
  LikeEpigramResponse,
  UpdateEpigramFormType,
} from './epigram.type';
import { Comment } from '../comment/comment.type';

/**
 * 에피그램 목록 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/ListEpigrams
 */
export const getEpigrams = async (params: SearchableQueryParams & WriterFilterQueryParams) => {
  const { limit = 6, cursor, keyword, writerId } = params;
  const response = await axios.get<PaginationResponse<Epigram>>(`/api/epigrams`, {
    params: {
      limit,
      cursor,
      keyword,
      writerId,
    },
  });
  return response.data;
};

/**
 * 에피그램 작성
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/CreateEpigram
 */
export const createEpigram = async (data: CreateEpigramFormType) => {
  const response = await axios.post<Epigram>('/api/epigrams', data);
  return response.data;
};

/**
 * 오늘의 에피그램 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/RetrieveTodayEpigram
 */
export const getTodayEpigram = async () => {
  const response = await axios.get<Epigram>('/api/epigrams/today');
  return response.data;
};

/**
 * 에피그램 상세 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/RetrieveEpigram
 */
export const getEpigramDetails = async (epigramId: number) => {
  const response = await axios.get<Epigram>(`/api/epigrams/${epigramId}`);
  return response.data;
};

/**
 * 에피그램 수정
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/UpdateEpigram
 */
export const updateEpigram = async (epigramId: number, data: UpdateEpigramFormType) => {
  const response = await axios.patch<Epigram>(`/api/epigrams/${epigramId}`, data);
  return response.data;
};

/**
 * 에피그램 삭제
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/DeleteEpigram
 */
export const deleteEpigram = async (epigramId: number) => {
  const response = await axios.delete<DeleteEpigramResponse>(`/api/epigrams/${epigramId}`);
  return response.data;
};

/**
 * 에피그램 좋아요
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/LikeEpigram
 */
export const likeEpigram = async (epigramId: number) => {
  const response = await axios.post<LikeEpigramResponse>(`/api/epigrams/${epigramId}/like`);
  return response.data;
};

/**
 * 에피그램 좋아요 취소
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/UnlikeEpigram
 */
export const unlikeEpigram = async (epigramId: number) => {
  const response = await axios.delete<LikeEpigramResponse>(`/api/epigrams/${epigramId}/like`);
  return response.data;
};

/**
 * 에피그램 댓글 목록 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/ListEpigramComments
 */
export const getEpigramComments = async (epigramId: number, params: PaginationQueryParams) => {
  const { limit = 3, cursor } = params;
  const response = await axios.get<PaginationResponse<Comment>>(
    `/api/epigrams/${epigramId}/comments`,
    { params: { limit, cursor } },
  );
  return response.data;
};
