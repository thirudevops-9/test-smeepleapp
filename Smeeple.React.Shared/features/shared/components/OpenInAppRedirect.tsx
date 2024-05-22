import React, {useEffect} from 'react';
import {Box, Button, Stack, Typography} from '@mui/material';
import {useSearchParams} from 'react-router-dom';
import MobileGraphic from '../../../assets/Graphic_AppRedirect.svg';
import useInMobileLayout from '../hooks/useInMobileLayout';

function MobileGraphicContainer() {
  return (
    <Box
      mb={3}
      height={150}
      sx={{background: `center / contain no-repeat url(${MobileGraphic})`}}
    />
  );
}

function Title() {
  return (
    <Typography variant="h4" textAlign="center" mb={2}>
      The Best Experience Is in the App!
    </Typography>
  );
}

function OpenInAppRedirect() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('dest');
  const isMobile = useInMobileLayout();

  return isMobile ? (
    <>
      <Title />
      <MobileGraphicContainer />
      <Button component="a" variant="contained" href={`${destination ?? 'meet'}`}>
        OPEN THE APP
      </Button>
    </>
  ) : (
    <Stack height="90%" justifyContent="center" direction="column">
      <Title />
      <Typography margin="20px auto" width="70%" mb={5} textAlign="center" variant="body2">
        Please visit the app on your mobile phone or download it from the app store today.
      </Typography>
      <MobileGraphicContainer />
    </Stack>
  );
}

export default OpenInAppRedirect;
