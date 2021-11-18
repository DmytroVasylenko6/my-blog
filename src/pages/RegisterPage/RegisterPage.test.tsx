import React from 'react';
import RegisterPage from './RegisterPage';
import customRender from '../../utils/test-utils';
// import { screen } from '@testing-library/react';

describe('Register page:', () => {
  it('render', () => {
    const { container } = customRender(<RegisterPage />);

    expect(container).toBeInTheDocument();
  });
});
