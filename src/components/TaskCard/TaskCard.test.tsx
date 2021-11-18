import TaskCard from './TaskCard';
import customRender from '../../utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { testLogin, testLogout } from '../../utils/test-utils';
import { act } from 'react-dom/test-utils';
const axios = require('axios');

jest.mock('axios');

describe('Task card', () => {
  beforeEach(async () => {
    await testLogin();
  });

  afterEach(async () => {
    await testLogout();
  });

  it('click on delete button', async () => {
    axios.delete.mockResolvedValue({});
    await act(async () => {
      customRender(
        <TaskCard
          id="1"
          description="test"
          createdAt="20.20.20"
          completed={false}
        />,
      );
    });

    const buttonClose = screen.getByTestId('button-delete');
    await act(async () => {
      fireEvent.click(buttonClose);
    });

    const buttonYes = await screen.findByTestId('button-yes');
    await act(async () => {
      fireEvent.click(buttonYes);
    });
  });

  it('render the completed task', () => {
    customRender(
      <TaskCard
        id="1"
        description="test"
        createdAt="20.20.20"
        completed={true}
      />,
    );
  });
});
