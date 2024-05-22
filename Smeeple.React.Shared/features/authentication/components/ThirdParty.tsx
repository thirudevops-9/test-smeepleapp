import {useState} from 'react';
import {Stack, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import APPLE_SRC from '../../../assets/Social_Apple_Icon.svg';
import FACEBOOK_SRC from '../../../assets/Social_Facebook_Icon.svg';
import GOOGLE_SRC from '../../../assets/Social_Google_Icon.svg';
import {useFirebaseAuth} from '../hooks';
import type {ThirdPartySignInFunction} from './FirebaseAuthProvider';
import ThirdPartyButton from './ThirdPartyButton';

interface Props {
  mode: 'sign-in' | 'sign-up';
}

function ThirdParty({mode}: Props) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>();
  const {signInApple, signInGoogle, signInFacebook} = useFirebaseAuth();

  const handleSignIn = (signIn: ThirdPartySignInFunction) => async () => {
    const result = await signIn({agreesToLegal: false, meetsMinimumAge: false});
    if (result.state === 'error') {
      setError(result.error ?? 'An error occurred');
    } else {
      navigate('/');
    }
  };

  const actionVerb = mode === 'sign-in' ? 'Sign In with' : 'Continue with';

  return (
    <Stack sx={{gap: 2}}>
      {error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : null}

      <ThirdPartyButton
        text={`${actionVerb} Apple`}
        iconSrc={APPLE_SRC}
        onClick={handleSignIn(signInApple)}
      />
      <ThirdPartyButton
        text={`${actionVerb} Facebook`}
        iconSrc={FACEBOOK_SRC}
        onClick={handleSignIn(signInFacebook)}
      />
      <ThirdPartyButton
        text={`${actionVerb} Google`}
        iconSrc={GOOGLE_SRC}
        onClick={handleSignIn(signInGoogle)}
      />
    </Stack>
  );
}

export default ThirdParty;
