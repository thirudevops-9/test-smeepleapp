import {Box, CircularProgress, Fade, Grid} from '@mui/material';

export default function Loading() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <Box marginTop={2}>
          <Fade in style={{transitionDelay: '800ms'}} unmountOnExit>
            <CircularProgress />
          </Fade>
        </Box>
      </Grid>
    </Grid>
  );
}
