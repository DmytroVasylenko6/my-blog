import ThemeMode from './ThemeMode';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '../../utils/test-utils';

describe('Theme mode', () => {
  it('shold change theme', async () => {
    customRender(<ThemeMode />);
    const darkIcon = screen.getByTestId('Brightness7Icon');
    expect(darkIcon).toBeInTheDocument();

    const themeButton = screen.getByRole('button');
    fireEvent.click(themeButton);

    const lightIcon = await screen.findByTestId('Brightness4Icon');
    expect(lightIcon).toBeInTheDocument();
    expect(darkIcon).not.toBeInTheDocument();

    fireEvent.click(themeButton);
    expect(await screen.findByTestId('Brightness7Icon')).toBeInTheDocument();
  });
});
