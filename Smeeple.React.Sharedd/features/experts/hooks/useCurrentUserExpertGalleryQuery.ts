/* eslint-disable import/prefer-default-export */
import {useCurrentUserQuery} from '../../authentication/hooks';
import useExpertGalleryQuery from './useExpertGalleryQuery';

const useCurrentUserExpertGalleryQuery = () => {
  const {data: user} = useCurrentUserQuery();
  return useExpertGalleryQuery(user?.expertId || 0, !!user?.firebaseUserId);
};

export default useCurrentUserExpertGalleryQuery;
