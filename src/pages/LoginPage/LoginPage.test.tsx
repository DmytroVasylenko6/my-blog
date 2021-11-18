import React from 'react';
import LoginPage from './LoginPage';
import customRender from '../../utils/test-utils';

describe('Login page:', () => {
  it('render', () => {
    const { container } = customRender(<LoginPage />);
    expect(container).toBeInTheDocument();
  });
});
