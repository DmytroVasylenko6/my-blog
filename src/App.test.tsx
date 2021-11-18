import customRender from './utils/test-utils';
import App, {
  HomePage,
  TasksPage,
  SingleTaskPage,
  RegisterPage,
  LoginPage,
  AccountPage,
} from './App';
import { screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Suspense } from 'react';
const axios = require('axios');

jest.mock('axios');

jest.mock('react-use', () => ({
  useMedia: jest.fn().mockReturnValue(true).mockReturnValue(false),
}));

const todos = [
  {
    completed: false,
    _id: 1,
    description: 'test',
    owner: 'admin',
    createdAt: '21.10.2021',
    updatedAt: '21.10.2021',
  },
];

const response = {
  data: {
    data: todos,
  },
};

const responseSingleTask = {
  data: {
    data: todos[0],
  },
};

describe('Should render App', () => {
  test('renders learn react link', async () => {
    customRender(<App />);

    const themeButton = screen.getByTestId('theme-button');
    await act(async () => {
      fireEvent.click(themeButton);
    });
    await act(async () => {
      fireEvent.click(themeButton);
    });
  });

  describe('should render pages:', () => {
    test('Homepage', async () => {
      customRender(
        <Suspense fallback={<></>}>
          <HomePage />
        </Suspense>,
      );
    });

    test('TasksPage', async () => {
      axios.get.mockResolvedValue(response);
      customRender(
        <Suspense fallback={<></>}>
          <TasksPage />
        </Suspense>,
      );
    });

    test('SingleTaskPage', async () => {
      axios.get.mockResolvedValue(responseSingleTask);
      customRender(
        <Suspense fallback={<></>}>
          <SingleTaskPage />
        </Suspense>,
      );
    });

    test('RegisterPage', async () => {
      axios.get.mockResolvedValue(responseSingleTask);
      customRender(
        <Suspense fallback={<></>}>
          <RegisterPage />
        </Suspense>,
      );
    });

    test('LoginPage', async () => {
      axios.get.mockResolvedValue(responseSingleTask);
      customRender(
        <Suspense fallback={<></>}>
          <LoginPage />
        </Suspense>,
      );
    });

    test('AccountPage', async () => {
      axios.get.mockResolvedValue(responseSingleTask);
      customRender(
        <Suspense fallback={<></>}>
          <AccountPage />
        </Suspense>,
      );
    });
  });
});
