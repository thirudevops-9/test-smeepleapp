import type {TextFieldProps} from '@mui/material';
import {TextField, useMediaQuery} from '@mui/material';
import type {DesktopTimePickerProps} from '@mui/x-date-pickers';
import {DesktopTimePicker} from '@mui/x-date-pickers';
import {useController} from 'react-hook-form';
import type {FieldValues, UseControllerProps} from 'react-hook-form';

type Props<T extends FieldValues, TInputDate, TDate> = UseControllerProps<T> & {
  DesktopTimePickerProps?: Omit<
    DesktopTimePickerProps<TInputDate, TDate>,
    'value' | 'onChange' | 'renderInput'
  >;
  TextFieldProps?: TextFieldProps;
  helperText?: string;
  onChanged?: DesktopTimePickerProps<TInputDate, TDate>['onChange'];
};

function HookFormDesktopTimePicker<T extends FieldValues, TInputDate, TDate>({
  helperText,
  DesktopTimePickerProps = {},
  TextFieldProps = {},
  onChanged,
  ...rest
}: Props<T, TInputDate, TDate>) {
  const {
    field: {onBlur, onChange, ref, value},
    fieldState: {error},
  } = useController(rest);

  return (
    <DesktopTimePicker
      {...DesktopTimePickerProps}
      onChange={(...args) => {
        onChange(...args);
        if (onChanged) onChanged(...args);
      }}
      ref={ref}
      value={value}
      renderInput={(params) => (
        <TextField
          {...TextFieldProps}
          {...params}
          InputProps={{
            ...TextFieldProps.InputProps,
            ...params.InputProps,
            sx: TextFieldProps.InputProps?.sx,
          }}
          name={rest.name}
          onBlur={onBlur}
          error={Boolean(error)}
          helperText={error?.message ?? helperText}
        />
      )}
    />
  );
}

export default HookFormDesktopTimePicker;
