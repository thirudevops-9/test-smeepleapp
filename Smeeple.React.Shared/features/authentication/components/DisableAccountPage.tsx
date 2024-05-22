import {Link, Typography, Box} from '@mui/material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import DisableAccountForm from './DisableAccountForm';
import {Loading} from '../../layout/components';
import {useValidateToken, TokenType} from '../hooks';

type ValidTokenProps = {
  onAccountDisabled: () => void;
  token: string | null;
  userId: string | null;
};

type MainContentProps = ValidTokenProps & {
  loading: boolean;
  tokenValidated: boolean;
};

function ValidToken({userId, token, onAccountDisabled}: ValidTokenProps) {
  return (
    <>
      <Box marginBottom={2}>
        <Typography variant="body2">Click Confirm to disable your account.</Typography>
      </Box>
      <DisableAccountForm userId={userId} token={token} onSuccess={onAccountDisabled} />
    </>
  );
}

function InvalidToken() {
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

function MainContent({
  loading,
  tokenValidated,
  userId,
  token,
  onAccountDisabled,
}: MainContentProps) {
  if (loading) return <Loading />;
  if (tokenValidated)
    return <ValidToken userId={userId} token={token} onAccountDisabled={onAccountDisabled} />;
  return <InvalidToken />;
}

function DisableAccountPage() {
  const {isValid, isLoading, userId, token} = useValidateToken(TokenType.DisableAccount);
  const navigate = useNavigate();
  const handleAccountDisabled = () => navigate('/sign-in');

  return (
    <>
      <Typography variant="h5">Disable Account</Typography>
      <MainContent
        loading={isLoading}
        tokenValidated={isValid}
        userId={userId}
        token={token}
        onAccountDisabled={handleAccountDisabled}
      />
    </>
  );
}

export default DisableAccountPage;
