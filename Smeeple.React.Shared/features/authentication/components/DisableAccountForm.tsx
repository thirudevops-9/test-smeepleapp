import {zodResolver} from '@hookform/resolvers/zod';
import {useSnackbar} from 'notistack';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {z} from 'zod';
import {handleHookFormSubmitError, post} from '../../../util';
import {FormSubmitBar, HookFormHiddenField} from '../../forms/components';

type Props = {
  userId: string | null;
  token: string | null;
  onSuccess: () => void;
};

const schema = z.object({
  userId: z.string().min(1),
  token: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

const useDisableAccount = (userId: string | null, token: string | null, onSuccess: () => void) => {
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const {
    control,
    handleSubmit,
    setError,
    formState: {isSubmitting},
  } = useForm<FormValues>({
    defaultValues: {
      userId: userId ?? '',
      token: token ?? '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      await post('authentication/disable-account', formValues);

      enqueueSnackbar('Account successfully disabled', {variant: 'success'});
      onSuccess();
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

function DisableAccountForm({userId, token, onSuccess}: Props) {
  const {control, onSubmit, isSubmitting} = useDisableAccount(userId, token, onSuccess);

  return (
    <form onSubmit={onSubmit} noValidate>
      <HookFormHiddenField control={control} name="userId" />
      <HookFormHiddenField control={control} name="token" />
      <FormSubmitBar submitting={isSubmitting} cancelTo="/sign-in" buttonText="Confirm" />
    </form>
  );
}

export default DisableAccountForm;
