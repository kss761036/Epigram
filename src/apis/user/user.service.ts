import axios from 'axios';
import { PaginationQueryParams, PaginationResponse } from '@/types/common';
import { Comment } from '../comment/comment.type';
import { UpdateUserForm, UploadImageForm, UploadImageReponse, User } from './user.type';

/**
 * 내정보 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/User/Me
 */
export const getUser = async () => {
  const response = await axios.get<User>('/api/users/me');
  return response.data;
};

/**
 * 내정보 수정
 * https://fe-project-epigram-api.vercel.app/docs/#/User/UpdatePassword
 */
export const updateUser = async (updateUserForm: UpdateUserForm) => {
  const response = await axios.patch<User>('/api/users/me', updateUserForm);
  return response.data;
};

/**
 * 유저정보 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/User/RetrieveUser
 */
export const getUserById = async (userId: User['id']) => {
  const response = await axios.get<User>(`/api/users/${userId}`);
  return response.data;
};

/**
 * 유저 코멘트 정보 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/User/RetrieveUser
 */
export const getUserCommentsById = async (userId: User['id'], params: PaginationQueryParams) => {
  const { limit = 4, cursor } = params;
  const response = await axios.get<PaginationResponse<Comment>>(`/api/users/${userId}/comments`, {
    params: { limit, cursor },
  });
  return response.data;
};

/**
 * 유저 프로필 이미지 업로드
 * https://fe-project-epigram-api.vercel.app/docs/#/Image/ImageUpload
 */
export const uploadImage = async (data: UploadImageForm) => {
  const imageFile = data.image;
  const imageExt = imageFile.name.substring(imageFile.name.lastIndexOf('.'));
  const imageFileName = `profile_image${imageExt}`;

  const formData = new FormData();
  formData.append('image', data.image, imageFileName);

  const response = await axios.post<UploadImageReponse>('/api/images/upload', formData);
  return response.data;
};
