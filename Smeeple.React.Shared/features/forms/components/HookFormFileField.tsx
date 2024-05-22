import type {TextFieldProps} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from 'react';
import {FieldValues, useController, UseControllerProps} from 'react-hook-form';
import {flow, split, last} from 'lodash/fp';

type Props<T extends FieldValues> = TextFieldProps &
  UseControllerProps<T> & {
    helperText?: string;
    displayValue?: string;
  };

// url format is
// var blobName = $"{folderType}/{Guid.NewGuid()}-{fileName}";
const getOriginalFileName = flow(split('/'), last, split('-'), last);

const toDisplayValue = (value: string | undefined) =>
  value === undefined ? 'No file selected.' : getOriginalFileName(value);

function HookFormFileField<T extends FieldValues>(props: Props<T>) {
  const {field} = useController(props);
  const [displayValue, setDisplayValue] = useState(toDisplayValue(props.displayValue));
  const {value} = field;

  // actual value
  useEffect(() => {
    if (value !== undefined) {
      const fileList = value as FileList;
      setDisplayValue(fileList[0].name);
    }
  }, [value]);

  // display value
  useEffect(() => {
    setDisplayValue(toDisplayValue(props.displayValue));
  }, [props.displayValue]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    field.onChange(e.target.files);
  };

  return (
    <TextField
      label={props.label}
      value={displayValue}
      InputLabelProps={{shrink: true}}
      InputProps={{
        endAdornment: (
          <Button component="label" sx={{ml: 1}}>
            Browse...
            <input hidden accept="image/*" type="file" onChange={handleChange} />
          </Button>
        ),
      }}
    />
  );
}

export default HookFormFileField;
