import React, { forwardRef } from 'react';

import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import useGlobalState from '../useGlobalState';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PopUp = () => {
  // Global States
  const [dialog, setDialog] = useGlobalState('dialog');

  const handleClose = () => {
    setDialog({
      ...dialog,
      isVisible: false,
    });
  };

  return (
    <Dialog
      open={dialog.isVisible}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="popup-container">Waiting for player X to do Y.</div>
    </Dialog>
  );
};

export default PopUp;
