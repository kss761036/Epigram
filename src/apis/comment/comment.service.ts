import axios from 'axios';
import { PaginationQueryParams, PaginationResponse } from '@/types/common';
import {
  Comment,
  CreateCommentFormType,
  DeleteCommentResponse,
  UpdateCommentFormType,
} from './comment.type';

/**
 * 댓글 목록 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/Comment/ListComments
 */
export const getComments = async (params: PaginationQueryParams) => {
  const { limit = 3, cursor } = params;
  const response = await axios.get<PaginationResponse<Comment>>(`/api/comments`, {
    params: {
      limit,
      cursor,
    },
  });
  return response.data;
};

/**
 * 댓글 작성
 * https://fe-project-epigram-api.vercel.app/docs/#/Comment/CreateComment
 */
export const createComment = async (data: CreateCommentFormType) => {
  const response = await axios.post<Comment>('/api/comments', data);
  return response.data;
};

/**
 * 댓글 수정
 * https://fe-project-epigram-api.vercel.app/docs/#/Comment/UpdateComment
 */
export const updateComment = async (commentId: number, data: UpdateCommentFormType) => {
  const response = await axios.patch<Comment>(`/api/comments/${commentId}`, data);
  return response.data;
};

/**
 * 댓글 삭제
 * https://fe-project-epigram-api.vercel.app/docs/#/Comment/DeleteComment
 */
export const deleteComment = async (commentId: number) => {
  const response = await axios.delete<DeleteCommentResponse>(`/api/comments/${commentId}`);
  return response.data;
};
