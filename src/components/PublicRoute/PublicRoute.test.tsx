import PublicRouter from './PublicRoute';
import { screen } from '@testing-library/react';
import customRender, { testLogin } from '../../utils/test-utils';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('Public Router:', () => {
  it('should render the page when the user is not logged in', () => {
    customRender(
      <PublicRouter redirectTo="/" restricted>
        <div>Hello world!</div>
      </PublicRouter>,
    );
    expect(screen.getByText(/Hello world!/i)).toBeInTheDocument();
  });

  it('should render the page when the user is logged in', async () => {
    await act(async () => {
      testLogin();
    });

    customRender(
      <PublicRouter redirectTo="/" restricted>
        <div>Hello world!</div>
      </PublicRouter>,
    );

    expect(screen.queryByText(/Hello world!/i)).not.toBeInTheDocument();
  });
});
