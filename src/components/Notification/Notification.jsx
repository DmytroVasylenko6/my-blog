import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import getNotifInfo from '../../redux/notification/auth-selectors';
import notifActionInfo from '../../redux/notification/notif-actions';
import { useSelector, useDispatch } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const notification = useSelector(getNotifInfo);

  // console.log(notification);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(notifActionInfo({}));
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
