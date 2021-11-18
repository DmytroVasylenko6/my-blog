import AccountForm from './AccountForm';
import customRender from '../../utils/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { IUser } from '../../redux/auth/auth-types';
import { testLogin, testLogout } from '../../utils/test-utils';
const axios = require('axios');

jest.mock('axios');

interface IAuthResponse {
  data: {
    data: IUser;
  };
}

const authResponse: IAuthResponse = {
  data: {
    data: {
      _id: 1,
      name: 'Test2',
      email: 'test2@ukr.net',
      age: 25,
      createdAt: '20.20.20',
      updatedAt: '20.20.20',
    },
  },
};

describe('Account form:', () => {
  beforeEach(() => {
    testLogin();
  });

  afterEach(() => {
    testLogout();
  });
  it('must submit the form when clicking on the update button', async () => {
    axios.put.mockResolvedValue(authResponse);

    await act(async () => {
      customRender(<AccountForm />);
    });

    await act(async () => {
      userEvent.type(screen.getByLabelText(/Ім'я/i), 'John');
    });

    await act(async () => {
      userEvent.type(screen.getByLabelText(/Эл. пошта/i), 'john@ukr.net');
    });
    await act(async () => {
      userEvent.click(screen.getByTestId('update'));
    });
  });

  it('should show field validation errors', async () => {
    axios.put.mockResolvedValue(authResponse);
    await act(async () => {
      customRender(<AccountForm />);
    });
    //clearing inputs
    await act(async () => {
      userEvent.clear(screen.getByLabelText(/Ім'я/i));
    });
    await act(async () => {
      userEvent.clear(screen.getByLabelText(/Эл. пошта/i));
    });
    await act(async () => {
      userEvent.clear(screen.getByLabelText(/Вік/i));
    });
    //filling in inputs
    await act(async () => {
      userEvent.type(screen.getByLabelText(/Ім'я/i), '');
    });
    await act(async () => {
      userEvent.type(screen.getByLabelText(/Эл. пошта/i), '');
    });

    await act(async () => {
      userEvent.type(screen.getByLabelText(/Вік/i), '');
    });
    //clicking the update button
    await act(async () => {
      userEvent.click(screen.getByTestId('update'));
    });
  });

  it('should delete the form when clicking on the delete button', async () => {
    axios.delete.mockResolvedValue({});

    await act(async () => {
      customRender(<AccountForm />);
    });

    await act(async () => {
      userEvent.click(screen.getByTestId('delete'));
    });

    await act(async () => {
      userEvent.click(screen.getByTestId('button-yes'));
    });
  });
});
