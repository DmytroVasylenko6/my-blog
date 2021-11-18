import React from 'react';
import UserInfo from './UserInfo';
import customRender from '../../utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { testLogin, testLogout } from '../../utils/test-utils';
import { store } from '../../redux/store';
import authOperations from '../../redux/auth/auth-operation';
const axios = require('axios');

jest.mock('axios');

describe('User Info:', () => {
  beforeEach(async () => {
    await testLogin();
  });

  afterEach(() => {
    testLogout();
  });
  it('must click on the logout button', () => {
    const { container } = customRender(<UserInfo />);
    expect(container).toBeInTheDocument();
    axios.post.mockResolvedValue({});
    fireEvent.click(screen.getByText('Вийти'));
  });

  it('render avatar', async () => {
    customRender(<UserInfo />);
    const state = store.getState();
    expect(state.auth.avatar).toBeNull();
    const avatarURL = 'http://domain.com/upload/avatarId';
    global.URL.createObjectURL = jest.fn(() => avatarURL);

    const response = {
      data: 'Hello, world!',
      headers: {
        'content-type': 'text/plain',
      },
    };

    axios.get.mockResolvedValue(response);
    await store.dispatch(authOperations.getAvatar(1));

    const avatarImg = await screen.findByAltText(/mini-avatar/i);
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', avatarURL);
  });
});
