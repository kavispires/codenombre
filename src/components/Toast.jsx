import React, { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import useGlobalState from '../useGlobalState';

const Toast = () => {
  // Global States
  const [toast, setToast] = useGlobalState('toast');

  const handleClose = () => {
    setToast({
      ...toast,
      isVisible: false,
    });
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={toast.isVisible}
      autoHideDuration={6000}
      onClose={handleClose}
      message={toast.message}
      action={
        <Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Fragment>
      }
    />
  );
};

export default Toast;
