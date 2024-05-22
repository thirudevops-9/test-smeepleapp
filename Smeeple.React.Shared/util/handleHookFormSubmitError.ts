import axios from 'axios';
import type {ErrorOption, FieldName, FieldValues} from 'react-hook-form';
import type {RedirectCallback} from './handleApiError';
import {handleApiError, hasApiErrors} from './handleApiError';
import type {EnqueueSnackbarFunction} from './types/Snackbar';

const GENERAL_VALIDATION_ERROR_FIELD = '__error__';

export type HandleHookFormSubmitErrorParameters<TFormValues extends FieldValues> = {
  error: unknown;
  setError: (name: FieldName<TFormValues>, error: ErrorOption) => void;
  setGeneralValidationErrors?: (errors: string[]) => void;
  enqueueSnackbar?: EnqueueSnackbarFunction;
  redirect?: RedirectCallback | null;
  errorMessage?: string;
};

type ErrorMessage<TFormValues extends FieldValues> = {
  fieldName: FieldName<TFormValues>;
  type: string;
  message: string;
};

export function handleHookFormSubmitError<TFormValues extends FieldValues>({
  error,
  setError,
  setGeneralValidationErrors,
  enqueueSnackbar,
  redirect = null,
  errorMessage = undefined,
}: HandleHookFormSubmitErrorParameters<TFormValues>) {
  if (!error || !axios.isAxiosError(error) || !error.response) throw error;

  const {data, status} = error.response;

  if (status === 400 && hasApiErrors(data)) {
    const apiValidationErrors = data?.errors;
    const formErrors = Object.entries(apiValidationErrors).reduce<ErrorMessage<TFormValues>[]>(
      (acc, curr) => {
        const [key, value] = curr;

        // ensure the field is camelCase
        const field = key.charAt(0).toLowerCase() + key.slice(1);
        acc.push({
          fieldName: field as FieldName<TFormValues>,
          type: 'required',
          message: value.join('. '),
        });
        return acc;
      },
      [],
    );

    formErrors
      .filter((x) => x.fieldName !== GENERAL_VALIDATION_ERROR_FIELD)
      .forEach((formError) => {
        setError(formError.fieldName, {type: formError.type, message: formError.message});
      });

    if (setGeneralValidationErrors) {
      const generalErrors = formErrors
        .filter((x) => x.fieldName === GENERAL_VALIDATION_ERROR_FIELD)
        .map((x) => x.message);

      if (generalErrors.length) {
        setGeneralValidationErrors(generalErrors);
      }
    }
  } else {
    handleApiError(error, enqueueSnackbar, redirect, errorMessage);
  }
}
