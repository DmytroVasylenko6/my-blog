import { createAction } from '@reduxjs/toolkit';

const registerRequest = createAction('auth/registerRequest');
const registerSuccess = createAction('auth/registerSuccess');
const registerError = createAction('auth/registerError');

const loginRequest = createAction('auth/loginRequest');
const loginSuccess = createAction('auth/loginSuccess');
const loginError = createAction('auth/loginError');

const logoutRequest = createAction('auth/logoutRequest');
const logoutSuccess = createAction('auth/logoutSuccess');
const logoutError = createAction('auth/logoutError');

const updateUserRequest = createAction('auth/updateUserRequest');
const updateUserSuccess = createAction('auth/updateUserSuccess');
const updateUserError = createAction('auth/updateUserError');

const deleteUserRequest = createAction('auth/deleteUserRequest');
const deleteUserSuccess = createAction('auth/deleteUserSuccess');
const deleteUserError = createAction('auth/deleteUserError');

const uploadAvatarRequest = createAction('auth/uploadAvatarRequest');
const uploadAvatarSuccess = createAction('auth/uploadAvatarSuccess');
const uploadAvatarError = createAction('auth/uploadAvatarError');

const getAvatarRequest = createAction('auth/getAvatarRequest');
const getAvatarSuccess = createAction('auth/getAvatarSuccess');
const getAvatarError = createAction('auth/getAvatarError');

const getCurrentUserRequest = createAction('auth/getCurrentUserRequest');
const getCurrentUserSuccess = createAction('auth/getCurrentUserSuccess');
const getCurrentUserError = createAction('auth/getCurrentUserError');

const errorStatus = createAction('auth/errorStatus');

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
  errorStatus,
};

export default authActions;
