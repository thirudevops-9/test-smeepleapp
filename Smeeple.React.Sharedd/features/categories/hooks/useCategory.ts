import {useQuery} from '@tanstack/react-query';
import {get} from '../../../util';
import type {Category} from '../types';

export default function useCategory(id: number | null) {
  return useQuery(
    ['category', id],
    async () => {
      const {data} = await get<Category>(`categories/${id}`);
      return data;
    },
    {
      enabled: !!id,
    },
  );
}
