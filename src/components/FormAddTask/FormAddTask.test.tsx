import FormAddTask from './FormAddTask';
import customRender from '../../utils/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { store } from '../../redux/store';
import { ITask } from '../../redux/tasks/task-types';
const axios = require('axios');

jest.mock('axios');

interface IResponse {
  data: {
    data: ITask;
  };
}

const task: ITask = {
  completed: false,
  _id: 1,
  description: 'test',
  owner: 'admin',
  createdAt: '20.09.1991',
  updatedAt: '20.09.1991',
};

const response: IResponse = {
  data: {
    data: task,
  },
};

describe('Form add task', () => {
  it('must submit the form when clicking on the Add task button', async () => {
    axios.post.mockResolvedValue(response);

    await act(async () => {
      customRender(<FormAddTask />);
    });

    await act(async () => {
      userEvent.type(screen.getByLabelText(/Ваше завдання/i), 'test');
    });

    await act(async () => {
      userEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(store.getState().tasks.length).toBe(1);
    });
  });
});
