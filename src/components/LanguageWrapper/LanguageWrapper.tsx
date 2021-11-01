import React, {useState} from 'react';
import { IntlProvider } from 'react-intl';
import Ukrainian from '../../lang/ua.json';
import Russian from '../../lang/ru.json';
import English from '../../lang/en.json';

interface IContext {
    locale: string;
    selectLanguage: (e: any) => void;
}
export const Context = React.createContext<IContext | null>(null);

const local = navigator.language;


const locale = navigator.language;

let lang: any;
if (locale === "en") {
   lang = English;
} else {
   if (locale === "ru") {
       lang = Russian;
   } else {
       lang = Ukrainian;
   }
}


interface IProps {
children: [] | object
}

export const Wrapper = (props: IProps) => {
   const [locale, setLocale] = useState(local);
   const [messages, setMessages] = useState(lang);
   function selectLanguage(e: any) {
       const newLocale = e.target.value;
       setLocale(newLocale);
       if (newLocale === 'en') {
           setMessages(English);
       } else {
           if (newLocale === 'ru'){
               setMessages(Russian);
           } else {
               setMessages(Ukrainian);
           }
       }
   }
   return (
       <Context.Provider value={{locale, selectLanguage}}>
           <IntlProvider messages={messages} locale={locale}>
               {props.children}
           </IntlProvider>
       </Context.Provider>
   );
}
