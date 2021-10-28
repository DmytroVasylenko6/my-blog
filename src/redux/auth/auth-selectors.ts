import { RootState } from '../store';

const getIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

const getUser = (state: RootState) => state.auth.user;

const getAvatar = (state: RootState) => state.auth.avatar;

const authSelectors = {
  getIsAuthenticated,
  getUser,
  getAvatar,
};

export default authSelectors;
