import {Box, Container, Paper} from '@mui/material';
import {Outlet} from 'react-router-dom';

export default function AccountManagementPage() {
  return (
    <Container maxWidth="sm">
      <Box marginTop={5}>
        <Paper>
          <Box padding={3}>
            <Outlet />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
