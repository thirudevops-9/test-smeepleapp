/* eslint-disable react/jsx-no-duplicate-props */
import type {TextFieldProps} from '@mui/material';
import {TextField} from '@mui/material';
import {useController} from 'react-hook-form';
import type {FieldValues, UseControllerProps} from 'react-hook-form';
import IntegerInput from './IntegerInput';

type Props<T extends FieldValues> = TextFieldProps &
  UseControllerProps<T> & {
    helperText?: string;
  };

function HookFormIntegerInput<T extends FieldValues>({helperText, ...rest}: Props<T>) {
  const {
    field,
    fieldState: {error},
  } = useController(rest);

  const hasError = error !== undefined;

  return (
    <TextField
      {...rest}
      {...field}
      helperText={error?.message ?? helperText}
      error={hasError}
      InputProps={{
        inputComponent: IntegerInput as any,
      }}
    />
  );
}

export default HookFormIntegerInput;
