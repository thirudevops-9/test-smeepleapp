import {useState} from 'react';
import type {ButtonProps, DialogProps} from '@mui/material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

export type Props = {
  title?: string;
  message?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  ConfirmButtonProps?: Partial<Omit<ButtonProps, 'onClick'>>;
  CancelButtonProps?: Partial<Omit<ButtonProps, 'onClick'>>;
  DialogProps?: Partial<Omit<DialogProps, 'open' | 'onClose'>>;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  mustTypeText?: string;
};

function ConfirmDialog({
  open,
  message = 'Are you sure you want to complete this action?',
  title = 'Are you sure?',
  confirmButtonText: confirmText = 'Continue',
  cancelButtonText: cancelText = 'Cancel',
  onClose,
  onConfirm,
  ConfirmButtonProps = {},
  CancelButtonProps = {},
  DialogProps = {},
  mustTypeText,
}: Props) {
  const [typedText, setTypedText] = useState<string>('');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...DialogProps}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>

        {mustTypeText && (
          <>
            <DialogContentText sx={{fontSize: 15, mt: 2}}>
              Please type the following in the box below to confirm:
              <br /> {mustTypeText}
            </DialogContentText>
            <TextField value={typedText} onChange={(e) => setTypedText(e.target.value)} />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" {...CancelButtonProps}>
          {cancelText}
        </Button>
        <Button
          autoFocus
          color="primary"
          onClick={onConfirm}
          variant="contained"
          disabled={!!mustTypeText && mustTypeText !== typedText}
          {...ConfirmButtonProps}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
