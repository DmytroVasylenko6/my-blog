import Header from './Header';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '../../utils/test-utils';
import { testLogin, testLogout } from '../../utils/test-utils';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('Header:', () => {
  const addListener = jest.fn();
  const removeListener = jest.fn();
  window.scrollTo = jest.fn();

  beforeEach(() => {
    testLogin();
  });

  afterEach(() => {
    testLogout();
  });
  it('test1', async () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      addListener,
      removeListener,
    }));
    await act(async () => {
      customRender(<Header />);
    });
  });

  it('should open the burger menu and click on the nav menu link', async () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addListener,
      removeListener,
    }));
    await act(async () => {
      customRender(<Header />);
    });

    const burgerButton = screen.getByTestId('burger-button');
    await act(async () => {
      fireEvent.click(burgerButton);
    });

    const navButton = screen.getByTestId('nav-home');
    await act(async () => {
      fireEvent.click(navButton);
    });
  });

  it('should open the burger menu and press the logout button', async () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addListener,
      removeListener,
    }));
    await act(async () => {
      customRender(<Header />);
    });

    const burgerButton = screen.getByTestId('burger-button');
    await act(async () => {
      fireEvent.click(burgerButton);
    });

    const logoutButton = screen.getByTestId('logout');
    await act(async () => {
      fireEvent.click(logoutButton);
    });
  });

  it('should change the theme when you click on the change theme button', async () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addListener,
      removeListener,
    }));

    await act(async () => {
      customRender(<Header />);
    });

    const burgerButton = screen.getByTestId('burger-button');
    await act(async () => {
      fireEvent.click(burgerButton);
    });

    const themeButton = screen.getByTestId('theme-button');
    await act(async () => {
      fireEvent.click(themeButton);
    });
  });
});
