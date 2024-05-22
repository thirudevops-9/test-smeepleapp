import type {ReactNode} from 'react';
import type {AutocompleteProps, FormControlProps, SelectChangeEvent} from '@mui/material';
import {Autocomplete, TextField} from '@mui/material';
import {useController} from 'react-hook-form';
import type {FieldValues, UseControllerProps} from 'react-hook-form';

type Props<
  TFieldValues extends FieldValues,
  TValue,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = Pick<FormControlProps, 'disabled' | 'fullWidth' | 'margin' | 'required' | 'size' | 'variant'> &
  UseControllerProps<TFieldValues> &
  Omit<AutocompleteProps<TValue, Multiple, DisableClearable, FreeSolo>, 'renderInput' | 'value'> & {
    helperText?: string;
    onChanged?: AutocompleteProps<TValue, Multiple, DisableClearable, FreeSolo>['onChange'];
    label: string;
  };

function HookFormAutocomplete<
  TFieldValues extends FieldValues,
  TValue,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  disabled,
  fullWidth,
  helperText,
  id,
  label,
  margin,
  onChange: onChangeExternal,
  required,
  variant,
  size,
  onChanged,
  ...rest
}: Props<TFieldValues, TValue, Multiple, DisableClearable, FreeSolo>) {
  const {
    field: {onChange, ...fieldProps},
  } = useController(rest);

  return (
    <Autocomplete
      {...rest}
      {...fieldProps}
      onChange={(...args) => {
        onChange(args[1]);
        if (onChanged) onChanged(...args);
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant={variant} size={size} />
      )}
    />
  );
}

export default HookFormAutocomplete;
