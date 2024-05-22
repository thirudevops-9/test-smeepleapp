import {Button, CircularProgress, Fade, Link, Stack} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';

type Props = {
  submitting: boolean;
  buttonText?: string;
  cancelTo?: string;
};

function Progress() {
  return (
    <Fade in style={{transitionDelay: '800ms'}} unmountOnExit>
      <CircularProgress size={18} />
    </Fade>
  );
}

function FormSubmitBar({submitting, cancelTo, buttonText}: Props) {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={(theme) => ({marginTop: theme.spacing(2)})}
      rowGap={1}
    >
      {submitting && <Progress />}
      <Button
        sx={{width: '100%'}}
        type="submit"
        color="primary"
        variant="contained"
        disabled={submitting}
      >
        {buttonText || 'Submit'}
      </Button>
      {cancelTo && (
        <Link component={RouterLink} to={cancelTo} sx={{alignSelf: 'flex-start'}}>
          Cancel
        </Link>
      )}
    </Stack>
  );
}

export default FormSubmitBar;
