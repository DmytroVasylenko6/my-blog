import React from 'react';
import AccountPage from './AccountPage';
import customRender from '../../utils/test-utils';

describe('Account page:', () => {
  it('render', () => {
    const { container } = customRender(<AccountPage />);
    expect(container).toBeInTheDocument();
  });
});
