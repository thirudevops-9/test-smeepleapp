import type {CheckboxProps} from '@mui/material';
import {Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel} from '@mui/material';
import type {FieldValues, UseControllerProps} from 'react-hook-form';
import {useController} from 'react-hook-form';

type Props<T extends FieldValues> = CheckboxProps &
  UseControllerProps<T> & {
    color?: 'primary' | 'secondary' | 'default';
    label?: React.ReactNode;
  };

function HookFormCheckbox<T extends FieldValues>({label, ...rest}: Props<T>) {
  const {
    field: {value, ...fieldProps},
    fieldState: {error},
  } = useController<T>(rest);
  const hasError = error !== undefined;
  const checkbox = <Checkbox {...rest} {...fieldProps} checked={value} />;

  return label ? (
    <FormControl error={hasError} onClick={() => fieldProps.onChange({target: {value: !value}})}>
      <FormControlLabel
        sx={{alignItems: 'flex-start'}}
        control={checkbox}
        label={<FormLabel sx={{top: '4px', cursor: 'pointer'}}>{label}</FormLabel>}
      />

      {hasError ? <FormHelperText>{error.message}</FormHelperText> : null}
    </FormControl>
  ) : (
    checkbox
  );
}

export default HookFormCheckbox;
