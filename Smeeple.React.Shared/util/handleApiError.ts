import type {ApiErrorResponseData} from '@smeeple/shared/features/shared/types';
import axios from 'axios';
import {EnqueueSnackbarVariant} from './types/Snackbar';
import type {EnqueueSnackbarFunction} from './types/Snackbar';

export type RedirectCallback = (route: string) => void;

export function hasApiErrors(data: unknown): data is ApiErrorResponseData {
  return typeof data === 'object' && data !== null && 'errors' in data;
}

export function handleApiError(
  error: unknown,
  enqueueSnackbar: EnqueueSnackbarFunction | null = null,
  redirect: RedirectCallback | null = null,
  errorMessage: string | null = null,
  returnUrl: string | null = null,
) {
  if (!error || !axios.isAxiosError(error) || !error.response) throw error;

  const {data, status} = error.response;

  let snackbarMessage;
  if (typeof data === 'string') {
    snackbarMessage = errorMessage || data;
  } else if (hasApiErrors(data)) {
    snackbarMessage = Object.values(data.errors).flat().join('. ');
  } else {
    const formattedError = error ? JSON.stringify(error) : 'Unknown';
    snackbarMessage = errorMessage || `A server error has occurred: ${formattedError}`;
  }

  if (redirect) {
    switch (status) {
      case 401:
        redirect(`/sign-in?returnUrl=${encodeURIComponent(returnUrl ?? '')}`);
        break;
      case 403:
        redirect('/access-denied');
        break;
      case 404:
        redirect('/not-found');
        break;
      default:
        redirect('/system-error');
        break;
    }
    return;
  }

  if (enqueueSnackbar) {
    enqueueSnackbar(snackbarMessage, {variant: EnqueueSnackbarVariant.Error});
  }
}
