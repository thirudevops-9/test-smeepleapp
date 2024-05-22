import {useInfiniteQuery} from '@tanstack/react-query';
import {get} from '../../..';
import type {ExpertReviewListResponse} from '../types/ExpertReviewModel';

export const ExpertQueryKey = (expertId?: number, page?: number, pageSize?: number) => [
  'Experts',
  expertId,
  'Reviews',
  page,
  pageSize,
];

const useExpertReviewQuery = (expertId: number) => {
  const pageSize = 10;

  const fetchReviews = async (page: number) => {
    const {data} = await get<ExpertReviewListResponse>(
      `experts/${expertId}/reviews?page=${page}&pageSize=${pageSize}`,
    );
    return data;
  };

  return useInfiniteQuery(
    ExpertQueryKey(expertId, pageSize),
    ({pageParam = 1}) => fetchReviews(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageCursor,
    },
  );
};
export default useExpertReviewQuery;
