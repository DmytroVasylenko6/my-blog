import PrivateRouter from './PrivateRoute';
import { screen } from '@testing-library/react';
import customRender, { testLogin } from '../../utils/test-utils';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('Private Router:', () => {
  it('should render the page when the user is not logged in', () => {
    customRender(
      <PrivateRouter redirectTo="/">
        <div>Hello world!</div>
      </PrivateRouter>,
    );
    expect(screen.queryByText(/Hello world!/i)).not.toBeInTheDocument();
  });

  it('should render the page when the user is logged in', async () => {
    await act(async () => {
      testLogin();
    });

    customRender(
      <PrivateRouter redirectTo="/">
        <div>Hello world!</div>
      </PrivateRouter>,
    );

    expect(screen.getByText(/Hello world!/i)).toBeInTheDocument();
  });
});
