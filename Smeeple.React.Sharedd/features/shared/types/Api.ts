import type {AxiosResponse} from 'axios';

export type ApiError = {
  response: AxiosResponse<ApiErrorResponseData | string>;
};

export type ApiErrorResponseData = {
  errors: ApiResponseErrors;
};

export type ApiResponseErrors = {
  [field: string]: string[];
};
