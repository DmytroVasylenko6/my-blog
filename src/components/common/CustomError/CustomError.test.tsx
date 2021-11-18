import React from 'react';
import CustomError from './CustomError';
import { render } from '@testing-library/react';

describe('CustomError:', () => {
  it('render', () => {
    const { getByText } = render(<CustomError>{'test message'}</CustomError>);
    const message = getByText(/test message/i);
    expect(message).toBeInTheDocument();
  });
});
