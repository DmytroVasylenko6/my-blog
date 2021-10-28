import { createAction } from '@reduxjs/toolkit';
import { IDataUser, IUser, TAvatar } from './auth-types';

const registerRequest = createAction('auth/registerRequest');
const registerSuccess = createAction(
  'auth/registerSuccess',
  withPayloadType<IDataUser>(),
);
const registerError = createAction(
  'auth/registerError',
  withPayloadType<string>(),
);

const loginRequest = createAction('auth/loginRequest');

const loginSuccess = createAction(
  'auth/loginSuccess',
  withPayloadType<IDataUser>(),
);
const loginError = createAction('auth/loginError', withPayloadType<string>());

const logoutRequest = createAction('auth/logoutRequest');
const logoutSuccess = createAction('auth/logoutSuccess');
const logoutError = createAction('auth/logoutError', withPayloadType<string>());

const updateUserRequest = createAction('auth/updateUserRequest');
const updateUserSuccess = createAction(
  'auth/updateUserSuccess',
  withPayloadType<IUser>(),
);
const updateUserError = createAction(
  'auth/updateUserError',
  withPayloadType<string>(),
);

const deleteUserRequest = createAction('auth/deleteUserRequest');
const deleteUserSuccess = createAction('auth/deleteUserSuccess');
const deleteUserError = createAction(
  'auth/deleteUserError',
  withPayloadType<string>(),
);

const uploadAvatarRequest = createAction('auth/uploadAvatarRequest');
const uploadAvatarSuccess = createAction(
  'auth/uploadAvatarSuccess',
  withPayloadType<TAvatar>(),
);
const uploadAvatarError = createAction(
  'auth/uploadAvatarError',
  withPayloadType<string>(),
);

const getAvatarRequest = createAction('auth/getAvatarRequest');
const getAvatarSuccess = createAction(
  'auth/getAvatarSuccess',
  withPayloadType<TAvatar>(),
);
const getAvatarError = createAction(
  'auth/getAvatarError',
  withPayloadType<null>(),
);

const getCurrentUserRequest = createAction(
  'auth/getCurrentUserRequest',
  withPayloadType<null>(),
);
const getCurrentUserSuccess = createAction(
  'auth/getCurrentUserSuccess',
  withPayloadType<IUser>(),
);
const getCurrentUserError = createAction(
  'auth/getCurrentUserError',
  withPayloadType<null>(),
);

const authActions = {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  updateUserRequest,
  updateUserSuccess,
  updateUserError,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserError,
  uploadAvatarRequest,
  uploadAvatarSuccess,
  uploadAvatarError,
  getAvatarRequest,
  getAvatarSuccess,
  getAvatarError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
};

export default authActions;

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}
