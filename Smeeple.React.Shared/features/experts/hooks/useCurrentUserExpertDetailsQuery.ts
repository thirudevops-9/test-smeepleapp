/* eslint-disable import/prefer-default-export */
import {useCurrentUserQuery} from '../../authentication/hooks';
import useExpertDetailsQuery from './useExpertDetailsQuery';

const useCurrentUserExpertDetailsQuery = () => {
  const {data: user} = useCurrentUserQuery();
  return useExpertDetailsQuery(user?.expertId || 0, !!user?.firebaseUserId);
};

export default useCurrentUserExpertDetailsQuery;
