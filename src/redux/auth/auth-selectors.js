const getIsAuthenticated = state => state.auth.isAuthenticated;

const getUserName = state => state.auth.user.name;

const getErrorMessage = state => state.auth.error;

const getErrorStatus = state => state.auth.errorStatus;

const authSelectors = {
  getIsAuthenticated,
  getUserName,
  getErrorMessage,
  getErrorStatus,
};

export default authSelectors;
