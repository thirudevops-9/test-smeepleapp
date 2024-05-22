import {Box, Grid, Paper, Stack, Typography} from '@mui/material';
import {Outlet} from 'react-router-dom';
import PROMO_SRC from '../../../assets/login-background.svg';
import LOGO_SRC from '../../../assets/logo-dark.svg';
import {MIDNIGHT_BLUE} from '../../../styles/theme';
import {Footer} from '../../authentication/components/AuthenticationPage';
import useInMobileLayout from '../hooks/useInMobileLayout';

function PromotionalSection() {
  return (
    <Stack
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: `${MIDNIGHT_BLUE}`,
      }}
    >
      <Box
        component="img"
        src={LOGO_SRC}
        alt="smeeple logo"
        display="block"
        height="180px"
        ml="auto"
        mr="auto"
      />
    </Stack>
  );
}

function Logo() {
  return (
    <Box
      component="img"
      src={LOGO_SRC}
      alt="smeeple logo"
      display="block"
      height="80px"
      ml="auto"
      mr="auto"
      mb={2}
    />
  );
}

export default function OpenInAppPage() {
  const inMobileMode = useInMobileLayout();

  return (
    <Grid container width="100%" height="100%">
      {!inMobileMode && (
        <Grid item xs={7}>
          <PromotionalSection />
        </Grid>
      )}
      <Grid item xs={inMobileMode ? 12 : 5}>
        <Paper sx={{width: '100%', height: '100vh'}}>
          <Stack width="100%" height="100%" pt={8} pl="5%" pr="5%" overflow="auto">
            {inMobileMode && <Logo />}
            <Outlet />
            <Footer />
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
