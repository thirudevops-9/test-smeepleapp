import {Navigate} from 'react-router-dom';
import {useFirebaseAuth} from '../hooks';
import ContentDivider from './ContentDivider';
import SignInForm from './SignInForm';
import ThirdParty from './ThirdParty';

interface Props {
  showSignUpLink: boolean;
  showThirdPartyButtons: boolean;
}

function SignInPage({showSignUpLink, showThirdPartyButtons}: Props) {
  const {authStateRef} = useFirebaseAuth();

  // redirects to root if user is currently signed in
  if (authStateRef.current.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {showThirdPartyButtons ? (
        <>
          <ThirdParty mode="sign-in" />
          <ContentDivider />
        </>
      ) : null}

      <SignInForm showSignUpLink={showSignUpLink} />
    </>
  );
}

export default SignInPage;
