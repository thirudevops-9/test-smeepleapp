/* eslint-disable import/prefer-default-export */
import {useQuery} from '@tanstack/react-query';
import {get} from '../../../util';
import type {ExpertDetailsModel} from '../types/ExpertDetailsModel';

export const expertDetailsQueryKey = (expertId: number) => ['Experts', expertId];

const useExpertDetailsQuery = (expertId: number, enabled: boolean) =>
  useQuery(
    expertDetailsQueryKey(expertId),
    async () => {
      const {data} = await get<ExpertDetailsModel>(`experts/${expertId}`);
      return data;
    },
    {enabled},
  );

export default useExpertDetailsQuery;
