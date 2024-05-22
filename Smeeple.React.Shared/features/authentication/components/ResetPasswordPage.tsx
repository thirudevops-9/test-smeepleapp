import {useCallback, useEffect, useState} from 'react';
import {Link, Stack, Typography} from '@mui/material';
import {Link as RouterLink, useSearchParams} from 'react-router-dom';
import {Loading} from '../../layout/components';
import {useFirebaseAuth} from '../hooks';
import ResetPasswordForm from './ResetPasswordForm';

type MainContentProps = {
  isLoading: boolean;
  isValid: boolean;
  resetPassword: (newPassword: string) => Promise<void>;
};

const useVerifyPasswordResetCode = (code: string | null) => {
  const {verifyPasswordResetCode, confirmPasswordReset} = useFirebaseAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!code) {
      setIsLoading(false);
      setIsValid(false);
      return;
    }

    verifyPasswordResetCode(code)
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false))
      .finally(() => setIsLoading(false));
  }, [code, verifyPasswordResetCode]);

  const resetPassword = useCallback(
    (newPassword: string) => {
      if (!code) throw new Error('Invalid code');
      return confirmPasswordReset(code, newPassword);
    },
    [confirmPasswordReset, code],
  );

  return {isLoading, isValid, resetPassword};
};

function InvalidCode() {
  return (
    <Typography>
      Sorry, but your link is no longer valid. Click{' '}
      <Link component={RouterLink} to="/">
        here
      </Link>{' '}
      to return to sign in.
    </Typography>
  );
}

function MainContent({isLoading, isValid, resetPassword}: MainContentProps) {
  if (isLoading) return <Loading />;
  if (!isValid) return <InvalidCode />;

  return (
    <>
      <Typography variant="body2">
        Enter your new password and click the reset password button.
      </Typography>
      <ResetPasswordForm resetPassword={resetPassword} />
    </>
  );
}

function ResetPasswordPage() {
  const [params] = useSearchParams();
  const code = params.get('oobCode');
  const {isLoading, isValid, resetPassword} = useVerifyPasswordResetCode(code);

  return (
    <Stack rowGap={2}>
      <Typography variant="h5">Reset Password</Typography>
      <MainContent isLoading={isLoading} isValid={isValid} resetPassword={resetPassword} />
    </Stack>
  );
}

export default ResetPasswordPage;
