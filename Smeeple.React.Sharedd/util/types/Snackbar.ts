import type {OptionsObject, SnackbarKey, SnackbarMessage} from 'notistack';

export type EnqueueSnackbarFunction = (
  message: SnackbarMessage,
  options?: OptionsObject,
) => SnackbarKey;

export enum EnqueueSnackbarVariant {
  Default = 'default',
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
}
