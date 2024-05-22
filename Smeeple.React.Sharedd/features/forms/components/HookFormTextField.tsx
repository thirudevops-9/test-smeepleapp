/* eslint-disable react/jsx-no-duplicate-props */
import type {TextFieldProps} from '@mui/material';
import {TextField} from '@mui/material';
import {useController, useFormContext} from 'react-hook-form';
import type {FieldValues, UseControllerProps} from 'react-hook-form';

type Props<T extends FieldValues> = TextFieldProps &
  UseControllerProps<T> & {
    helperText?: string;
  } & {
    deps?: string[];
  };

function HookFormTextField<T extends FieldValues>({helperText, onChange, deps, ...rest}: Props<T>) {
  const {trigger} = useFormContext();
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
      onChange={(e) => {
        field.onChange(e);

        if (onChange) {
          onChange(e);
        }

        if (deps) {
          trigger(deps);
        }
      }}
    />
  );
}

export default HookFormTextField;
