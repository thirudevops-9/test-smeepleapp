/* eslint-disable import/prefer-default-export */
import {useQuery} from '@tanstack/react-query';
import {get} from '../../../util';

const key = (profileLinkId: string) => ['experts', 'expert-id', profileLinkId];

const useExpertIdQuery = (profileLinkId: string | undefined) =>
  useQuery(
    key(profileLinkId!),
    async () => {
      const {data} = await get<number>(`experts/expert-id/${profileLinkId}`);
      return data;
    },
    {enabled: profileLinkId !== undefined},
  );

export default useExpertIdQuery;
