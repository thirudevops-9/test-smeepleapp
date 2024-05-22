import {useRef} from 'react';
import type {User as FirebaseUser} from 'firebase/auth';
import {instance as axiosInstance} from '../../../util/http';

const setInterceptor = (user: FirebaseUser) => {
  return axiosInstance.interceptors.request.use(async (config) => {
    const newConfig = {...config};

    // this will refresh the token if necessary
    const token = await user.getIdToken();

    newConfig.headers = {
      Authorization: `Bearer ${token ?? ''}`,
    };

    return newConfig;
  });
};

const removeInterceptor = (id: number | undefined) => {
  if (id !== undefined) {
    axiosInstance.interceptors.request.eject(id);
  }
};

const useHttpAuth = () => {
  const interceptorId = useRef<number>();

  const setUser = (user: FirebaseUser) => {
    // just in case there was already an interceptor
    removeInterceptor(interceptorId.current);

    interceptorId.current = setInterceptor(user);
  };

  const clearUser = () => {
    removeInterceptor(interceptorId.current);
    interceptorId.current = undefined;
  };

  return {setUser, clearUser};
};

export default useHttpAuth;
