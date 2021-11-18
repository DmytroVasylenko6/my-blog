import authActions from './auth-actions';
import { IDataUser, IUser, TAvatar, TToken, TIsAuth } from './auth-types';
import {
  user as userReducer,
  token as tokenReducer,
  isAuthenticated as isAuthenticatedReducer,
  avatar as avatarReducer,
} from './auth-reducer';

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

describe('User:', () => {
  let user: IUser;
  let data: IDataUser;

  beforeEach(() => {
    user = {
      age: 12,
      _id: '1',
      name: 'test',
      email: 'test@gmail.com',
      createdAt: '20.10.20',
      updatedAt: '20.10.20',
    };

    data = {
      user: user,
      token: 'qwerty',
    };
  });
  test('must register user', () => {
    const userState = userReducer(
      initialUserState,
      authActions.registerSuccess(data),
    );
    expect(userState).toEqual(user);
  });

  test('must login user', () => {
    const userState = userReducer(
      initialUserState,
      authActions.loginSuccess(data),
    );
    expect(userState).toEqual(user);
  });
  test('must logout user', () => {
    const userState = userReducer(
      initialUserState,
      authActions.logoutSuccess(),
    );
    expect(userState).toEqual(initialUserState);
  });

  test('must update user', () => {
    const userState = userReducer(
      initialUserState,
      authActions.updateUserSuccess(user),
    );
    expect(userState).toEqual(user);
  });

  test('should return the current user', () => {
    const userState = userReducer(
      initialUserState,
      authActions.getCurrentUserSuccess(user),
    );
    expect(userState).toEqual(user);
  });
});

describe('Token:', () => {
  let user: IUser;
  let data: IDataUser;

  beforeEach(() => {
    user = {
      age: 12,
      _id: '1',
      name: 'test',
      email: 'test@gmail.com',
      createdAt: '20.10.20',
      updatedAt: '20.10.20',
    };

    data = {
      user: user,
      token: 'qwerty',
    };
  });
  test('should write the token when registering', () => {
    const tokenState = tokenReducer(
      InitialTokenState,
      authActions.registerSuccess(data),
    );
    expect(tokenState).toEqual(data.token);
  });

  test('should write the token on authorization', () => {
    const tokenState = tokenReducer(
      InitialTokenState,
      authActions.loginSuccess(data),
    );
    expect(tokenState).toEqual(data.token);
  });

  test('must remove the token on logout', () => {
    const tokenState = tokenReducer(
      InitialTokenState,
      authActions.logoutSuccess(),
    );
    expect(tokenState).toBe(null);
    expect(tokenState).toBeNull();
  });

  test('must remove the token on delete user', () => {
    const tokenState = tokenReducer(
      InitialTokenState,
      authActions.deleteUserSuccess(),
    );
    expect(tokenState).toBe(null);
    expect(tokenState).toBeNull();
  });
});

describe('isAthenticated', () => {
  let user: IUser;
  let data: IDataUser;

  beforeEach(() => {
    user = {
      age: 12,
      _id: '1',
      name: 'test',
      email: 'test@gmail.com',
      createdAt: '20.10.20',
      updatedAt: '20.10.20',
    };

    data = {
      user: user,
      token: 'qwerty',
    };
  });
  test('must write positive (true) authentication in the state upon registration', () => {
    const authStatus = isAuthenticatedReducer(
      InitialIsAuthState,
      authActions.registerSuccess(data),
    );
    expect(authStatus).toBe(true);
    expect(authStatus).toBeTruthy();
  });

  test('must write positive (true) authentication in the state when authorizing', () => {
    const authStatus = isAuthenticatedReducer(
      InitialIsAuthState,
      authActions.loginSuccess(data),
    );
    expect(authStatus).toBe(true);
    expect(authStatus).toBeTruthy();
  });

  test('must write positive (true) authentication in the state when receiving the current user', () => {
    const authStatus = isAuthenticatedReducer(
      InitialIsAuthState,
      authActions.getCurrentUserSuccess(user),
    );
    expect(authStatus).toBe(true);
    expect(authStatus).toBeTruthy();
  });

  test('should write negative (false) authentication to the state if registration fails', () => {
    const authStatus = isAuthenticatedReducer(
      InitialIsAuthState,
      authActions.registerError('error'),
    );
    expect(authStatus).toBe(false);
    expect(authStatus).toBeFalsy();
  });

  test('should write a negative (false) authentication to the state in case of an authentication error', () => {
    const authStatus = isAuthenticatedReducer(
      InitialIsAuthState,
      authActions.loginError('error'),
    );
    expect(authStatus).toBe(false);
    expect(authStatus).toBeFalsy();
  });

  test('must write a negative (false) authentication to the state if an error occurs when getting the current user', () => {
    const authStatus = isAuthenticatedReducer(
      InitialIsAuthState,
      authActions.getCurrentUserError('error'),
    );
    expect(authStatus).toBe(false);
    expect(authStatus).toBeFalsy();
  });

  test('should write negative (false) authentication to the state when logging out', () => {
    const authStatus = isAuthenticatedReducer(
      InitialIsAuthState,
      authActions.logoutSuccess(),
    );
    expect(authStatus).toBe(false);
    expect(authStatus).toBeFalsy();
  });

  test('must write negative (false) authentication to the state when deleting a user', () => {
    const authStatus = isAuthenticatedReducer(
      InitialIsAuthState,
      authActions.deleteUserSuccess(),
    );
    expect(authStatus).toBe(false);
    expect(authStatus).toBeFalsy();
  });
});

describe('Avatar', () => {
  test('must write in the state a link to the avatar of the current user on the GET request', () => {
    const avatarURL = avatarReducer(
      InitialAvatarState,
      authActions.getAvatarSuccess('http://domain.com/upload/avatarId'),
    );
    expect(avatarURL).toBe('http://domain.com/upload/avatarId');
  });

  test('must write in the state a link to the avatar of the current user on the UPLOAD request', () => {
    const avatarURL = avatarReducer(
      InitialAvatarState,
      authActions.uploadAvatarSuccess('http://domain.com/upload/avatarId'),
    );
    expect(avatarURL).toBe('http://domain.com/upload/avatarId');
  });

  test('should write avatar Null to the state when logging out', () => {
    const avatarURL = avatarReducer(
      InitialAvatarState,
      authActions.logoutSuccess(),
    );
    expect(avatarURL).toBe(null);
    expect(avatarURL).toBeNull();
  });

  test('should write avatar Null to the state when deleting the current user', () => {
    const avatarURL = avatarReducer(
      InitialAvatarState,
      authActions.deleteUserSuccess(),
    );
    expect(avatarURL).toBe(null);
    expect(avatarURL).toBeNull();
  });

  test('should write avatar Null to the state if registration fails', () => {
    const avatarURL = avatarReducer(
      InitialAvatarState,
      authActions.registerError('error'),
    );
    expect(avatarURL).toBe(null);
    expect(avatarURL).toBeNull();
  });

  test('should write avatar Null to the state if authentication fails', () => {
    const avatarURL = avatarReducer(
      InitialAvatarState,
      authActions.loginError('error'),
    );
    expect(avatarURL).toBe(null);
    expect(avatarURL).toBeNull();
  });

  test('should write avatar Null to the state if there is an error getting the current user', () => {
    const avatarURL = avatarReducer(
      InitialAvatarState,
      authActions.getCurrentUserError('error'),
    );
    expect(avatarURL).toBe(null);
    expect(avatarURL).toBeNull();
  });
});
