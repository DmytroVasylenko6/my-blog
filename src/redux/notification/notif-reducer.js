import { createReducer } from '@reduxjs/toolkit';
import notifInfo from './notif-actions';
const initialState = {
  status: false,
  message: '',
  severity: '',
};

const notifStatusReducer = createReducer(initialState, {
  [notifInfo]: (_, { payload }) => payload,
});

export default notifStatusReducer;
