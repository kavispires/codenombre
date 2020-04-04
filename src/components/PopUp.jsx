import React, { forwardRef, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Zoom from '@material-ui/core/Zoom';
import { green } from '@material-ui/core/colors';

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
      isVisible: false,
    });
    clearTimeout(closePopUpTimer);
  };

  useEffect(() => {
    if (dialog.isVisible && (!dialog.duration || dialog.duration !== 'fixed')) {
      const timer = dialog.duration === 'long' ? 12000 : 5000;

      closePopUpTimer = setTimeout(() => {
        setDialog({
          isVisible: false,
        });
      }, timer);
    }
  }, [dialog, setDialog]);

  const texts = dialog?.message?.split('<br>') || [];

  return (
    <Dialog
      open={dialog.isVisible}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="popup-container">
        {texts.map((text) => (
          <p key={text}>{text}</p>
        ))}

        {(dialog.duration === 'long' || dialog.duration === 'fixed') && (
          <Button
            variant="contained"
            color="primary"
            style={{ background: green[300] }}
            onClick={() => handleClose()}
          >
            OK
          </Button>
        )}
      </div>
      {dialog.duration !== 'fixed' && (
        <div className="popup-timeleft">
          <span
            className={`popup-timeleft__bar popup-timeleft__bar--${
              dialog.duration === 'long' ? 'long' : 'short'
            }`}
          ></span>
        </div>
      )}
    </Dialog>
  );
};

export default PopUp;
