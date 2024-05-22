import {Box, Button, Typography} from '@mui/material';
import {ErrorOutline} from '@mui/icons-material';

import {Link as RouterLink} from 'react-router-dom';

function SystemError() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{height: '100vh', maxWidth: '550px', marginLeft: 'auto', marginRight: 'auto'}}
    >
      <Box marginBottom={3} style={{textAlign: 'center'}}>
        <ErrorOutline style={{fontSize: 72}} />
      </Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Something Went Wrong
      </Typography>
      <Typography variant="h5" component="div" align="center" sx={{color: 'text.primary'}}>
        It looks like something went wrong. Please return to the application and try your request
        again.
      </Typography>
      <Box marginTop={4}>
        <Button variant="contained" color="secondary" component={RouterLink} to="/">
          Back to Application
        </Button>
      </Box>
    </Box>
  );
}

export default SystemError;
