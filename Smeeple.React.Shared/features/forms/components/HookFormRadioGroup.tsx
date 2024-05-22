import type {ReactNode} from 'react';
import type {FormControlProps, FormLabelProps, RadioGroupProps} from '@mui/material';
import {FormControl, FormLabel, RadioGroup, FormHelperText} from '@mui/material';
import {useController} from 'react-hook-form';
import type {FieldValues, UseControllerProps} from 'react-hook-form';

type Props<T extends FieldValues> = Pick<
  FormControlProps,
  'disabled' | 'fullWidth' | 'margin' | 'required'
> &
  FormLabelProps &
  Pick<RadioGroupProps, 'row'> &
  UseControllerProps<T> & {
    children: ReactNode;
    label?: ReactNode;
    helperText?: string;
    row?: boolean;
  };

function HookFormRadioGroup<T extends FieldValues>({
  children,
  disabled,
  fullWidth,
  helperText,
  label,
  margin,
  required,
  row,
  ...rest
}: Props<T>) {
  const {
    field,
    fieldState: {error},
  } = useController(rest);

  const displayError = Boolean(error?.message);

  return (
    <FormControl
      component="fieldset"
      disabled={disabled}
      error={displayError}
      fullWidth={fullWidth}
      margin={margin}
      required={required}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup row={row} {...field}>
        {children}
      </RadioGroup>
      <FormHelperText>{error?.message ?? helperText}</FormHelperText>
    </FormControl>
  );
}

export default HookFormRadioGroup;
