import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Link, Stack, Typography} from '@mui/material';
import {FirebaseError} from 'firebase/app';
import {AuthErrorCodes} from 'firebase/auth';
import {useSnackbar} from 'notistack';
import {FormProvider, useForm} from 'react-hook-form';
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import {z} from 'zod';
import {EnqueueSnackbarVariant} from '../../../util/types';
import {
  HookFormHiddenField,
  HookFormPasswordField,
  HookFormTextField,
} from '../../forms/components';
import {useFirebaseAuth} from '../hooks';
import {NotAllowedError} from './FirebaseAuthProvider';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
  returnUrl: z.string().optional(),
  serverError: z.string().optional(), // Do we need this?
});

type FormValues = z.infer<typeof schema>;

const useSignIn = () => {
  const {signIn} = useFirebaseAuth();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const queryString = new URLSearchParams(useLocation().search);
  const qsReturnUrl = queryString.get('returnUrl');
  const returnUrl = qsReturnUrl !== '/sign-in' ? qsReturnUrl : null;
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      returnUrl: returnUrl || '',
    },
    resolver: zodResolver(schema),
  });
  const showErrorToast = (message: string) =>
    enqueueSnackbar(message, {variant: EnqueueSnackbarVariant.Error});

  const onSubmit = form.handleSubmit(async (formValues) => {
    try {
      await signIn(formValues.email, formValues.password);
      navigate(formValues.returnUrl || '/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
          showErrorToast('Incorrect email or password.');
        } else if (error.code === AuthErrorCodes.USER_DELETED) {
          showErrorToast('Incorrect email or password.');
        } else {
          showErrorToast(error.message);
        }
      } else if (error instanceof NotAllowedError) {
        enqueueSnackbar(error.message, {
          variant: 'error',
          action: error.action,
        });
      } else {
        showErrorToast('Unable to sign in.');
      }
    }
  });

  return {form, onSubmit};
};

interface Props {
  showSignUpLink: boolean;
}

function SignInForm({showSignUpLink}: Props) {
  const {form, onSubmit} = useSignIn();
  const {
    formState: {isSubmitting},
  } = form;

  return (
    <FormProvider {...form}>
      <Stack component="form" onSubmit={onSubmit} noValidate sx={{rowGap: 2}}>
        <HookFormHiddenField name="returnUrl" />
        <HookFormTextField
          type="email"
          name="email"
          label="Email"
          margin="normal"
          autoFocus
          required
          fullWidth
          sx={{my: 0}}
        />
        <HookFormPasswordField
          name="password"
          label="Password"
          margin="normal"
          required
          fullWidth
          sx={{my: 0}}
        />
        <Link component={RouterLink} to="/forgot-password" sx={{maxWidth: 'max-content'}}>
          Forgot password?
        </Link>
        <Button
          type="submit"
          size="large"
          color="primary"
          variant="contained"
          disabled={isSubmitting}
          fullWidth
          sx={(theme) => ({
            margin: `${theme.spacing(2)} 0`,
          })}
        >
          Sign In
        </Button>
        {showSignUpLink && (
          <Typography>
            Don&apos;t have an expert account?{' '}
            <Link component={RouterLink} to="/experts/create-account">
              Sign Up
            </Link>
          </Typography>
        )}
      </Stack>
    </FormProvider>
  );
}

export default SignInForm;
