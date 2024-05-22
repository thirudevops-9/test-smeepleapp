import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useSnackbar} from 'notistack';
import {handleHookFormSubmitError, post} from '../../../util';
import {FormSubmitBar, HookFormPasswordField} from '../../forms/components';

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(50),
});

type FormValues = z.infer<typeof schema>;

const useChangePassword = () => {
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const {
    control,
    handleSubmit,
    setError,
    formState: {isSubmitting},
  } = useForm<FormValues>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      await post('authentication/change-password', formValues);
      enqueueSnackbar('Password successfully changed', {variant: 'success'});
      navigate('/');
    } catch (error) {
      handleHookFormSubmitError<FormValues>({
        error,
        setError,
        enqueueSnackbar,
        redirect: navigate,
      });
    }
  });

  return {onSubmit, control, isSubmitting};
};

function ChangePasswordForm() {
  const {control, isSubmitting, onSubmit} = useChangePassword();

  return (
    <form onSubmit={onSubmit} noValidate>
      <HookFormPasswordField
        control={control}
        name="currentPassword"
        required
        label="Current Password"
      />
      <HookFormPasswordField control={control} name="newPassword" required label="Password" />
      <FormSubmitBar submitting={isSubmitting} cancelTo="/sign-in" />
    </form>
  );
}

export default ChangePasswordForm;
