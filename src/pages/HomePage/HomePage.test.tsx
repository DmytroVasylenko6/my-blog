import React from 'react';
import HomePage from './HomePage';
import customRender from '../../utils/test-utils';
// import { screen } from '@testing-library/react';

describe('Home page:', () => {
  it('render', () => {
    const { container } = customRender(<HomePage />);
    expect(container).toBeInTheDocument();
  });
});
