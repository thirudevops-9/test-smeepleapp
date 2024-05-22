import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {currentUserCacheKey} from './useCurrentUserQuery';
import useFirebaseAuth from './useFirebaseAuth';

const useSignOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {authStateRef, signOut: fbSignOut} = useFirebaseAuth();

  const {isAuthenticated} = authStateRef.current;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [navigate]);

  const signOut = async () => {
    if (!isAuthenticated) {
      return;
    }

    await fbSignOut();

    // clear current user from react-query cache
    queryClient.removeQueries([currentUserCacheKey]);

    navigate('/sign-in');
  };

  return {
    signOut,
  };
};

export default useSignOut;
