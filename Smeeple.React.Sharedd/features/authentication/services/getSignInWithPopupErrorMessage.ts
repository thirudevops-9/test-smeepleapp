import type {FirebaseError} from 'firebase/app';

export default (error: FirebaseError): string => {
  switch (error.code) {
    case 'auth/cancelled-popup-request':
      return 'Popup already opened.';
    case 'auth/popup-blocked':
      return 'The popup to sign in was blocked by your browser.';
    case 'auth/popup-closed-by-user':
      return 'Sign in canceled.';
    // These codes indicate a problem with the environment configuration
    case 'auth/account-exists-with-different-credential':
    case 'auth/auth-domain-config-required':
    case 'auth/operation-not-allowed':
    case 'auth/operation-not-supported-in-this-environment':
    case 'auth/unauthorized-domain':
      return `An unexpected error occurred. Please contact support@smeeple.com and report this error code: ${error.code}`;
    default:
      return 'An unknown error occurred. Please try again later and contact support@smeeple.com if the error persists.';
  }
};
