import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Ukrainian from '../../lang/ua.json';
import Russian from '../../lang/ru.json';
import English from '../../lang/en.json';

interface IContext {
  locale: string;
  selectLanguage: (e: any) => void;
}
export const Context = React.createContext<IContext | null>(null);

let lang: any;

export function setLanguage() {
  const locale = navigator.language;

  if (locale === 'en-US') {
    lang = English;
  } else {
    if (locale === 'ru-RU') {
      lang = Russian;
    } else {
      lang = Ukrainian;
    }
  }
}

setLanguage();

interface IProps {
  children: [] | object;
}

export const Wrapper = (props: IProps) => {
  const local = navigator.language;
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(lang);
  function selectLanguage(e: any) {
    const newLocale = e.target.value;

    setLocale(newLocale);
    if (newLocale === 'en-US') {
      setMessages(English);
    } else {
      if (newLocale === 'ru-RU') {
        setMessages(Russian);
      } else {
        setMessages(Ukrainian);
      }
    }
  }
  return (
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider messages={messages} locale={locale}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};
