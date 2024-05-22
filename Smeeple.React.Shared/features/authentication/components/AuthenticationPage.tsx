import {Box, Grid, Paper, Stack, Typography} from '@mui/material';
import {Outlet} from 'react-router-dom';
import PROMO_SRC from '../../../assets/login-background.svg';
import LOGO_SRC from '../../../assets/logo-dark.svg';
import {MIDNIGHT_BLUE, WHITE} from '../../../styles/theme';
import useInMobileLayout from '../../shared/hooks/useInMobileLayout';

function PromotionalSection() {
  return (
    <Stack
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: `center / cover no-repeat url(${PROMO_SRC}), ${MIDNIGHT_BLUE}`,
      }}
    >
      <Box
        sx={{
          maxWidth: '50%',
          '@media (max-width: 1300px)': {
            maxWidth: '75%',
          },
          '@media (max-height: 500px)': {
            fontSize: '24px',
            maxWidth: '50%',
          },
        }}
      >
        <Typography variant="h4" color={WHITE} textTransform="uppercase" textAlign="center">
          Your expertise is now the center of it all.
        </Typography>
        <Typography variant="h4" color={WHITE} fontWeight="light" mt={4} textAlign="center">
          Welcome to Smeeple.
        </Typography>
      </Box>
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

export function Footer() {
  return (
    <Typography
      variant="body2"
      color={MIDNIGHT_BLUE}
      fontSize="16px"
      fontWeight="lighter"
      alignSelf="center"
      mt="auto"
      mb={2}
      pt={2}
    >
      &#169; 2023 Smeeple, Inc.
    </Typography>
  );
}

export default function AuthenticationPage() {
  const inMobileMode = useInMobileLayout();

  if (inMobileMode) {
    return (
      <Stack width="100%" pt={8} px="10%">
        <Logo />
        <Outlet />
        <Footer />
      </Stack>
    );
  }

  return (
    <Grid container width="100%" height="100%">
      <Grid item xs={8}>
        <PromotionalSection />
      </Grid>
      <Grid item xs={inMobileMode ? 12 : 4}>
        <Paper sx={{width: '100%', height: '100vh'}}>
          <Stack width="100%" height="100%" pt={8} px="10%" overflow="auto">
            <Logo />
            <Outlet />
            <Footer />
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
