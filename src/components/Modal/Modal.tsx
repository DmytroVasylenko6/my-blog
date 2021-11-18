import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import Zoom from '@mui/material/Zoom';
import s from './Modal.module.scss';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/redux-hooks';
import getTheme from '../../redux/themeMode/themeMode-selector';

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

const styleDark = {
  maxWidth: 400,
  width: '100%',
  bgcolor: '#202020',
  border: '2px solid #e2b076',
  borderRadius: '4px',
  p: 2,
  px: 4,
  pb: 3,
};

const styleLight = {
  maxWidth: 400,
  width: '100%',
  bgcolor: '#ebebeb',
  border: '2px solid #202020',
  borderRadius: '4px',
  p: 2,
  px: 4,
  pb: 3,
};

interface IProps {
  open: boolean;
  title: string | object;
  handleClose(): void;
  onDelete(): void;
}

export default function ModalUnstyledDemo({
  open,
  title,
  handleClose,
  onDelete,
}: IProps) {
  const theme = useAppSelector(getTheme);
  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}>
        <Zoom in={open}>
          <Box sx={theme === 'dark' ? styleDark : styleLight}>
            <h2
              className={classNames(
                [s.titleModal, 'theme-light-text'].join(' '),
              )}
              id="unstyled-modal-title">
              {title}
            </h2>
            <div className={s.buttonContainer}>
              <button
                data-testid="button-yes"
                className={s.buttonYes}
                onClick={onDelete}>
                <FormattedMessage
                  id="app.modal.button.yes"
                  defaultMessage="Yes"
                />
              </button>
              <button
                className={classNames(
                  [s.buttonNo, 'theme-light-button'].join(' '),
                )}
                onClick={handleClose}>
                <FormattedMessage
                  id="app.modal.button.no"
                  defaultMessage="No"
                />
              </button>
            </div>
          </Box>
        </Zoom>
      </StyledModal>
    </div>
  );
}
