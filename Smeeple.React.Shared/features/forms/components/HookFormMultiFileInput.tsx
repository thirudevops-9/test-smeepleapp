import {useCallback, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {flow, last, split} from 'lodash/fp';
import type {Accept, FileRejection} from 'react-dropzone';
import {useDropzone} from 'react-dropzone';
import {useFormContext} from 'react-hook-form';
import {v4 as uuidv4} from 'uuid';
import MultiFileInputDocument from '../../shared/components/MultiFileInputDocument';
import type {ExistingFile, NewFile, NewOrExistingFile} from '../../shared/types';

export type Props = {
  name: string;
  disabled?: boolean;
  deps?: string[];
  accept?: Accept;
  maxFiles?: number;
  maxSize?: number;
};

const getFileName = flow(split('/'), last, split('-'), last);

function HookFormMultiFileInput({
  accept,
  deps = [],
  disabled,
  name,
  maxFiles = 10,
  maxSize,
}: Props) {
  const {setValue, trigger, watch} = useFormContext();
  const files = (watch(name) || []) as NewOrExistingFile[];
  const [lastDropFileRejections, setLastDropFileRejections] = useState<FileRejection[]>([]);
  const maxLeft = maxFiles - (files?.length || 0);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setLastDropFileRejections(fileRejections || []);
      const newFilesList = [
        ...files,
        ...acceptedFiles.map(
          (af): NewFile => ({
            type: 'new',
            file: af,
            fileName: getFileName(af.name) || '',
            tempId: uuidv4(),
          }),
        ),
      ];
      setValue(name, newFilesList, {shouldValidate: true});
      trigger(deps);
    },
    [setValue, name, files, trigger, deps],
  );

  const {getRootProps, getInputProps} = useDropzone({
    accept,
    disabled,
    multiple: true,
    maxFiles: maxLeft,
    maxSize,
    onDrop,
  });

  const handleRemoveNewFile = (newFile: NewFile) => () => {
    setValue(
      name,
      files.filter((f) => f.type !== 'new' || f.tempId !== newFile.tempId),
      {shouldValidate: true},
    );
  };

  const handleRemoveExistingFile = (existingFile: ExistingFile) => () => {
    setValue(
      name,
      files.filter((f) => f.type !== 'existing' || f.id !== existingFile.id),
      {shouldValidate: true},
    );
  };

  const newFiles = files.filter((f) => f.type === 'new') as NewFile[];
  const existingFiles = files.filter((f) => f.type === 'existing') as ExistingFile[];

  const fileRejectionItems = lastDropFileRejections.map(({file, errors}) => (
    <li key={file.name}>
      <Typography variant="body2">
        {file.name} - {file.size} bytes
      </Typography>
      <ul>
        {errors.map((e) => (
          <li key={e.code}>
            <Typography variant="body2">{e.message}</Typography>
          </li>
        ))}
      </ul>
    </li>
  ));

  return (
    <Box>
      {maxLeft > 0 && (
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.secondary.light,
            borderRadius: 1,
            border: `1px dashed ${theme.palette.secondary.dark}`,
            textAlign: 'center',
            padding: 3,
            cursor: 'pointer',
            opacity: disabled ? 0.5 : 'unset',
          })}
          {...getRootProps({className: 'dropzone'})}
        >
          <input {...getInputProps()} />

          <Typography sx={(theme) => ({color: theme.palette.secondary.dark})}>
            Drop file here or click to upload
          </Typography>

          {maxLeft > 0 && (
            <Typography variant="body2">
              You may upload up to {maxLeft}
              {maxLeft < maxFiles ? ' more' : ''}.
            </Typography>
          )}
        </Box>
      )}

      {!!fileRejectionItems.length && (
        <Box my={2}>
          <Typography variant="h6">Rejected files</Typography>
          <ul>{fileRejectionItems}</ul>
        </Box>
      )}

      {maxLeft === 0 && (
        <Typography variant="body2">
          You have reached the maximum number of documents. To add another, please remove an
          existing document below.
        </Typography>
      )}

      <Box mt={3}>
        <Box display="flex" flexWrap="wrap">
          {newFiles.map((nf) => (
            <MultiFileInputDocument
              key={nf.tempId}
              fileName={nf.file.name}
              onRemoveClicked={handleRemoveNewFile(nf)}
              disabled={disabled}
            />
          ))}
          {existingFiles.map((ef) => (
            <MultiFileInputDocument
              key={ef.id}
              fileName={ef.fileName}
              onRemoveClicked={handleRemoveExistingFile(ef)}
              disabled={disabled}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default HookFormMultiFileInput;
