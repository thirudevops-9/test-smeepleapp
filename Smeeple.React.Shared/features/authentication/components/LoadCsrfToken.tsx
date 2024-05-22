import {useEffect} from 'react';
import {CircularProgress, Fade, Grid} from '@mui/material';
import {get} from '../../../util';

type Props = {
  onRender: () => void;
};

function Component({onRender}: Props) {
  useEffect(() => {
    // This will load a CSRF token in a cookie that will be automatically discovered
    // by the axios library in order to use double submit cookie CSRF protection.
    // This is important to use if you are using cookies to store any kind of
    // sensitive data like a JWT or other token or you're using cookie based auth.
    // You can find more details of the attack here: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
    // And the mitigation method we are using here: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie
    // This requires configuration on the API side to validate the XSRF token
    // correctly.
    const getToken = async () => {
      try {
        console.log('Trying to get csrf token');
        await get('antiforgery-token');
      } catch (e) {
        /* eslint-disable no-console */
        console.dir(e);
        console.error('Error on GetToken:', e);
        console.error('Failed to request an antiforgery token.');
        /* eslint-enable no-console */
      } finally {
        onRender();
      }
    };

    getToken();
  }, [onRender]);

  return (
    <Fade
      in
      style={{
        transitionDelay: '800ms',
      }}
      unmountOnExit
    >
      <Grid container direction="column" alignContent="center" justifyContent="center">
        <Grid item>
          <CircularProgress size={200} />
        </Grid>
      </Grid>
    </Fade>
  );
}

export default Component;
