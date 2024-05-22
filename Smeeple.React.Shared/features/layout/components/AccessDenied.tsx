import {Box, Button, Typography} from '@mui/material';
import {LockOutlined} from '@mui/icons-material';
import {Link as RouterLink} from 'react-router-dom';

function AccessDenied() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{height: '100vh', maxWidth: '550px', marginLeft: 'auto', marginRight: 'auto'}}
    >
      <Box marginBottom={3} style={{textAlign: 'center'}}>
        <LockOutlined style={{fontSize: 72}} />
      </Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Page Access Forbidden
      </Typography>
      <Typography variant="h5" component="div" align="center" sx={{color: 'text.primary'}}>
        It looks like you don&#39;t have the correct permissions to access this page. If this seems
        like an error, please contact your administrator.
      </Typography>
      <Box sx={{marginTop: 4, display: 'flex', gap: 2}}>
        <Button variant="contained" color="secondary" component={RouterLink} to="/">
          Back to Application
        </Button>
        <Button variant="contained" color="secondary" component={RouterLink} to="/sign-out">
          Sign Out
        </Button>
      </Box>
    </Box>
  );
}

export default AccessDenied;
