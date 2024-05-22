import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import type {FirebaseError} from 'firebase/app';
import type {ActionCodeSettings, Auth, AuthProvider, User as FirebaseUser} from 'firebase/auth';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  confirmPasswordReset as fbConfirmPasswordReset,
  sendPasswordResetEmail as fbSendPasswordResetEmail,
  verifyPasswordResetCode as fbVerifyPasswordResetCode,
  signOut as firebaseSignOut,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import {intersection} from 'lodash';
import {get, post} from '../../../util/http';
import {FirebaseContext} from '../../firebase/components/FirebaseProvider';
import useHttpAuth from '../hooks/useHttpAuth';
import {getSignInWithPopupErrorMessage} from '../services';
import type {SystemRoles, UserIdentity} from '../types';

interface Props {
  allow?: (user: UserIdentity) => {allow: boolean; message?: string; action: React.ReactNode};
  children: React.ReactNode;
}

interface FirebaseAuthState {
  isAuthenticated: boolean;
  emailVerified: boolean;
  fbUser: FirebaseUser | null;
  currentUser: UserIdentity | null;
}

interface RegistrationRequirements {
  agreesToLegal: boolean;
  meetsMinimumAge: boolean;
}

interface RegisterExpertModel extends RegistrationRequirements {
  firebaseUid?: string;
  email: string;
  userName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

export interface AuthResult {
  state: 'success' | 'error' | 'canceled';
  error?: string;
}

export type ThirdPartySignInFunction = (
  requirements: RegistrationRequirements,
) => Promise<AuthResult>;

interface FirebaseAuthContextState {
  isAuthorized: (requiredRoles: SystemRoles[] | undefined) => boolean;
  signIn: (
    username: string,
    password: string,
    bypassUserTypeCheck?: boolean,
  ) => Promise<FirebaseAuthState>;
  signInApple: ThirdPartySignInFunction;
  signInFacebook: ThirdPartySignInFunction;
  signInGoogle: ThirdPartySignInFunction;
  signOut: () => Promise<void>;
  refreshCurrentUser: () => Promise<void>;
  sendPasswordResetEmail: (email: string, actionCodeSettings?: ActionCodeSettings) => Promise<void>;
  verifyPasswordResetCode: (code: string) => Promise<string>;
  confirmPasswordReset: (oobCode: string, newPassword: string) => Promise<void>;
  authStateRef: React.MutableRefObject<FirebaseAuthState>;
}

const DEFAULT_AUTH_STATE: FirebaseAuthState = {
  isAuthenticated: false,
  emailVerified: false,
  fbUser: null,
  currentUser: null,
};

export const FirebaseAuthContext = createContext<FirebaseAuthContextState | undefined>(undefined);

export class NotAllowedError extends Error {
  readonly action?: React.ReactNode;

  constructor(message?: string, action?: React.ReactNode) {
    super(message);
    Object.setPrototypeOf(this, NotAllowedError.prototype);
    this.action = action;
  }
}

const registerExpert = async (model: RegisterExpertModel) => {
  await post('/experts/sign-up', model);
};

const fetchCurrentUser = async () => {
  const {data} = await get<UserIdentity>('authentication/current-user/identity');
  return data;
};

type Tail<T extends unknown[]> = T extends [unknown, ...infer U] ? U : never;

const useCallbackWithAuth = <
  FirebaseCallback extends (
    auth: Auth,
    ...rest: Tail<Parameters<FirebaseCallback>>
  ) => ReturnType<FirebaseCallback>,
>(
  callback: FirebaseCallback,
  auth: Auth | undefined,
) => {
  return useCallback(
    (...args: Tail<Parameters<FirebaseCallback>>) => {
      if (!auth) throw new Error('FirebaseAuth not initialized');
      return callback(auth, ...args);
    },
    // Safe to exclude callback because this is only used with imported functions
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth],
  );
};

function FirebaseAuthProvider({children, allow}: Props) {
  const {app} = useContext(FirebaseContext);
  const authStateRef = useRef<FirebaseAuthState>(DEFAULT_AUTH_STATE);
  const [auth, setAuth] = useState<Auth>();
  const [authInitialized, setAuthInitialized] = useState(false);
  const httpAuth = useHttpAuth();

  const getAuthInfo = async (fbUser: FirebaseUser) => {
    httpAuth.setUser(fbUser);
    const currentUser = await fetchCurrentUser();
    const newAuthState = {
      isAuthenticated: true,
      emailVerified: currentUser.emailVerified || fbUser.emailVerified,
      fbUser,
      currentUser,
    };
    authStateRef.current = newAuthState;
    return newAuthState;
  };

  const clearAuthInfo = () => {
    httpAuth.clearUser();
    authStateRef.current = DEFAULT_AUTH_STATE;
  };

  // fetches config and initializes firebase
  useEffect(() => {
    const newAuth = getAuth(app);
    setAuth(newAuth);
  }, [app]);

  // attempts to get current user
  useEffect(() => {
    if (auth === undefined) {
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        await getAuthInfo(user);
        setAuthInitialized(true);
      } else {
        clearAuthInfo();
        setAuthInitialized(true);
      }
    });

    return () => {
      unsubscribe();
    };
    // getAuthInfo and clearAuthInfo have stable identities
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const isAuthorized = useCallback((requiredRoles?: SystemRoles[]) => {
    const authState = authStateRef.current;

    if (!authState || !authState.isAuthenticated || !authState.fbUser || !authState.currentUser)
      return false;

    if (!requiredRoles || !requiredRoles.length) return true;

    // does user have at least one of the routes required roles?
    return intersection(authState.currentUser.roles, requiredRoles).length > 0;
  }, []);

  const signOut = useCallback(async () => {
    if (auth === undefined) {
      throw new Error('signOut called before init');
    }

    await firebaseSignOut(auth);
    clearAuthInfo();

    // clearAuthInfo has a stable identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const signIn = useCallback(
    async (email: string, password: string, bypassUserTypeCheck: boolean = false) => {
      console.log(email, password);
      if (auth === undefined) {
        throw new Error('signIn called before init');
      }

      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("res",res);
      const fbUser = res.user;
      const user = await getAuthInfo(fbUser);

      if (!bypassUserTypeCheck && allow) {
        const allowRes = allow(user.currentUser);

        if (!allowRes.allow) {
          await signOut();
          throw new NotAllowedError(allowRes.message, allowRes.action);
        }
      }

      if (!(user.emailVerified || fbUser.emailVerified)) {
        try {
          await post('/authentication/send-email-verification');
        } catch {
          // User can manually resend if this fails -- not much can be done here to fix the error
        }
      }

      return user;
    },
    // getAuthInfo has a stable identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth, allow],
  );

  const signInWithProvider = useCallback(
    async (
      provider: AuthProvider,
      {agreesToLegal, meetsMinimumAge}: RegistrationRequirements,
    ): Promise<AuthResult> => {
      if (auth === undefined) {
        return {state: 'error', error: 'Auth not initialized'};
      }

      try {
        const {user: fbUser} = await signInWithPopup(auth, provider);

        const createExpert = async () => {
          await registerExpert({
            // Safe to assert because we specifically request the email
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            email: fbUser.email!,
            firebaseUid: fbUser.uid,
            agreesToLegal,
            meetsMinimumAge,
          });

          const authInfo = await getAuthInfo(fbUser);

          if (!authInfo.emailVerified) {
            try {
              await post('/authentication/send-email-verification');
            } catch {
              // User can manually resend if this fails -- not much can be done here to fix the error
            }
          }
        };

        // See if the user already exists, otherwise sign the user up as
        // an expert and refresh the auth state
        try {
          const newAuthInfo = await getAuthInfo(fbUser);
          if (newAuthInfo.currentUser.expertId == null) {
            await createExpert();
          }
        } catch (e) {
          if (axios.isAxiosError(e) && e.response?.status === 404) {
            await createExpert();
          }
        }

        return {state: 'success'};
      } catch (e) {
        return {state: 'error', error: getSignInWithPopupErrorMessage(e as FirebaseError)};
      }
    },
    // getAuthInfo has a stable identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth],
  );

  const signInApple = useCallback<ThirdPartySignInFunction>(
    async (requirements) => {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');

      return signInWithProvider(provider, requirements);
    },
    [signInWithProvider],
  );

  const signInFacebook = useCallback<ThirdPartySignInFunction>(
    async (requirements) => {
      const provider = new FacebookAuthProvider();
      provider.addScope('email');

      return signInWithProvider(provider, requirements);
    },
    [signInWithProvider],
  );

  const signInGoogle = useCallback<ThirdPartySignInFunction>(
    async (requirements) => {
      console.log('i am here');

      const provider = new GoogleAuthProvider();

      provider.addScope('https://www.googleapis.com/auth/userinfo.email');

      return signInWithProvider(provider, requirements);
    },
    [signInWithProvider],
  );

  const refreshCurrentUser = useCallback(async () => {
    const {fbUser} = authStateRef.current;
    if (fbUser == null) {
      throw new Error('refreshCurrentUser called without user');
    }
    await getAuthInfo(fbUser);
    // getAuthInfo has a stable identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendPasswordResetEmail = useCallbackWithAuth(fbSendPasswordResetEmail, auth);
  const verifyPasswordResetCode = useCallbackWithAuth(fbVerifyPasswordResetCode, auth);
  const confirmPasswordReset = useCallbackWithAuth(fbConfirmPasswordReset, auth);

  const value = useMemo<FirebaseAuthContextState>(
    () => ({
      authStateRef,
      confirmPasswordReset,
      isAuthorized,
      refreshCurrentUser,
      sendPasswordResetEmail,
      signIn,
      signInApple,
      signInFacebook,
      signInGoogle,
      signOut,
      verifyPasswordResetCode,
    }),
    [
      confirmPasswordReset,
      isAuthorized,
      refreshCurrentUser,
      sendPasswordResetEmail,
      signIn,
      signInApple,
      signInFacebook,
      signInGoogle,
      signOut,
      verifyPasswordResetCode,
    ],
  );

  return (
    <FirebaseAuthContext.Provider value={value}>
      {authInitialized ? children : <CircularProgress />}
    </FirebaseAuthContext.Provider>
  );
}

export default FirebaseAuthProvider;
