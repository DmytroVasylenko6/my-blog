import SingleTaskPage from './SingleTaskPage';
import customRender from '../../utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { ITask } from '../../redux/tasks/task-types';
import { Router } from 'react-router-dom';
import routes from '../../utils/routes';
import { createMemoryHistory } from 'history';
const axios = require('axios');

jest.mock('axios');

interface IResponse {
  data: {
    data: ITask;
  };
}

describe('Single task page:', () => {
  let todo: ITask;
  let updatedTodo: ITask;
  let response: IResponse;
  let responseUpdated: IResponse;

  beforeEach(async () => {
    todo = {
      completed: false,
      _id: 1,
      description: 'test',
      owner: 'admin',
      createdAt: '21.10.2021',
      updatedAt: '21.10.2021',
    };

    updatedTodo = {
      completed: true,
      _id: 1,
      description: 'test',
      owner: 'admin',
      createdAt: '21.10.2021',
      updatedAt: '22.10.2021',
    };

    response = {
      data: {
        data: todo,
      },
    };

    responseUpdated = {
      data: {
        data: updatedTodo,
      },
    };
  });

  describe('should render the component', () => {
    it('should successfully render the task', async () => {
      axios.get.mockResolvedValue(response);

      await act(async () => {
        customRender(<SingleTaskPage />);
      });
      expect(await screen.findByText(/test/i)).toBeInTheDocument();
    });

    it('should render task with an error', async () => {
      axios.get.mockRejectedValue({
        error: {
          message: 'Error tasks',
        },
      });

      await act(async () => {
        customRender(<SingleTaskPage />);
      });
      expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    });
  });

  describe('Task updates when clicking the refresh button:', () => {
    it('should update the task successfully', async () => {
      axios.get.mockResolvedValue(response);
      await act(async () => {
        customRender(<SingleTaskPage />);
      });
      expect(screen.getByText(/Незавершено/i)).toBeInTheDocument();

      axios.put.mockResolvedValue(responseUpdated);

      const updateButton = await screen.findByTestId('update');

      await act(async () => {
        fireEvent.click(updateButton);
      });

      expect(await screen.findByText(/Завершено/i)).toBeInTheDocument();
    });

    it('should execute the update request with an error', async () => {
      axios.get.mockResolvedValue(response);
      await act(async () => {
        customRender(<SingleTaskPage />);
      });
      expect(screen.getByText(/Незавершено/i)).toBeInTheDocument();

      axios.put.mockRejectedValue({
        error: {
          message: 'Error update',
        },
      });

      const updateButton = await screen.findByTestId('update');

      await act(async () => {
        fireEvent.click(updateButton);
      });

      expect(await screen.findByText(/Незавершено/i)).toBeInTheDocument();
    });
  });

  describe('should delete the task when clicking the delete button', () => {
    it('should delete the task successfully', async () => {
      const history = createMemoryHistory();
      axios.get.mockResolvedValue(response);
      await act(async () => {
        customRender(
          <Router history={history}>
            <SingleTaskPage />
          </Router>,
        );
      });

      axios.delete.mockResolvedValue({
        data: {
          success: true,
        },
      });

      const deleteButton = await screen.findByTestId('delete');

      await act(async () => {
        fireEvent.click(deleteButton);
      });

      const modalButtonYes = await screen.findByTestId('button-yes');
      await act(async () => {
        fireEvent.click(modalButtonYes);
      });

      expect(history.length).toBe(2);
      expect(history.location.pathname).toBe(routes.todos);
    });

    it('must execute the request to delete the task with an error', async () => {
      const history = createMemoryHistory();
      axios.get.mockResolvedValue(response);
      await act(async () => {
        customRender(
          <Router history={history}>
            <SingleTaskPage />
          </Router>,
        );
      });

      axios.delete.mockRejectedValue({
        data: {
          message: 'Delete error',
        },
      });

      const deleteButton = await screen.findByTestId('delete');
      await act(async () => {
        fireEvent.click(deleteButton);
      });

      const modalButtonYes = await screen.findByTestId('button-yes');
      await act(async () => {
        fireEvent.click(modalButtonYes);
      });
      expect(history.length).toBe(1);
      expect(history.location.pathname).toBe(routes.home);
    });
  });

  describe('click on the back button', () => {
    it('should return to the previous page when clicking on the back button', async () => {
      const history = createMemoryHistory();
      axios.get.mockResolvedValue(response);
      await act(async () => {
        customRender(
          <Router history={history}>
            <SingleTaskPage />
          </Router>,
        );
      });

      const backButton = await screen.findByTestId('back-button');

      await act(async () => {
        fireEvent.click(backButton);
      });

      expect(history.length).toBe(2);
      expect(history.location.pathname).toBe(routes.home);
    });
  });
});
