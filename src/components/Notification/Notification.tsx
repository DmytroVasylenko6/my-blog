import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import getNotifInfo from '../../redux/notification/notif-selectors';
import notifActionInfo from '../../redux/notification/notif-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

export default function CustomizedSnackbars() {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(getNotifInfo);

  const handleClose = (event: React.SyntheticEvent<Element, Event>) => {
    dispatch(
      notifActionInfo({
        status: false,
        message: '',
        severity: 'info',
      }),
    );
  };

  return (
    <Snackbar
      open={notification.status}
      autoHideDuration={3000}
      onClose={handleClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={notification.severity}
        sx={{ width: '100%' }}>
        {notification.message}
      </MuiAlert>
    </Snackbar>
  );
}
