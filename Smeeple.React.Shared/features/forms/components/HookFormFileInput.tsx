import {useCallback} from 'react';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import {flow, last, split} from 'lodash/fp';
import {useSnackbar} from 'notistack';
import type {Accept, FileRejection} from 'react-dropzone';
import {useDropzone} from 'react-dropzone';
import {useFormContext} from 'react-hook-form';

type Props = {
  name: string;
  disabled?: boolean;
  deps?: string[];
  accept?: Accept;
  maxSize?: number;
  minSize?: number;
  onDropped?: () => void;
};

const getFileName = flow(split('/'), last, split('-'), last);

const getDisplayValue = (value: string | File) => {
  if (value instanceof File) {
    return value.name;
  }

  return getFileName(value);
};

function HookFormFileInput({
  accept,
  deps = [],
  disabled,
  name,
  maxSize,
  minSize,
  onDropped,
}: Props) {
  const {enqueueSnackbar} = useSnackbar();
  const {setValue, trigger, watch} = useFormContext();
  const value = watch(name);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0 && fileRejections[0].errors[0].code === 'file-too-large')
        enqueueSnackbar('Image is too large!', {variant: 'error'});
      if (fileRejections.length > 0 && fileRejections[0].errors[0].code === 'file-too-small')
        enqueueSnackbar('Image is too small!', {variant: 'error'});
      setValue(name, acceptedFiles[0], {shouldValidate: true, shouldDirty: true});
      trigger(deps);
      if (onDropped && acceptedFiles[0]) onDropped();
    },
    [enqueueSnackbar, setValue, name, trigger, deps, onDropped],
  );

  const {getRootProps, getInputProps} = useDropzone({
    accept,
    disabled,
    multiple: false,
    minSize,
    maxSize,
    onDrop,
  });

  const displayValue = getDisplayValue(value);

  return (
    <Box>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.secondary.light,
          borderRadius: 1,
          border: `1px dashed ${theme.palette.secondary.dark}`,
          textAlign: 'center',
          padding: 3,
          opacity: disabled ? 0.5 : 'unset',
        })}
        {...getRootProps({className: 'dropzone'})}
      >
        <input {...getInputProps()} />

        <Typography sx={(theme) => ({color: theme.palette.secondary.dark})}>
          Drop file here or click to upload
        </Typography>
      </Box>
      <FormHelperText>{displayValue}</FormHelperText>
    </Box>
  );
}

export default HookFormFileInput;
