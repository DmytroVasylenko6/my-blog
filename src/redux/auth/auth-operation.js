import axios from 'axios';
import authActions from './auth-actions';
import notifInfo from '../notification/notif-actions';

axios.defaults.baseURL = 'https://api-nodejs-todolist.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = credentials => async dispatch => {
  dispatch(authActions.registerRequest());

  try {
    const response = await axios.post('/user/register', credentials);

    token.set(response.data.token);
    dispatch(authActions.registerSuccess(response.data));
    dispatch(
      notifInfo({
        message: 'Successful registration!',
        status: true,
        severity: 'success',
      }),
    );
  } catch (error) {
    dispatch(authActions.registerError(error.message));
    dispatch(
      notifInfo({
        message: error.message,
        status: true,
        severity: 'error',
      }),
    );
  }
};

const logIn = credentials => async dispatch => {
  dispatch(authActions.loginRequest());

  try {
    const response = await axios.post('/user/login', credentials);

    token.set(response.data.token);
    dispatch(authActions.loginSuccess(response.data));
    dispatch(
      notifInfo({
        message: 'Successful authorization!',
        status: true,
        severity: 'success',
      }),
    );
  } catch (error) {
    dispatch(authActions.loginError(error.message));
    dispatch(
      notifInfo({
        message: error.message,
        status: true,
        severity: 'error',
      }),
    );
  }
};

const logOut = () => async dispatch => {
  dispatch(authActions.logoutRequest());

  try {
    await axios.post('/user/logout');

    token.unset();
    dispatch(authActions.logoutSuccess());
    dispatch(
      notifInfo({
        message: 'Successful logout!',
        status: true,
        severity: 'success',
      }),
    );
  } catch (error) {
    dispatch(authActions.logoutError(error.message));
    dispatch(
      notifInfo({
        message: error.message,
        status: true,
        severity: 'error',
      }),
    );
  }
};

const updateUser = user => async (dispatch, getState) => {
  dispatch(authActions.updateUserRequest());
  try {
    const response = await axios.put('/user/me', user);
    dispatch(authActions.updateUserSuccess(response.data));
    dispatch(
      notifInfo({
        message: 'Successful update!',
        status: true,
        severity: 'success',
      }),
    );
  } catch (error) {
    dispatch(authActions.updateUserError(error.message));
    dispatch(
      notifInfo({
        message: error.message,
        status: true,
        severity: 'error',
      }),
    );
  }
};

const deleteUser = () => async (dispatch, getState) => {
  dispatch(authActions.deleteUserRequest());
  try {
    await axios.delete('/user/me');
    token.unset();
    dispatch(authActions.deleteUserSuccess());
    dispatch(
      notifInfo({
        message: 'Successful delete user!',
        status: true,
        severity: 'success',
      }),
    );
  } catch (error) {
    dispatch(authActions.deleteUserError(error.message));
    dispatch(
      notifInfo({
        message: error.message,
        status: true,
        severity: 'error',
      }),
    );
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);

  dispatch(authActions.logoutRequest());

  try {
    const response = await axios.get('/user/me');
    dispatch(authActions.getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(authActions.getCurrentUserError(error.message));
  }
};

const uploadAvatar = (credentials, userId) => async (dispatch, getState) => {
  let formData = new FormData();
  formData.append('avatar', credentials);

  dispatch(authActions.uploadAvatarRequest());

  try {
    await axios.post('/user/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const response = await axios.get(`/user/${userId}/avatar`, {
      responseType: 'arraybuffer',
    });
    let blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    let avatar = URL.createObjectURL(blob);

    dispatch(authActions.uploadAvatarSuccess(avatar));
    dispatch(
      notifInfo({
        message: 'Successful upload avatar!',
        status: true,
        severity: 'success',
      }),
    );
  } catch (error) {
    dispatch(authActions.uploadAvatarError(error?.message));
    dispatch(
      notifInfo({
        message: error.message,
        status: true,
        severity: 'error',
      }),
    );
  }
};

const getAvatar = userId => async (dispatch, getState) => {
  dispatch(authActions.getAvatarRequest());
  try {
    const response = await axios.get(`/user/${userId}/avatar`, {
      responseType: 'arraybuffer',
    });
    let blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    let avatar = URL.createObjectURL(blob);

    dispatch(authActions.getAvatarSuccess(avatar));
  } catch (error) {
    dispatch(authActions.getAvatarError(error?.message));
  }
};

const authOperations = {
  token,
  register,
  logIn,
  logOut,
  updateUser,
  deleteUser,
  getCurrentUser,
  uploadAvatar,
  getAvatar,
};

export default authOperations;
