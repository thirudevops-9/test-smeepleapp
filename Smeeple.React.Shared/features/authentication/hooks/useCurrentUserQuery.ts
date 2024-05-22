import {useQuery} from '@tanstack/react-query';
import {get} from '../../../util';
import type {UserIdentity} from '../types';

export const currentUserCacheKey = 'currentUser';

export default function useCurrentUserQuery() {
  return useQuery([currentUserCacheKey], async () => {
    const {data} = await get<UserIdentity>('authentication/current-user/identity');
    return data;
  });
}
