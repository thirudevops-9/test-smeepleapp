import type {RouteObject} from 'react-router-dom';
import OpenInAppPage from '../shared/components/OpenInAppPage';
import OpenInAppRedirect from '../shared/components/OpenInAppRedirect';
import {
  AccountManagementPage,
  AuthenticationPage,
  ChangePasswordPage,
  DisableAccountPage,
  ForgotPasswordPage,
  ProtectedRoute,
  ResetPasswordPage,
  ResetPasswordSuccessPage,
  SignInPage,
  SignOutPage,
} from './components';

const createRoutes: (isAdmin: boolean) => RouteObject[] = (isAdmin) => [
  {
    element: (
      <ProtectedRoute>
        <AuthenticationPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/sign-in',
        element: <SignInPage showSignUpLink={!isAdmin} showThirdPartyButtons={!isAdmin} />,
      },
    ],
  },
  {
    element: <AuthenticationPage />,
    children: [
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/reset-password-success',
        element: <ResetPasswordSuccessPage />,
      },
    ],
  },
  {
    element: <OpenInAppPage />,
    children: [
      {
        path: '/open-in-app',
        element: <OpenInAppRedirect />,
      },
    ],
  },
  {
    element: <AccountManagementPage />,
    children: [
      {
        path: '/sign-out',
        element: <SignOutPage />,
      },
      {
        path: '/change-password',
        element: <ChangePasswordPage />,
      },
      {
        path: '/disable-account',
        element: <DisableAccountPage />,
      },
    ],
  },
];

export default createRoutes;
