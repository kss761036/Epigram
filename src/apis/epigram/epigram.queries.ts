import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteEpigram,
  getEpigramDetails,
  getEpigrams,
  getEpigramsByUserId,
  likeEpigram,
  unlikeEpigram,
} from './epigram.service';
import {
  PaginationQueryParams,
  SearchableQueryParams,
  WriterFilterQueryParams,
} from '@/types/common';
import { Epigram } from './epigram.type';

export const useEpigramSearchInfiniteQuery = (params: Omit<SearchableQueryParams, 'cursor'>) => {
  return useInfiniteQuery({
    queryKey: ['epigrams', 'search', params],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getEpigrams({
        ...params,
        cursor: pageParam,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    enabled: !!params.keyword,
  });
};

export const useEpigramInfiniteQuery = (params: Omit<PaginationQueryParams, 'cursor'>) => {
  return useInfiniteQuery({
    queryKey: ['epigrams', params],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getEpigrams({ ...params, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });
};

export const useEpigramWriterFilterInfiniteQuery = (
  params: Omit<WriterFilterQueryParams, 'cursor'>,
) => {
  return useInfiniteQuery({
    queryKey: ['epigrams', 'writerFilter', params],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getEpigramsByUserId({
        ...params,
        cursor: pageParam,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });
};

export const useEpigramDetails = (epigramId: Epigram['id']) => {
  return useQuery({
    queryKey: ['epigrams', epigramId],
    queryFn: () => getEpigramDetails(epigramId),
  });
};

export const useDeleteEpigram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (epigramId: Epigram['id']) => deleteEpigram(epigramId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
    },
  });
};

export const useLikeEpigram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ epigramId, flag }: { epigramId: Epigram['id']; flag: boolean }) =>
      flag ? likeEpigram(epigramId) : unlikeEpigram(epigramId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
    },
  });
};
