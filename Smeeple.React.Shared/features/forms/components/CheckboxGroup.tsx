import type {ReactNode} from 'react';
import type {FormControlProps, FormGroupProps} from '@mui/material';
import {FormControl, FormLabel, FormGroup, FormHelperText} from '@mui/material';

type Props = Pick<FormControlProps, 'disabled' | 'fullWidth' | 'margin' | 'required'> &
  Pick<FormGroupProps, 'row'> & {
    children: ReactNode;
    error?: string;
    helperText?: ReactNode;
    label?: ReactNode;
  };

export default function CheckboxGroup({
  children,
  disabled,
  error,
  fullWidth,
  helperText,
  label,
  margin,
  required,
  row,
}: Props) {
  return (
    <FormControl
      component="fieldset"
      disabled={disabled}
      error={Boolean(error)}
      fullWidth={fullWidth}
      margin={margin}
      required={required}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row={row}>{children}</FormGroup>
      <FormHelperText>{error ?? helperText}</FormHelperText>
    </FormControl>
  );
}
