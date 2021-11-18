import UploadImage from './UploadImage';
import { screen, fireEvent } from '@testing-library/react';
import CustomRender from '../../utils/test-utils';
import { store } from '../../redux/store';
import { testLogin, testLogout } from '../../utils/test-utils';
const axios = require('axios');

jest.mock('axios');

describe('Upload avatar', () => {
  beforeEach(() => {
    testLogin();
  });

  afterEach(() => {
    testLogout();
  });

  test('should display the uploaded image', async () => {
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

    axios.post.mockResolvedValue({});
    axios.get.mockResolvedValue(response);

    CustomRender(<UploadImage />);

    const input = screen.getByTestId('input-element');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
      target: {
        files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })],
      },
    });

    const updateImage = await screen.findByAltText('avatar');
    expect(updateImage).toHaveAttribute('src', avatarURL);
  });
});
