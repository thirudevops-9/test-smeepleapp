import {useQuery} from '@tanstack/react-query';
import {get} from '../../../util';
import type {Category} from '../types';

export const QUERY_KEY = 'categories';

export default function useCategories({
  isAdmin = false,
  forRecruiting = false,
  forBooking = false,
}: {
  isAdmin?: boolean;
  forRecruiting?: boolean;
  forBooking?: boolean;
}) {
  return useQuery([QUERY_KEY, {isAdmin, forRecruiting, forBooking}], async () => {
    const {data} = await get<Category[]>(
      isAdmin ? 'categories/admin' : 'categories',
      !isAdmin
        ? {
            params: {forRecruiting, forBooking},
          }
        : undefined,
    );
    return data;
  });
}
