import authOperations from './auth-operation';
import { IUser, TToken } from './auth-types';
import { store } from '../store';
import authActions from './auth-actions';
const axios = require('axios');

jest.mock('axios');

describe('Token:', () => {
  it('should write the token to axios', () => {
    authOperations.token.set('qwerty');
    expect(axios.defaults.headers.common.Authorization).toBe('Bearer qwerty');
  });
  it('should remove the token from axios', () => {
    authOperations.token.unset();
    expect(axios.defaults.headers.common.Authorization).toBe('');
  });
});

interface IAuthResponse {
  data: {
    user: IUser;
    token: TToken;
  };
}

const authResponse: IAuthResponse = {
  data: {
    user: {
      _id: 1,
      name: 'Test',
      email: 'test@ukr.net',
      age: 23,
      createdAt: '20.20.20',
      updatedAt: '20.20.20',
    },
    token: 'qwerty',
  },
};

const initialUserState: IUser = {
  age: '',
  _id: '',
  name: '',
  email: '',
  createdAt: '',
  updatedAt: '',
};

describe('Registration', () => {
  beforeEach(async () => {
    axios.post.mockResolvedValue({});
    await store.dispatch(authActions.logoutSuccess());
  });
  it('must complete a successful registration', async () => {
    const state = store.getState();
    expect(state.auth.user).toEqual(initialUserState);

    axios.post.mockResolvedValue(authResponse);

    await store.dispatch(
      authOperations.register({
        name: 'Test',
        email: 'test@ukr.net',
        password: '12345',
        age: 20,
      }),
    );

    const updatedStore = store.getState();
    expect(updatedStore.auth.user).toEqual(authResponse.data.user);
    expect(updatedStore.auth.token).toEqual(authResponse.data.token);
  });

  it('should register with an error', async () => {
    const state = store.getState();
    expect(state.auth.user).toEqual(initialUserState);

    axios.post.mockRejectedValue({
      error: {
        message: 'register error',
      },
    });

    await store.dispatch(
      authOperations.register({
        name: 'Test',
        email: 'test@ukr.net',
        password: '12345',
        age: 20,
      }),
    );

    const updatedStore = store.getState();
    expect(updatedStore.auth.user).toEqual(initialUserState);
    expect(updatedStore.auth.token).toBeNull();
  });
});

describe('Login', () => {
  beforeEach(async () => {
    axios.post.mockResolvedValue({});
    await store.dispatch(authActions.logoutSuccess());
  });

  it('should authenticate successfully', async () => {
    const state = store.getState();
    expect(state.auth.user).toEqual(initialUserState);

    axios.post.mockResolvedValue(authResponse);

    await store.dispatch(
      authOperations.logIn({
        email: 'test@ukr.net',
        password: '12345',
      }),
    );

    const updatedStore = store.getState();
    expect(updatedStore.auth.user).toEqual(authResponse.data.user);
    expect(updatedStore.auth.token).toEqual(authResponse.data.token);
  });

  it('should authenticate with error', async () => {
    const state = store.getState();
    expect(state.auth.user).toEqual(initialUserState);

    axios.post.mockRejectedValue({
      error: {
        message: 'login error',
      },
    });

    await store.dispatch(
      authOperations.logIn({
        email: 'test@ukr.net',
        password: '12345',
      }),
    );

    const updatedStore = store.getState();
    expect(updatedStore.auth.user).toEqual(initialUserState);
    expect(updatedStore.auth.token).toBeNull();
  });
});

describe('Logout', () => {
  beforeEach(async () => {
    axios.post.mockResolvedValue(authResponse);

    await store.dispatch(
      authOperations.logIn({
        email: 'test@ukr.net',
        password: '12345',
      }),
    );
  });
  it('must successfully logout', async () => {
    const state = store.getState();
    expect(state.auth.user).toEqual(authResponse.data.user);
    expect(state.auth.token).toEqual(authResponse.data.token);

    axios.post.mockResolvedValue({});

    await store.dispatch(authOperations.logOut());

    const updatedStore = store.getState();
    expect(updatedStore.auth.user).toEqual(initialUserState);
    expect(updatedStore.auth.token).toBeNull();
  });

  it('must log out with an error', async () => {
    const state = store.getState();
    expect(state.auth.user).toEqual(authResponse.data.user);
    expect(state.auth.token).toEqual(authResponse.data.token);

    axios.post.mockRejectedValue({
      error: {
        message: 'logout error',
      },
    });

    await store.dispatch(authOperations.logOut());

    const updatedStore = store.getState();
    expect(updatedStore.auth.user).toEqual(authResponse.data.user);
    expect(updatedStore.auth.token).toEqual(authResponse.data.token);
  });
});

describe('Update user', () => {
  beforeEach(async () => {
    axios.post.mockResolvedValue(authResponse);

    await store.dispatch(
      authOperations.logIn({
        email: 'test@ukr.net',
        password: '12345',
      }),
    );
  });
  it('should update the user successfully', async () => {
    const state = store.getState();
    expect(state.auth.user).toEqual(authResponse.data.user);
    expect(state.auth.token).toEqual(authResponse.data.token);

    const response = {
      data: {
        data: {
          _id: 1,
          name: 'Test2',
          email: 'test2@ukr.net',
          age: 23,
          createdAt: '20.20.20',
          updatedAt: '21.21.21',
        },
      },
    };

    axios.put.mockResolvedValue(response);

    await store.dispatch(
      authOperations.updateUser({
        name: 'Test2',
        email: 'test2@ukr.net',
        age: 23,
        password: '12345',
      }),
    );

    const updatedStore = store.getState();
    expect(updatedStore.auth.user).toEqual(response.data.data);
  });

  it('must perform user updates with an error', async () => {
    const state = store.getState();
    expect(state.auth.user).toEqual(authResponse.data.user);
    expect(state.auth.token).toEqual(authResponse.data.token);

    axios.put.mockRejectedValue({
      error: {
        message: 'logout error',
      },
    });

    await store.dispatch(
      authOperations.updateUser({
        name: 'Test2',
        email: 'test2@ukr.net',
        age: 23,
        password: '12345',
      }),
    );

    const updatedStore = store.getState();
    expect(updatedStore.auth.user).toEqual(authResponse.data.user);
  });
});

describe('Delete user', () => {
  beforeEach(async () => {
    axios.post.mockResolvedValue(authResponse);

    await store.dispatch(
      authOperations.logIn({
        email: 'test@ukr.net',
        password: '12345',
      }),
    );
  });
  it('should successfully delete the user', async () => {
    const state = store.getState();
    expect(state.auth.token).toEqual(authResponse.data.token);

    axios.delete.mockResolvedValue({});

    await store.dispatch(authOperations.deleteUser());

    const updatedStore = store.getState();
    expect(updatedStore.auth.token).toBeNull();
  });

  it('must send a request to delete a user with an error', async () => {
    const state = store.getState();
    expect(state.auth.token).toEqual(authResponse.data.token);

    axios.delete.mockRejectedValue({});

    await store.dispatch(authOperations.deleteUser());

    const updatedStore = store.getState();
    expect(updatedStore.auth.token).toEqual(authResponse.data.token);
  });
});

describe('Get current user', () => {
  it('the action should not be performed when the token is not in the store', async () => {
    axios.post.mockResolvedValue({});
    await store.dispatch(authActions.logoutSuccess());
    const state = store.getState();
    expect(state.auth.token).toBeNull();
    await store.dispatch(authOperations.getCurrentUser());
    const updatedStore = store.getState();
    expect(updatedStore.auth.token).toBeNull();
  });

  it('the action must be successful when the token is in the store', async () => {
    axios.post.mockResolvedValue(authResponse);

    await store.dispatch(
      authOperations.logIn({
        email: 'test@ukr.net',
        password: '12345',
      }),
    );

    const currentUser = {
      _id: 2,
      name: 'Test3',
      email: 'test3@ukr.net',
      age: 23,
      createdAt: '20.20.20',
      updatedAt: '21.21.21',
    };

    axios.get.mockResolvedValue({
      data: currentUser,
    });

    await store.dispatch(authOperations.getCurrentUser());

    const updatedStore = store.getState();
    expect(updatedStore.auth.user).toEqual(currentUser);
  });

  it('the action must be executed with an error when the token is in the store', async () => {
    axios.post.mockResolvedValue(authResponse);

    await store.dispatch(
      authOperations.logIn({
        email: 'test@ukr.net',
        password: '12345',
      }),
    );

    axios.get.mockRejectedValue({
      error: {
        message: 'get user error',
      },
    });

    await store.dispatch(authOperations.getCurrentUser());

    const updatedStore = store.getState();
    expect(updatedStore.auth.user).toEqual(authResponse.data.user);
  });
});

describe('Upload Avatar', () => {
  it('should load the avatar successfully', async () => {
    axios.post.mockResolvedValue(authResponse);

    await store.dispatch(
      authOperations.logIn({
        email: 'test@ukr.net',
        password: '12345',
      }),
    );
    const state = store.getState();
    expect(state.auth.avatar).toBeNull();
    const avatarURL = 'http://domain.com/upload/avatarId';
    global.URL.createObjectURL = jest.fn(() => avatarURL);

    const response = {
      data: 'Hello, world!',
      headers: {
        'content-type': 'text/plain',
      },
    };

    axios.post.mockResolvedValue({});
    axios.get.mockResolvedValue(response);
    await store.dispatch(authOperations.uploadAvatar('', 1));

    const updatedStore = store.getState();
    expect(updatedStore.auth.avatar).toBe(avatarURL);
  });

  it('must complete the request to upload an avatar with an error', async () => {
    axios.post.mockResolvedValue({});
    await store.dispatch(authActions.logoutSuccess());
    const state = store.getState();
    expect(state.auth.avatar).toBeNull();
    const avatarURL = 'http://domain.com/upload/avatarId';
    global.URL.createObjectURL = jest.fn(() => avatarURL);

    axios.post.mockRejectedValue({
      error: {
        message: 'error',
      },
    });
    axios.get.mockRejectedValue({
      error: {
        message: 'error',
      },
    });
    await store.dispatch(authOperations.uploadAvatar('', 1));

    const updatedStore = store.getState();
    expect(updatedStore.auth.avatar).toBeNull();
  });
});

describe('Get avatar', () => {
  it('should get the avatar successfully', async () => {
    axios.post.mockResolvedValue(authResponse);

    await store.dispatch(
      authOperations.logIn({
        email: 'test@ukr.net',
        password: '12345',
      }),
    );
    const state = store.getState();
    expect(state.auth.avatar).toBeNull();
    const avatarURL = 'http://domain.com/upload/avatarId';
    global.URL.createObjectURL = jest.fn(() => avatarURL);

    const response = {
      data: 'Hello, world!',
      headers: {
        'content-type': 'text/plain',
      },
    };

    axios.get.mockResolvedValue(response);
    await store.dispatch(authOperations.getAvatar(1));

    const updatedStore = store.getState();
    expect(updatedStore.auth.avatar).toBe(avatarURL);
  });

  it('must complete the request to get an avatar with an error', async () => {
    axios.post.mockResolvedValue({});
    await store.dispatch(authActions.logoutSuccess());
    const state = store.getState();
    expect(state.auth.avatar).toBeNull();
    const avatarURL = 'http://domain.com/upload/avatarId';
    global.URL.createObjectURL = jest.fn(() => avatarURL);

    axios.get.mockRejectedValue({
      error: {
        message: 'error',
      },
    });
    await store.dispatch(authOperations.getAvatar(1));

    const updatedStore = store.getState();
    expect(updatedStore.auth.avatar).toBeNull();
  });
});
