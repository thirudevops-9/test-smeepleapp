/* eslint-disable import/prefer-default-export */
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {put} from '../../../util';
import {expertTipsQueryKey} from './useExpertTipsQuery';

type Tips = {
  tips: string[];
};

const useExpertTipsMutation = (expertId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (model: Tips) => {
      const response = await put<Tips>(`experts/${expertId}/tips`, model);
      return response.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(expertTipsQueryKey(expertId)),
    },
  );
};

export default useExpertTipsMutation;
