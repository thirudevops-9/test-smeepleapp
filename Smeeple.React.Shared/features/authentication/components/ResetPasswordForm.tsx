import {zodResolver} from '@hookform/resolvers/zod';
import {useSnackbar} from 'notistack';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {z} from 'zod';
import {handleHookFormSubmitError} from '../../../util';
import {FormSubmitBar, HookFormPasswordField} from '../../forms/components';

type Props = {
  resetPassword: ResetPasswordCallback;
};

type ResetPasswordCallback = (newPassword: string) => Promise<void>;

const schema = z.object({
  newPassword: z.string().min(8).max(256), // TODO determine password requirements
});

type FormValues = z.infer<typeof schema>;

const usePasswordReset = (resetPassword: ResetPasswordCallback) => {
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      newPassword: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      await resetPassword(formValues.newPassword);
      enqueueSnackbar('Password reset.', {variant: 'success'});
      navigate('/reset-password-success');
    } catch (error) {
      handleHookFormSubmitError<FormValues>({
        error,
        setError,
        enqueueSnackbar,
        redirect: navigate,
      });
    }
  });

  return {control, onSubmit, isSubmitting};
};

function ResetPasswordForm({resetPassword}: Props) {
  const {control, onSubmit, isSubmitting} = usePasswordReset(resetPassword);

  return (
    <form onSubmit={onSubmit} noValidate>
      <HookFormPasswordField
        control={control}
        name="newPassword"
        autoComplete="new-password"
        required
        label="Password"
      />
      <FormSubmitBar buttonText="Reset Password" submitting={isSubmitting} cancelTo="/sign-in" />
    </form>
  );
}

export default ResetPasswordForm;
