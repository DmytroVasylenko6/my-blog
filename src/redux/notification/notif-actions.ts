import { createAction } from '@reduxjs/toolkit';
import INotif from './notif-types';

const notifActionInfo = createAction<INotif, 'notification/notifActionInfo'>(
  'notification/notifActionInfo',
);

export default notifActionInfo;
