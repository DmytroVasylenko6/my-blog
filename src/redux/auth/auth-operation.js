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
    console.log(response);
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

const authOperations = { token, register, logIn, logOut, getCurrentUser };

export default authOperations;
