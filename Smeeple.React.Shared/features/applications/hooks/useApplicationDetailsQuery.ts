/* eslint-disable import/prefer-default-export */
import {useQuery} from '@tanstack/react-query';
import {get} from '../../../util';
import type {ApplicationDetailsModel} from '../types/ApplicationDetailsModel';

export const queryKey = (applicationId = 0, expertId = 0) => [
  'Applications',
  applicationId,
  expertId,
];

const useApplicationDetailsQuery = (
  {applicationId, expertId}: {applicationId?: number; expertId?: number},
  enabled: boolean,
) => {
  return useQuery(
    queryKey(applicationId || 0, expertId || 0),
    async () => {
      const {data} = await get<ApplicationDetailsModel>(
        applicationId ? `applications/${applicationId}` : `applications?expertId=${expertId}`,
      );
      return data;
    },
    {enabled: enabled && !!(applicationId || expertId)},
  );
};

export default useApplicationDetailsQuery;
