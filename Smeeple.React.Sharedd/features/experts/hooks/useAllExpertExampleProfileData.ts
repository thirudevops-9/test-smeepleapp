/* eslint-disable import/prefer-default-export */
import {useCategory} from '../../categories/hooks';
import useExpertExampleDetailsQuery from './useExpertExampleDetailsQuery';
import useExpertGalleryQuery from './useExpertGalleryQuery';

const useAllExpertExampleProfileData = () => {
  const expertDetailsQuery = useExpertExampleDetailsQuery(true);
  const expertId = expertDetailsQuery.data?.id || 0;
  const expertGalleryQuery = useExpertGalleryQuery(expertId, !!expertId);
  const expertCategoryQuery = useCategory(expertDetailsQuery.data?.categoryId ?? null);

  return {
    expert: expertDetailsQuery.data,
    gallery: expertGalleryQuery.data,
    category: expertCategoryQuery.data,
  };
};

export default useAllExpertExampleProfileData;
