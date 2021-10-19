const getIsAuthenticated = state => state.auth.isAuthenticated;

const getUser = state => state.auth.user;

const getErrorMessage = state => state.auth.error;

const getErrorStatus = state => state.auth.errorStatus;

const getAvatar = state => state.auth.avatar;

const authSelectors = {
  getIsAuthenticated,
  getUser,
  getErrorMessage,
  getErrorStatus,
  getAvatar,
};

export default authSelectors;
