/* eslint-disable import/prefer-default-export */
import {useQuery} from '@tanstack/react-query';
import {get} from '../../..';
import type {ExpertReviewSummaryModel} from '../types/ExpertReviewSummaryModel';

export const queryKey = (expertId: number) => ['Experts', expertId, 'ReviewSummary'];

const useExpertReviewSummaryQuery = (expertId: number) => {
  return useQuery(
    queryKey(expertId),
    async () => {
      const {data} = await get<ExpertReviewSummaryModel>(`experts/${expertId}/reviews/summary`);
      return data;
    },
    {enabled: !!expertId},
  );
};
export default useExpertReviewSummaryQuery;
