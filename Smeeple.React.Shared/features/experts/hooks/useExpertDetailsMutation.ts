/* eslint-disable import/prefer-default-export */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { put } from '../../../util';
import { queryKey as applicationQueryKey } from '../../applications/hooks/useApplicationDetailsQuery';
import type { ExpertDetailsModel } from '../types/ExpertDetailsModel';
import { expertDetailsQueryKey } from './useExpertDetailsQuery';

const useExpertDetailsMutation = (options?: { onSuccess?: (data: ExpertDetailsModel) => void }) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (model: ExpertDetailsModel) => {
      const response = await put<ExpertDetailsModel>(`experts/${model.id}`, model);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(expertDetailsQueryKey(data.id));

        // changes to the expert details can potentially also affect the expert's application
        queryClient.invalidateQueries(applicationQueryKey(undefined, data.id));

        if (options?.onSuccess) {
          options.onSuccess(data);
        }
      },
    },
  );
};

export default useExpertDetailsMutation;
