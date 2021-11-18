import LoginForm from './LoginForm';
import customRender from '../../utils/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { IUser, TToken } from '../../redux/auth/auth-types';
import { store } from '../../redux/store';
const axios = require('axios');

jest.mock('axios');

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

describe('Login form', () => {
  it('must submit the form when clicking on the Login button', async () => {
    axios.post.mockResolvedValue(authResponse);

    await act(async () => {
      customRender(<LoginForm />);
    });

    await act(async () => {
      userEvent.type(
        screen.getByLabelText(/Эл. пошта/i),
        'john.dee@someemail.com',
      );
    });
    await act(async () => {
      userEvent.type(screen.getByLabelText(/Пароль/i), '1234567890');
    });

    await act(async () => {
      userEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(store.getState().auth.token).toBe(authResponse.data.token);
      expect(store.getState().auth.user).toBe(authResponse.data.user);
    });
  });

  it('should show field validation errors', async () => {
    await act(async () => {
      customRender(<LoginForm />);
    });

    await act(async () => {
      userEvent.type(screen.getByLabelText(/Эл. пошта/i), '');
    });

    await act(async () => {
      userEvent.type(screen.getByLabelText(/Пароль/i), '');
    });

    await act(async () => {
      userEvent.click(screen.getByRole('button'));
    });

    expect((await screen.findAllByText(/Обов'язкове поле!/i)).length).toBe(2);
  });
});
