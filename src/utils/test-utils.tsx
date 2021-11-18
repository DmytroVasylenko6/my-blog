import React from 'react';
import { render } from '@testing-library/react';
import {
  Wrapper,
  setLanguage,
} from '../components/LanguageWrapper/LanguageWrapper';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import authOperations from '../redux/auth/auth-operation';
import { IUser, TToken } from '../redux/auth/auth-types';
import authActions from '../redux/auth/auth-actions';
const axios = require('axios');

let languageGetter = jest.spyOn(window.navigator, 'language', 'get');

const AllTheProviders = ({ children }: any) => {
  languageGetter.mockReturnValue('uk-UA');
  setLanguage();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Wrapper>{children}</Wrapper>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

const customRender = (ui: JSX.Element, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export default customRender;

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

jest.mock('axios');

export const testLogin = async () => {
  axios.post.mockResolvedValue(authResponse);

  await store.dispatch(
    authOperations.logIn({
      email: 'test@ukr.net',
      password: '12345',
    }),
  );
};

export const testLogout = async () => {
  axios.post.mockResolvedValue({});
  await store.dispatch(authActions.logoutSuccess());
};
