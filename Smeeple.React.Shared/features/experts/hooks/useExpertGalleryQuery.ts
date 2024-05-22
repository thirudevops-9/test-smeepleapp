/* eslint-disable import/prefer-default-export */
import {useQuery} from '@tanstack/react-query';
import {get} from '../../..';
import type {ExpertGalleryModel} from '../types/ExpertGalleryModel';

export const queryKey = (expertId: number) => ['Experts', expertId, 'Gallery'];

const useExpertGalleryQuery = (expertId: number, enabled: boolean) =>
  useQuery(
    queryKey(expertId),
    async () => {
      const {data} = await get<ExpertGalleryModel>(`experts/${expertId}/gallery`);
      return data;
    },
    {enabled},
  );

export default useExpertGalleryQuery;
