import { combineReducers } from 'redux';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import authActions from './auth-actions';
import { IDataUser, IUser, TAvatar, TToken, TIsAuth } from './auth-types';

const initialUserState: IUser = {
  age: '',
  _id: '',
  name: '',
  email: '',
  createdAt: '',
  updatedAt: '',
};

const InitialTokenState = null as TToken;

const InitialAvatarState = null as TAvatar;

const InitialIsAuthState = false as TIsAuth;

export const user = createReducer(initialUserState, builder => {
  builder
    .addCase(
      authActions.registerSuccess,
      (_, { payload }: PayloadAction<IDataUser>): IUser => payload.user,
    )
    .addCase(
      authActions.loginSuccess,
      (_, { payload }: PayloadAction<IDataUser>): IUser => payload.user,
    )
    .addCase(authActions.logoutSuccess, () => initialUserState)
    .addCase(
      authActions.updateUserSuccess,
      (_, { payload }: PayloadAction<IUser>): IUser => payload,
    )
    .addCase(
      authActions.getCurrentUserSuccess,
      (_, { payload }: PayloadAction<IUser>): IUser => payload,
    );
});

export const token = createReducer(InitialTokenState, builder => {
  builder
    .addCase(
      authActions.registerSuccess,
      (_, { payload }: PayloadAction<IDataUser>): TToken => payload.token,
    )
    .addCase(
      authActions.loginSuccess,
      (_, { payload }: PayloadAction<IDataUser>): TToken => payload.token,
    )
    .addCase(authActions.logoutSuccess, () => null)
    .addCase(authActions.deleteUserSuccess, () => null);
});

export const isAuthenticated = createReducer(InitialIsAuthState, {
  [authActions.registerSuccess.toString()]: (): TIsAuth => true,
  [authActions.loginSuccess.toString()]: (): TIsAuth => true,
  [authActions.getCurrentUserSuccess.toString()]: (): TIsAuth => true,
  [authActions.registerError.toString()]: (): TIsAuth => false,
  [authActions.loginError.toString()]: (): TIsAuth => false,
  [authActions.getCurrentUserError.toString()]: (): TIsAuth => false,
  [authActions.logoutSuccess.toString()]: (): TIsAuth => false,
  [authActions.deleteUserSuccess.toString()]: (): TIsAuth => false,
});

export const avatar = createReducer(InitialAvatarState, {
  [authActions.getAvatarSuccess.toString()]: (_, { payload }) => payload,
  [authActions.uploadAvatarSuccess.toString()]: (_, { payload }) => payload,
  [authActions.logoutSuccess.toString()]: () => null,
  [authActions.deleteUserSuccess.toString()]: () => null,
  [authActions.registerError.toString()]: () => null,
  [authActions.loginError.toString()]: () => null,
  [authActions.getCurrentUserError.toString()]: () => null,
});

const authReducer = combineReducers({
  user,
  avatar,
  token,
  isAuthenticated,
});

export default authReducer;
