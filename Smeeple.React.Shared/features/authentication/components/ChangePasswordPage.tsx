import {Typography} from '@mui/material';
import ChangePasswordForm from './ChangePasswordForm';

function ChangePasswordPage() {
  return (
    <>
      <Typography variant="h5">Change Password</Typography>
      <Typography variant="body2">Enter your new password and click Submit.</Typography>
      <ChangePasswordForm />
    </>
  );
}

export default ChangePasswordPage;
