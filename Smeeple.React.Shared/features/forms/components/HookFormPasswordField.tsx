import type {MouseEvent, MouseEventHandler, ReactNode} from 'react';
import {useState} from 'react';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import type {TextFieldProps} from '@mui/material';
import {IconButton, InputAdornment, TextField} from '@mui/material';
import {useController} from 'react-hook-form';
import type {FieldValues, UseControllerProps} from 'react-hook-form';

type OmittedProps = 'type' | 'InputProps';

type Props<T extends FieldValues> = Omit<TextFieldProps, OmittedProps> &
  UseControllerProps<T> & {
    helperText?: ReactNode;
  };

type ShowPasswordToggleProps = {
  showPassword: boolean;
  onClickShowPassword: MouseEventHandler<HTMLButtonElement>;
};

function ShowPasswordToggle({showPassword, onClickShowPassword}: ShowPasswordToggleProps) {
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();

  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={onClickShowPassword}
        onMouseDown={handleMouseDownPassword}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
}

function HookFormPasswordField<T extends FieldValues>({helperText, ...rest}: Props<T>) {
  const {
    field,
    fieldState: {error},
  } = useController(rest);

  const [showPassword, setShowPassword] = useState(false);

  const inputProps = {
    endAdornment: (
      <ShowPasswordToggle
        showPassword={showPassword}
        onClickShowPassword={() => setShowPassword(!showPassword)}
      />
    ),
  };

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      autoComplete="current-password"
      {...rest}
      {...field}
      error={error !== undefined}
      helperText={error?.message ?? helperText}
      InputProps={inputProps}
    />
  );
}

export default HookFormPasswordField;
