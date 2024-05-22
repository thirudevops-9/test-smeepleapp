import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Stack, Typography} from '@mui/material';
import {useSnackbar} from 'notistack';
import {FormProvider, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {z} from 'zod';
import {handleHookFormSubmitError} from '../../../util';
import {FormSubmitBar, HookFormTextField} from '../../forms/components';
import {useFirebaseAuth} from '../hooks';

const schema = z.object({
  email: z.string().min(1, {message: 'Email is required'}).max(256).email(),
});

type FormValues = z.infer<typeof schema>;

type ForgotPasswordFormProps = {
  isSubmitting: boolean;
  onSubmit: () => Promise<void>;
};

const useForgotPassword = () => {
  const {enqueueSnackbar} = useSnackbar();
  const {sendPasswordResetEmail} = useFirebaseAuth();
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    defaultValues: {email: ''},
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });
  const {handleSubmit, setError} = form;

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      await sendPasswordResetEmail(formValues.email);

      enqueueSnackbar('Email sent', {variant: 'success'});
    } catch (error) {
      handleHookFormSubmitError<FormValues>({
        error,
        setError,
        enqueueSnackbar,
        redirect: navigate,
      });
    }
  });

  return {form, onSubmit};
};

function SubmittedForm() {
  const navigate = useNavigate();

  return (
    <Stack rowGap={2}>
      <Typography variant="h5">Email Sent!</Typography>
      <Typography variant="body2">
        Check your inbox for the email containing the link to reset your password. If you did not
        receive an email, check your spam folder.
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate('/sign-in');
        }}
      >
        Return to Login
      </Button>
    </Stack>
  );
}

function ForgotPasswordForm({isSubmitting, onSubmit}: ForgotPasswordFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <HookFormTextField name="email" type="email" autoFocus label="Email" />
      <FormSubmitBar submitting={isSubmitting} cancelTo="/sign-in" />
    </form>
  );
}

function ForgotPasswordPage() {
  const {form, onSubmit} = useForgotPassword();
  const {
    formState: {isSubmitting, isSubmitSuccessful},
  } = form;

  if (isSubmitSuccessful) {
    return <SubmittedForm />;
  }

  return (
    <Stack rowGap={2}>
      <Typography variant="h5">Forgot Password</Typography>
      <Typography variant="body2">
        Enter your email address, click the submit button, and we will send you a link to reset your
        password.
      </Typography>
      <FormProvider {...form}>
        <ForgotPasswordForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
      </FormProvider>
    </Stack>
  );
}

export default ForgotPasswordPage;
