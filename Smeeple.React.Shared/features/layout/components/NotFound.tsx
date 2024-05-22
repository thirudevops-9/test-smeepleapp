import {Box, Button, Typography} from '@mui/material';
import {NotListedLocationOutlined} from '@mui/icons-material';
import {Link as RouterLink} from 'react-router-dom';

function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{height: '100vh', maxWidth: '550px', marginLeft: 'auto', marginRight: 'auto'}}
    >
      <Box marginBottom={3} style={{textAlign: 'center'}}>
        <NotListedLocationOutlined style={{fontSize: 72}} />
      </Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="h5" component="div" align="center" sx={{color: 'text.primary'}}>
        The link to this page may be broken, or the page may have been removed.
      </Typography>
      <Box marginTop={4}>
        <Button variant="contained" color="secondary" component={RouterLink} to="/">
          Back to Application
        </Button>
      </Box>
    </Box>
  );
}

export default NotFound;
