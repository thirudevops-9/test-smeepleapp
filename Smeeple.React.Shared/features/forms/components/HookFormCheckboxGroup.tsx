import {useCallback} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import {useTheme} from '@mui/material/styles';
import type {SxProps, Theme} from '@mui/material';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import {MIDNIGHT_BLUE} from '../../../styles/theme';

type Option<T> = {
  disabled?: boolean;
  key: string | number;
  label: string;
  value: T;
};

type Props<T> = {
  disabled?: boolean;
  helperText?: string;
  label: string;
  name: string;
  options: Option<T>[];
  required?: boolean;
  sx?: SxProps<Theme> | undefined;
};

function HookFormCheckboxGroup<T>({
  disabled,
  helperText,
  label,
  name,
  options,
  required,
  sx,
}: Props<T>) {
  const {
    formState: {errors},
    control,
    watch,
  } = useFormContext();
  const theme = useTheme();
  const handleCheckboxChanged = useCallback(
    (checkedValue: T) => {
      const currentValues = watch(name) || [];
      return currentValues.includes(checkedValue)
        ? currentValues.filter((val: T) => val !== checkedValue)
        : [...currentValues, checkedValue];
    },
    [watch, name],
  );

  const error = errors[name];
  const displayError = Boolean(error?.message);
  return (
    <FormControl component="fieldset" error={displayError} disabled={disabled} sx={sx}>
      <FormLabel required={required}>{label}</FormLabel>
      {Boolean(helperText) && <FormHelperText error={false}>{helperText}</FormHelperText>}
      <FormGroup>
        <Controller
          name={name}
          control={control}
          render={({field: {onChange, value}}) => (
            <>
              {options.map((opt) => (
                <FormControlLabel
                  key={opt.key}
                  label={opt.label}
                  disabled={opt.disabled}
                  sx={{
                    color: displayError ? theme.palette.error.main : MIDNIGHT_BLUE,
                  }}
                  control={
                    <Checkbox
                      icon={
                        <CheckBoxOutlineBlankRoundedIcon
                          color={displayError ? 'error' : 'inherit'}
                        />
                      }
                      checkedIcon={<CheckBoxTwoToneIcon />}
                      onChange={() => onChange(handleCheckboxChanged(opt.value))}
                      checked={value.includes(opt.value)}
                    />
                  }
                />
              ))}
            </>
          )}
        />
      </FormGroup>
      {displayError && <FormHelperText>{(error?.message as string) || ''}</FormHelperText>}
    </FormControl>
  );
}

export default HookFormCheckboxGroup;
