import {useState} from 'react';
import {ConfirmDialog} from '../components';
import type {Props} from '../components/ConfirmDialog';

type ConfirmDialogProps = Partial<Omit<Props, 'open' | 'onClose' | 'onConfirm'>>;

const useConfirm = () => {
  const [promise, setPromise] = useState<{resolve: (confirmed: boolean) => void} | null>(null);
  const [confirmDialogProps, setConfirmDialogProps] = useState<ConfirmDialogProps>({});

  const confirm = (options: ConfirmDialogProps) => {
    setConfirmDialogProps(options);
    return new Promise((resolve) => {
      setPromise({resolve});
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  function ConfirmationDialog() {
    return (
      <ConfirmDialog
        {...confirmDialogProps}
        open={promise !== null}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    );
  }
  return {ConfirmationDialog, confirm};
};

export default useConfirm;
