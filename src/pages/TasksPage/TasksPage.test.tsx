import TaskPage from './TasksPage';
import customRender from '../../utils/test-utils';
import { screen } from '@testing-library/react';
import taskOperations from '../../redux/tasks/tasks-operations';
import { store } from '../../redux/store';
import { act } from 'react-dom/test-utils';
const axios = require('axios');

jest.mock('axios');

describe('Task page', () => {
  beforeEach(async () => {
    axios.get.mockResolvedValue({
      data: {
        data: [],
      },
    });
    await store.dispatch(taskOperations.taskParse());
  });

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

  it('should successfully render the task list', async () => {
    axios.get.mockResolvedValue(response);

    await act(async () => {
      customRender(<TaskPage />);
    });
    expect(await screen.findByText(/test/i)).toBeInTheDocument();
  });

  it('should render tasks with an error', async () => {
    axios.get.mockRejectedValue({
      error: {
        message: 'Error tasks',
      },
    });

    await act(async () => {
      customRender(<TaskPage />);
    });

    expect(await screen.findByText(/Немає завдань/i)).toBeInTheDocument();
  });
});
