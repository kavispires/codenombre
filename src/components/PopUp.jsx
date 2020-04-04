import React, { forwardRef, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import Zoom from '@material-ui/core/Zoom';

import useGlobalState from '../useGlobalState';

let closePopUpTimer;

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom direction="up" ref={ref} {...props} />;
});

const PopUp = () => {
  // Global States
  const [dialog, setDialog] = useGlobalState('dialog');

  const handleClose = () => {
    setDialog({
      ...dialog,
      isVisible: false,
    });
    clearTimeout(closePopUpTimer);
  };

  useEffect(() => {
    if (dialog.isVisible) {
      closePopUpTimer = setTimeout(() => {
        setDialog({
          ...dialog,
          isVisible: false,
        });
      }, 5000);
    }
  }, [dialog, setDialog]);

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
      <div className="popup-timeleft">
        <span className="popup-timeleft__bar"></span>
      </div>
    </Dialog>
  );
};

export default PopUp;
