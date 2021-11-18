import RegisterForm from './RegisterForm';
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

describe('Register form', () => {
  it('must submit the form when clicking on the register button', async () => {
    axios.post.mockResolvedValue(authResponse);

    await act(async () => {
      customRender(<RegisterForm />);
    });
    await act(async () => {
      userEvent.type(screen.getByLabelText(/Ім'я/i), 'John');
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
      userEvent.type(screen.getByLabelText(/Вік/i), '21');
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
    axios.post.mockResolvedValue(authResponse);
    await act(async () => {
      customRender(<RegisterForm />);
    });
    await act(async () => {
      userEvent.type(screen.getByLabelText(/Ім'я/i), '');
    });
    await act(async () => {
      userEvent.type(screen.getByLabelText(/Эл. пошта/i), '');
    });
    await act(async () => {
      userEvent.type(screen.getByLabelText(/Пароль/i), '');
    });
    await act(async () => {
      userEvent.type(screen.getByLabelText(/Вік/i), '');
    });

    await act(async () => {
      userEvent.click(screen.getByRole('button'));
    });
  });
});
