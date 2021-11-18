import { Wrapper, setLanguage } from './LanguageWrapper';
import LanguageSelect from '../LanguageSelect';
import { FormattedMessage } from 'react-intl';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('Language wrapper:', () => {
  let languageGetter: any;

  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, 'language', 'get');
  });
  describe('should determine the current local language:', () => {
    it('English', () => {
      languageGetter.mockReturnValue('en-US');
      setLanguage();
    });

    it('Russian', () => {
      languageGetter.mockReturnValue('ru-RU');
      setLanguage();
    });

    it('Ukrainian', () => {
      languageGetter.mockReturnValue('uk-UA');
      setLanguage();
    });
  });

  describe('should change the current language to:', () => {
    it('Ukrainian, English, Russian', async () => {
      languageGetter.mockReturnValue('uk-UA');
      await act(async () => {
        render(
          <Wrapper>
            <LanguageSelect />
            <FormattedMessage
              id="app.registerform.password"
              defaultMessage="Password"
            />
          </Wrapper>,
        );
      });

      await act(async () => {
        fireEvent.mouseDown(screen.getByRole('button'));
      });

      const listbox1 = within(screen.getByRole('listbox'));

      await act(async () => {
        fireEvent.click(listbox1.getByText(/EN/i));
      });

      await act(async () => {
        fireEvent.mouseDown(screen.getByRole('button'));
      });

      const listbox2 = within(screen.getByRole('listbox'));

      await act(async () => {
        fireEvent.click(listbox2.getByText(/RU/i));
      });

      await act(async () => {
        fireEvent.mouseDown(screen.getByRole('button'));
      });

      const listbox = within(screen.getByRole('listbox'));

      await act(async () => {
        fireEvent.click(listbox.getByText(/UA/i));
      });
    });
  });
});
