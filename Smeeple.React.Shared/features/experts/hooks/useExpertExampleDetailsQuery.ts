/* eslint-disable import/prefer-default-export */
import {useQuery} from '@tanstack/react-query';
import {get} from '../../../util';
import type {ExpertDetailsModel} from '../types/ExpertDetailsModel';

export const queryKey = ['Experts', 'Example'];

const useExpertExampleDetailsQuery = (enabled: boolean) =>
  useQuery(
    queryKey,
    async () => {
      const {data} = await get<ExpertDetailsModel>('experts/example');
      return data;
    },
    {enabled},
  );

export default useExpertExampleDetailsQuery;
