import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {post, handleApiError} from '../../../util';

export enum TokenType {
  DisableAccount,
  ResetPassword,
}

const useValidateToken = (tokenType: TokenType) => {
  const queryString = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const userId = queryString.get('userId');
  const token = queryString.get('token');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {enqueueSnackbar} = useSnackbar();
  const url =
    tokenType === TokenType.DisableAccount
      ? 'authentication/verify-disable-account-token'
      : 'authentication/verify-reset-password-token';

  useEffect(() => {
    const validate = async () => {
      if (!userId || !token) {
        setIsLoading(false);
        setIsValid(false);
        return;
      }

      try {
        const response = await post<boolean>(url, {userId, token});
        setIsValid(response.data);
      } catch (error) {
        handleApiError(error, enqueueSnackbar, navigate, 'Failed to validate token');
      } finally {
        setIsLoading(false);
      }
    };

    validate();
  }, [userId, token, enqueueSnackbar, navigate, url]);

  return {
    isLoading,
    isValid,
    userId,
    token,
  };
};

export default useValidateToken;
