import type {ReactNode} from 'react';
import type {
  FormControlProps,
  InputLabelProps,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';
import {FormControl, FormHelperText, InputLabel, Select} from '@mui/material';
import {useController} from 'react-hook-form';
import type {FieldValues, UseControllerProps} from 'react-hook-form';

type Props<T extends FieldValues> = Pick<
  FormControlProps,
  'disabled' | 'fullWidth' | 'margin' | 'required' | 'size' | 'variant'
> &
  InputLabelProps &
  SelectProps &
  UseControllerProps<T> & {
    children: ReactNode;
    helperText?: string;
    onChange?: (event: SelectChangeEvent) => void;
  };

function HookFormSelect<T extends FieldValues>({
  children,
  disabled,
  fullWidth,
  helperText,
  id,
  label,
  margin,
  onChange: onChangeExternal,
  required,
  size,
  variant,
  ...rest
}: Props<T>) {
  const {
    field: {onChange, ...fieldProps},
    fieldState: {error},
  } = useController(rest);

  const displayError = Boolean(error?.message);
  const labelId = `${id}-label`;

  return (
    <FormControl
      disabled={disabled}
      error={displayError}
      fullWidth={fullWidth}
      margin={margin}
      required={required}
      size={size}
      variant={variant}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        {...rest}
        {...fieldProps}
        label={label}
        onChange={(e) => {
          onChange(e);
          if (onChangeExternal) onChangeExternal(e);
        }}
      >
        {children}
      </Select>

      <FormHelperText>{error?.message ?? helperText}</FormHelperText>
    </FormControl>
  );
}

export default HookFormSelect;
