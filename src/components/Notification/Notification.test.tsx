import Notification from './Notification';
import customRender from '../../utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import notifInfo from '../../redux/notification/notif-actions';
import { store } from '../../redux/store';
import { act } from 'react-dom/test-utils';

describe('Notification', () => {
  it('message should appear and must close notification', async () => {
    customRender(<Notification />);

    await store.dispatch(
      notifInfo({
        message: 'Hello world!',
        status: true,
        severity: 'error',
      }),
    );
    expect(await screen.findByText(/Hello world!/i)).toBeInTheDocument();

    const closeButton = await screen.findByRole('button');
    fireEvent.click(closeButton);
  });

  it('sholud be unmounted', () => {
    const { unmount } = customRender(<Notification />);
    act(() => {
      store.dispatch(
        notifInfo({
          message: 'Hello world!',
          status: true,
          severity: 'error',
        }),
      );
    });

    expect(screen.getByText(/Hello world!/i)).toBeInTheDocument();
    unmount();
    expect(screen.queryByText(/Hello world!/i)).not.toBeInTheDocument();
  });
});
