/* eslint-disable import/prefer-default-export */
import {useQuery} from '@tanstack/react-query';
import {get} from '../../../util';
import type {ExpertTipsModel} from '../types/ExpertTipsModel';

export const expertTipsQueryKey = (expertId: number) => ['Experts', expertId, 'Tips'];

const useExpertTipsQuery = (expertId: number, enabled: boolean) =>
  useQuery(
    expertTipsQueryKey(expertId),
    async () => {
      const {data} = await get<ExpertTipsModel>(`experts/${expertId}/tips`);
      return data;
    },
    {enabled},
  );

export default useExpertTipsQuery;
