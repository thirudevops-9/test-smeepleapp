/* eslint-disable import/prefer-default-export */
import {useCategory} from '../../categories/hooks';
import useExpertDetailsQuery from './useExpertDetailsQuery';
import useExpertGalleryQuery from './useExpertGalleryQuery';

const useAllExpertProfileData = (expertId: number, enabled: boolean) => {
  const expertDetailsQuery = useExpertDetailsQuery(expertId, enabled);
  const expertGalleryQuery = useExpertGalleryQuery(expertId, enabled);
  const expertCategoryQuery = useCategory(
    enabled && expertDetailsQuery.data ? expertDetailsQuery.data.categoryId : null,
  );

  return {
    expert: expertDetailsQuery.data,
    gallery: expertGalleryQuery.data,
    category: expertCategoryQuery.data,
  };
};

export default useAllExpertProfileData;
