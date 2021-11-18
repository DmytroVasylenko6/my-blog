import MobileMenu from './MobileMenu';
import { screen } from '@testing-library/react';
import customRender from '../../utils/test-utils';

describe('Mobile menu:', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('test1', () => {
    const onClick = jest.fn();
    customRender(
      <MobileMenu onClick={onClick} isOpen={true} isAuthenticated={true} />,
    );
    const buttonLogout = screen.getByTestId('logout');
    expect(buttonLogout).toBeInTheDocument();

    const authNav = screen.queryByTestId('auth-nav');
    expect(authNav).not.toBeInTheDocument();
  });

  it('test2', () => {
    const onClick = jest.fn();
    customRender(
      <MobileMenu onClick={onClick} isOpen={false} isAuthenticated={true} />,
    );
    const headerNav = screen.queryByTestId('header_nav');
    expect(headerNav).not.toBeInTheDocument();
  });

  it('test3', () => {
    const onClick = jest.fn();
    customRender(
      <MobileMenu onClick={onClick} isOpen={true} isAuthenticated={false} />,
    );

    const authNav = screen.getByTestId('auth-nav');
    expect(authNav).toBeInTheDocument();

    const buttonLogout = screen.queryByTestId('logout');
    expect(buttonLogout).not.toBeInTheDocument();
  });
});
