import type {AxiosRequestConfig} from 'axios';
import axios from 'axios';

const instance = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  baseURL: 'https://smeeple-dev.azurewebsites.net/api/v1.1/',
  withCredentials: true,
});

const get = <T>(url: string, config?: AxiosRequestConfig) => instance.get<T>(url, config);

const put = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  instance.put<T>(url, data, config);

const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  instance.post<T>(url, data, config);

const patch = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  instance.patch<T>(url, data, config);

const del = <T>(url: string, config?: AxiosRequestConfig) => instance.delete<T>(url, config);

// exports
export {get, put, post, patch, del, instance};
