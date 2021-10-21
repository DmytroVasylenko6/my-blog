import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import Zoom from '@mui/material/Zoom';
import s from './Modal.module.scss';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  maxWidth: 400,
  width: '100%',
  bgcolor: '#202020',
  border: '2px solid #e2b076',
  borderRadius: '4px',
  p: 2,
  px: 4,
  pb: 3,
};

export default function ModalUnstyledDemo({
  open,
  handleClose,
  onDelete,
  title,
}) {
  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}>
        <Zoom in={open}>
          <Box sx={style}>
            <h2 className={s.titleModal} id="unstyled-modal-title">
              {title}
            </h2>
            <div className={s.buttonContainer}>
              <button className={s.buttonYes} onClick={onDelete}>
                Yes
              </button>
              <button className={s.buttonNo} onClick={handleClose}>
                No
              </button>
            </div>
          </Box>
        </Zoom>
      </StyledModal>
    </div>
  );
}
