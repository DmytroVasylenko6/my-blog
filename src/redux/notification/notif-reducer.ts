import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import notifInfo from './notif-actions';
import INotif from './notif-types';

const initialState: INotif = {
  status: false,
  message: '',
  severity: 'info',
};

const notifStatusReducer = createReducer(initialState, builder => {
  builder.addCase(
    notifInfo,
    (_, { payload }: PayloadAction<INotif>): INotif => payload,
  );
});

export default notifStatusReducer;
