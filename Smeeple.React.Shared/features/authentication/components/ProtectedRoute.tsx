import type {ReactNode} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useFirebaseAuth} from '../hooks';
import type {SystemRoles} from '../types';

type Props = {
  roles?: SystemRoles[];
  children: ReactNode;
};

function ProtectedRoute({roles, children}: Props) {
  const location = useLocation();
  const {isAuthorized, authStateRef} = useFirebaseAuth();
  const {isAuthenticated, emailVerified} = authStateRef.current;

  if (!isAuthenticated && location.pathname !== '/sign-in') {
    return (
      <Navigate
        to={`/sign-in?returnUrl=${location.pathname}`}
        state={{referrer: location.pathname}}
        replace
      />
    );
  }

  if (isAuthenticated && !emailVerified && location.pathname !== '/experts/verify-email') {
    return <Navigate to="/experts/verify-email" state={{referrer: location.pathname}} replace />;
  }

  if (roles?.length && !isAuthorized(roles)) {
    return <Navigate to="/access-denied" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
