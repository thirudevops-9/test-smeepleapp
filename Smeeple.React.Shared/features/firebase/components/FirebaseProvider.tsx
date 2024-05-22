import {createContext, useEffect, useMemo, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import type {FirebaseApp} from 'firebase/app';
import {initializeApp} from 'firebase/app';
import {get} from '../../../util/http';

interface Props {
  children: React.ReactNode;
}

type Context = {
  initialized: boolean;
  app: FirebaseApp | undefined;
};

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const DEFAULT_CONTEXT: Context = {
  initialized: false,
  app: undefined,
};

export const FirebaseContext = createContext<Context>(DEFAULT_CONTEXT);

// eslint-disable-next-line react/prop-types
function FirebaseProvider({children}: Props) {
  const [initialized, setInitialized] = useState(false);
  const [app, setApp] = useState<FirebaseApp>();

  // fetches config and initializes firebase
  useEffect(() => {
    get<FirebaseConfig>('authentication/config')
      .then((res) => {
        const config = res.data;
        const newApp = initializeApp(config);
        setApp(newApp);
      })
      .catch((e) => {
        // TODO set and show error
        console.log('firebase initialization error');
        console.log(e);
      })
      .finally(() => {
        setInitialized(true);
      });
  }, []);

  const value = useMemo<Context>(() => ({app, initialized}), [app, initialized]);

  return (
    <FirebaseContext.Provider value={value}>
      {initialized ? (
        children
      ) : (
        // TODO do we need a better loading indicator?
        <CircularProgress />
      )}
    </FirebaseContext.Provider>
  );
}

export default FirebaseProvider;
