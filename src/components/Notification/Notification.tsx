import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import getNotifInfo from '../../redux/notification/auth-selectors';
import notifActionInfo from '../../redux/notification/notif-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

const Alert = React.forwardRef(function Alert(props: any, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(getNotifInfo);

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(notifActionInfo(
      {
        status: false,
        message: '',
        severity: 'info',
    }));
  };

  return (
    <Snackbar
      open={notification.status}
      autoHideDuration={3000}
      onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={notification.severity}
        sx={{ width: '100%' }}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
}
