import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteEpigram,
  getEpigramDetails,
  getEpigrams,
  getEpigramsByUserId,
  likeEpigram,
  disLikeEpigram,
  getTodayEpigram,
  getEpigramComments,
} from './epigram.service';
import {
  PaginationQueryParams,
  SearchableQueryParams,
  WriterFilterQueryParams,
} from '@/types/common';
import { Epigram, EpigramDetail } from './epigram.type';

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

export const useEpigram = (epigramId: Epigram['id']) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const details = useQuery({
    queryKey: ['epigrams', epigramId],
    queryFn: () => getEpigramDetails(epigramId),
  });

  const remove = useMutation({
    mutationFn: () => deleteEpigram(epigramId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
      toast.success('게시물을 삭제했습니다.');
      router.replace(`/feeds`);
    },
  });

  const like = useMutation({
    mutationFn: () => likeEpigram(epigramId),
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ['epigrams', epigramId] });
      const prevData = queryClient.getQueryData(['epigrams', epigramId]);

      queryClient.setQueryData(['epigrams', epigramId], (old: EpigramDetail) => ({
        ...old,
        likeCount: old.likeCount + 1,
        isLiked: true,
      }));

      return { prevData };
    },
    onError: (_, __, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(['epigrams', epigramId], context.prevData);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['epigrams', data.id] });
    },
  });

  const disLike = useMutation({
    mutationFn: () => disLikeEpigram(epigramId),
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ['epigrams', epigramId] });

      const prevData = queryClient.getQueryData(['epigrams', epigramId]);
      queryClient.setQueryData(['epigrams', epigramId], (old: EpigramDetail) => ({
        ...old,
        likeCount: old.likeCount - 1,
        isLiked: false,
      }));

      return { prevData };
    },
    onError: (_, __, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(['epigrams', epigramId], context.prevData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['epigrams', epigramId] });
    },
  });

  return { details, remove, like, disLike };
};

export const useTodayEpigram = () => {
  return useQuery({
    queryKey: ['epigrams', 'today'],
    queryFn: getTodayEpigram,
    retryOnMount: false,
  });
};

export const useFeedCommentsInFiniteQuery = (
  epigramId: number,
  params: Omit<PaginationQueryParams, 'cursor'>,
) => {
  return useInfiniteQuery({
    queryKey: ['comments', 'epigrams', epigramId, params],
    queryFn: ({ pageParam }: { pageParam?: number }) =>
      getEpigramComments(epigramId, { ...params, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });
};
