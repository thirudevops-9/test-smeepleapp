import {useContext} from 'react';
import {FirebaseAuthContext} from '../components/FirebaseAuthProvider';

const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error('use FirebaseAuthContext must be used within an AuthProvider');
  }

  return context;
};

export default useFirebaseAuth;
