import {Box, Button, Divider, Stack, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import SuccessImage from '../../../assets/PasswordResetSuccess.svg';

function ResetPasswordSuccessPage() {
  const navigate = useNavigate();

  return (
    <Stack rowGap={2}>
      <Typography variant="h5">Password Has Been Reset Successfully</Typography>
      <Box
        component="img"
        src={SuccessImage}
        alt="Success"
        role="presentation"
        sx={{width: '60%', alignSelf: 'center', my: 4, marginLeft: '-20px'}}
      />

      <Button component="a" variant="contained" href="smeeple://sign-in">
        Open the app
      </Button>
      <Divider variant="fullWidth" sx={{'&::before, &::after': {top: 0}}}>
        or
      </Divider>
      <Button
        variant="contained"
        onClick={() => {
          navigate('/sign-in');
        }}
      >
        Sign in as expert
      </Button>
    </Stack>
  );
}

export default ResetPasswordSuccessPage;
