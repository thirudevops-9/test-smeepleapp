import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import type {DatePickerProps} from '@mui/x-date-pickers/DatePicker';

import {TextField} from '@mui/material';
import {useController} from 'react-hook-form';
import type {FieldValues, UseControllerProps} from 'react-hook-form';

type Props<T extends FieldValues, TInputDate, TDate> = Omit<
  DatePickerProps<TInputDate, TDate>,
  'onChange' | 'value' | 'renderInput'
> &
  UseControllerProps<T> & {
    helperText?: string;
  };

function HookFormDatePicker<T extends FieldValues, TInputDate, TDate>({
  helperText,
  ...rest
}: Props<T, TInputDate, TDate>) {
  const {
    field: {onBlur, onChange, ref, value},
    fieldState: {error},
  } = useController(rest);

  return (
    <DatePicker
      {...rest}
      onChange={onChange}
      ref={ref}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          name={rest.name}
          onBlur={onBlur}
          error={Boolean(error)}
          helperText={error?.message ?? helperText}
        />
      )}
    />
  );
}

export default HookFormDatePicker;
