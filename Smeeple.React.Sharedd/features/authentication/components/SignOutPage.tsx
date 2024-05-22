import {useEffect} from 'react';
import {CircularProgress, Fade, Grid} from '@mui/material';
import {useSignOut} from '../hooks';

function SignOutPage() {
  const {signOut} = useSignOut();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return (
    <Fade
      in
      style={{
        transitionDelay: '300ms',
      }}
      unmountOnExit
    >
      <Grid
        container
        direction="column"
        alignContent="center"
        justifyContent="center"
        sx={{height: '100vh'}}
      >
        <Grid item>
          <CircularProgress size={200} />
        </Grid>
      </Grid>
    </Fade>
  );
}

export default SignOutPage;
