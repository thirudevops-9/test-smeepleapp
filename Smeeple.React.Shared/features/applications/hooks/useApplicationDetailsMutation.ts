/* eslint-disable import/prefer-default-export */
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {serialize} from 'object-to-formdata';
import {put} from '../../../util';
import {expertDetailsQueryKey} from '../../experts/hooks/useExpertDetailsQuery';
import type {ApplicationDetailsModel, SupportingDocument} from '../types/ApplicationDetailsModel';
import {queryKey} from './useApplicationDetailsQuery';

// Not sure why we have to manually append these to get the API to pick them up, but it won't work without them.
const appendNewDocuments = (
  formData: FormData,
  key: string,
  newDocuments: File[] | undefined = [],
) => {
  newDocuments.forEach((d) => {
    formData.append(key, d);
  });
};

const appendDocuments = (
  formData: FormData,
  key: string,
  documents: SupportingDocument[] | undefined = [],
) => {
  documents.forEach((d, i) => {
    formData.append(`${key}[${i}].downloadableFileId`, d.downloadableFileId.toString());
    formData.append(`${key}[${i}].fileName`, d.fileName.toString());
    formData.append(`${key}[${i}].url`, d.url.toString());
  });
};

const toFormData = (model: ApplicationDetailsModel) => {
  const formData = serialize(model, {dotsForObjectNotation: true});

  // employment files
  appendNewDocuments(
    formData,
    'employmentCredential.newSupportingDocuments',
    model.employmentCredential?.newSupportingDocuments,
  );

  appendDocuments(
    formData,
    'employmentCredential.supportingDocuments',
    model.employmentCredential?.supportingDocuments,
  );

  // license files
  appendNewDocuments(
    formData,
    'licenseCredential.newSupportingDocuments',
    model.licenseCredential?.newSupportingDocuments,
  );

  appendDocuments(
    formData,
    'licenseCredential.supportingDocuments',
    model.licenseCredential?.supportingDocuments,
  );

  // business files
  appendNewDocuments(
    formData,
    'businessCredential.newSupportingDocuments',
    model.businessCredential?.newSupportingDocuments,
  );

  appendDocuments(
    formData,
    'businessCredential.supportingDocuments',
    model.businessCredential?.supportingDocuments,
  );

  // additional files
  appendNewDocuments(
    formData,
    'newAdditionalSupportingDocuments',
    model.newAdditionalSupportingDocuments,
  );

  appendDocuments(formData, 'additionalSupportingDocuments', model.additionalSupportingDocuments);

  return formData;
};

const useApplicationDetailsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (model: ApplicationDetailsModel) => {
      const response = await put<ApplicationDetailsModel>(
        `applications/${model.id}`,
        toFormData(model),
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(queryKey(data.id));
        queryClient.invalidateQueries(expertDetailsQueryKey(data.expertId));
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

export default useApplicationDetailsMutation;
