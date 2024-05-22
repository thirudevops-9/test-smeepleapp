/* eslint-disable import/prefer-default-export */
import {useCurrentUserQuery} from '../../authentication/hooks';
import useApplicationDetailsQuery from './useApplicationDetailsQuery';

const useCurrentUserApplicationDetailsQuery = () => {
  const {data: user} = useCurrentUserQuery();
  return useApplicationDetailsQuery({expertId: user?.expertId || 0}, !!user?.firebaseUserId);
};

export default useCurrentUserApplicationDetailsQuery;
