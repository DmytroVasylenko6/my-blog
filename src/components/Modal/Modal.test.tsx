import Modal from './Modal';
import ThemeMode from '../ThemeMode';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '../../utils/test-utils';
import { testLogin, testLogout } from '../../utils/test-utils';
import { act } from 'react-dom/test-utils';

it('the modal window should change color when you click on the theme switcher button', async () => {
  const handleClose = jest.fn();
  const onDelete = jest.fn();
  await act(async () => {
    customRender(
      <div>
        <ThemeMode />
        <Modal
          open={true}
          title="My modal"
          handleClose={handleClose}
          onDelete={onDelete}
        />
      </div>,
    );
  });

  const themeButton = screen.getByTestId('theme-button');
  await act(async () => {
    fireEvent.click(themeButton);
  });

  expect(screen.getByText(/My modal/i)).toBeInTheDocument();
});
